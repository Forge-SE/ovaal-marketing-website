import type { InferType } from "yup";
import type { betaSchema } from "../components/beta/beta-schema";

export const betaContactProperties = ["beta_full_name", "beta_phone", "beta_restaurant", "beta_role", "beta_restaurant_type", "beta_location", "beta_branches"];
export const betaAudienceId = process.env.RESEND_AUDIENCE_ID || "150ae7b0-d139-4741-b900-5ec8d8326f79";

export class ResendError extends Error {
  status: number;
  constructor(status: number) { super("Resend could not accept the request."); this.status = status; }
}

/** No credentials or provider response bodies are exposed to the client or logs. */
export async function resendRequest(apiKey: string, path: string, method: string, body?: unknown, request: typeof fetch = fetch) {
  const response = await request(`https://api.resend.com${path}`, {
    method,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
  if (!response.ok) throw new ResendError(response.status);
  return response.json();
}

export async function saveBetaContact(apiKey: string, values: InferType<typeof betaSchema>, request: typeof fetch = fetch, audienceId = betaAudienceId) {
  const email = values.email.trim().toLowerCase();
  const [firstName, ...rest] = values.fullName.trim().split(/\s+/);
  const fields = {
    first_name: firstName,
    last_name: rest.join(" "),
    properties: {
      beta_full_name: values.fullName,
      beta_phone: values.phone,
      beta_restaurant: values.restaurantName,
      beta_role: values.role,
      beta_restaurant_type: values.restaurantType,
      beta_location: values.location,
      beta_branches: values.branches === undefined ? "" : String(values.branches),
    },
  };
  let created = false;
  try {
    // Update first so existing broadcast preferences are never overwritten.
    await resendRequest(apiKey, `/contacts/${encodeURIComponent(email)}`, "PATCH", fields, request);
  } catch (error) {
    if (!(error instanceof ResendError) || error.status !== 404) throw error;
    try {
      // A beta enquiry is not consent to unrelated marketing broadcasts.
      await resendRequest(apiKey, "/contacts", "POST", { email, ...fields, unsubscribed: true, segments: [{ id: audienceId }] }, request);
      created = true;
    } catch (createError) {
      if (!(createError instanceof ResendError) || createError.status !== 409) throw createError;
      // Another request may have created the contact since the first update.
      await resendRequest(apiKey, `/contacts/${encodeURIComponent(email)}`, "PATCH", fields, request);
    }
  }
  if (!created) {
    // Audiences are now Segments. Existing contacts must also join the beta list.
    try {
      await resendRequest(apiKey, `/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(audienceId)}`, "POST", undefined, request);
    } catch (error) {
      if (!(error instanceof ResendError) || error.status !== 409) throw error;
    }
  }
}
