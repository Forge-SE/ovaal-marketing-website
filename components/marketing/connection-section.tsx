"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const connectionBenefits = {
  online: [
    "Orders reach the kitchen as they’re placed.",
    "Cash and mobile money both work.",
    "Your numbers stay up to date.",
  ],
  offline: [
    "Cash orders keep flowing, saved safely on the device.",
    "Mobile money pauses until you’re back online.",
    "Everything syncs on its own when the connection returns.",
  ],
};

const connectionImage = "/restaurant-service.webp";

function WifiIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
      />
    </svg>
  );
}

function ExpandedCardArrow({
  online,
  reduceMotion,
  onClick,
}: {
  online: boolean;
  reduceMotion: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      aria-label="Show next detail"
      onClick={onClick}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" || event.pointerType === "pen") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
      transition={{ duration: reduceMotion ? 0 : 0.22 }}
      className="absolute top-4 right-4 flex size-11 items-center justify-center overflow-hidden rounded-xl bg-white text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:top-5 sm:right-5"
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scale: hovered ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : hovered ? 0.5 : 0.4, ease: [0.2, 0, 0, 1] }}
        className={`pointer-events-none absolute -top-12 -right-12 size-28 rounded-full ${online ? "bg-primary-foreground" : "bg-primary"}`}
      />
      <svg
        aria-hidden="true"
        className={`relative z-10 size-5 transition-colors duration-300 ${online && hovered ? "text-primary" : "text-primary-foreground"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </motion.button>
  );
}

export function ConnectionSection() {
  const [online, setOnline] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [lightSource, setLightSource] = useState<{
    x: number | string;
    y: number | string;
    diameter: number | string;
  }>({ x: "50%", y: "50%", diameter: "220vmax" });
  const sectionRef = useRef<HTMLElement>(null);
  const wifiIconRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timeout = window.setTimeout(() => {
      setActiveCard((current) => (current + 1) % connectionBenefits.offline.length);
    }, 5_000);
    return () => window.clearTimeout(timeout);
  }, [activeCard, online, reduceMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    const icon = wifiIconRef.current;
    if (!section || !icon) return;

    const measure = () => {
      const sectionBounds = section.getBoundingClientRect();
      const iconBounds = icon.getBoundingClientRect();
      const x = iconBounds.left + iconBounds.width / 2 - sectionBounds.left;
      const y = iconBounds.top + iconBounds.height / 2 - sectionBounds.top;
      const farthestX = Math.max(x, sectionBounds.width - x);
      const farthestY = Math.max(y, sectionBounds.height - y);
      setLightSource({ x, y, diameter: Math.ceil(Math.hypot(farthestX, farthestY) * 2.3) });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(section);
    observer.observe(icon);
    window.addEventListener("resize", measure);
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="connection-heading"
      className="relative isolate min-h-svh overflow-hidden bg-secondary"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: lightSource.x,
          top: lightSource.y,
          width: lightSource.diameter,
          height: lightSource.diameter,
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          className="size-full rounded-full bg-primary [mask-image:radial-gradient(circle,black_0%,black_68%,transparent_100%)]"
          initial={false}
          animate={{ scale: online ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : online ? 1.2 : 0.95, ease: [0.2, 0, 0, 1] }}
        />
      </div>

      <div className={`relative z-10 mx-auto flex min-h-svh w-full max-w-[1360px] flex-col justify-center px-6 py-24 transition-colors duration-700 sm:px-12 lg:px-20 lg:py-32 ${online ? "text-primary-foreground" : "text-white"}`}>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="max-w-[820px]">
            <h2
              id="connection-heading"
              className="max-w-[27ch] text-[clamp(1.9rem,3vw,3.15rem)] leading-[1.14] font-medium tracking-[-0.052em] text-balance"
            >
              When the network drops, service shouldn’t.
            </h2>
            <p className="mt-6 max-w-[40rem] font-subtext text-[clamp(0.9rem,1.05vw,0.98rem)] leading-[1.6] opacity-85 sm:mt-7">
              Ovaal keeps taking cash orders when the connection goes, then syncs them on its
              own when it’s back. Every sale you can still take is a sale you keep.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-label="Wi-Fi connection"
            aria-checked={online}
            onClick={() => {
              setOnline((current) => !current);
              setActiveCard(0);
            }}
            className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full border border-white/30 px-7 py-3 text-sm font-semibold shadow-[inset_0_1px_0_rgb(255_255_255_/_0.24),0_12px_30px_rgb(0_0_0_/_0.12)] backdrop-blur-[32px] transition-[background-color,scale] duration-150 active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current lg:mt-2 ${online ? "bg-white/35" : "bg-white/15 hover:bg-white/25"}`}
          >
            <span ref={wifiIconRef} className="inline-flex size-5 items-center justify-center">
              <WifiIcon className="size-5" />
            </span>
            <span>Wi-Fi</span>
            <span className="font-subtext text-xs font-normal opacity-75">
              {online ? "Online" : "Offline"}
            </span>
            <span
              aria-hidden="true"
              className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors duration-700 ${online ? "bg-primary-foreground" : "bg-white/30"}`}
            >
              <span className={`size-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${online ? "translate-x-5" : "translate-x-0"}`} />
            </span>
          </button>
        </div>

        <div className="mt-14 flex h-[420px] gap-2.5 sm:h-[480px] sm:gap-3 lg:h-[520px]">
          {connectionBenefits[online ? "online" : "offline"].map((benefit, index) => {
            const expanded = activeCard === index;
            return (
              <motion.div
                key={index}
                initial={false}
                animate={{ flexGrow: expanded ? 3.4 : 1 }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 26 }}
                style={{ flexBasis: 0 }}
                className="relative isolate h-full min-w-0 overflow-hidden rounded-[1.75rem] outline-1 -outline-offset-1 outline-white/10"
              >
                <Image
                  src={connectionImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 60vw, 65vw"
                  className="object-cover object-center"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-black/20" />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.38)_42%,transparent_85%)]"
                />
                <AnimatePresence initial={false}>
                  {expanded && (
                    <ExpandedCardArrow
                      key="arrow"
                      online={online}
                      reduceMotion={Boolean(reduceMotion)}
                      onClick={() => setActiveCard((index + 1) % connectionBenefits.offline.length)}
                    />
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.span
                      key={`${online ? "online" : "offline"}-${index}`}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 12, filter: reduceMotion ? "blur(0px)" : "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: reduceMotion ? 0 : 8, filter: reduceMotion ? "blur(0px)" : "blur(6px)" }}
                      transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
                      className="absolute inset-x-0 bottom-0 block max-w-[34ch] p-5 font-subtext text-[clamp(0.95rem,1.4vw,1.2rem)] leading-[1.35] font-medium text-white sm:p-7"
                    >
                      {benefit}
                    </motion.span>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {!expanded && (
                    <motion.button
                      type="button"
                      aria-label={`Expand: ${benefit}`}
                      onClick={() => setActiveCard(index)}
                      initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.2 }}
                      className="absolute right-3 bottom-3 flex size-11 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:bottom-5"
                    >
                      <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
