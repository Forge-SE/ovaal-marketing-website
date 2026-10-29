type LineArtKind = "costing" | "ticket" | "receipt";

// Match the outlined objects and translucent fills used by PlatformIllustration
// and the beta completion illustration, at the scale of a product detail.
export function FeatureLineArt({ kind, className = "" }: { kind: LineArtKind; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="83" cy="88" r="49" fill="currentColor" fillOpacity=".07" stroke="none" />
      {kind === "costing" && <>
        <g transform="rotate(-9 35 48)">
          <rect x="13" y="17" width="47" height="68" rx="6" fill="currentColor" fillOpacity=".06" />
          <path d="M23 31h25M23 41h18M23 51h23M23 61h13" />
        </g>
        <g transform="rotate(9 69 65)">
          <rect x="48" y="40" width="37" height="51" rx="6" fill="var(--primary)" />
          <rect x="55" y="48" width="23" height="11" rx="2" fill="currentColor" fillOpacity=".1" />
          <path d="M56 68h4m10 0h5M56 77h4m10 0h5" />
        </g>
      </>}
      {kind === "ticket" && <g transform="rotate(-13 50 50)">
        <path d="M13 31h74v14a8 8 0 0 0 0 16v14H13V61a8 8 0 0 0 0-16V31Z" fill="currentColor" fillOpacity=".08" />
        <path d="M65 35v5m0 7v5m0 7v5m0 7v1M29 62l17-19" />
        <circle cx="31" cy="45" r="4" /><circle cx="45" cy="60" r="4" />
      </g>}
      {kind === "receipt" && <>
        <g transform="rotate(10 57 51)">
          <path d="M29 13h47v74l-8-5-8 5-8-5-8 5-7-5-8 5V13Z" fill="currentColor" fillOpacity=".08" />
          <path d="M40 29h25M40 39h18M40 49h25M40 64h10" />
        </g>
        <circle cx="29" cy="72" r="18" fill="var(--primary)" />
        <path d="m21 72 6 6 10-12" />
      </>}
    </svg>
  );
}
