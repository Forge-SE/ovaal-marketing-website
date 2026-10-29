import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Ovaal",
  description: "How Ovaal handles information on this website, including contact enquiries, preview forms and your privacy choices.",
};

const sections: LegalSection[] = [
  { id: "who-we-are", title: "Who we are and what this covers", content: <>
    <p>Ovaal is a restaurant platform from Forge Studios. This policy covers the Ovaal marketing website and enquiries you send to our team. You can reach us at <a href="mailto:hello@ovaal.xyz">hello@ovaal.xyz</a> or Barnes Road, Accra Central, Ghana.</p>
    <p>This policy does not describe the processing of restaurant, staff or guest data inside a live Ovaal restaurant account. The relevant service and data-processing information will be provided separately before onboarding.</p>
  </> },
  { id: "information", title: "Information you share", content: <>
    <p>If you email us, we receive your email address, your message and any information or attachments you choose to include. Please share only what is needed for your enquiry and avoid sending payment credentials, staff records or guest information.</p>
    <p>The beta form asks for your name, email, phone number, restaurant name, role, restaurant type, location and an optional branch count. The call form asks for your name, email, restaurant and preferred availability.</p>
    <p>These forms currently run as previews in your browser. Their submit buttons display a confirmation without sending a completed signup or booking to Ovaal or saving it to our database. The confirmation does not register you for the beta or book a call. Location searches are an exception, described below. Your browser may separately offer to save or autofill information according to its own settings. Email us to contact the team directly.</p>
    <p>When you type at least three characters in the location picker, the city or area search is sent through our website server to Photon, a geocoding service operated by komoot using OpenStreetMap data. Only the search text is forwarded; we do not forward the other form fields or request your device’s location. Recent search results are temporarily cached to reduce repeated requests. Our server cache expires after one hour, and the browser’s search cache lasts while the form is open. Search requests may also appear in operational logs. <a href="https://photon.komoot.io" target="_blank" rel="noopener noreferrer">About Photon</a>.</p>
  </> },
  { id: "use", title: "How information is used", content: <>
    <p>We use information you send by email to respond to your request, discuss Ovaal with you and keep a record of the conversation where needed. We also use relevant technical information to operate and protect the website.</p>
    <p>Depending on the request, processing may be necessary to take steps you ask for before an agreement, pursue legitimate interests in responding to enquiries and securing the website, comply with a legal obligation, or act on your consent. We will seek the consent required by applicable law before sending direct marketing. You can withdraw that consent by emailing us.</p>
  </> },
  { id: "cookies", title: "Website technology and cookies", content: <>
    <p>The current website application does not include advertising trackers, analytics scripts or application cookies. Interactive form values are held in the page while you use it, with location search text sent as explained above. Fonts and site images are served with the website.</p>
    <p>Delivering a web page requires technical information such as your IP address, requested page and browser details. Hosting and network providers may process this information and keep operational or security logs. Your browser also manages its own cache and autofill settings.</p>
    <p>We will update this policy if we introduce analytics, tracking or live form submissions, and provide any notice or consent controls required before using them.</p>
  </> },
  { id: "sharing", title: "Sharing and service providers", content: <>
    <p>Enquiries may be accessed by the team members who need to respond and by providers supporting email, hosting or website security. We do not sell personal information submitted in enquiries. We may disclose information where required by law or necessary to address misuse, protect rights or respond to a lawful request.</p>
    <p>Provider infrastructure may be located outside Ghana. Any international handling of personal information must follow the applicable data-protection requirements. This website does not collect restaurant payments; payment providers handle their own services under their own privacy notices.</p>
  </> },
  { id: "retention", title: "Retention and security", content: <>
    <p>We keep enquiry information only for as long as needed to handle the conversation, maintain relevant business records or meet legal requirements. The period depends on the request and any continuing relationship. You can ask us about the information we hold and request its deletion where applicable.</p>
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
