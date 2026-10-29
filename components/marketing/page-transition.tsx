"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ComponentProps, type ReactNode } from "react";

const TransitionContext = createContext<(target: string) => void>(() => {});
const PageReadyContext = createContext(true);

export function usePageReady() {
  return useContext(PageReadyContext);
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [pending, setPending] = useState<{ target: string; minimum: number } | null>(() => pathname === "/" ? { target: "/", minimum: 2200 } : null);

  useEffect(() => {
    if (!pending) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [pending]);

  useEffect(() => {
    if (!pending) return;
    // A failed navigation or stalled resource must never trap the visitor.
    const fallback = window.setTimeout(() => setPending(null), 6500);
    if (pending.target !== pathname) return () => window.clearTimeout(fallback);

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const started = performance.now();
    const finish = () => {
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        timer = setTimeout(() => setPending(null), Math.max(0, (reduceMotion ? 0 : pending.minimum) - (performance.now() - started)));
      });
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      if (timer) clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, [pathname, pending, reduceMotion]);

  return (
    <TransitionContext.Provider value={(target) => {
      if ((target === "/" || target === "/beta") && target !== pathname) setPending({ target, minimum: 800 });
    }}>
      <PageReadyContext.Provider value={pending === null}>
        <div inert={pending !== null} aria-busy={pending !== null} className="min-h-full">{children}</div>
      </PageReadyContext.Provider>
      <AnimatePresence>
        {pending && (
          <motion.div key="page-loader" role="status" aria-label="Loading Ovaal" initial={false} animate={{ y: 0, opacity: 1 }} exit={reduceMotion ? { opacity: 0 } : { y: "-100%" }} transition={{ duration: reduceMotion ? .15 : .7, ease: [.76, 0, .24, 1] }} className="fixed inset-0 z-[100] flex items-center justify-center bg-primary text-primary-foreground">
            <span className="sr-only">Loading Ovaal</span>
            <div aria-hidden="true" className="flex items-center gap-3 overflow-hidden p-2">
              <motion.span initial={reduceMotion ? { opacity: 0 } : { x: -64, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: reduceMotion ? .15 : .6, delay: reduceMotion ? 0 : .12, ease: [.22, 1, .36, 1] }}>
                <Image src="/pwa-192x192.png" alt="" width={56} height={56} priority className="size-14 rounded-2xl" />
              </motion.span>
              <span className="overflow-hidden"><motion.span initial={reduceMotion ? { opacity: 0 } : { x: "-110%", opacity: 0 }} animate={{ x: "0%", opacity: 1 }} transition={{ duration: reduceMotion ? .15 : .7, delay: reduceMotion ? 0 : .25, ease: [.22, 1, .36, 1] }} className="block text-4xl font-semibold tracking-[-.06em]">Ovaal</motion.span></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export function TransitionLink({ onNavigate, ...props }: ComponentProps<typeof Link>) {
  const start = useContext(TransitionContext);
  return <Link {...props} onNavigate={(event) => {
    let prevented = false;
    onNavigate?.({ preventDefault: () => { prevented = true; event.preventDefault(); } });
    if (!prevented && typeof props.href === "string") start(props.href.split(/[?#]/)[0]);
  }} />;
}
