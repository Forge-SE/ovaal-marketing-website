"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function LockedRoadmapWind() {
  const windRef = useRef<HTMLDivElement>(null);
  const visible = useInView(windRef, { amount: .15 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={windRef} aria-hidden="true" data-roadmap-wind className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
      {visible && !reduceMotion && (
        <div className="absolute -inset-x-1/4 -inset-y-1/3 rotate-[-18deg]">
        <motion.div initial={{ x: "-50%" }} animate={{ x: "0%" }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-y-0 left-0 w-[200%]">
          <svg viewBox="0 0 2200 600" preserveAspectRatio="none" fill="none" stroke="var(--primary)" className="size-full blur-[9px]">
            {[0, 1100].map(offset => (
              <g key={offset} transform={`translate(${offset} 0)`}>
                <path d="M0 300C180 100 370 100 550 300S920 500 1100 300" strokeWidth="125" strokeOpacity=".18" />
                <path d="M0 220C180 20 370 20 550 220S920 420 1100 220" strokeWidth="60" strokeOpacity=".12" />
                <path d="M0 395C180 195 370 195 550 395S920 595 1100 395" strokeWidth="35" strokeOpacity=".1" />
              </g>
            ))}
          </svg>
        </motion.div>
        </div>
      )}
    </div>
  );
}
