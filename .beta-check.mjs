import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const target = (await fetch("http://127.0.0.1:9226/json/list").then((r) => r.json()))
  .find((item) => item.type === "page" && item.url.includes("localhost:3000"));
if (!target) throw new Error("Local page target not found");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
let nextId = 1;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  if (!data.id || !pending.has(data.id)) return;
  const callback = pending.get(data.id);
  pending.delete(data.id);
  data.error ? callback.reject(data.error) : callback.resolve(data.result);
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++;
  pending.set(id, { resolve, reject });
  socket.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => (await send("Runtime.evaluate", {
  expression, returnByValue: true, awaitPromise: true,
})).result.value;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const screenshot = async (name) => {
  const result = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await writeFile(join(process.env.TEMP, name), Buffer.from(result.data, "base64"));
};

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: "http://localhost:3000/beta" });
await sleep(4000);
console.log("page", await evaluate("({title:document.title,text:document.body.innerText.slice(0,1800),overflow:document.documentElement.scrollWidth>innerWidth})"));
await screenshot("ovaal-beta-desktop.png");
await evaluate("document.querySelector('button[type=submit]')?.click()");
await sleep(500);
console.log("errors", await evaluate("Array.from(document.querySelectorAll('[id$=error]')).map(x=>x.textContent)"));
for (const [id,value] of Object.entries({fullName:"Test Owner",email:"owner@example.com",phone:"+233240000000",restaurantName:"Test Restaurant",location:"Accra, Ghana",branches:"2"})) {
  await evaluate(`(()=>{const el=document.getElementById('${id}');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,'${value}');el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));el.dispatchEvent(new FocusEvent('focusout',{bubbles:true}));})()`);
}
for (const id of ["role","restaurantType"]) {
  await evaluate(`document.getElementById('${id}').click()`);
  await sleep(300);
  console.log(id, await evaluate("Array.from(document.querySelectorAll('[role=option]')).map(x=>x.textContent)"));
  await evaluate("document.querySelector('[role=option]')?.click()");
  await sleep(200);
}
await evaluate("document.querySelector('button[type=submit]').click()");
await sleep(1200);
console.log("submitted", await evaluate("({text:document.body.innerText,focus:document.activeElement?.textContent})"));
await screenshot("ovaal-beta-success.png");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await send("Page.navigate", { url: "http://localhost:3000/beta" });
await sleep(1800);
console.log("mobile", await evaluate("({width:innerWidth,scroll:document.documentElement.scrollWidth,inputs:document.querySelectorAll('input').length})"));
await screenshot("ovaal-beta-mobile.png");
socket.close();