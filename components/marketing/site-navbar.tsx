"use client";

import { Popover } from "@base-ui/react/popover";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HoverFill } from "./hover-fill";
import { TransitionLink } from "./page-transition";

const links = [{ label: "Product", href: "#product" }, { label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }];

export function SiteNavbar() {
  const [floating, setFloating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [limeMenu, setLimeMenu] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const navigatingFromMenu = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => {
      setFloating(window.scrollY > 80);
      const cta = document.getElementById("closing-cta");
      const reachedFooter = !!cta && cta.getBoundingClientRect().bottom <= window.innerHeight * .55;
      setAtFooter(reachedFooter);
      if (reachedFooter) setMenuOpen(false);
      if (window.innerWidth < 768) {
        const belowNav = Math.min((headerRef.current?.getBoundingClientRect().bottom ?? 80) + 4, window.innerHeight - 1);
        const section = document.elementsFromPoint(document.documentElement.clientWidth / 2, belowNav)
          .map(element => element.closest("section"))
          .find(element => element && document.getElementById("top")?.contains(element));
        if (section) setLimeMenu(section.getAttribute("aria-labelledby") === "hero-title" || section.getAttribute("aria-labelledby") === "connection-heading");
      }
    };
    const closeOnDesktop = () => { if (window.innerWidth >= 768) setMenuOpen(false); update(); };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", closeOnDesktop);
    update();
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", closeOnDesktop); };
  }, []);

  return (
    <header ref={headerRef} className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {atFooter ? <motion.button layoutId="site-navigation" transition={{ duration: reduceMotion ? 0 : .5, ease: [.2, 0, 0, 1] }} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" })} className="group pointer-events-auto fixed right-5 bottom-5 isolate flex size-12 items-center justify-center overflow-hidden rounded-full text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:right-8 sm:bottom-8"><HoverFill color="dark" /><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 size-5 group-hover:text-primary"><path d="M12 19.5v-15m0 0-6 6m6-6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></motion.button> : <motion.nav layoutId="site-navigation" transition={{ duration: reduceMotion ? 0 : .5, ease: [.2, 0, 0, 1] }} aria-label="Main navigation" className={`pointer-events-auto mx-auto flex items-center justify-between gap-3 bg-primary-foreground/95 text-secondary-foreground backdrop-blur-xl transition-[max-width,width,margin-top,border-radius,padding] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${floating ? "mt-4 w-[calc(100%-2rem)] max-w-[1040px] rounded-full px-3 py-3 sm:px-6" : "mt-0 w-full max-w-full rounded-none px-6 py-5 sm:px-12 lg:px-20 lg:py-7"}`}>
        <a href="#top" aria-label="Ovaal home" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" }); }} className="inline-flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"><Image src="/pwa-192x192.png" alt="" width={30} height={30} className="size-[30px] rounded-lg" /><span className="text-[1.35rem] font-semibold leading-none tracking-[-.065em] sm:text-[1.6rem]">Ovaal</span></a>
        <div className="hidden items-center gap-1 md:flex">{links.map(link => <TransitionLink key={link.label} href={link.href} className="rounded-full px-4 py-3 text-sm text-white/80 transition-colors duration-150 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">{link.label}</TransitionLink>)}</div>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <TransitionLink href="/beta" className="group relative isolate inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full px-4 py-2.5 text-xs whitespace-nowrap font-semibold text-primary-foreground transition-[color,scale] duration-150 hover:text-primary active:scale-[.96] focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:px-6 sm:text-sm"><HoverFill color="dark" /><span className="relative z-10">Join the beta</span></TransitionLink>
          <Popover.Root open={menuOpen} onOpenChange={(open) => { if (open) navigatingFromMenu.current = false; setMenuOpen(open); }}>
            <Popover.Trigger aria-label={menuOpen ? "Close navigation" : "Open navigation"} className="group relative isolate flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"><HoverFill color="lime" /><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 size-5"><path d={menuOpen ? "m6 6 12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"} strokeLinecap="round" /></svg></Popover.Trigger>
            <Popover.Portal><Popover.Positioner anchor={headerRef} positionMethod="fixed" side="bottom" align="center" sideOffset={16} collisionPadding={16} className="z-[60] md:hidden"><Popover.Popup data-mobile-menu data-theme={limeMenu ? "lime" : "dark"} finalFocus={() => !navigatingFromMenu.current} className={`w-[calc(100vw-2rem)] origin-top rounded-[2rem] p-3 outline-none transition-[opacity,translate,background-color,color] duration-200 data-starting-style:-translate-y-2 data-starting-style:opacity-0 data-ending-style:-translate-y-1 data-ending-style:opacity-0 motion-reduce:transition-none ${limeMenu ? "bg-primary text-primary-foreground" : "bg-primary-foreground text-white"}`}><Popover.Title className="sr-only">Navigation</Popover.Title>{links.map(link => <TransitionLink key={link.label} href={link.href} onClick={(event) => {
              navigatingFromMenu.current = true;
              setMenuOpen(false);
              if (link.href.startsWith("#")) {
                event.preventDefault();
                requestAnimationFrame(() => {
                  const target = document.querySelector<HTMLElement>(link.href);
                  if (!target) return;
                  window.history.pushState(null, "", link.href);
                  target.setAttribute("tabindex", "-1");
                  target.focus({ preventScroll: true });
                  target.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth" });
                });
              }
            }} className={`block rounded-2xl px-5 py-4 text-base font-medium transition-colors duration-150 focus-visible:outline-2 ${limeMenu ? "hover:bg-primary-foreground/10 focus-visible:outline-primary-foreground" : "hover:bg-primary/10 hover:text-primary focus-visible:outline-primary"}`}>{link.label}</TransitionLink>)}</Popover.Popup></Popover.Positioner></Popover.Portal>
          </Popover.Root>
        </div>
      </motion.nav>}
    </header>
  );
}
