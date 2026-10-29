type Place = { label: string; name: string; detail: string };
const cache = new Map<string, { expires: number; locations: Place[] }>();

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim().replace(/\s+/g, " ") ?? "";
  if (query.length < 3 || query.length > 100) {
    return Response.json({ error: "Search with 3 to 100 characters." }, { status: 400 });
  }
  const key = query.toLocaleLowerCase("en");
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) {
    return Response.json({ locations: cached.locations });
  }

  const url = new URL("https://photon.komoot.io/api/");
  url.searchParams.set("q", query);
  url.searchParams.set("lang", "en");
  url.searchParams.set("limit", "8");
  for (const layer of ["city", "district", "locality"]) url.searchParams.append("layer", layer);

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(8000)]),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Location provider unavailable");
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("features" in data) || !Array.isArray(data.features)) throw new Error("Invalid location response");
    const locations: Place[] = [];
    const labels = new Set<string>();
    for (const feature of data.features.slice(0, 8)) {
      const properties: Record<string, unknown> | undefined = feature?.properties;
      if (!properties) continue;
      const name = text(properties.name);
      const country = text(properties.country);
      if (!name || !country) continue;
      const parts = [...new Set([name, text(properties.state), country].filter(Boolean))];
      const label = parts.join(", ");
      if (label.length > 200 || labels.has(label)) continue;
      labels.add(label);
      locations.push({ label, name, detail: parts.slice(1).join(", ") });
    }
    // Bounded, short-lived cache avoids repeating common city searches.
    if (cache.size >= 200) cache.delete(cache.keys().next().value!);
    cache.set(key, { expires: Date.now() + 60 * 60 * 1000, locations });
    return Response.json({ locations });
  } catch {
    return Response.json({ error: "Location search is temporarily unavailable. Please try again." }, { status: 503 });
  }
}
