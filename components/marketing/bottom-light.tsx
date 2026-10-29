export function BottomLight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-[linear-gradient(to_bottom,transparent_0%,color-mix(in_oklab,var(--secondary)_18%,transparent)_45%,color-mix(in_oklab,var(--secondary)_70%,transparent)_100%)]"
    />
  );
}
