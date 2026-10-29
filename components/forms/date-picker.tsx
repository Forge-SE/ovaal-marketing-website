"use client";

import { Popover } from "@base-ui/react/popover";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { accraToday, calendarDays, moveCalendarMonth, parseMeetingDate } from "@/lib/meeting-time";

const format = (date: Date, options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "Africa/Accra" }).format(date);

export function DatePicker({ id, value, onChange, onBlur, error }: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
}) {
  const today = accraToday();
  const selected = parseMeetingDate(value);
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => selected ?? parseMeetingDate(today)!);
  const [focused, setFocused] = useState(value || today);
  const grid = useRef<HTMLDivElement>(null);
  const monthId = useId();
  const days = calendarDays(month);
  const monthStart = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1));
  const previousDisabled = monthStart.toISOString().slice(0, 7) <= today.slice(0, 7);

  function choose(date: string) {
    onChange(date);
    onBlur();
    setOpen(false);
  }

  function focusDate(date: Date) {
    const next = date.toISOString().slice(0, 10) < today ? parseMeetingDate(today)! : date;
    const key = next.toISOString().slice(0, 10);
    setFocused(key);
    setMonth(next);
    requestAnimationFrame(() => grid.current?.querySelector<HTMLButtonElement>(`[data-date="${key}"]`)?.focus());
  }

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, date: Date) {
    const next = new Date(date);
    const offsets: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (event.key in offsets) next.setUTCDate(next.getUTCDate() + offsets[event.key]);
    else if (event.key === "Home") next.setUTCDate(next.getUTCDate() - (next.getUTCDay() + 6) % 7);
    else if (event.key === "End") next.setUTCDate(next.getUTCDate() + 6 - (next.getUTCDay() + 6) % 7);
    else if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      focusDate(moveCalendarMonth(date, event.key === "PageUp" ? -1 : 1));
      return;
    } else return;
    event.preventDefault();
    focusDate(next);
  }

  function changeMonth(amount: number) {
    const next = moveCalendarMonth(monthStart, amount);
    const key = next.toISOString().slice(0, 10) < today ? today : next.toISOString().slice(0, 10);
    setMonth(next);
    setFocused(key);
  }

  return <div className="min-w-0">
    <Popover.Root open={open} onOpenChange={next => {
      if (next) { const initial = selected && value >= today ? value : today; setMonth(parseMeetingDate(initial)!); setFocused(initial); }
      else onBlur();
      setOpen(next);
    }}>
      <Popover.Trigger id={id} aria-label="Preferred date" aria-invalid={!!error} aria-describedby={error ? `${id}-error call-timezone` : "call-timezone"} className="flex min-h-12 w-full items-center justify-between gap-3 rounded-full border border-primary-foreground/15 bg-white px-5 py-3 text-left text-sm outline-none transition-colors hover:bg-primary/10 focus-visible:border-primary-foreground focus-visible:ring-2 focus-visible:ring-primary/60 aria-invalid:border-red-700">
        <span className={`truncate ${selected ? "" : "text-primary-foreground/45"}`}>{selected ? format(selected, { day: "numeric", month: "short", year: "numeric" }) : "Choose date"}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5 shrink-0"><path d="M6.75 3v2.25m10.5-2.25v2.25M3.75 9h16.5M5.25 5.25h13.5a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </Popover.Trigger>
      <Popover.Portal><Popover.Positioner align="start" sideOffset={8} collisionPadding={16} className="z-[90] outline-none"><Popover.Popup initialFocus={() => grid.current?.querySelector<HTMLButtonElement>(`[data-date="${focused}"]`) ?? true} className="w-[min(304px,calc(100vw-2rem))] max-h-[var(--available-height)] overflow-y-auto rounded-3xl bg-white p-4 text-primary-foreground outline outline-primary-foreground/10 transition-[opacity,scale] duration-150 data-starting-style:scale-[.98] data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none">
        <div className="mb-3 flex items-center justify-between gap-2">
          <button type="button" aria-label="Previous month" disabled={previousDisabled} onClick={() => changeMonth(-1)} className="flex size-9 items-center justify-center rounded-full outline-none transition-colors hover:bg-primary/25 active:scale-[.96] focus-visible:ring-2 focus-visible:ring-primary-foreground disabled:opacity-25"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4"><path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          <p id={monthId} aria-live="polite" className="text-sm font-medium">{format(month, { month: "long", year: "numeric" })}</p>
          <button type="button" aria-label="Next month" onClick={() => changeMonth(1)} className="flex size-9 items-center justify-center rounded-full outline-none transition-colors hover:bg-primary/25 active:scale-[.96] focus-visible:ring-2 focus-visible:ring-primary-foreground"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4"><path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        </div>
        <div ref={grid} role="grid" aria-labelledby={monthId}>
          <div role="row" className="grid grid-cols-7">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => <span key={day} role="columnheader" className="py-2 text-center font-subtext text-[10px] text-primary-foreground/45">{day}</span>)}</div>
          {Array.from({ length: 6 }, (_, row) => <div key={row} role="row" className="grid grid-cols-7 gap-y-1">{days.slice(row * 7, row * 7 + 7).map(date => {
            const key = date.toISOString().slice(0, 10);
            return <button key={key} type="button" role="gridcell" data-date={key} tabIndex={focused === key ? 0 : -1} disabled={key < today} aria-selected={key === value} aria-current={key === today ? "date" : undefined} aria-label={format(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} onFocus={() => setFocused(key)} onKeyDown={event => handleKey(event, date)} onClick={() => choose(key)} className={`mx-auto flex size-9 items-center justify-center rounded-full text-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-1 disabled:opacity-20 ${key === value ? "bg-primary-foreground text-primary" : `hover:bg-primary/30 ${date.getUTCMonth() === month.getUTCMonth() ? "" : "text-primary-foreground/40"} ${key === today ? "bg-primary/20 font-semibold" : ""}`}`}>{date.getUTCDate()}</button>;
          })}</div>)}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-primary-foreground/5 pt-3 text-xs"><button type="button" onClick={() => choose(today)} className="rounded-full px-3 py-2 font-medium hover:bg-primary/25 focus-visible:outline-2">Today</button>{value && <button type="button" onClick={() => choose("")} className="rounded-full px-3 py-2 text-primary-foreground/60 hover:text-primary-foreground focus-visible:outline-2">Clear date</button>}</div>
      </Popover.Popup></Popover.Positioner></Popover.Portal>
    </Popover.Root>
    {error && <p id={`${id}-error`} className="mt-2 text-xs text-red-700">{error}</p>}
  </div>;
}
