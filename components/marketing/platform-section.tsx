"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { TransitionLink as Link } from "@/components/marketing/page-transition";
import { PlatformIllustration } from "@/components/marketing/platform-illustration";
import { HoverFill } from "@/components/marketing/hover-fill";

const platformCards = [
  {
    kind: "numbers",
    title: "Grow with confidence.",
    description:
      "Daily numbers, clear recommendations and tighter control of stock and cash, so you start each day knowing how yesterday went and what to do next.",
  },
  {
    kind: "service",
    title: "Make every visit smoother.",
    description:
      "Faster ordering, a kitchen that stays in sync and payments guests prefer. Cash orders keep flowing when the network drops. Soon, guests can order for themselves too. Well-served guests come back, and repeat guests grow your restaurant.",
  },
  {
    kind: "operations",
    title: "Run a tighter operation.",
    description:
      "Shifts, staff roles and stock that tracks itself, so your team spends less time guessing and more time with guests.",
  },
] as const;

export function PlatformSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsVisible = useInView(cardsRef, { amount: 0.15 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="product"
      aria-labelledby="platform-heading"
      className="relative z-30 -mt-[100svh] min-h-svh scroll-mt-28 bg-white px-6 py-24 text-primary-foreground motion-reduce:mt-0 sm:px-12 sm:py-28 lg:px-20 lg:py-32"
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
          <Link
            href="/beta"
            className="group relative isolate inline-flex min-h-12 shrink-0 items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-semibold text-primary-foreground transition-[color,scale] duration-150 hover:text-primary active:scale-[0.96] focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground lg:mt-2"
          >
            <HoverFill color="dark" base="white" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-primary-foreground transition-opacity duration-150 group-hover:opacity-0 group-focus-visible:opacity-0" />
            <span className="relative z-10">Join the beta</span>
          </Link>
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-5 sm:mt-20 md:grid-cols-2 lg:mt-24 lg:gap-6 xl:grid-cols-3">
          {platformCards.map((card, index) => (
            <div key={card.title} className="grid min-h-[470px] sm:min-h-[430px]">
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
                    className="group relative h-full overflow-hidden rounded-[2rem] bg-primary p-7 text-primary-foreground transition-[background-color,color] duration-300 hover:bg-primary-foreground hover:text-primary sm:p-8"
                  >
                    <h3 className="relative z-10 text-[clamp(1.45rem,1.8vw,1.8rem)] leading-[1.2] font-medium tracking-[-0.04em]">
                      {card.title}
                    </h3>
                    <p className="relative z-10 mt-5 max-w-[39ch] font-subtext text-[0.95rem] leading-[1.65] opacity-80">
                      {card.description}
                    </p>
                    <div className="pointer-events-none absolute right-0 bottom-0 h-[36%] w-[78%] sm:h-[42%] sm:w-[72%]">
                      <PlatformIllustration kind={card.kind} />
                    </div>
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
