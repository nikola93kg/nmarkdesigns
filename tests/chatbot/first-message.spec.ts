import { expect, test } from "@playwright/test";
import { chatCopy } from "@/content/chatbot/copy";
import { CHAT_CONSENT_VERSION } from "@/lib/chatbot/contracts";
const reply = [{type:"delta",text:"Fixture reply"},{type:"done",messageId:"fixture",status:"completed"}].map(event=>`data: ${JSON.stringify(event)}\n\n`).join("");

for (const locale of ["sr","en"] as const) {
  test(`${locale} first send records consent once, then sends the message`, async ({ page }) => {
    test.skip(process.env.CHAT_POLICY_DRAFT_TEST === "true");
    const copy=chatCopy[locale]; let sessions=0; const calls:string[]=[];
    let allowSession=()=>{}; const gate=new Promise<void>(resolve=>{allowSession=resolve});
    await page.route("**/api/chat/session/",async route=>{
      if(route.request().method()==="GET")return route.fulfill({status:401,json:{code:"SESSION_EXPIRED"}});
      sessions++; calls.push("session");
      expect(route.request().postDataJSON()).toEqual({locale,consent:true,consentVersion:CHAT_CONSENT_VERSION});
      await gate;await route.fulfill({status:201,json:{sessionId:"fixture"}});
    });
    await page.route("**/api/chat/",async route=>{calls.push("message");expect(route.request().postDataJSON().message).toBe("Website question");await route.fulfill({contentType:"text/event-stream",body:reply})});
    try {
      await page.goto(`/${locale}/`);await page.locator('[data-consent-banner] button').nth(1).click();await page.getByRole("button",{name:copy.open}).click();
      const panel=page.getByRole("dialog",{name:"NMark Assistant"});
      await expect(panel.getByLabel(copy.input)).toBeEnabled();
      await expect(panel.getByText(copy.firstMessageConsent,{exact:false})).toBeVisible();
      expect(calls).toEqual([]);
      await panel.getByLabel(copy.input).fill("Website question");expect(calls).toEqual([]);
      await panel.getByLabel(copy.input).press("Enter");await page.keyboard.press("Enter");
      await expect.poll(()=>sessions).toBe(1);expect(calls).toEqual(["session"]);
      allowSession();
      await expect(panel.getByRole("log")).toContainText("Fixture reply");
      expect(calls).toEqual(["session","message"]);await expect(panel.locator("article")).toHaveCount(2);
      await expect(panel.getByLabel(copy.input)).toHaveValue("");
      await panel.getByRole("button",{name:copy.restart}).click();
      await expect(panel.getByText(copy.firstMessageConsent,{exact:false})).toBeVisible();
      expect(sessions).toBe(1);await expect(panel.locator("article")).toHaveCount(0);
    } finally {allowSession()}
  });
}

test("failed consent session retains the draft and retry does not duplicate the first message",async({page})=>{
  test.skip(process.env.CHAT_POLICY_DRAFT_TEST === "true");
  const copy=chatCopy.sr;let sessions=0,messages=0;
  await page.route("**/api/chat/session/",async route=>{
    if(route.request().method()==="GET")return route.fulfill({status:401,json:{}});
    sessions++;await route.fulfill(sessions===1?{status:503,json:{code:"UNAVAILABLE"}}:{status:201,json:{}});
  });
  await page.route("**/api/chat/",async route=>{messages++;await route.fulfill({contentType:"text/event-stream",body:reply})});
  await page.goto("/sr/");await page.locator('[data-consent-banner] button').nth(1).click();await page.getByRole("button",{name:copy.open}).click();
  const panel=page.getByRole("dialog",{name:"NMark Assistant"});
  await panel.getByLabel(copy.input).fill("My retained draft");await panel.getByRole("button",{name:copy.send,exact:true}).click();
  await expect(panel.getByRole("alert")).toContainText(copy.errors.UNAVAILABLE);
  await expect(panel.getByLabel(copy.input)).toHaveValue("My retained draft");expect(messages).toBe(0);await expect(panel.locator("article")).toHaveCount(0);
  await panel.getByRole("button",{name:copy.retry}).click();await expect(panel.getByRole("log")).toContainText("Fixture reply");
  expect(sessions).toBe(2);expect(messages).toBe(1);await expect(panel.locator("article")).toHaveCount(2);
});

test("draft policy keeps message submission blocked without creating a session",async({page},testInfo)=>{
  test.skip(process.env.CHAT_POLICY_DRAFT_TEST !== "true");
  const calls:string[]=[];page.on("request",request=>{if(request.url().includes("/api/chat"))calls.push(request.method())});
  await page.setViewportSize({width:375,height:850});await page.goto("/sr/");await page.locator('[data-consent-banner] button').nth(1).click();await page.getByRole("button",{name:chatCopy.sr.open}).click();
  const panel=page.getByRole("dialog",{name:"NMark Assistant"});await expect(panel.getByLabel(chatCopy.sr.input)).toBeEnabled();
  await panel.getByLabel(chatCopy.sr.input).fill("Local draft only");await expect(panel.getByRole("button",{name:chatCopy.sr.send,exact:true})).toBeDisabled();
  await panel.getByLabel(chatCopy.sr.input).press("Enter");await expect(panel.getByLabel(chatCopy.sr.input)).toHaveValue("Local draft only");
  await expect(panel.getByRole("link",{name:chatCopy.sr.privacy,exact:true})).toHaveAttribute("href","/sr/politika-privatnosti/");
  expect(calls).toEqual([]);await page.screenshot({path:testInfo.outputPath("draft-policy.png")});
});
