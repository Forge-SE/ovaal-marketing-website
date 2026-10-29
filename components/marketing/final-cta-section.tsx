"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";

import { CtaPattern } from "./cta-pattern";
import { HoverFill } from "./hover-fill";
import { TransitionLink } from "./page-transition";

export function FinalCtaSection() {
  const reduceMotion = useReducedMotion();
  const patternRef = useRef<HTMLDivElement>(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [buttonFocused, setButtonFocused] = useState(false);
  const [patternHovered, setPatternHovered] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 170, damping: 30 });
  const y = useSpring(pointerY, { stiffness: 170, damping: 30 });
  const active = buttonHovered || buttonFocused || patternHovered;

  function resetPointer() {
    setPatternHovered(false);
    pointerX.set(0);
    pointerY.set(0);
  }

  function movePattern(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || reduceMotion) return;
    const bounds = patternRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    if (!inside) { resetPointer(); return; }
    setPatternHovered(true);
    pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 24);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 16);
  }
  return (
    <section aria-labelledby="final-cta-heading" className="bg-background text-secondary-foreground">
      <div onPointerMove={movePattern} onPointerLeave={resetPointer} className="relative isolate w-full overflow-hidden rounded-t-[2rem] bg-primary-foreground">

        <motion.div aria-hidden="true" initial={false} animate={{ opacity: active ? .18 : 0, scale: active && !reduceMotion ? 1.15 : 1 }} transition={{ duration: reduceMotion ? 0 : .5, ease: [.2, 0, 0, 1] }} className="pointer-events-none absolute inset-x-0 -bottom-1/2 h-full origin-bottom bg-[radial-gradient(ellipse_at_bottom_right,var(--primary),transparent_65%)]" />
        <div ref={patternRef} data-cta-pattern data-active={active} className="pointer-events-none absolute -right-14 -bottom-10 w-[450px] text-primary opacity-20 md:-right-6 md:-bottom-6 md:w-[52%] md:opacity-100"><motion.div style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}><CtaPattern active={active} reduceMotion={!!reduceMotion} /></motion.div></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : .1 } } }} className="relative z-10 px-7 py-8 sm:px-12 sm:py-8 lg:w-[68%] lg:px-16 lg:py-8">
          <motion.h2 id="final-cta-heading" variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 12 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .5, ease: [.2, 0, 0, 1] } } }} className="max-w-[24ch] text-[clamp(1.9rem,3vw,3.15rem)] leading-[1.14] font-medium tracking-[-.052em] text-balance">Ready to grow your restaurant by serving every guest better?</motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 12 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .5, ease: [.2, 0, 0, 1] } } }} className="mt-4 max-w-[36rem] font-subtext text-sm leading-[1.7] text-white/75 sm:text-base">Join the Ovaal beta and help shape the restaurant platform we’re building, starting in Ghana.</motion.p>
          <motion.div onPointerEnter={(event) => { if (event.pointerType !== "touch") setButtonHovered(true); }} onPointerLeave={() => setButtonHovered(false)} onFocus={() => setButtonFocused(true)} onBlur={() => setButtonFocused(false)} variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 12 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .5, ease: [.2, 0, 0, 1] } } }} className="mt-6 w-fit">
            <TransitionLink href="/beta" className="group relative isolate inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold text-primary-foreground transition-[color,scale] duration-150 hover:text-primary active:scale-[.96] focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><HoverFill color="dark" /><span className="relative z-10">Join the beta</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 size-5"><path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></TransitionLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
