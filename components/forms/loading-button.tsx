"use client";

import type { ComponentProps } from "react";
import { HoverFill } from "@/components/marketing/hover-fill";

type LoadingButtonProps = ComponentProps<"button"> & {
  loading?: boolean;
  loadingLabel?: string;
  fillColor?: "dark" | "lime";
  base?: "lime" | "white" | "glass";
};

export function LoadingButton({ loading = false, loadingLabel = "Loading", fillColor = "dark", base, children, className = "", disabled, "aria-label": label, type = "button", ...props }: LoadingButtonProps) {
  return <button {...props} type={type} disabled={disabled || loading} aria-busy={loading} aria-label={loading ? loadingLabel : label} data-loading={loading} className={`group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full text-sm font-semibold transition-[color,scale] duration-150 active:scale-[.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground ${loading ? `cursor-wait disabled:cursor-wait ${fillColor === "dark" ? "text-primary" : "text-primary-foreground"}` : `text-primary-foreground ${fillColor === "dark" ? "hover:text-primary focus-visible:text-primary" : ""} disabled:cursor-not-allowed disabled:opacity-50`} ${className}`}>
    <HoverFill color={fillColor} base={base} active={loading} />
    <span aria-hidden={loading} className={`relative z-10 inline-flex items-center justify-center gap-3 transition-opacity duration-150 motion-reduce:transition-none ${loading ? "opacity-0 delay-[350ms]" : "opacity-100 delay-0"}`}>{children}</span>
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-150 motion-reduce:transition-none ${loading ? "opacity-100 delay-500" : "opacity-0 delay-0"}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`size-5 ${loading ? "animate-spin motion-reduce:animate-none" : ""}`}><circle cx="12" cy="12" r="9" opacity=".2" /><path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" /></svg>
    </span>
    {loading && <span role="status" className="sr-only">{loadingLabel}</span>}
  </button>;
}
