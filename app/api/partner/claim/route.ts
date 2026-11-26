import { postPartner } from "@/lib/partner-core";

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  const payload = await readJson(request);
  if (payload instanceof Response) return payload;
  const code = typeof payload.code === "string" ? payload.code : "";
  return postPartner("claim", { code });
}

function guard(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Please submit from the Ovaal website." }, { status: 403 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const previous = attempts.get(ip);
  const attempt = previous && previous.resetAt > now ? previous : { count: 0, resetAt: now + 10 * 60 * 1000 };
  if (attempt.count >= 10) {
    return Response.json({ error: "Too many attempts. Please try again in a few minutes." }, { status: 429 });
  }
  attempt.count += 1;
  attempts.set(ip, attempt);
  return null;
}

async function readJson(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Invalid submission." }, { status: 415 });
  }
  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error();
    return payload as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid submission." }, { status: 400 });
  }
}
