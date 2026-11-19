import { expect, test } from "@playwright/test";
import { KNOWLEDGE_VERSION } from "@/content/chatbot/knowledge";
import { randomUUID } from "node:crypto";
import { and, eq, sql } from "drizzle-orm";

test.describe.configure({mode:"serial"});
test.skip(process.env.CHAT_DB_TEST!=="true","Disposable local MySQL required.");
let db: ReturnType<typeof import("@/lib/chatbot/db")["chatDb"]>;
let schema: typeof import("@/lib/chatbot/schema");
test.beforeAll(async()=>{
  expect(process.env.DB_HOST).toBe("127.0.0.1"); expect(process.env.DB_NAME).toMatch(/(?:^|_)nmark_chatbot_test$/);
  db=(await import("@/lib/chatbot/db")).chatDb(); schema=await import("@/lib/chatbot/schema");
  await db.delete(schema.chatUsage).where(sql`${schema.chatUsage.dayKey} LIKE ${"d:2029-%"}`);
  await db.delete(schema.chatBudgetBuckets).where(sql`${schema.chatBudgetBuckets.key} LIKE ${"%:2029-%"}`);
  Object.assign(process.env,{OPENAI_MODEL:"fixture",CHAT_PRICE_MODEL:"fixture",CHAT_PRICE_INPUT_USD_PER_MILLION:"1",CHAT_PRICE_OUTPUT_USD_PER_MILLION:"2",CHAT_BUDGET_DAY_USD:"0.50",CHAT_BUDGET_MONTH_USD:"4"});
});
test.afterAll(async()=>{await db?.$client.end()});
async function session(ageDays:number,withLead=false){
  const id=randomUUID(),now=new Date(),at=new Date(now.getTime()-ageDays*86400000);
  await db.insert(schema.chatSessions).values({id,tokenHash:randomUUID(),locale:"sr",consentVersion:"fixture",consentAt:at,createdAt:at,lastActivityAt:at,expiresAt:at,lastLeadAt:withLead?at:null});
  const userId=randomUUID();
  await db.insert(schema.chatMessages).values({id:userId,sessionId:id,role:"user",content:"SENSITIVE MESSAGE FIXTURE",status:"completed",clientMessageId:randomUUID(),createdAt:at});
  if(withLead) await db.insert(schema.chatLeads).values({id:randomUUID(),sessionId:id,clientSubmissionId:randomUUID(),payloadHash:randomUUID(),locale:"sr",name:"Sensitive",email:"private@example.test",phone:"",company:"",website:"",service:"other",budgetRange:"",timeframe:"",projectDescription:"PRIVATE",preferredContactMethod:"email",privacyConsentAt:at,consentVersion:"fixture",createdAt:at});
  return{id,at,userId};
}
test("exact USD parsing, token rounding, invalid pricing and UTC period boundaries",async()=>{
  const {usdMicros,tokenCost,budgetKeys,budgetConfig}=await import("@/lib/chatbot/budget");
  expect(usdMicros("0.50")).toBe(500000);expect(tokenCost(1,1,400000,1600000)).toBe(3);
  for(const input of ["0","-1","NaN","1e2","0.1234567",undefined])expect(()=>usdMicros(input)).toThrow();
  expect(budgetKeys(new Date("2026-12-01T00:00:00Z"))).toEqual(["d:2026-12-01","m:2026-12"]);
  process.env.CHAT_PRICE_MODEL="wrong";expect(()=>budgetConfig()).toThrow();process.env.CHAT_PRICE_MODEL="fixture";
});
test("parallel budget reservations enforce daily AND monthly caps, survive retry, settle once",async()=>{
  const {reserveBudget,settleBudget,budgetKeys}=await import("@/lib/chatbot/budget");
  const now=new Date("2029-01-10T10:00:00Z"),keys=budgetKeys(now);const ids=Array.from({length:6},()=>randomUUID());
  const results=await Promise.allSettled(ids.map(id=>reserveBudget(id,100000,50000,now))); // $0.20/call
  expect(results.filter(r=>r.status==="fulfilled")).toHaveLength(2);
  const id=ids[results.findIndex(r=>r.status==="fulfilled")];
  await expect(reserveBudget(id,1,1,now)).rejects.toMatchObject({code:"BUSY"});
  await Promise.all([settleBudget(id,{input_tokens:100,output_tokens:50},12),settleBudget(id,{input_tokens:100,output_tokens:50},12)]);
  const [bucket]=await db.select().from(schema.chatBudgetBuckets).where(eq(schema.chatBudgetBuckets.key,keys[0]));
  expect(bucket.committedMicros).toBe(200);expect(bucket.reservedMicros).toBe(200000);
  process.env.CHAT_BUDGET_MONTH_USD="0.20";
  await expect(reserveBudget(randomUUID(),100000,50000,new Date("2029-01-11T10:00:00Z"))).rejects.toMatchObject({code:"RATE_LIMITED"});
  // Rejected transaction did not leave a day reservation behind.
  expect(await db.select().from(schema.chatBudgetBuckets).where(eq(schema.chatBudgetBuckets.key,"d:2029-01-11"))).toHaveLength(0);
  process.env.CHAT_BUDGET_MONTH_USD="4";
});
test("unknown usage never refunds; pre-dispatch release and settlement use reservation's original periods",async()=>{
  const {reserveBudget,settleBudget}=await import("@/lib/chatbot/budget");const id=randomUUID(),released=randomUUID();const at=new Date("2029-02-28T23:59:59Z");
  await reserveBudget(id,1000,500,at);await settleBudget(id);await settleBudget(id,{input_tokens:1,output_tokens:1});
  const [record]=await db.select().from(schema.chatUsage).where(eq(schema.chatUsage.id,id));expect(record.status).toBe("uncertain");expect(record.chargedMicros).toBe(record.reservedMicros);
  await reserveBudget(released,1000,500,at);await settleBudget(released,undefined,0,true);
  const [bucket]=await db.select().from(schema.chatBudgetBuckets).where(eq(schema.chatBudgetBuckets.key,"m:2029-02"));expect(bucket.committedMicros).toBe(record.reservedMicros);expect(bucket.reservedMicros).toBe(0);
});
test("durable analytics deduplicate backfill and survive manual/cascade deletion without PII",async()=>{
  const {maintainSession}=await import("@/lib/chatbot/maintenance");const row=await session(20,true);
  const day=(await import("@/lib/chatbot/admin/time")).belgradeDay(row.at);
  const baseline=await db.select().from(schema.chatDailyMetrics).where(and(eq(schema.chatDailyMetrics.day,day),eq(schema.chatDailyMetrics.event,"chat_start")));
  await maintainSession(row.id,new Date(),false);await maintainSession(row.id,new Date(),false);
  const [aggregate]=await db.select().from(schema.chatDailyMetrics).where(and(eq(schema.chatDailyMetrics.day,day),eq(schema.chatDailyMetrics.event,"chat_start")));
  expect(aggregate.total).toBe((baseline[0]?.total??0)+1);expect(JSON.stringify(aggregate)).not.toMatch(/SENSITIVE|private@example|sessionId/);
  await db.delete(schema.chatSessions).where(eq(schema.chatSessions.id,row.id));
  expect(await db.select().from(schema.chatMetricReceipts).where(eq(schema.chatMetricReceipts.sessionId,row.id))).toHaveLength(0);
  const [after]=await db.select().from(schema.chatDailyMetrics).where(and(eq(schema.chatDailyMetrics.day,day),eq(schema.chatDailyMetrics.event,"chat_start")));expect(after.total).toBe(aggregate.total);
});
test("retention boundaries, newer lead protection, cascades, and active generation/notification leases",async()=>{
  const {maintainSession}=await import("@/lib/chatbot/maintenance");const now=new Date();
  const old=await session(91),fresh=await session(89),leadOld=await session(366,true),leadFresh=await session(100,true),busy=await session(100),notifying=await session(366,true);
  await db.update(schema.chatSessions).set({activeUntil:new Date(Date.now()+60000)}).where(eq(schema.chatSessions.id,busy.id));
  const [lead]=await db.select().from(schema.chatLeads).where(eq(schema.chatLeads.sessionId,notifying.id));
  await db.insert(schema.leadNotifications).values({id:randomUUID(),leadId:lead.id,status:"processing",leaseUntil:new Date(Date.now()+60000),nextRetryAt:now,createdAt:now});
  expect((await maintainSession(old.id,now,true)).sessions).toBe(1);expect((await maintainSession(leadOld.id,now,true)).leads).toBe(1);
  for(const row of [fresh,leadFresh,busy,notifying])expect((await maintainSession(row.id,now,true)).sessions).toBe(0);
  expect(await db.select().from(schema.chatMessages).where(eq(schema.chatMessages.sessionId,old.id))).toHaveLength(0);
  expect(await db.select().from(schema.chatLeads).where(eq(schema.chatLeads.sessionId,leadOld.id))).toHaveLength(0);
  const audit=await db.select().from(schema.adminAuditLogs).where(eq(schema.adminAuditLogs.targetId,leadOld.id));expect(audit).toHaveLength(1);expect(JSON.stringify(audit)).not.toMatch(/PRIVATE|private@example/);
  await db.update(schema.leadNotifications).set({leaseUntil:new Date(Date.now()-60000)}).where(eq(schema.leadNotifications.leadId,lead.id));expect((await maintainSession(notifying.id,now,true)).sessions).toBe(1);
  for(const row of [fresh,leadFresh,busy])await db.delete(schema.chatSessions).where(eq(schema.chatSessions.id,row.id));
});
test("cleanup authorization, advisory lock exclusion, technical grace period and idempotency",async()=>{
  const {runDataMaintenance}=await import("@/lib/chatbot/maintenance");const {authorizeMaintenance}=await import("@/lib/chatbot/notifications");
  process.env.CHAT_CRON_SECRET="operations-test-cron-secret-at-least-32-characters";
  expect(()=>authorizeMaintenance(new Request("http://localhost"))).toThrow("FORBIDDEN");
  const connection=await db.$client.getConnection();const name=`nmark-cleanup:${process.env.DB_NAME}`.slice(0,64);
  try{await connection.query("SELECT GET_LOCK(?,0)",[name]);expect(await runDataMaintenance()).toEqual({skipped:true})}finally{await connection.query("SELECT RELEASE_LOCK(?)",[name]);connection.release()}
  const old=randomUUID(),fresh=randomUUID();await db.insert(schema.chatCounters).values([{keyHash:old,count:1,expiresAt:new Date(Date.now()-8*86400000)},{keyHash:fresh,count:1,expiresAt:new Date(Date.now()-6*86400000)}]);
  process.env.CHAT_RETENTION_ENABLED="false";const first=await runDataMaintenance();expect(first).toMatchObject({skipped:false,retentionEnabled:false});
  expect(await db.select().from(schema.chatCounters).where(eq(schema.chatCounters.keyHash,old))).toHaveLength(0);expect(await db.select().from(schema.chatCounters).where(eq(schema.chatCounters.keyHash,fresh))).toHaveLength(1);
  await runDataMaintenance();await db.delete(schema.chatCounters).where(eq(schema.chatCounters.keyHash,fresh));await db.execute(sql`SELECT 1`);
});

