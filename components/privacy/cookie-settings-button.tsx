"use client";

import { consentOpenEvent } from "@/lib/cookie-consent";

export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return <button type="button" onClick={() => window.dispatchEvent(new Event(consentOpenEvent))} className={`rounded-sm text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 ${className}`}>Cookie settings</button>;
}
