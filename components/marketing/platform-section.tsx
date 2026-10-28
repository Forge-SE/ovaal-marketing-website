"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const platformCards = [
  {
    title: "Grow with confidence.",
    description:
      "Daily numbers, clear recommendations and tighter control of stock and cash, so you start each day knowing how yesterday went and what to do next.",
  },
  {
    title: "Make every visit smoother.",
    description:
      "Faster ordering, a kitchen that stays in sync, payment the way your guests prefer to pay, and cash orders that keep flowing when the network drops. Soon, guests will be able to order for themselves too. Well-served guests come back, and repeat guests are how restaurants grow.",
  },
  {
    title: "Run a tighter operation.",
    description:
      "Shifts, staff roles and stock that tracks itself, so your team spends less time guessing and more time with guests.",
  },
];

export function PlatformSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsVisible = useInView(cardsRef, { amount: 0.15 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="platform-heading"
      className="relative z-30 -mt-[100svh] min-h-svh bg-white px-6 py-24 text-primary-foreground motion-reduce:mt-0 sm:px-12 sm:py-28 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="max-w-[820px]">
            <h2
              id="platform-heading"
              className="max-w-[27ch] text-[clamp(1.9rem,3vw,3.15rem)] leading-[1.14] font-medium tracking-[-0.052em] text-balance"
            >
              One platform to grow your restaurant, from the first order to the next visit.
            </h2>
            <p className="mt-6 max-w-[40rem] font-subtext text-[clamp(0.9rem,1.05vw,0.98rem)] leading-[1.6] text-primary-foreground/75 sm:mt-7">
              Ovaal is a restaurant platform, not just a point of sale. It starts with the
              tools your team uses every service and grows into every moment a guest has
              with your restaurant.
            </p>
          </div>
          <button
            type="button"
            disabled
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border border-primary-foreground px-7 py-3 text-sm font-semibold text-primary-foreground lg:mt-2"
          >
            Join the beta
          </button>
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-5 sm:mt-20 md:grid-cols-3 lg:mt-24 lg:gap-6">
          {platformCards.map((card, index) => (
            <div key={card.title} className="grid min-h-[360px]">
              <AnimatePresence initial={false}>
                {cardsVisible && (
                  <motion.article
                    key="card"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.42,
                      delay: reduceMotion ? 0 : index * 0.1,
                      ease: [0.2, 0, 0, 1],
                    }}
                    className="h-full rounded-[2rem] bg-[#f7f7f5] p-7 sm:p-8"
                  >
                    <h3 className="text-[clamp(1.45rem,1.8vw,1.8rem)] leading-[1.2] font-medium tracking-[-0.04em] text-primary-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-5 font-subtext text-[0.95rem] leading-[1.65] text-primary-foreground/75">
                      {card.description}
                    </p>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
