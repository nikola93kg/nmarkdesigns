// Cron client: secrets stay in private environment, never URL/query/command arguments.
const task = process.argv[2];
if (!["cleanup", "notifications"].includes(task)) throw new Error("Choose cleanup or notifications");
const secret = process.env.CHAT_CRON_SECRET;
if (!secret || secret.length < 32) throw new Error("Missing cron configuration");
const origin = new URL(process.env.CHAT_ORIGIN ?? "invalid:");
if ((origin.protocol !== "https:" && !(origin.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname))) || origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) throw new Error("Invalid cron origin");
try {
  const response = await fetch(new URL(task === "cleanup" ? "/api/chat/cleanup/" : "/api/chat/maintenance/",origin),{
    method:"POST",headers:{Authorization:`Bearer ${secret}`},redirect:"error",signal:AbortSignal.timeout(85000),
  });
  if (!response.ok) { console.error(JSON.stringify({task,status:response.status}));process.exitCode=1; }
  else {
    const result=await response.json();
    const allowed=["requestId","skipped","retentionEnabled","sessions","leads","synced","moreWork","counters","authTokens","authSessions","uncertainUsage","processed","sent","pending","failed","uncertain"];
    console.log(JSON.stringify(Object.fromEntries(Object.entries(result).filter(([key])=>allowed.includes(key)))));
  }
} catch { console.error(JSON.stringify({task,error:"MAINTENANCE_REQUEST_FAILED"}));process.exitCode=1; }
