import { useId } from "react";

export function CookieIllustration() {
  const id = useId();
  return <svg aria-hidden="true" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full text-primary">
    <defs><pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0v7" strokeOpacity=".3" /></pattern></defs>
    <circle cx="82" cy="82" r="36" fill={`url(#${id})`} stroke="none" />
    <g transform="rotate(-12 54 57)">
      <path d="M77 22a13 13 0 0 0 16 17 39 39 0 1 1-16-17Z" fill="currentColor" fillOpacity=".08" />
      <path d="M33 35a30 30 0 0 0-9 24m2 13 2 4" strokeOpacity=".45" />
      <circle cx="45" cy="37" r="3" /><circle cx="39" cy="60" r="4" /><circle cx="65" cy="52" r="3" /><circle cx="58" cy="78" r="4" /><circle cx="78" cy="72" r="2" />
      <path d="m54 59 2 3m-17 14 2 1m31-43 2 1" />
    </g>
    <path d="m94 14 1 5 5 1-5 1-1 5-1-5-5-1 5-1 1-5Zm10 23v4m-2-2h4" strokeOpacity=".65" />
  </svg>;
}
