"use client";

import Image from "next/image";
import Link from "next/link";

import { useRef } from "react";
import { useFooterSnap } from "./use-footer-snap";

import { FinalCtaSection } from "./final-cta-section";

const links = [
  ["Product", "#product"], ["How it works", "#how-it-works"],
  ["Roadmap", "#roadmap"], ["Pricing", "#pricing"], ["FAQ", "#faq"],
];

// Populate with verified destinations when the brand profiles and legal pages are ready.
const footerDetails: { address: string; phone: string; socials: { name: string; href: string; path: string }[] } = {
  address: "Barnes Road, Accra Central, Ghana",
  phone: "",
  socials: [
    { name: "Instagram", href: "", path: "M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Zm5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.5-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" },
    { name: "LinkedIn", href: "", path: "M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h4v12H3V9Zm6 0h4v1.6c.8-1.2 1.8-1.9 3.5-1.9 3 0 4.5 1.9 4.5 5.2V21h-4v-6.4c0-1.6-.5-2.5-1.8-2.5-1.4 0-2.2 1-2.2 2.8V21H9V9Z" },
    { name: "X", href: "", path: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l4.5 6.8L18.9 2ZM17.8 20h1.7L6.2 4H4.4l13.4 16Z" },
    { name: "Meta", href: "", path: "M6.2 4.5c2.2 0 4 2.1 5.8 4.8 1.8-2.7 3.6-4.8 5.8-4.8 3.7 0 6.2 5 6.2 9.2 0 3.8-1.7 5.8-4.3 5.8-2.5 0-4.4-2.7-7.7-7.8-3.3 5.1-5.2 7.8-7.7 7.8C1.7 19.5 0 17.5 0 13.7c0-4.2 2.5-9.2 6.2-9.2Zm0 2.4c-2 0-3.8 3.6-3.8 6.8 0 2.3.7 3.4 1.9 3.4 1.4 0 3.2-2.7 6.3-7.6-1.7-2.4-3-2.6-4.4-2.6Zm11.6 0c-1.4 0-2.7 1.3-4.4 3.8 3.1 4.9 4.9 6.4 6.3 6.4 1.2 0 1.9-1.1 1.9-3.4 0-3.2-1.8-6.8-3.8-6.8Z" },
  ],
};

export function SiteEnding() {
  const endingRef = useRef<HTMLElement>(null);
  useFooterSnap(endingRef);

  return <footer ref={endingRef} aria-label="Ovaal footer" className="overflow-clip bg-primary-foreground text-secondary-foreground">
    <div className="relative isolate flex min-h-svh flex-col">
      <div id="closing-cta" className="relative z-10 shrink-0">
        <FinalCtaSection />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-px bg-primary/25" />
      </div>
      <div className="sticky bottom-0 flex flex-1 flex-col justify-between motion-reduce:relative"><div id="contact" className="flex flex-col gap-6 px-7 pt-10 pb-8 sm:px-12 lg:px-16 lg:pt-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <a href="#top" aria-label="Ovaal home" className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"><Image src="/pwa-192x192.png" alt="" width={30} height={30} className="size-[30px] rounded-lg" /><span className="text-2xl font-semibold tracking-[-.065em]">Ovaal</span></a>
            <p className="mt-3 max-w-[34ch] text-base leading-snug tracking-[-.025em]">The restaurant platform for growth, built on great guest experiences.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-[auto_auto] sm:gap-x-10 lg:gap-x-16"><nav aria-label="Footer navigation" className="grid grid-cols-2 content-start gap-x-10 gap-y-3 text-sm md:gap-x-16">
            {links.map(([label, href]) => <a key={label} href={href} className="w-fit rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{label}</a>)}
          </nav><div className="flex flex-col items-start gap-3 text-sm"><a href="mailto:hello@ovaal.xyz" className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">hello@ovaal.xyz</a>{footerDetails.phone && <a href={`tel:${footerDetails.phone.replace(/\s/g, "")}`} className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{footerDetails.phone}</a>}</div></div>
        </div>
      </div>
        <div className="mx-7 flex flex-col justify-between gap-6 border-t border-primary/15 pt-6 pb-9 font-subtext text-xs leading-relaxed sm:mx-12 md:flex-row md:items-end lg:mx-16">
          <div><div className="flex flex-wrap gap-x-4 gap-y-1"><p>© 2026 Forge Studios.</p><address className="not-italic">{footerDetails.address}</address></div></div>
          <div className="flex flex-wrap items-center gap-3 pb-1 md:gap-4">
            {footerDetails.socials.map(social => social.href ? <a key={social.name} href={social.href} aria-label={social.name} target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full hover:bg-primary-foreground/10 focus-visible:outline-2"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d={social.path} /></svg></a> : <span key={social.name} role="img" aria-label={`${social.name} — profile coming soon`} title={`${social.name} — profile coming soon`} className="flex size-10 items-center justify-center opacity-50"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d={social.path} /></svg></span>)}
            <Link href="/privacy-policy" className="rounded-sm text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">Privacy Policy</Link><Link href="/terms-of-service" className="rounded-sm text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">Terms of Service</Link>
          </div>
        </div>
      </div></div>
  </footer>;
}
