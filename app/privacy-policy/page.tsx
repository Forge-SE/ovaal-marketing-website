import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Ovaal",
  description: "How Ovaal handles beta signups, location searches, Vercel Analytics and your cookie preferences.",
};

const sections: LegalSection[] = [
  { id: "who-we-are", title: "Who we are and what this covers", content: <>
    <p>Ovaal is a restaurant platform from Forge Studios. This policy covers the Ovaal marketing website and enquiries you send to our team. You can reach us at <a href="mailto:hello@ovaal.xyz">hello@ovaal.xyz</a> or Barnes Road, Accra Central, Ghana.</p>
    <p>This policy does not describe the processing of restaurant, staff or guest data inside a live Ovaal restaurant account. The relevant service and data-processing information will be provided separately before onboarding.</p>
  </> },
  { id: "information", title: "Information you share", content: <>
    <p>If you email us, we receive your email address, your message and any information or attachments you choose to include. Please share only what is needed for your enquiry and avoid sending payment credentials, staff records or guest information.</p>
    <p>The beta form asks for your name, email, phone number, restaurant name, role, restaurant type, location and an optional branch count. When you submit it, we send those details to Resend to create or update a beta contact record. We use this record to assess your restaurant’s needs, manage beta enquiries and contact you about onboarding. Required fields are needed to process the request; the branch count is optional. A success confirmation means your enquiry has been saved, not that beta access has been granted.</p>
    <p>The call form asks for your name, email, restaurant and an optional preferred date and time in Accra time (GMT). It currently previews a request locally and does not send the details or schedule a meeting. Email us to arrange a call directly. Your browser may separately offer to save or autofill information according to its own settings.</p>
    <p>When you type at least three characters in the location picker, the city or area search is sent through our website server to Photon, a geocoding service operated by komoot using OpenStreetMap data. Only the search text is forwarded; we do not forward the other form fields or request your device’s location. Recent search results are temporarily cached to reduce repeated requests. Our server cache expires after one hour, and the browser’s search cache lasts while the form is open. Search requests may also appear in operational logs. <a href="https://photon.komoot.io" target="_blank" rel="noopener noreferrer">About Photon</a>.</p>
  </> },
  { id: "use", title: "How information is used", content: <>
    <p>We use beta signup details and information you send by email to respond to your request, discuss Ovaal with you, organise onboarding and keep a record of the conversation where needed. New beta contact records are excluded from general marketing broadcasts. Repeated submissions may update your beta details without changing your existing marketing subscription choices. We also use relevant technical information to operate and protect the website, including short-lived records of signup attempts to limit abuse.</p>
    <p>Depending on the request, processing may be necessary to take steps you ask for before an agreement, pursue legitimate interests in responding to enquiries and securing the website, comply with a legal obligation, or act on your consent. We will seek the consent required by applicable law before sending direct marketing. You can withdraw that consent by emailing us.</p>
  </> },
  { id: "cookies", title: "Cookies and Vercel Analytics", content: <>
    <p>We use Vercel Web Analytics to understand which pages are visited and improve the website. It runs only after you choose to accept analytics. Choosing Essential only keeps analytics off and does not prevent you from browsing, joining the beta or contacting us.</p>
    <p>Analytics can include page visits, visit times, referrers, approximate geographic location and general device, browser and operating-system information. Vercel Web Analytics does not use advertising cookies or a permanent visitor identifier; Vercel describes a request-derived visitor identifier that is discarded after 24 hours. We do not send form field values as analytics events, and we remove query strings and fragments from the page URLs we send. Read <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel’s analytics privacy information</a>.</p>
    <p>We store an essential first-party cookie named <strong>ovaal_consent_v1</strong> to remember whether you accept analytics or choose essential-only use. It lasts 180 days and contains your preference, not your name or contact details. If cookies are blocked, your choice applies only during the current page session. The website does not set advertising cookies.</p>
    <p>You can open Cookie settings using the link in the footer or beneath the beta form to change your choice at any time. Turning analytics off stops future analytics events; it does not erase data already collected. Deleting the preference cookie makes the website ask again on a later visit. You can also manage cookies in your browser.</p>
    <p>Form values are held in the page while you use it; beta signup details are sent when you submit, and location search text is sent as explained above. Phone country flags are bundled with the website rather than loaded from a third-party image service. Fonts and site images are served with the website.</p>
    <p>Delivering a web page requires technical information such as your IP address, requested page and browser details. Hosting and network providers may process this information and keep operational or security logs. Your browser also manages its own cache and autofill settings.</p>
    <p>We will update this policy if we introduce additional tracking or collection of information, and provide any notice or consent controls required before using them.</p>
  </> },
  { id: "sharing", title: "Sharing and service providers", content: <>
    <p>Beta contact records are stored with <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend</a>, our contact-management provider. Location searches use Photon, and optional website analytics use Vercel, as described above. Enquiries may be accessed by the team members who need to respond and by providers supporting email, hosting or website security. We do not sell personal information submitted in enquiries. We may disclose information where required by law or necessary to address misuse, protect rights or respond to a lawful request.</p>
    <p>Provider infrastructure may be located outside Ghana. Any international handling of personal information must follow the applicable data-protection requirements. This website does not collect restaurant payments; payment providers handle their own services under their own privacy notices.</p>
  </> },
  { id: "retention", title: "Retention and security", content: <>
    <p>We keep beta contact records and enquiry information only for as long as needed to manage beta interest, handle the conversation, maintain relevant business records or meet legal requirements. The period depends on the request and any continuing relationship. You can ask us about the information we hold, request its correction or deletion where applicable, or ask us to stop beta follow-up by emailing hello@ovaal.xyz.</p>
    <p>Personal information should be accessed only by those who need it for the relevant purpose. No website or email system can guarantee absolute security. If you suspect information has been mishandled, contact us promptly and avoid including sensitive details in your initial message.</p>
  </> },
  { id: "rights", title: "Your rights and choices", content: <>
    <p>Under applicable data-protection law, including Ghana’s Data Protection Act, 2012 (Act 843), you may request information about how your data is used, access to it, or correction of inaccurate information. You may also object to relevant processing, withdraw consent and request deletion where the law permits.</p>
    <p>Send requests to <a href="mailto:hello@ovaal.xyz">hello@ovaal.xyz</a>. We may need to confirm your identity before disclosing or changing personal information. Withdrawing consent does not affect lawful processing that has already taken place.</p>
    <p>You can also raise a concern with Ghana’s <a href="https://dpc.gov.gh/for-individuals/" target="_blank" rel="noopener noreferrer">Data Protection Commission</a>. Contacting us first does not limit your right to complain to the Commission.</p>
  </> },
  { id: "updates", title: "Changes to this policy", content: <>
    <p>We may update this policy as the website and Ovaal develop. The date at the top identifies the latest version. Material changes to how information is collected or used will be explained before the new processing begins, with consent sought where required.</p>
    <p>For questions about this policy, contact <a href="mailto:hello@ovaal.xyz">hello@ovaal.xyz</a>.</p>
  </> },
];

export default function PrivacyPolicyPage() {
  return <LegalPage current="privacy" title="Privacy Policy" introduction="How we handle the information you share with Ovaal, and the choices you have." sections={sections} />;
}
