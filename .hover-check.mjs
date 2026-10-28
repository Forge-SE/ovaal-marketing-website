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
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: "http://localhost:3000/" });
await sleep(1500);
for (const [name, selector] of [
  ["hero", "[aria-labelledby=hero-title] button"],
  ["platform", "[aria-labelledby=platform-heading] button"],
]) {
  if (name === "platform") {
    await evaluate("document.getElementById('platform-heading')?.scrollIntoView()");
    await sleep(500);
  }
  const rect = await evaluate(`document.querySelector('${selector}')?.getBoundingClientRect().toJSON()`);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
  await sleep(120);
  console.log(name, "during", await evaluate(`getComputedStyle(document.querySelector('${selector}').querySelector('[aria-hidden=true]')).getPropertyValue('--button-fill')`));
  await sleep(530);
  const styles = await evaluate(`(()=>{const b=document.querySelector('${selector}');const f=b.querySelector('[aria-hidden=true]');const s=getComputedStyle(b);const fs=getComputedStyle(f);return {background:s.backgroundColor,border:s.border,boxShadow:s.boxShadow,fill:fs.getPropertyValue('--button-fill'),gradient:fs.backgroundImage}})()`);
  console.log(name, styles);
  await screenshot(`ovaal-${name}-hover-check.png`);
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: 10, y: 300 });
  await sleep(120);
  console.log(name, "returning", await evaluate(`getComputedStyle(document.querySelector('${selector}').querySelector('[aria-hidden=true]')).getPropertyValue('--button-fill')`));
  await sleep(530);
  console.log(name, "reset", await evaluate(`getComputedStyle(document.querySelector('${selector}').querySelector('[aria-hidden=true]')).getPropertyValue('--button-fill')`));
}
socket.close();
