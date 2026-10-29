"use client";

import { Accordion } from "@base-ui/react/accordion";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { faqCategories, faqs, type FaqCategory } from "./faq-data";
import { HoverFill } from "./hover-fill";
import { TransitionLink } from "./page-transition";

export function FaqSection() {
  const [category, setCategory] = useState<FaqCategory | null>(null);
  const [open, setOpen] = useState<string[]>([]);
  const reduceMotion = useReducedMotion();
  const visible = category ? faqs.filter(faq => faq.category === category) : faqs;

  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-28 bg-background px-6 py-24 text-primary-foreground sm:px-12 sm:py-28 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-[1000px]">
        <h2 id="faq-heading" className="mx-auto max-w-[24ch] text-center text-[clamp(1.9rem,3vw,3.15rem)] leading-[1.14] font-medium tracking-[-.052em] text-balance">Frequently asked questions</h2>
        <div role="group" aria-label="Filter frequently asked questions" className="mt-9 flex flex-wrap justify-center gap-2">
          {faqCategories.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} aria-controls="faq-answers" onClick={() => { setOpen([]); setCategory(current => current === item.id ? null : item.id); }} className={`group relative isolate inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-xs font-medium transition-[color,scale] duration-150 hover:text-primary active:scale-[.96] focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground sm:text-sm ${category === item.id ? "text-primary" : "text-primary-foreground/70"}`}><HoverFill color="dark" base="white" active={category === item.id} /><span className="relative z-10">{item.label}</span></button>)}
        </div>
        <div className="mt-8 min-h-6 text-center">{category && <button type="button" onClick={() => { setCategory(null); setOpen([]); }} className="rounded-full px-3 py-1 text-xs text-primary-foreground/55 underline underline-offset-4 hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-primary-foreground">Show all questions</button>}</div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">Showing {visible.length} questions{category ? ` in ${faqCategories.find(item => item.id === category)?.label}` : " across all categories"}.</p>
        <motion.div key={category ?? "all"} initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .2 }}>
          <Accordion.Root id="faq-answers" value={open} onValueChange={setOpen} className="mt-4 space-y-3">
            {visible.map(faq => <Accordion.Item key={faq.id} value={faq.id} className="rounded-[1.5rem] bg-white px-5 sm:px-7">
              <Accordion.Header><Accordion.Trigger className="group flex min-h-20 w-full items-center justify-between gap-5 rounded-2xl py-5 text-left text-base leading-[1.4] font-medium tracking-[-.02em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground sm:text-lg"><span>{faq.question}</span><span aria-hidden="true" className="relative isolate flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full"><HoverFill color="lime" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 size-4 transition-transform duration-200 group-data-panel-open:rotate-45 motion-reduce:transition-none"><path d="M5 12h14M12 5v14" strokeLinecap="round" /></svg></span></Accordion.Trigger></Accordion.Header>
              <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden opacity-100 transition-[height,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] data-starting-style:h-0 data-starting-style:opacity-0 data-ending-style:h-0 data-ending-style:opacity-0 motion-reduce:transition-none"><div className="max-w-[50rem] pb-6 pr-3 font-subtext text-sm leading-[1.75] text-primary-foreground/70"><p>{faq.answer}</p>{faq.id === "join-beta" && <TransitionLink href="/beta" className="mt-4 inline-block rounded-sm font-medium text-primary-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">Join the beta</TransitionLink>}</div></Accordion.Panel>
            </Accordion.Item>)}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
