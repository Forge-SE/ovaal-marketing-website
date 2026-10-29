"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { features } from "./feature-data";
import { FeaturePreview } from "./feature-previews";
import { HoverFill } from "./hover-fill";
import { TransitionLink } from "./page-transition";

export function FeaturesSection() {
  const reduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ first: 1, last: 3, previous: false, next: true, active: 0, stops: [0] });

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const update = () => {
      const bounds = carousel.getBoundingClientRect();
      const visible = Array.from(carousel.children).flatMap((child, index) => {
        const rect = child.getBoundingClientRect();
        const overlap = Math.min(rect.right, bounds.right) - Math.max(rect.left, bounds.left);
        return overlap > rect.width / 2 ? [index + 1] : [];
      });
      const first = carousel.firstElementChild;
      const step = (first?.getBoundingClientRect().width ?? 1) + parseFloat(getComputedStyle(carousel).columnGap);
      const maximum = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
      const stops = Array.from({ length: Math.max(1, Math.ceil((maximum - 2) / step) + 1) }, (_, index) => Math.min(index * step, maximum));
      const active = stops.reduce((nearest, stop, index) => Math.abs(stop - carousel.scrollLeft) < Math.abs(stops[nearest] - carousel.scrollLeft) ? index : nearest, 0);
      setPosition({ first: visible[0] ?? 1, last: visible.at(-1) ?? 1, previous: carousel.scrollLeft > 2, next: carousel.scrollLeft < maximum - 2, active, stops });
    };
    const observer = new ResizeObserver(update);
    observer.observe(carousel);
    carousel.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); carousel.removeEventListener("scroll", update); };
  }, []);

  const move = (direction: number) => {
    const carousel = carouselRef.current;
    const first = carousel?.firstElementChild as HTMLElement | null;
    if (!carousel || !first) return;
    const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).columnGap);
    const index = Math.round(carousel.scrollLeft / step) + direction;
    carousel.scrollTo({ left: index * step, behavior: reduceMotion ? "instant" : "smooth" });
  };

  return (
    <section id="features" aria-labelledby="features-heading" className="relative scroll-mt-28 bg-white px-6 py-24 text-primary-foreground sm:px-12 sm:py-28 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:gap-16">
          <div className="max-w-[820px]">
            <h2 id="features-heading" className="max-w-[25ch] text-[clamp(1.9rem,3vw,3.15rem)] leading-[1.14] font-medium tracking-[-.052em] text-balance">Everything you need to serve better and grow.</h2>
            <p className="mt-6 max-w-[40rem] font-subtext text-[clamp(.9rem,1.05vw,.98rem)] leading-[1.6] text-primary-foreground/75">From your first order to your closing cash count, the tools to keep your team in step and your restaurant moving forward.</p>
          </div>
          <TransitionLink href="/beta" className="group relative isolate inline-flex min-h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold transition-[color,scale] duration-150 hover:text-primary active:scale-[.96] focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground lg:mt-2">
            <HoverFill color="dark" base="white" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-primary-foreground transition-opacity duration-150 group-hover:opacity-0 group-focus-visible:opacity-0" />
            <span className="relative z-10">Join the beta</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 size-[18px]"><path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </TransitionLink>
        </div>

        <div ref={carouselRef} id="feature-carousel" role="region" aria-roledescription="carousel" aria-label="Restaurant platform features" tabIndex={0} onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
          if (event.key === "Home" || event.key === "End") { event.preventDefault(); event.currentTarget.scrollTo({ left: event.key === "Home" ? 0 : event.currentTarget.scrollWidth, behavior: reduceMotion ? "instant" : "smooth" }); }
        }} className="mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto sm:gap-4 overscroll-x-contain rounded-[2rem] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground sm:mt-16 [&::-webkit-scrollbar]:hidden">
          {features.map((feature, index) => (
            <motion.article key={feature.kind} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${features.length}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduceMotion ? 0 : .45, delay: reduceMotion ? 0 : (index % 3) * .08, ease: [.2, 0, 0, 1] }} className="group flex min-h-[530px] min-w-0 shrink-0 basis-[calc(100%-2rem)] snap-start flex-col overflow-hidden rounded-[2rem] bg-neutral-50 pt-8 pb-4 sm:basis-[calc(100%-3rem)] sm:pt-9 md:basis-[calc((100%-1rem)/2)] xl:basis-[calc((100%-2rem)/3)]">
              <div className="px-7 sm:px-8">
                <h3 className="max-w-[30ch] text-[1.3rem] leading-[1.25] font-medium tracking-[-.035em] sm:text-[1.4rem]">{feature.title}</h3>
                {"points" in feature ? <ul className="mt-4 space-y-2 font-subtext text-sm leading-[1.65] text-primary-foreground/65">{feature.points.map(point => <li key={point.label}><strong className="font-medium text-primary-foreground">{point.label}</strong> {point.text}</li>)}</ul> : <p className="mt-4 font-subtext text-sm leading-[1.65] text-primary-foreground/65">{feature.description}</p>}
              </div>
              <div className="mt-auto pt-7"><FeaturePreview kind={feature.kind} /></div>
            </motion.article>
          ))}
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-4">
          <p aria-live="polite" aria-atomic="true" className="sr-only">Showing features {position.first} through {position.last} of {features.length}.</p>
          <div role="group" aria-label="Choose carousel position" className="flex items-center">
            {position.stops.map((stop, index) => <button key={index} type="button" aria-label={`Go to feature position ${index + 1}`} aria-current={position.active === index ? "true" : undefined} aria-controls="feature-carousel" onClick={() => carouselRef.current?.scrollTo({ left: stop, behavior: reduceMotion ? "instant" : "smooth" })} className="group flex h-11 w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-primary-foreground"><span aria-hidden="true" className="relative size-2.5 overflow-hidden rounded-full"><HoverFill color="dark" active={position.active === index} /></span></button>)}
          </div>
          <div className="flex gap-2">
            {([{ direction: -1, label: "Previous features", disabled: !position.previous }, { direction: 1, label: "Next features", disabled: !position.next }]).map(control => <button key={control.direction} type="button" aria-label={control.label} aria-controls="feature-carousel" disabled={control.disabled} onClick={() => move(control.direction)} className="group relative isolate flex size-11 items-center justify-center overflow-hidden rounded-full text-primary-foreground transition-[color,scale,opacity] duration-150 hover:text-primary active:scale-[.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground disabled:pointer-events-none disabled:opacity-30"><HoverFill color="dark" /><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`relative z-10 size-5 ${control.direction === -1 ? "rotate-180" : ""}`}><path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>)}
          </div>
        </div>

      </div>
    </section>
  );
}
