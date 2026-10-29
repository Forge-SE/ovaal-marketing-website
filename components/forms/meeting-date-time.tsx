"use client";

import { Select } from "@base-ui/react/select";
import { isPastMeetingTime, meetingTimeOptions } from "@/lib/meeting-time";
import { DatePicker } from "./date-picker";

export function MeetingDateTime({ date, time, onDateChange, onTimeChange, onDateBlur, onTimeBlur, dateError, timeError }: {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onDateBlur: () => void;
  onTimeBlur: () => void;
  dateError?: string;
  timeError?: string;
}) {
  return <fieldset>
    <legend className="mb-2 text-sm font-medium">When works for you? <span className="ml-2 font-normal text-primary-foreground/45">Optional</span></legend>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <DatePicker id="call-date" value={date} onChange={onDateChange} onBlur={onDateBlur} error={dateError} />
      <div className="min-w-0">
        <Select.Root value={time || null} onValueChange={value => onTimeChange(value ?? "")} onOpenChange={open => { if (!open) onTimeBlur(); }} items={meetingTimeOptions}>
          <Select.Trigger id="call-time" aria-label="Preferred time" aria-invalid={!!timeError} aria-describedby={timeError ? "call-time-error call-timezone" : "call-timezone"} className="flex min-h-12 w-full items-center justify-between gap-3 rounded-full border border-primary-foreground/15 bg-white px-5 py-3 text-left text-sm outline-none transition-colors hover:bg-primary/10 focus-visible:border-primary-foreground focus-visible:ring-2 focus-visible:ring-primary/60 aria-invalid:border-red-700">
            <Select.Value placeholder="Choose time" className="data-placeholder:text-primary-foreground/45" />
            <Select.Icon><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5"><path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" /></svg></Select.Icon>
          </Select.Trigger>
          <Select.Portal><Select.Positioner align="start" sideOffset={8} alignItemWithTrigger={false} className="z-[90] outline-none"><Select.Popup className="max-h-[min(280px,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto overscroll-contain rounded-2xl bg-white p-2 text-primary-foreground outline outline-primary-foreground/10"><Select.List>{meetingTimeOptions.map(option => <Select.Item key={option.value} value={option.value} disabled={!!date && isPastMeetingTime(date, option.value)} className="flex cursor-default items-center justify-between gap-4 rounded-xl px-3 py-3 text-sm outline-none data-highlighted:bg-primary/25 data-disabled:opacity-30"><Select.ItemText>{option.label}</Select.ItemText><Select.ItemIndicator><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4"><path d="m4.5 12.75 6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" /></svg></Select.ItemIndicator></Select.Item>)}</Select.List></Select.Popup></Select.Positioner></Select.Portal>
        </Select.Root>
        {timeError && <p id="call-time-error" className="mt-2 text-xs text-red-700">{timeError}</p>}
      </div>
    </div>
    <p id="call-timezone" className="mt-2 font-subtext text-xs text-primary-foreground/55">Accra time (GMT). Your preferred time is subject to confirmation.</p>
  </fieldset>;
}
