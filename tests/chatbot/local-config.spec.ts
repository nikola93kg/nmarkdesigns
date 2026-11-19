import { expect, test } from "@playwright/test";

test("local notice requires explicit development opt-in and never replaces a production policy",async()=>{
  test.skip(!process.env.NODE_OPTIONS?.includes("--conditions=react-server"),"Run with React server condition; no database/provider required.");
  const env=process.env as Record<string,string|undefined>;
  const keys=["NODE_ENV","CHAT_LOCAL_TEST","CHAT_ORIGIN","CHAT_PRIVACY_URL_SR","CHAT_PRIVACY_URL_EN"];
  const original=Object.fromEntries(keys.map(key=>[key,env[key]]));
  try{
    const {localTestOrigin,privacyUrl}=await import("@/lib/chatbot/config");
    Object.assign(env,{NODE_ENV:"development",CHAT_LOCAL_TEST:"true",CHAT_ORIGIN:"http://localhost:3000"});
    delete env.CHAT_PRIVACY_URL_SR;delete env.CHAT_PRIVACY_URL_EN;
    expect(localTestOrigin()).toBe("http://localhost:3000");
    expect(privacyUrl("sr")).toBe("http://localhost:3000/api/chat/local-notice/?locale=sr");
    expect(privacyUrl("en")).toContain("locale=en");
    env.CHAT_LOCAL_TEST="false";expect(localTestOrigin()).toBeNull();expect(privacyUrl("sr")).toBeNull();
    env.CHAT_LOCAL_TEST="true";
    for(const origin of ["http://nmarkdesigns.com","https://nmarkdesigns.com","http://localhost.evil.example:3000","http://user:password@localhost:3000","http://localhost:3000/other"]){env.CHAT_ORIGIN=origin;expect(localTestOrigin()).toBeNull()}
    env.CHAT_ORIGIN="http://localhost:3000";env.NODE_ENV="production";
    expect(localTestOrigin()).toBeNull();expect(privacyUrl("sr")).toBeNull();
    env.CHAT_PRIVACY_URL_SR="https://nmarkdesigns.com/sr/approved-policy/";expect(privacyUrl("sr")).toBe(env.CHAT_PRIVACY_URL_SR);
  }finally{for(const key of keys){if(original[key]===undefined)delete env[key];else env[key]=original[key]}}
});
