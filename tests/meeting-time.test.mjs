import assert from "node:assert/strict";
import test from "node:test";
import { accraToday, calendarDays, isPastMeetingTime, meetingTimeOptions, moveCalendarMonth, parseMeetingDate } from "../lib/meeting-time.ts";

test("meeting dates use Accra's UTC calendar day and reject invalid dates", () => {
  assert.equal(accraToday(new Date("2026-10-29T23:55:00Z")), "2026-10-29");
  assert.equal(parseMeetingDate("2026-02-30"), null);
  assert.equal(parseMeetingDate("2028-02-29")?.toISOString(), "2028-02-29T00:00:00.000Z");
  assert.equal(parseMeetingDate("29/10/2026"), null);
});

test("month navigation preserves dates across year and leap-year boundaries", () => {
  assert.equal(moveCalendarMonth(new Date("2026-01-31T00:00:00Z"), 1).toISOString().slice(0, 10), "2026-02-28");
  assert.equal(moveCalendarMonth(new Date("2028-01-31T00:00:00Z"), 1).toISOString().slice(0, 10), "2028-02-29");
  assert.equal(moveCalendarMonth(new Date("2026-12-01T00:00:00Z"), 1).toISOString().slice(0, 10), "2027-01-01");
});

test("the calendar includes a complete Monday-first view across month boundaries", () => {
  const days = calendarDays(new Date("2026-11-15T00:00:00Z"));
  assert.equal(days.length, 42);
  assert.equal(days[0].toISOString().slice(0, 10), "2026-10-26");
  assert.equal(days[41].toISOString().slice(0, 10), "2026-12-06");
  assert.equal(new Set(days.map(day => day.getTime())).size, 42);
});

test("time choices distinguish noon and midnight and reject elapsed times", () => {
  assert.equal(meetingTimeOptions.length, 48);
  assert.deepEqual(meetingTimeOptions[0], { value: "00:00", label: "12:00 AM" });
  assert.deepEqual(meetingTimeOptions[24], { value: "12:00", label: "12:00 PM" });
  const now = new Date("2026-10-29T14:15:00Z");
  assert.equal(isPastMeetingTime("2026-10-29", "14:00", now), true);
  assert.equal(isPastMeetingTime("2026-10-29", "14:30", now), false);
  assert.equal(isPastMeetingTime("2026-10-30", "09:00", now), false);
});
