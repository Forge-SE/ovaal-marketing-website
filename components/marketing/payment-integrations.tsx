"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HoverFill } from "./hover-fill";

const integrations = [
  { name: "Paystack", image: "/integrations/paystack.svg", url: "https://paystack.com", width: 612, height: 602 },
];

export function PaymentIntegrations() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setScrollable(track.scrollWidth > track.clientWidth + 2);
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="payment-integrations-heading" className="bg-white px-6 pb-24 text-primary-foreground sm:px-12 sm:pb-28 lg:px-20 lg:pb-32">
      <div className="mx-auto max-w-[1000px]">
        <h2 id="payment-integrations-heading" className="text-center text-lg font-medium tracking-[-.025em] sm:text-xl">Supported payment integrations</h2>
        <ul ref={trackRef} aria-label="Supported payment providers" className={`mt-7 flex snap-x snap-mandatory items-center gap-8 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${scrollable ? "justify-start" : "justify-center"}`}>
          {integrations.map(integration => <motion.li key={integration.name} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : .4, ease: [.2, 0, 0, 1] }} className="shrink-0 snap-center"><a href={integration.url} target="_blank" rel="noopener noreferrer" aria-label={`${integration.name} — opens in a new tab`} className="flex h-24 w-60 flex-col items-center justify-center gap-3 rounded-2xl px-6 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary-foreground"><Image src={integration.image} alt={integration.name} width={integration.width} height={integration.height} className="size-9 shrink-0" /><span aria-hidden="true" className="text-[10px] leading-none text-primary-foreground/55">{integration.name}</span></a></motion.li>)}
        </ul>
        {scrollable && <div aria-label="Payment integration carousel controls" className="mt-4 flex justify-center gap-2">{[-1, 1].map(direction => <button key={direction} type="button" aria-label={direction < 0 ? "Previous payment integrations" : "Next payment integrations"} onClick={() => trackRef.current?.scrollBy({ left: direction * 272, behavior: reduceMotion ? "instant" : "smooth" })} className="group relative isolate flex size-11 items-center justify-center overflow-hidden rounded-full hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"><HoverFill color="dark" /><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`relative z-10 size-5 ${direction < 0 ? "rotate-180" : ""}`}><path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>)}</div>}
      </div>
    </section>
  );
}
