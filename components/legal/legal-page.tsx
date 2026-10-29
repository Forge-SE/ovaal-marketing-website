import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HoverFill } from "@/components/marketing/hover-fill";

export type LegalSection = { id: string; title: string; content: ReactNode };

export function LegalPage({ title, introduction, sections, current }: {
  title: string;
  introduction: string;
  sections: LegalSection[];
  current: "privacy" | "terms";
}) {
  return <div className="min-h-svh bg-background text-primary-foreground">
    <a href="#legal-content" className="sr-only z-50 rounded-full bg-primary px-5 py-3 text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4">Skip to content</a>
    <header className="px-6 sm:px-12 lg:px-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-6">
        <Link href="/" aria-label="Ovaal home" className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><Image src="/pwa-192x192.png" alt="" width={30} height={30} className="rounded-lg" /><span className="text-2xl font-semibold tracking-[-.065em]">Ovaal</span></Link>
        <Link href="/" className="group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-2.5 text-xs font-medium text-primary-foreground active:scale-[.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><HoverFill color="lime" /><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 size-4"><path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="relative z-10">Back to home</span></Link>
      </div>
      <div className="relative isolate mx-auto mt-3 flex min-h-[320px] max-w-6xl flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-primary-foreground px-6 py-12 text-center text-secondary-foreground sm:min-h-[360px] sm:px-12 sm:py-14">
        <Image src="/restaurant-service.webp" alt="" fill priority sizes="(min-width: 1280px) 1152px, (min-width: 640px) calc(100vw - 96px), calc(100vw - 48px)" className="-z-20 object-cover object-[center_45%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/65" />
        <p className="text-xs font-medium tracking-[.12em] text-primary uppercase">Ovaal · Legal</p>
        <h1 className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.08] font-medium tracking-[-.055em]">{title}</h1>
        <p className="mt-5 max-w-2xl font-subtext text-base leading-relaxed text-white/75">{introduction}</p>
        <p className="mt-7 font-subtext text-xs text-white/75">Last updated <time dateTime="2026-10-29">29 October 2026</time></p>
      </div>
    </header>
    <main id="legal-content" className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20 lg:px-16">
      <aside>
        <nav aria-label="On this page" className="rounded-3xl bg-primary-foreground/[.035] p-5 lg:sticky lg:top-8">
          <p className="mb-4 text-xs font-semibold tracking-[.1em] uppercase">On this page</p>
          <ol className="space-y-2">{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} className="flex gap-3 rounded-lg py-1.5 text-sm leading-relaxed text-primary-foreground/75 underline-offset-4 hover:text-primary-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"><span className="font-subtext text-primary-foreground/40">{String(index + 1).padStart(2, "0")}</span>{section.title}</a></li>)}</ol>
        </nav>
      </aside>
      <article className="min-w-0 max-w-3xl space-y-10">
        {sections.map((section, index) => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-8">
          <h2 id={`${section.id}-heading`} className="text-2xl leading-snug font-medium tracking-[-.035em]"><span className="mr-3 text-primary-foreground/35">{String(index + 1).padStart(2, "0")}</span>{section.title}</h2>
          <div className="mt-4 space-y-4 font-subtext text-[15px] leading-[1.85] text-primary-foreground/75 [&_a]:rounded-sm [&_a]:text-primary-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">{section.content}</div>
        </section>)}
      </article>
    </main>
    <footer className="bg-background px-6 py-9 text-primary-foreground sm:px-12 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-subtext text-xs leading-relaxed text-primary-foreground/70"><p>© 2026 Forge Studios.</p><address className="not-italic">Barnes Road, Accra Central, Ghana</address></div>
        <nav aria-label="Legal navigation" className="flex flex-wrap gap-6 text-sm"><Link href="/privacy-policy" aria-current={current === "privacy" ? "page" : undefined} className="rounded-sm underline-offset-4 hover:underline aria-[current=page]:underline focus-visible:outline-2 focus-visible:outline-offset-4">Privacy Policy</Link><Link href="/terms-of-service" aria-current={current === "terms" ? "page" : undefined} className="rounded-sm underline-offset-4 hover:underline aria-[current=page]:underline focus-visible:outline-2 focus-visible:outline-offset-4">Terms of Service</Link></nav>
      </div>
    </footer>
  </div>;
}
