export function HoverFill({
  color,
  base = color === "dark" ? "lime" : "white",
  active = false,
}: {
  color: "dark" | "lime";
  base?: "lime" | "white" | "glass";
  active?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--button-hover)_var(--button-fill),var(--button-base)_calc(var(--button-fill)_+_0.1%))] transition-[--button-fill] duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:[--button-fill:100%] group-focus-visible:[--button-fill:100%] motion-reduce:duration-0 ${active ? "[--button-fill:100%]" : ""} ${color === "dark" ? "[--button-hover:var(--primary-foreground)]" : "[--button-hover:var(--primary)]"} ${base === "lime" ? "[--button-base:var(--primary)]" : base === "glass" ? "[--button-base:rgb(255_255_255_/_0.2)]" : "[--button-base:white]"}`}
    />
  );
}
