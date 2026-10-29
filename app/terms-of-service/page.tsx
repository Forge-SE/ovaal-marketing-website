import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service — Ovaal",
  description: "Terms for using the Ovaal website, exploring the platform and expressing interest in the beta.",
};

const sections: LegalSection[] = [
  { id: "scope", title: "About these terms", content: <>
    <p>These terms apply to your use of the Ovaal marketing website, provided by Forge Studios. By using the website, you agree to use it in accordance with these terms. If you do not agree, please stop using it.</p>
    <p>These are website terms. They do not create a paid subscription, grant access to the restaurant platform or replace a separate service agreement. Any terms for a live beta, paid service or processing of restaurant data will be presented before you start that service.</p>
  </> },
  { id: "beta", title: "Beta access and previews", content: <>
    <p>Ovaal is being developed with restaurants in mind, starting in Ghana. Features, eligibility, availability and roadmap dates may change. Descriptions, illustrations and interactive demonstrations explain the product direction and do not guarantee that every feature is available to every restaurant.</p>
    <p>The beta form sends your contact and restaurant details to us through Resend. A success confirmation means your beta enquiry has been saved and you have asked our team to contact you about it. It does not create a restaurant account, paid subscription or guarantee beta access, a launch date or a founding restaurant offer. If an error appears, try again or email <a href="mailto:hello@ovaal.xyz">hello@ovaal.xyz</a>.</p>
    <p>The call form still previews a request locally. Choosing a preferred date and time does not send a meeting request or reserve a calendar slot. Please email us to arrange a call; any meeting time must be confirmed by our team.</p>
  </> },
  { id: "acceptable-use", title: "Using the website responsibly", content: <>
    <p>You may browse the website and contact us about Ovaal. If you communicate on behalf of a restaurant or another organisation, you should have permission to do so and provide accurate information.</p>
    <ul><li>Do not use the website for unlawful activity, impersonation or misleading enquiries.</li><li>Do not attempt to access private systems or information without authorisation.</li><li>Do not introduce malicious code, disrupt the website or overload its infrastructure.</li><li>Do not submit another person’s confidential information without permission.</li></ul>
    <p>We may restrict access where reasonably necessary to address misuse or protect the website and its users.</p>
  </> },
  { id: "pricing", title: "Pricing and payments", content: <>
    <p>No payment or subscription purchase takes place on this marketing website. Subscription prices, included features, billing terms and any beta offer will be confirmed separately before you commit to a service.</p>
    <p>Ovaal’s planned subscription model does not mean payment processing is free. A restaurant’s payment provider may apply its own fees, eligibility checks, collection limits and terms. References to Paystack or other providers do not replace those providers’ agreements.</p>
  </> },
  { id: "content", title: "Content and intellectual property", content: <>
    <p>The Ovaal name, branding, website design and original content belong to Forge Studios or their respective rights holders. Third-party marks and images remain the property of their owners.</p>
    <p>You may view the website, share links and make reasonable copies for evaluating Ovaal within your organisation. Do not remove ownership notices, misrepresent an affiliation with Ovaal or commercially reuse our branding or original content without permission.</p>
  </> },
  { id: "privacy", title: "Privacy and external services", content: <>
    <p>Our <Link href="/privacy-policy">Privacy Policy</Link> explains how information is handled on this website. Please read it before contacting us or entering information into a form.</p>
    <p>We use Vercel Web Analytics only when you accept analytics through our consent controls. An essential preference cookie remembers your choice for 180 days. You can reject optional analytics or change your choice using Cookie settings without affecting your use of this website or beta signup. Using the website or accepting these terms does not, by itself, give consent to analytics. Details of the information collected and Vercel’s role appear in our <Link href="/privacy-policy#cookies">cookies and analytics notice</Link>.</p>
    <p>Links to external websites are provided for convenience. We do not operate those websites and their own terms and privacy policies apply. A link does not guarantee the accuracy or availability of an external service.</p>
  </> },
  { id: "availability", title: "Accuracy, availability and responsibility", content: <>
    <p>We aim to provide useful, accurate information but cannot guarantee that website content is complete, current or error-free, or that the website will always be available. We may update, suspend or remove website features when needed.</p>
    <p>Website content is general information, not financial, legal, tax or other professional advice. Confirm the features and service terms relevant to your restaurant before making operational or purchasing decisions. Demonstrations should not be used to process real orders or payments.</p>
    <p>To the extent permitted by applicable law, we are not responsible for losses resulting from reliance on unconfirmed roadmap features, interruptions to this informational website or services operated by third parties. Nothing in these terms excludes liability or limits rights that cannot lawfully be excluded or limited.</p>
  </> },
  { id: "changes", title: "Changes and questions", content: <>
    <p>We may revise these terms as the website develops. The date at the top shows when they were last updated. Separate terms agreed for a restaurant service are not changed simply by updating this page.</p>
    <p>If you have a concern about the website or these terms, please contact us so we can try to resolve it. Applicable mandatory legal protections remain in place.</p>
    <p>Contact Forge Studios at <a href="mailto:hello@ovaal.xyz">hello@ovaal.xyz</a> or Barnes Road, Accra Central, Ghana.</p>
  </> },
];

export default function TermsOfServicePage() {
  return <LegalPage current="terms" title="Terms of Service" introduction="The terms for exploring Ovaal, using this website and getting in touch with our team." sections={sections} />;
}
