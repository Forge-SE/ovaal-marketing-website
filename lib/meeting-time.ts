export function accraToday(now = new Date()) {
  return now.toISOString().slice(0, 10);
}

export function parseMeetingDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
}

export function moveCalendarMonth(date: Date, amount: number) {
  const first = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1));
  const lastDay = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  first.setUTCDate(Math.min(date.getUTCDate(), lastDay));
  return first;
}

export function calendarDays(month: Date) {
  const start = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1));
  start.setUTCDate(1 - (start.getUTCDay() + 6) % 7);
  return Array.from({ length: 42 }, (_, index) => new Date(start.getTime() + index * 86400000));
}

export function isPastMeetingTime(date: string, time: string, now = new Date()) {
  if (!parseMeetingDate(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return false;
  return new Date(`${date}T${time}:00Z`).getTime() <= now.getTime();
}

export const meetingTimeOptions = Array.from({ length: 48 }, (_, index) => {
  const hours = Math.floor(index / 2);
  const minutes = index % 2 ? "30" : "00";
  return { value: `${String(hours).padStart(2, "0")}:${minutes}`, label: `${hours % 12 || 12}:${minutes} ${hours < 12 ? "AM" : "PM"}` };
});
