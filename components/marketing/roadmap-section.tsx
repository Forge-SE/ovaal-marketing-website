"use client";

import { Dialog } from "@base-ui/react/dialog";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { CallDialogContent } from "./call-dialog";
import { HoverFill } from "./hover-fill";
import { LockedRoadmapWind } from "./locked-roadmap-wind";

const milestones = [
  { date: "2026", title: "Order-ready SMS and full sales export", description: "Guests hear the moment their order is ready, and you can export your full sales for your accountant." },
  { date: "2026", title: "Dish margin reports and customer book", description: "See what each dish earns and remember your regulars, with their consent." },
  { date: "2026", title: "AI phone assistant", description: "Answers calls and takes orders, so your team isn’t overwhelmed at peak hours." },
  { date: "November 2026", title: "Beta program opens", description: "Ovaal goes live with our first restaurants in Ghana: ordering, kitchen, payments, stock, insights and offline cash orders." },
];
const lockedGroups = [
  { year: "2026", items: [{ date: "December 2026", title: "Locked" }] },
  { year: "2027", items: [{ title: "Guest experience" }, { title: "Growth" }, { title: "Operations" }] },
  { year: "2028", items: [{ title: "Reach" }, { title: "Platform" }, { title: "Intelligence" }] },
  { year: "Beyond", items: [{ title: "The big one" }] },
];

function Lock({ className = "size-4" }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M16.5 10.5V6a4.5 4.5 0 0 0-9 0v4.5m-.75 0h10.5a2.25 2.25 0 0 1 2.25 2.25v6A2.25 2.25 0 0 1 17.25 21H6.75a2.25 2.25 0 0 1-2.25-2.25v-6a2.25 2.25 0 0 1 2.25-2.25ZM12 14.25v3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function RoadmapMilestone({ milestone }: { milestone: (typeof milestones)[number] }) {
  const milestoneRef = useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: milestoneRef, offset: ["start 0.8", "start 0.48"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [.45, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(3px)", "blur(0px)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [.7, 1]);
  return (
    <li ref={milestoneRef} className="relative">
      <motion.span aria-hidden="true" style={{ scale: reduceMotion ? 1 : scale, opacity: reduceMotion ? 1 : opacity }} className="absolute top-2 -left-[33px] z-10 size-2.5 rounded-full bg-primary-foreground ring-4 ring-white sm:-left-[45px]" />
      <motion.div style={{ opacity: reduceMotion ? 1 : opacity, y: reduceMotion ? 0 : y, filter: reduceMotion ? "none" : filter }}>
        <div className="mb-3 flex flex-wrap items-center gap-3"><span className="font-subtext text-xs text-primary-foreground/50">{milestone.date}</span><span className="rounded-full bg-primary/25 px-2.5 py-1 text-[10px] font-medium">Live</span></div>
        <h3 className="text-xl leading-[1.25] font-medium tracking-[-.03em] sm:text-[1.4rem]">{milestone.title}</h3>
        <p className="mt-3 max-w-[42rem] font-subtext text-sm leading-[1.7] text-primary-foreground/65">{milestone.description}</p>
      </motion.div>
    </li>
  );
}

export function RoadmapSection() {
  const [topic, setTopic] = useState("The full Ovaal roadmap");
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.65", "end 0.55"] });
  return (
    <Dialog.Root>
      <section id="roadmap" aria-labelledby="roadmap-heading" className="bg-white px-6 pb-24 text-primary-foreground sm:px-12 sm:pb-28 lg:px-20 lg:pb-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto max-w-[760px] text-center">
            <p className="mb-5 text-xs font-medium tracking-[.14em] text-primary-foreground/50 uppercase">The road ahead</p>
            <h2 id="roadmap-heading" className="text-[clamp(1.9rem,3vw,3.15rem)] leading-[1.14] font-medium tracking-[-.052em] text-balance">Our roadmap, built with our first restaurants.</h2>
            <p className="mx-auto mt-6 max-w-[40rem] font-subtext text-[clamp(.9rem,1.05vw,.98rem)] leading-[1.6] text-primary-foreground/70">Ovaal grows with the restaurants that use it. Here’s where we’re headed. Some milestones are shared only on a call with our team.</p>
          </div>
          <div className="mt-14 grid gap-7 sm:mt-16 md:grid-cols-[120px_1fr] md:gap-10">
            <p className="self-start text-3xl font-medium tracking-[-.04em] md:sticky md:top-[36vh] md:pt-2">2026</p>
            <div ref={timelineRef} className="relative" data-roadmap-timeline>
              <div aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-primary-foreground/10" />
              <motion.div aria-hidden="true" data-roadmap-progress style={{ scaleY: reduceMotion ? 1 : scrollYProgress }} className="absolute inset-y-0 left-0 w-0.5 origin-top rounded-full bg-primary-foreground" />
              <ol className="relative space-y-14 pl-7 sm:space-y-16 sm:pl-10">
                {milestones.map(milestone => <RoadmapMilestone key={milestone.title} milestone={milestone} />)}
              </ol>
            </div>
          </div>
          <div className="relative mt-12">
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {lockedGroups.map(group => <div key={group.year} className="min-w-0 rounded-[2rem] bg-neutral-50 p-4 sm:p-7"><p className="mb-4 text-xl font-medium tracking-[-.04em] sm:text-2xl">{group.year}</p><div className="space-y-2">{group.items.map(item => <Dialog.Trigger key={item.title} aria-label={`Book a call about ${item.title}, ${"date" in item ? item.date : group.year}. Locked.`} onClick={() => setTopic(`${item.title} · ${"date" in item ? item.date : group.year}`)} className="relative flex min-h-14 w-full items-center gap-2 rounded-xl px-1 py-2 text-left focus-visible:z-30 focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-primary-foreground"><Lock className="size-4 shrink-0 text-primary-foreground/45" /><span aria-hidden="true" className="min-w-0 blur-[2.5px]"><span className="block text-sm font-medium">{"date" in item ? item.date : item.title}</span><span className="mt-1 block text-[10px] text-primary-foreground/40">Shared on a call with our team.</span></span></Dialog.Trigger>)}</div></div>)}
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgb(255_255_255_/_0)_0%,rgb(255_255_255_/_0.7)_25%,rgb(255_255_255_/_0.95)_65%,rgb(255_255_255_/_0.65)_100%)]" />
            <LockedRoadmapWind />
            <div className="pointer-events-none absolute inset-x-0 top-[28%] z-20 mx-auto max-w-[490px] px-4 text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/30"><Lock className="size-6" /></span>
              <h3 className="mx-auto mt-5 max-w-[22ch] text-2xl leading-[1.15] tracking-[-.035em] sm:text-3xl">There’s more ahead. Let’s talk.</h3>
              <p className="mx-auto mt-4 max-w-xs font-subtext text-sm leading-relaxed text-primary-foreground/65">Meet the team for a closer look at what comes next.</p>
              <Dialog.Trigger onClick={() => setTopic("The full Ovaal roadmap")} className="group pointer-events-auto relative isolate mt-6 inline-flex min-h-12 max-w-full items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-semibold hover:text-primary focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"><HoverFill color="dark" /><span className="relative z-10">Book a call to see the full roadmap</span></Dialog.Trigger>
            </div>
          </div>
        </div>
      </section>
      <CallDialogContent topic={topic} />
    </Dialog.Root>
  );
}
