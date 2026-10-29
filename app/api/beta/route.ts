import { ValidationError } from "yup";
import { betaSchema } from "@/components/beta/beta-schema";
import { saveBetaContact } from "@/lib/resend-beta";

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "Please submit from the Ovaal website." }, { status: 403, headers });
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "Invalid submission." }, { status: 415, headers });
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > 8192) return Response.json({ error: "Submission is too large." }, { status: 413, headers });
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(raw);
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error();
  } catch {
    return Response.json({ error: "Invalid submission." }, { status: 400, headers });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const previous = attempts.get(ip);
  const attempt = previous && previous.resetAt > now ? previous : { count: 0, resetAt: now + 10 * 60 * 1000 };
  if (attempt.count >= 10) return Response.json({ error: "Too many attempts. Please try again in a few minutes." }, { status: 429, headers: { ...headers, "Retry-After": String(Math.ceil((attempt.resetAt - now) / 1000)) } });
  attempt.count++;
  if (attempts.size >= 1000) attempts.delete(attempts.keys().next().value!);
  attempts.set(ip, attempt);

  let values;
  try {
    values = await betaSchema.validate(payload, { abortEarly: false, stripUnknown: true });
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;
    const fields = Object.fromEntries(error.inner.filter(issue => issue.path).map(issue => [issue.path!, issue.message]));
    return Response.json({ error: "Please check the highlighted fields.", fields }, { status: 400, headers });
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ error: "Signup is temporarily unavailable. Please email hello@ovaal.xyz or try again later." }, { status: 503, headers });
  try {
    await saveBetaContact(apiKey, values);
    return Response.json({ ok: true }, { status: 201, headers });
  } catch {
    return Response.json({ error: "We couldn’t save your signup. Your details are still here—please try again, or email hello@ovaal.xyz." }, { status: 503, headers });
  }
}
