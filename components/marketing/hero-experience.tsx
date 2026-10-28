"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const imageSrc = "/restaurant-service.webp";

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[18px]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

function PhotoSceneCopy() {
  return (
    <div className="max-w-[48rem] text-left text-white">
      <h2 className="max-w-[25ch] text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.12] font-medium tracking-[-0.045em] text-balance">
        Your whole restaurant, working together.
      </h2>
      <p className="mt-5 max-w-[44rem] font-subtext text-base leading-relaxed text-white/90 sm:mt-7 sm:text-lg">
        From the first order to the closing cash count, Ovaal keeps your front of house,
        your kitchen and your numbers in step, so fewer things slip through the gaps and
        you can give your attention to your guests.
      </p>
      <button
        type="button"
        disabled
        className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground sm:mt-8"
      >
        Request A Demo
        <ArrowRightIcon />
      </button>
    </div>
  );
}

type ImageBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
  viewportWidth: number;
  viewportHeight: number;
};

function ExpandingImage({
  bounds,
  scrollYProgress,
}: {
  bounds: ImageBounds;
  scrollYProgress: MotionValue<number>;
}) {
  const zoom = useTransform(scrollYProgress, [0.02, 0.25], [0, 1]);
  const left = useTransform(zoom, [0, 1], [bounds.left, 0]);
  const top = useTransform(zoom, [0, 1], [bounds.top, 0]);
  const width = useTransform(zoom, [0, 1], [bounds.width, bounds.viewportWidth]);
  const height = useTransform(zoom, [0, 1], [bounds.height, bounds.viewportHeight]);
  const borderRadius = useTransform(zoom, [0, 1], ["24px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.01, 0.025], [0, 0, 1]);
  const shadeOpacity = useTransform(scrollYProgress, [0.25, 0.29], [0, 0.59]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute z-10 overflow-hidden outline-1 -outline-offset-1 outline-white/15"
      style={{ left, top, width, height, borderRadius, opacity }}
    >
      <Image src={imageSrc} alt="" fill sizes="100vw" className="object-cover object-center" />
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: shadeOpacity }} />
    </motion.div>
  );
}

