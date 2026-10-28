import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BetaForm } from "@/components/beta/beta-form";

export const metadata: Metadata = { title: "Join the beta — Ovaal", description: "Help shape Ovaal. Join the beta for a restaurant platform built around better service and room to grow." };

export default function BetaPage() {
  return (
    <main className="min-h-svh bg-[#fafbf7] text-primary-foreground lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <aside className="relative isolate flex min-h-[300px] flex-col justify-between overflow-hidden bg-primary-foreground p-7 text-white sm:p-10 lg:sticky lg:top-0 lg:h-svh lg:min-h-[650px] lg:p-12">
        <Image src="/restaurant-service.webp" alt="A restaurant team member serving guests at the counter" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="-z-20 object-cover object-[47%_center]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
        <Link href="/" aria-label="Ovaal home" className="flex w-fit items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"><Image src="/pwa-192x192.png" width={30} height={30} alt="" /><span className="text-[1.6rem] font-semibold tracking-[-.06em]">Ovaal</span></Link>
        <div className="mt-14 max-w-md lg:mb-3">
          <h2 className="max-w-[14ch] text-[clamp(2rem,3.1vw,3.2rem)] leading-[1.08] tracking-[-.045em]">Great service.<br />More room to grow.</h2>
          <p className="mt-5 max-w-xs font-subtext text-sm leading-relaxed text-white/80">Your orders, kitchen, payments, stock and insight. Working together, with you.</p>
        </div>
      </aside>
      <section aria-label="Beta signup" className="px-6 py-9 sm:px-12 sm:py-12 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-[660px]">
          <BetaForm />
        </div>
      </section>
    </main>
  );
}
