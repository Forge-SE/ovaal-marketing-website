"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { HoverFill } from "@/components/marketing/hover-fill";

export function BetaSuccess({ onEdit }: { onEdit: () => void }) {
  const reduceMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { headingRef.current?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} className="py-12">
      <div className="mb-10 w-full max-w-[360px] overflow-hidden rounded-[2rem] bg-primary text-primary-foreground">
        <svg aria-hidden="true" viewBox="0 0 360 240" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full">
          <circle cx="280" cy="220" r="150" fill="currentColor" fillOpacity=".09" stroke="none" />
          <motion.g initial={{ y: reduceMotion ? 0 : 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .1, duration: .5 }}>
            <g transform="rotate(-9 160 130)">
              <rect x="85" y="38" width="156" height="220" rx="14" fill="currentColor" fillOpacity=".12" />
              <path d="M110 75h68m-68 22h106m-106 24h80m-80 24h106m-106 24h48" />
            </g>
          </motion.g>
          <motion.g initial={{ scale: reduceMotion ? 1 : .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .3, duration: .4, ease: [.2, 0, 0, 1] }} style={{ transformOrigin: "247px 164px" }}>
            <circle cx="247" cy="164" r="53" fill="var(--primary)" />
            <circle cx="247" cy="164" r="45" fill="currentColor" fillOpacity=".1" stroke="none" />
            <motion.path d="m223 164 16 16 32-34" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: .55, duration: reduceMotion ? 0 : .4 }} strokeWidth="4" />
          </motion.g>
        </svg>
      </div>
      <h1 ref={headingRef} tabIndex={-1} className="text-4xl leading-[1.1] tracking-[-.045em] outline-none sm:text-5xl">You’re ready for what’s next.</h1>
      <p className="mt-5 max-w-md font-subtext leading-relaxed text-primary-foreground/70">Thank you. We’ll be in touch shortly to talk about bringing Ovaal to your restaurant.</p>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Link href="/" className="group relative isolate inline-flex min-h-12 items-center overflow-hidden rounded-full px-7 py-3 text-sm font-semibold hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"><HoverFill color="dark" /><span className="relative z-10">Back to Ovaal</span></Link>
        <button type="button" onClick={onEdit} className="rounded-full px-3 py-2 text-sm underline underline-offset-4 focus-visible:outline-2">Edit details</button>
      </div>
    </motion.div>
  );
}
