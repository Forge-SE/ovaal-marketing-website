import { postPartner } from "@/lib/partner-core";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Please submit from the Ovaal website." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Invalid submission." }, { status: 415 });
  }
  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error();
    return postPartner("apply", payload as Record<string, unknown>);
  } catch {
    return Response.json({ error: "Invalid submission." }, { status: 400 });
  }
}