test("OpenAI SDK counts matching input, reserves before generation, persists usage and blocks over-budget generation",async()=>{
  const {createServer}=await import("node:http");const {responseStream}=await import("@/lib/chatbot/provider");const {settleBudget}=await import("@/lib/chatbot/budget");
  expect(KNOWLEDGE_VERSION).toBeTruthy();
  let generations=0,counts=0;let counted:Record<string,unknown>={};
  const server=createServer(async(req,res)=>{
    let raw="";for await(const chunk of req)raw+=chunk;const body=JSON.parse(raw) as Record<string,unknown>;
    if(req.url==="/v1/responses/input_tokens"){counts++;counted=body;res.setHeader("Content-Type","application/json");res.end(JSON.stringify({object:"response.input_tokens",input_tokens:100}));return}
    if(req.url==="/v1/responses"){
      generations++;expect(body.input).toEqual(counted.input);expect(body.instructions).toEqual(counted.instructions);expect(body.store).toBe(false);expect(body.service_tier).toBe("default");
      res.setHeader("Content-Type","text/event-stream");res.end('data: '+JSON.stringify({type:"response.output_text.delta",delta:"Synthetic reply"})+'\n\ndata: '+JSON.stringify({type:"response.completed",response:{usage:{input_tokens:100,output_tokens:2}}})+'\n\n');return;
    }res.statusCode=404;res.end();
  });
  await new Promise<void>(resolve=>server.listen(0,"127.0.0.1",resolve));const address=server.address();if(!address||typeof address==="string")throw new Error("No fixture port");
  process.env.OPENAI_BASE_URL=`http://127.0.0.1:${address.port}/v1`;const id=randomUUID();
  try{
    let usage:{input_tokens:number;output_tokens:number}|undefined;
    const stream=await responseStream("Synthetic question","sr",[{role:"user",content:"Synthetic question"}],AbortSignal.timeout(10000),id);
    for await(const event of stream)if(event.type==="response.completed")usage=event.response.usage??undefined;
    await settleBudget(id,usage,10);const [row]=await db.select().from(schema.chatUsage).where(eq(schema.chatUsage.id,id));expect(row).toMatchObject({status:"settled",inputTokens:100,outputTokens:2,chargedMicros:104});expect(JSON.stringify(row)).not.toContain("Synthetic question");
    process.env.CHAT_BUDGET_DAY_USD="0.000001";
    await expect(responseStream("Synthetic question","sr",[{role:"user",content:"Synthetic question"}],AbortSignal.timeout(10000),randomUUID())).rejects.toMatchObject({code:"RATE_LIMITED"});
    expect(counts).toBe(2);expect(generations).toBe(1);
  }finally{delete process.env.OPENAI_BASE_URL;process.env.CHAT_BUDGET_DAY_USD="0.50";await new Promise<void>(resolve=>server.close(()=>resolve()))}
});