export function HeroExperience() {
  const sequenceRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement>(null);
  const imageAnchorRef = useRef<HTMLSpanElement>(null);
  const [imageBounds, setImageBounds] = useState<ImageBounds | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0.05, 0.2], [1, 0]);
  const inlineOpacity = useTransform(scrollYProgress, [0, 0.01, 0.025], [1, 1, 0]);
  const sceneOpacity = useTransform(scrollYProgress, [0.28, 0.34, 0.68, 0.74], [0, 1, 1, 0]);
  const sceneBlur = useTransform(scrollYProgress, [0.28, 0.34, 0.68, 0.74], ["blur(16px)", "blur(0px)", "blur(0px)", "blur(16px)"]);
  const sceneY = useTransform(scrollYProgress, [0.28, 0.34, 0.68, 0.74], [24, 0, 0, -12]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const anchor = imageAnchorRef.current;
    if (!viewport || !anchor) return;

    let active = true;
    const measure = () => {
      if (!active) return;
      const viewportRect = viewport.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();

      setImageBounds({
        left: anchorRect.left - viewportRect.left,
        top: anchorRect.top - viewportRect.top,
        width: anchorRect.width,
        height: anchorRect.height,
        viewportWidth: viewportRect.width,
        viewportHeight: viewportRect.height,
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(anchor);
    window.addEventListener("resize", measure);
    document.fonts.ready.then(measure);
    measure();

    return () => {
      active = false;
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      ref={sequenceRef}
      className="relative h-[450svh] bg-secondary motion-reduce:h-auto"
    >
      <section
        ref={viewportRef}
        aria-labelledby="hero-title"
        className="sticky top-0 h-svh overflow-hidden bg-secondary text-secondary-foreground motion-reduce:relative motion-reduce:h-auto motion-reduce:min-h-svh"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(112deg,transparent_8%,rgb(185_227_101_/_0.13)_30%,transparent_47%),linear-gradient(68deg,transparent_43%,rgb(185_227_101_/_0.09)_65%,transparent_82%)] [mask-image:linear-gradient(to_top,black,transparent)]"
        />
        <motion.div
          style={{ opacity: reduceMotion ? 1 : heroOpacity }}
          className="relative z-0 grid h-full min-h-svh w-full min-w-0 grid-rows-[auto_1fr] px-5 py-6 sm:px-10 sm:py-8 lg:px-20 lg:py-10"
        >
          <div className="flex items-center">
            <span className="inline-flex items-center gap-3 text-[1.6rem] leading-none font-semibold tracking-[-0.065em] sm:text-[1.9rem]">
              <Image
                src="/pwa-192x192.png"
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-xl"
              />
              Ovaal
            </span>
          </div>

          <div className="flex w-full min-w-0 flex-col items-center justify-center py-7 text-center">
            <h1
              id="hero-title"
              className="mx-auto max-w-[19ch] text-[clamp(2.75rem,5.4vw,5.3rem)] leading-[1.1] font-medium tracking-[-0.055em] text-balance max-[640px]:max-w-full max-[640px]:text-[clamp(2.15rem,8.5vw,3.25rem)]"
            >
              Grow your restaurant{" "}
              <span
                ref={imageAnchorRef}
                className="relative inline-block h-[1.14em] w-[1.9em] align-[-0.27em]"
              >
                <motion.span
                  style={{ opacity: reduceMotion || !imageBounds ? 1 : inlineOpacity }}
                  className="absolute inset-0 overflow-hidden rounded-3xl outline-1 -outline-offset-1 outline-white/15"
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    preload
                    sizes="(max-width: 640px) 160px, 250px"
                    className="object-cover object-center"
                  />
                </motion.span>
              </span>{" "}
              by serving every guest better.
            </h1>
            <p className="mt-6 max-w-[42rem] font-subtext text-[clamp(0.98rem,1.35vw,1.12rem)] leading-[1.55] text-secondary-foreground/85 sm:mt-8">
              Ovaal puts orders, kitchen, payments, stock and insight on one platform,
              so guests get a smoother experience and you get the numbers to grow.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-9">
              <button
                type="button"
                disabled
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Join the beta
              </button>
              <a
                href="#how-it-works"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white bg-white px-6 py-3 text-sm font-semibold text-secondary transition-[background-color,scale] duration-150 hover:bg-secondary-foreground active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                See how it works
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        </motion.div>

        {imageBounds && !reduceMotion && (
          <ExpandingImage
            key={Object.values(imageBounds).join(":")}
            bounds={imageBounds}
            scrollYProgress={scrollYProgress}
          />
        )}

        {!reduceMotion && (
          <motion.div
            style={{ opacity: sceneOpacity, filter: sceneBlur, y: sceneY }}
            className="pointer-events-none absolute inset-0 z-20 flex items-end px-6 pb-12 sm:px-12 sm:pb-16 lg:px-20 lg:pb-20 [&_button]:pointer-events-auto"
          >
            <PhotoSceneCopy />
          </motion.div>
        )}

      </section>

      <div
        id="how-it-works"
        aria-hidden="true"
        className="absolute top-[125svh] h-px w-px motion-reduce:relative motion-reduce:top-auto"
      />

      <section
        aria-label="Restaurant guest experience"
        className="relative hidden h-svh items-end overflow-hidden px-6 pb-12 text-white motion-reduce:flex sm:px-12 sm:pb-16 lg:px-20 lg:pb-20"
      >
        <Image
          src={imageSrc}
          alt="A restaurant team serving guests at the counter"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <PhotoSceneCopy />
        </div>
      </section>
    </div>
  );
}
