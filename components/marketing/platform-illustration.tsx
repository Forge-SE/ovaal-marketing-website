type IllustrationKind = "numbers" | "service" | "operations";

export function PlatformIllustration({ kind }: { kind: IllustrationKind }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 220"
      preserveAspectRatio="xMaxYMax slice"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-full w-full"
    >
      <circle cx="308" cy="196" r="154" fill="currentColor" fillOpacity="0.09" stroke="none" />

      {kind === "numbers" && (
        <>
          <g transform="rotate(-10 122 159)">
            <rect x="48" y="72" width="148" height="190" rx="10" fill="currentColor" fillOpacity="0.1" />
            <path d="M68 101h72M68 119h96M68 137h58M68 165h95M68 183h74" />
            <path d="m68 231 24-20 22 9 26-30 28 12" />
          </g>
          <g transform="rotate(8 264 142)">
            <rect x="190" y="25" width="146" height="226" rx="18" fill="currentColor" fillOpacity="0.17" />
            <rect x="208" y="45" width="110" height="42" rx="7" fill="currentColor" fillOpacity="0.13" />
            <path d="M219 72h40" />
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((column) => (
                <rect
                  key={`${row}-${column}`}
                  x={210 + column * 37}
                  y={104 + row * 40}
                  width="26"
                  height="26"
                  rx="6"
                  fill="currentColor"
                  fillOpacity="0.08"
                />
              )),
            )}
          </g>
        </>
      )}

      {kind === "service" && (
        <>
          <g transform="rotate(-8 154 133)">
            <rect x="43" y="51" width="216" height="160" rx="17" fill="currentColor" fillOpacity="0.15" />
            <rect x="59" y="67" width="184" height="126" rx="9" fill="currentColor" fillOpacity="0.08" />
            <path d="M76 88h65M76 108h139M76 128h95M76 150h139" />
            <circle cx="209" cy="174" r="5" fill="currentColor" stroke="none" />
          </g>
          <g transform="rotate(11 297 168)">
            <rect x="247" y="89" width="100" height="170" rx="15" fill="currentColor" fillOpacity="0.2" />
            <rect x="260" y="107" width="74" height="42" rx="7" fill="currentColor" fillOpacity="0.12" />
            <path d="M267 169h16m15 0h16m-47 18h16m15 0h16m-47 18h16m15 0h16" />
          </g>
          <path d="M122 29v40m15-40v40m15-40v40" />
        </>
      )}

      {kind === "operations" && (
        <>
          <g transform="rotate(-7 175 138)">
            <rect x="82" y="32" width="176" height="222" rx="13" fill="currentColor" fillOpacity="0.14" />
            <rect x="143" y="23" width="54" height="19" rx="7" fill="currentColor" fillOpacity="0.23" />
            <path d="M107 79h123M107 108h123M107 137h123M107 166h123M107 195h123" />
            <path d="M146 64v145M187 64v145" strokeOpacity="0.6" />
            <path d="m113 93 6 6 10-12m-16 35 6 6 10-12m-16 35 6 6 10-12" />
          </g>
          <g transform="rotate(9 298 178)">
            <rect x="257" y="99" width="78" height="127" rx="10" fill="currentColor" fillOpacity="0.18" />
            <path d="M269 119h54M269 139h54M269 159h54" />
            <path d="M274 185h39" />
          </g>
        </>
      )}
    </svg>
  );
}
