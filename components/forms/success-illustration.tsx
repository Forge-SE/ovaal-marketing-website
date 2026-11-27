"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SuccessIllustration() {
  const reduceMotion = useReducedMotion();

  return (
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
  );
}
