export type ConsentChoice = "analytics" | "essential" | "undecided" | "pending";
export const consentCookieName = "ovaal_consent_v1";
export const consentChangedEvent = "ovaal:consent-changed";
export const consentOpenEvent = "ovaal:consent-open";
let sessionChoice: ConsentChoice | undefined;

export function getConsentChoice(): ConsentChoice {
  if (typeof document === "undefined") return "pending";
  const value = document.cookie.split(";").map(part => part.trim()).find(part => part.startsWith(`${consentCookieName}=`))?.split("=")[1];
  if (value === "analytics" || value === "essential") return value;
  return sessionChoice ?? "undecided";
}

export function setConsentChoice(analytics: boolean) {
  const choice = analytics ? "analytics" : "essential";
  document.cookie = `${consentCookieName}=${choice}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  // Keep the choice effective for this visit even if the browser blocks cookies.
  sessionChoice = choice;
  window.dispatchEvent(new Event(consentChangedEvent));
}

export function subscribeToConsent(onChange: () => void) {
  window.addEventListener(consentChangedEvent, onChange);
  window.addEventListener("focus", onChange);
  return () => {
    window.removeEventListener(consentChangedEvent, onChange);
    window.removeEventListener("focus", onChange);
  };
}
