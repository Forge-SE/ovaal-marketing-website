"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SuccessIllustration } from "@/components/forms/success-illustration";
import { HoverFill } from "@/components/marketing/hover-fill";

export function BetaSuccess({ onEdit }: { onEdit: () => void }) {
  const reduceMotion = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { headingRef.current?.focus(); }, []);

  return (
    <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} className="py-12">
      <SuccessIllustration />
      <h1 ref={headingRef} tabIndex={-1} className="text-4xl leading-[1.1] tracking-[-.045em] outline-none sm:text-5xl">You’re ready for what’s next.</h1>
      <p className="mt-5 max-w-md font-subtext leading-relaxed text-primary-foreground/70">Thank you. We’ll be in touch shortly to talk about bringing Ovaal to your restaurant.</p>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Link href="/" className="group relative isolate inline-flex min-h-12 items-center overflow-hidden rounded-full px-7 py-3 text-sm font-semibold hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"><HoverFill color="dark" /><span className="relative z-10">Back to Ovaal</span></Link>
        <button type="button" onClick={onEdit} className="rounded-full px-3 py-2 text-sm underline underline-offset-4 focus-visible:outline-2">Edit details</button>
      </div>
    </motion.div>
  );
}