test("old lead deletion preserves newer inquiry, its transcript and latest-lead retention marker",async()=>{
  const {maintainSession}=await import("@/lib/chatbot/maintenance");const row=await session(400,true);const now=new Date(),latest=randomUUID();
  const [old]=await db.select().from(schema.chatLeads).where(eq(schema.chatLeads.sessionId,row.id));
  await db.insert(schema.chatLeads).values({...old,id:latest,clientSubmissionId:randomUUID(),createdAt:now,privacyConsentAt:now});
  expect(await maintainSession(row.id,now,true)).toMatchObject({sessions:0,leads:1});
  expect(await db.select().from(schema.chatLeads).where(eq(schema.chatLeads.id,old.id))).toHaveLength(0);
  expect(await db.select().from(schema.chatLeads).where(eq(schema.chatLeads.id,latest))).toHaveLength(1);
  await db.delete(schema.chatLeads).where(eq(schema.chatLeads.id,latest));
  expect((await maintainSession(row.id,now,true)).sessions).toBe(0);
  expect((await maintainSession(row.id,new Date(now.getTime()+366*86400000),true)).sessions).toBe(1);
});
test("technical cleanup observes seven-day grace and commits stale usage without refund",async()=>{
  const {runDataMaintenance}=await import("@/lib/chatbot/maintenance");const {reserveBudget}=await import("@/lib/chatbot/budget");
  const now=new Date(),userId=randomUUID(),old=randomUUID(),recent=randomUUID(),valid=randomUUID(),usageId=randomUUID();
  await db.insert(schema.adminUsers).values({id:userId,email:`${userId}@example.test`});
  const dates=[new Date(now.getTime()-8*86400000),new Date(now.getTime()-6*86400000),new Date(now.getTime()+86400000)];
  await db.insert(schema.adminSessions).values([old,recent,valid].map((sessionToken,i)=>({sessionToken,userId,expires:dates[i]})));
  await db.insert(schema.adminVerificationTokens).values([old,recent,valid].map((token,i)=>({identifier:userId,token,expires:dates[i]})));
  await reserveBudget(usageId,1000,500,new Date(now.getTime()-360000));
  try {
    await runDataMaintenance(now);
    for(const table of [schema.adminSessions,schema.adminVerificationTokens]){
      const records=await db.select().from(table);const serialized=JSON.stringify(records);expect(serialized).not.toContain(old);expect(serialized).toContain(recent);expect(serialized).toContain(valid);
    }
    const [usage]=await db.select().from(schema.chatUsage).where(eq(schema.chatUsage.id,usageId));expect(usage.status).toBe("uncertain");expect(usage.chargedMicros).toBe(usage.reservedMicros);
  }finally{
    await db.delete(schema.adminUsers).where(eq(schema.adminUsers.id,userId));await db.delete(schema.adminVerificationTokens).where(eq(schema.adminVerificationTokens.identifier,userId));
  }
});
