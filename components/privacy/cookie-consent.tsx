"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { Switch } from "@base-ui/react/switch";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { consentOpenEvent, getConsentChoice, setConsentChoice, subscribeToConsent, type ConsentChoice } from "@/lib/cookie-consent";
import { HoverFill } from "@/components/marketing/hover-fill";
import { CookieIllustration } from "./cookie-illustration";

export function filterAnalyticsEvent(event: BeforeSendEvent) {
  if (getConsentChoice() !== "analytics" || event.type !== "pageview") return null;
  const url = new URL(event.url);
  url.search = "";
  url.hash = "";
  return { ...event, url: url.toString() };
}

export function CookieConsent() {
  const choice = useSyncExternalStore(subscribeToConsent, getConsentChoice, (): ConsentChoice => "pending");
  const [editing, setEditing] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const reduceMotion = useReducedMotion();
  const previousFocus = useRef<HTMLElement | null>(null);
  const visible = choice === "undecided" || editing;

  useEffect(() => {
    function openSettings() {
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setAnalytics(getConsentChoice() === "analytics");
      setCustomizing(true);
      setEditing(true);
      requestAnimationFrame(() => document.getElementById("cookie-heading")?.focus({ preventScroll: true }));
    }
    window.addEventListener(consentOpenEvent, openSettings);
    return () => window.removeEventListener(consentOpenEvent, openSettings);
  }, []);

  function save(allow: boolean) {
    setConsentChoice(allow);
    setEditing(false);
    setCustomizing(false);
    previousFocus.current?.focus({ preventScroll: true });
  }

  return <>
    {choice === "analytics" && <Analytics beforeSend={filterAnalyticsEvent} />}
    {visible && <motion.section initial={reduceMotion ? false : { opacity: 0, x: 12, y: 16 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: reduceMotion ? 0 : .3, ease: [.2, 0, 0, 1] }} aria-labelledby="cookie-heading" className="fixed right-4 bottom-4 z-[70] max-h-[calc(100svh-2rem)] w-[min(620px,calc(100vw-2rem))] overflow-y-auto rounded-[2rem] bg-primary-foreground p-6 text-secondary-foreground outline outline-white/10 sm:right-6 sm:bottom-6 sm:p-7">
      <div className="flex items-center gap-3">
      <h2 id="cookie-heading" tabIndex={-1} className="min-w-0 flex-1 text-xl font-medium tracking-[-.035em] outline-none">A little choice, before you explore.</h2>
      <div className="-mt-2 -mr-2 w-16 shrink-0 sm:w-20"><CookieIllustration /></div></div>
      <p className="mt-3 font-subtext text-sm leading-relaxed text-white/75">We use a cookie to remember your preferences. Optional Vercel Analytics helps us understand visits without advertising cookies. You choose whether it runs. <Link href="/privacy-policy#cookies" className="rounded-sm text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2">Privacy Policy</Link></p>
      {customizing && <div className="mt-5 space-y-4 rounded-2xl bg-white/5 p-4 text-sm">
        <div className="flex items-center justify-between gap-4"><div><p className="font-medium">Essential preference cookie</p><p className="mt-1 font-subtext text-xs leading-relaxed text-white/65">Remembers your choice for six months.</p></div><span className="shrink-0 text-xs text-primary">Always on</span></div>
        <div className="flex items-center justify-between gap-4"><div><label htmlFor="analytics-consent" className="font-medium">Website analytics</label><p className="mt-1 font-subtext text-xs leading-relaxed text-white/65">Page visits and general device information.</p></div><Switch.Root id="analytics-consent" checked={analytics} onCheckedChange={setAnalytics} className="inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-white/20 p-1 outline-none data-checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><Switch.Thumb className="size-5 rounded-full bg-white transition-transform duration-150 data-checked:translate-x-5 data-checked:bg-primary-foreground motion-reduce:transition-none" /></Switch.Root></div>
      </div>}
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => save(true)} className="group relative isolate min-h-11 overflow-hidden rounded-full px-5 py-3 text-xs font-semibold text-primary-foreground hover:text-primary active:scale-[.96] focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><HoverFill color="dark" /><span className="relative z-10">Accept analytics</span></button>
        <button type="button" onClick={() => save(false)} className="group relative isolate min-h-11 overflow-hidden rounded-full px-5 py-3 text-xs font-semibold text-primary-foreground active:scale-[.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><HoverFill color="lime" /><span className="relative z-10">Essential only</span></button>
        {customizing ? <button type="button" onClick={() => save(analytics)} className="rounded-full px-3 py-2 text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Save preferences</button> : <button type="button" onClick={() => { setAnalytics(choice === "analytics"); setCustomizing(true); }} className="rounded-full px-3 py-2 text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Customize</button>}
      </div>
    </motion.section>}
  </>;
}
