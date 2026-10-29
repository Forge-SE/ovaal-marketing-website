import { betaAudienceId, betaContactProperties, resendRequest } from "../lib/resend-beta.ts";

const key = process.env.RESEND_API_KEY;
if (!key) throw new Error("Set RESEND_API_KEY in .env.local before running setup.");
await resendRequest(key, `/segments/${encodeURIComponent(betaAudienceId)}`, "GET");
await new Promise(resolve => setTimeout(resolve, 650));
const existing = await resendRequest(key, "/contact-properties", "GET");
const properties = new Set((existing.data ?? []).map(property => property.key));
for (const name of betaContactProperties) {
  if (properties.has(name)) continue;
  await new Promise(resolve => setTimeout(resolve, 650));
  try {
    await resendRequest(key, "/contact-properties", "POST", { key: name, type: "string", fallback_value: "" });
  } catch (error) {
    if (error.status !== 409) throw error;
  }
  console.log(`Ready: ${name}`);
}
console.log("Resend beta contact properties are ready. No contacts were created or emails sent.");
