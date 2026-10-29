"use client";

import { animate, motion, useInView, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { HoverFill } from "./hover-fill";

const audiences = [
  { title: "Independent restaurants and cafés", description: "keep service smooth for guests and see your stock, costs and sales clearly.", image: "/restaurant-service.webp", alt: "A café team member serving guests at the counter" },
  { title: "Local eateries and canteens", description: "take orders fast, count cash honestly and cut mistakes at peak hours.", image: "/audiences/local-eateries.webp", alt: "A local eatery with food ready at the serving counter" },
  { title: "Bars and lounges", description: "keep shifts, voids and discounts under control without slowing the bar.", image: "/audiences/bars-lounges.webp", alt: "A bar counter with taps, glasses and bottles ready for service" },
  { title: "Delivery and pickup kitchens", description: "capture clean orders and keep the kitchen board ahead of the rush.", image: "/audiences/delivery-kitchens.webp", alt: "A chef preparing food in a restaurant kitchen" },
  { title: "Growing restaurant brands", description: "refine the guest experience across every channel on one platform, and later across locations.", image: "/audiences/restaurant-brands.webp", alt: "A restaurant dining space with a long service counter and guest seating" },
];

function subscribeToMotionPreference(update: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", update);
  return () => preference.removeEventListener("change", update);
}

function motionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AudienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const selectorsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(sectionRef, { amount: .2 });
  const reduceMotion = useSyncExternalStore(subscribeToMotionPreference, motionPreference, () => true);
  const [selection, setSelection] = useState({ index: 0, cycle: 0 });
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const progress = useMotionValue(0);
  const playbackRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", update);
    update();
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (paused || hovering || !pageVisible || !inView || reduceMotion) return;
    const playback = animate(progress, 1, {
      duration: Math.max(0, (1 - progress.get()) * 6), ease: "linear",
      onComplete: () => {
        progress.set(0);
        setSelection(current => ({ index: (current.index + 1) % audiences.length, cycle: current.cycle + 1 }));
      },
    });
    playbackRef.current = playback;
    return () => playback.stop();
  }, [selection, paused, hovering, pageVisible, inView, reduceMotion, progress]);

  useEffect(() => {
    const row = selectorsRef.current;
    const tab = tabRefs.current[selection.index];
    if (!row || !tab) return;
    const rowBounds = row.getBoundingClientRect();
    const tabBounds = tab.getBoundingClientRect();
    if (tabBounds.left < rowBounds.left || tabBounds.right > rowBounds.right) {
      row.scrollTo({ left: row.scrollLeft + tabBounds.left - rowBounds.left - (row.clientWidth - tab.clientWidth) / 2, behavior: reduceMotion ? "instant" : "smooth" });
    }
  }, [selection.index, reduceMotion]);

  const select = (index: number) => {
    playbackRef.current?.stop();
    progress.set(0);
    setSelection(current => ({ index, cycle: current.cycle + 1 }));
  };

  return (
    <section ref={sectionRef} id="who-its-for" aria-labelledby="audience-heading" className="relative isolate overflow-hidden bg-primary px-6 py-24 text-primary-foreground sm:px-12 sm:py-28 lg:px-20 lg:py-32">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-[44rem] text-center">
          <h2 id="audience-heading" className="text-[clamp(1.9rem,3vw,3.15rem)] leading-[1.14] font-medium tracking-[-.052em] text-balance">However you serve, there’s room to grow.</h2>
          <p className="mx-auto mt-6 max-w-[35rem] font-subtext text-[clamp(.9rem,1.05vw,.98rem)] leading-[1.6] text-primary-foreground/70">Different restaurants. Different rhythms. One platform to help your team serve every guest better.</p>
        </div>

        <div ref={selectorsRef} role="tablist" aria-label="Restaurant types" className="mt-12 flex gap-5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:mt-14 sm:gap-7 [&::-webkit-scrollbar]:hidden">
          {audiences.map((item, index) => (
            <button ref={element => { tabRefs.current[index] = element; }} key={item.title} id={`audience-tab-${index}`} type="button" role="tab" aria-selected={selection.index === index} aria-controls="audience-panel" tabIndex={selection.index === index ? 0 : -1} onFocus={event => { if (event.currentTarget.matches(":focus-visible")) setPaused(true); }} onClick={() => select(index)} onKeyDown={event => {
              let next: number | undefined;
              if (event.key === "ArrowRight") next = (index + 1) % audiences.length;
              if (event.key === "ArrowLeft") next = (index - 1 + audiences.length) % audiences.length;
              if (event.key === "Home") next = 0;
              if (event.key === "End") next = audiences.length - 1;
              if (next !== undefined) { event.preventDefault(); setPaused(true); select(next); tabRefs.current[next]?.focus({ preventScroll: true }); }
            }} className={`relative flex min-h-20 min-w-[170px] flex-1 flex-col justify-between gap-5 rounded-sm px-1 text-left text-sm leading-[1.45] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-foreground lg:min-w-0 ${selection.index === index ? "text-primary-foreground" : "text-primary-foreground/55 hover:text-primary-foreground"}`}>
              <span className="max-w-[22ch]">{item.title}</span>
              <span aria-hidden="true" className="relative block h-0.5 w-full overflow-hidden rounded-full bg-primary-foreground/15">{selection.index === index && <motion.span className="absolute inset-0 origin-left rounded-full bg-primary-foreground" style={{ scaleX: reduceMotion ? 1 : progress }} />}</span>
            </button>
          ))}
        </div>

        <div id="audience-panel" role="tabpanel" aria-labelledby={`audience-tab-${selection.index}`} tabIndex={0} onPointerEnter={event => { if (event.pointerType === "mouse") setHovering(true); }} onPointerLeave={() => setHovering(false)} className="relative mt-8 h-[390px] w-full overflow-hidden rounded-[2rem] bg-black outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:mt-10 sm:h-auto sm:aspect-[16/9] lg:aspect-[16/7.5]">
          {audiences.map((audience, index) => (
            <motion.div key={audience.image} aria-hidden={selection.index !== index} initial={false} animate={{ opacity: selection.index === index ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : .6, ease: [.2, 0, 0, 1] }} className="absolute inset-0 text-white">
              <Image src={audience.image} alt={audience.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1536px) 90vw, 1440px" className="object-cover object-center" />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0_/_0.8)_0%,rgb(0_0_0_/_0.2)_45%,transparent_75%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
                <h3 className="text-xl leading-[1.2] font-medium tracking-[-.025em] sm:text-2xl lg:text-3xl">{audience.title}</h3>
                <p className="mt-3 max-w-[42rem] font-subtext text-sm leading-[1.65] text-white/85 sm:text-base">{audience.description}</p>
              </div>
            </motion.div>
          ))}
          {!reduceMotion && <button type="button" aria-label={paused ? "Play restaurant slideshow" : "Pause restaurant slideshow"} aria-pressed={paused} onClick={() => { if (paused) setHovering(false); setPaused(value => !value); }} className="group absolute top-4 right-4 z-10 flex size-11 items-center justify-center overflow-hidden rounded-full text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:top-6 sm:right-6"><HoverFill color="lime" /><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 size-5">{paused ? <path d="m8 5 11 7-11 7V5Z" strokeLinecap="round" strokeLinejoin="round" /> : <path d="M9 5v14M15 5v14" strokeLinecap="round" strokeWidth="2.5" />}</svg></button>}
        </div>
      </div>
    </section>
  );
}
