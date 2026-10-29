"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FeatureLineArt } from "./feature-line-art";
import { HoverFill } from "./hover-fill";
import { TransitionLink } from "./page-transition";

export function PricingSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="scroll-mt-28 bg-white px-6 py-24 text-primary-foreground sm:px-12 sm:py-28 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="mb-5 text-xs font-medium tracking-[.14em] text-primary-foreground/50 uppercase">Pricing</p>
          <h2 id="pricing-heading" className="text-[clamp(1.9rem,3vw,3.15rem)] leading-[1.14] font-medium tracking-[-.052em] text-balance">Simple pricing. No cut of your sales.</h2>
          <p className="mx-auto mt-6 max-w-[40rem] font-subtext text-[clamp(.9rem,1.05vw,.98rem)] leading-[1.6] text-primary-foreground/70">Ovaal is a subscription. Your guests’ payments go to your own payment provider account (Paystack, in Ghana), and that provider’s standard fees apply.</p>
        </div>
        <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduceMotion ? 0 : .5, ease: [.2, 0, 0, 1] }} className="mt-14 grid overflow-hidden rounded-[2rem] bg-neutral-50 md:grid-cols-[1.2fr_.8fr]">
          <div className="flex flex-col items-start justify-center px-7 py-10 sm:px-12 sm:py-14 lg:px-16">
            <p className="text-xs font-medium tracking-[.1em] text-primary-foreground/50 uppercase">Founding restaurant offer</p>
            <h3 className="mt-5 max-w-[20ch] text-[clamp(1.6rem,2.3vw,2.35rem)] leading-[1.15] tracking-[-.045em]">Be part of the first service.</h3>
            <p className="mt-5 max-w-md font-subtext text-sm leading-[1.7] text-primary-foreground/65">Plans, pricing and the founding restaurant offer will be shared soon. Join the beta for updates.</p>
            <TransitionLink href="/beta" className="group relative isolate mt-8 inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3 text-sm font-semibold transition-[color,scale] duration-150 hover:text-primary active:scale-[.96] focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"><HoverFill color="dark" /><span className="relative z-10">Join the beta</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 size-5"><path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></TransitionLink>
          </div>
          <div className="flex flex-col justify-center bg-primary/20 px-7 py-9 sm:px-12">
            <div className="flex items-center justify-between gap-4"><div><p className="text-[clamp(4.5rem,7vw,7rem)] leading-none font-medium tracking-[-.07em]">0%</p><p className="mt-3 font-subtext text-sm">Ovaal transaction fees</p></div><FeatureLineArt kind="receipt" className="w-[100px] shrink-0 sm:w-[130px]" /></div>
            <ul className="mt-8 space-y-3 font-subtext text-sm text-primary-foreground/70">
              {["One subscription for your restaurant.", "Payments to your own provider account.", "Only your payment provider’s standard fees."].map(point => <li key={point} className="flex items-start gap-3"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="mt-0.5 size-4 shrink-0 text-primary-foreground"><path d="m4.5 12.75 6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span>{point}</span></li>)}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
