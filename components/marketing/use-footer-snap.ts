"use client";

import { useEffect, type RefObject } from "react";

/** Settle only the short reveal between the CTA and the complete footer. */
export function useFooterSnap(endingRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let snapping = false;
    let target = 0;

    const settle = () => {
      const ending = endingRef.current;
      const cta = ending?.querySelector<HTMLElement>("#closing-cta");
      if (!ending || !cta || document.querySelector('[role="dialog"]')) return;
      // Longer mobile/zoomed layouts need ordinary scrolling to reach every link.
      if (ending.offsetHeight > window.innerHeight) return;
      if (ending.contains(document.activeElement) && document.activeElement?.matches(":focus-visible")) return;

      const position = window.scrollY;
      const start = cta.getBoundingClientRect().bottom + position - window.innerHeight;
      const end = ending.getBoundingClientRect().bottom + position - window.innerHeight;
      if (position <= start + 2 || position >= end - 2 || end <= start) return;
      target = position - start < (end - start) / 2 ? start : end;
      snapping = true;
      window.scrollTo({ top: target, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    };

    const onScroll = () => {
      clearTimeout(timer);
      if (snapping) {
        if (Math.abs(window.scrollY - target) < 2) snapping = false;
        return;
      }
      timer = setTimeout(settle, 180);
    };
    const interrupt = () => {
      clearTimeout(timer);
      if (snapping) window.scrollTo({ top: window.scrollY, behavior: "instant" });
      snapping = false;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("pointerdown", interrupt, { passive: true });
    window.addEventListener("keydown", interrupt);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      window.removeEventListener("keydown", interrupt);
    };
  }, [endingRef]);
}
