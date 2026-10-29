"use client";

import { Combobox } from "@base-ui/react/combobox";
import { useEffect, useRef, useState } from "react";

type Place = { label: string; name: string; detail: string };
type SearchResult = { query: string; locations: Place[]; failed: boolean };

export function LocationPicker({ value, onChange, onBlur, error, className }: {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  className: string;
}) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [retry, setRetry] = useState(0);
  const [result, setResult] = useState<SearchResult>({ query: "", locations: [], failed: false });
  const cache = useRef(new Map<string, Place[]>());
  const search = query.trim().replace(/\s+/g, " ");
  const selected = !!value && query === value;
  const ready = search.length >= 3 && !selected;
  const current = result.query === search;
  const loading = ready && !current;
  const failed = ready && current && result.failed;
  const locations = ready && current && !result.failed ? result.locations : [];
  const items = selected ? [value] : locations.map(place => place.label);

  useEffect(() => {
    if (!ready || !open) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      const cached = cache.current.get(search);
      if (cached) { setResult({ query: search, locations: cached, failed: false }); return; }
      try {
        const response = await fetch(`/api/locations?q=${encodeURIComponent(search)}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Search unavailable");
        const data: { locations: Place[] } = await response.json();
        if (controller.signal.aborted) return;
        if (cache.current.size >= 20) cache.current.delete(cache.current.keys().next().value!);
        cache.current.set(search, data.locations);
        setResult({ query: search, locations: data.locations, failed: false });
      } catch {
        if (!controller.signal.aborted) setResult({ query: search, locations: [], failed: true });
      }
    }, 450);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [search, ready, open, retry]);

  const status = selected ? "" : search.length < 3 ? "Type at least 3 characters to search." : loading ? "Searching locations…" : failed ? "Couldn’t load locations. Please try again." : locations.length === 0 ? "No locations found. Try a nearby city or add the country." : `${locations.length} locations found.`;

  return <div>
    <label htmlFor="location" className="mb-2 block text-sm font-medium">Location</label>
    <Combobox.Root items={items} filter={null} value={value || null} inputValue={query} open={open} onOpenChange={setOpen} autoComplete="off"
      onInputValueChange={(next, details) => {
        setQuery(next);
        if (["input-change", "input-clear", "clear-press"].includes(details.reason) && next !== value) onChange("");
      }}
      onValueChange={(next) => {
        onChange(next ?? "");
        setQuery(next ?? "");
      }}>
      <Combobox.Input id="location" placeholder="Search city or area" maxLength={100} onBlur={onBlur} aria-required="true" aria-invalid={!!error} aria-describedby={error ? "location-error location-source" : "location-source"} className={className} />
      <Combobox.Portal><Combobox.Positioner sideOffset={8} className="z-50 max-w-[calc(100vw-2rem)] outline-none"><Combobox.Popup className="w-[var(--anchor-width)] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl bg-white p-2 text-primary-foreground outline outline-primary-foreground/10">
        <Combobox.List className="max-h-[min(260px,var(--available-height))] overflow-y-auto overscroll-contain">
          {(label: string) => {
            const place = locations.find(item => item.label === label);
            return <Combobox.Item key={label} value={label} className="flex cursor-default items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm outline-none data-highlighted:bg-primary/25">
              <span className="min-w-0"><span className="block font-medium">{place?.name ?? label}</span>{place?.detail && <span className="mt-0.5 block font-subtext text-xs leading-relaxed text-primary-foreground/60">{place.detail}</span>}</span>
              <Combobox.ItemIndicator className="shrink-0"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4"><path d="m4.5 12.75 6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" /></svg></Combobox.ItemIndicator>
            </Combobox.Item>;
          }}
        </Combobox.List>
        {items.length === 0 && <div className="px-3 py-3 font-subtext text-xs leading-relaxed text-primary-foreground/65">{status}{failed && <button type="button" onClick={() => { setResult({ query: "", locations: [], failed: false }); setRetry(count => count + 1); }} className="mt-3 block rounded-full bg-primary px-4 py-2 font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2">Try again</button>}</div>}
      </Combobox.Popup></Combobox.Positioner></Combobox.Portal>
    </Combobox.Root>
    <span role="status" aria-live="polite" className="sr-only">{open ? status : ""}</span>
    {error && <p id="location-error" className="mt-2 text-xs text-red-700">{error}</p>}
    <p id="location-source" className="mt-2 font-subtext text-[10px] leading-relaxed text-primary-foreground/55">Search by <a href="https://photon.komoot.io" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Photon</a> · © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">OpenStreetMap contributors</a></p>
  </div>;
}
