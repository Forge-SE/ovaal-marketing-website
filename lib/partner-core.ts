export async function postPartner(path: "claim" | "apply", body: Record<string, unknown>) {
  const base = process.env.POS_CORE_URL?.replace(/\/$/, "");
  const secret = process.env.PARTNER_INTAKE_SECRET;
  if (!base || !secret) {
    return Response.json(
      { error: "Partner applications are temporarily unavailable. Please email hello@ovaal.xyz." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  const response = await fetch(`${base}/partner/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-partner-intake-secret": secret,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20000),
    cache: "no-store",
  });
  const result = await response.json().catch(() => ({ error: "We couldn’t reach Ovaal just now." }));
  return Response.json(result, { status: response.status, headers: { "Cache-Control": "no-store" } });
}
