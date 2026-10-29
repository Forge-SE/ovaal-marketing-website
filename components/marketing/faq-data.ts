export const faqCategories = [
  { id: "platform", label: "About Ovaal" },
  { id: "payments", label: "Orders & payments" },
  { id: "setup", label: "Setup & devices" },
  { id: "team", label: "Team & data" },
  { id: "beta", label: "The beta" },
] as const;

export type FaqCategory = (typeof faqCategories)[number]["id"];

export const faqs: { id: string; category: FaqCategory; question: string; answer: string }[] = [
  {
    id: "platform",
    category: "platform",
    question: "Is Ovaal just a point of sale?",
    answer: "No. Ovaal is a restaurant platform. Ordering, kitchen, payments, stock and insight work together today, and guests can already reach you by phone, with self-service ordering on the way.",
  },
  {
    id: "availability",
    category: "platform",
    question: "Where is Ovaal available?",
    answer: "We’re launching with restaurants in Ghana. Africa is next, then restaurants anywhere in the world. Tell us where you are and we’ll let you know when we arrive.",
  },
  {
    id: "self-service",
    category: "platform",
    question: "Will guests be able to order for themselves?",
    answer: "That’s on our roadmap. Self-service ordering is planned as an option alongside the POS, for restaurants that want it.",
  },
  {
    id: "internet",
    category: "payments",
    question: "Do I need internet to use Ovaal?",
    answer: "Cash orders keep working if the connection drops and sync once you’re back online. Mobile money payments need the internet.",
  },
  {
    id: "payment-methods",
    category: "payments",
    question: "How do guests pay?",
    answer: "In Ghana today: cash, bank transfer, and mobile money for MTN, Telecel and AT, with payments going to your own Paystack account. We’ll add more methods as we reach new markets.",
  },
  {
    id: "paystack-account",
    category: "payments",
    question: "Do I need a Paystack account for mobile money in Ghana?",
    answer: "Yes. We’ll help you set it up. New Paystack accounts have a lifetime collection limit until they’re upgraded to a registered business, and Ovaal pauses new mobile money charges at that limit so you’re never caught out. We’ll help you plan the upgrade.",
  },
  {
    id: "vat",
    category: "payments",
    question: "Can I use Ovaal if I’m not VAT registered?",
    answer: "Yes. Choose not registered, a standard profile or a custom tax profile, with tax-inclusive or tax-exclusive prices.",
  },
  {
    id: "devices",
    category: "setup",
    question: "What devices does it run on?",
    answer: "Tell us which devices you use when you join the beta, and we’ll confirm your setup before onboarding.",
  },
  {
    id: "staff-access",
    category: "team",
    question: "Can my staff only see what they need?",
    answer: "Yes. Owners, managers, cashiers and kitchen have different access, and you can adjust permissions person by person.",
  },
  {
    id: "security",
    category: "team",
    question: "Is my restaurant’s data secure?",
    answer: "Staff sign in with PINs and access is limited by role.",
  },
  {
    id: "existing-tools",
    category: "setup",
    question: "Can Ovaal work with the tools I already use?",
    answer: "Ovaal is designed to replace separate tools for ordering, kitchen, payments and stock.",
  },
  {
    id: "guest-information",
    category: "team",
    question: "How do you handle guest information?",
    answer: "Guest phone numbers are saved only with consent.",
  },
  {
    id: "locations",
    category: "platform",
    question: "Does it work for more than one location?",
    answer: "Ovaal is built for a single restaurant today. Multiple locations are on our roadmap.",
  },
  {
    id: "join-beta",
    category: "beta",
    question: "How do I join the beta?",
    answer: "Leave your details and we’ll be in touch. We’re onboarding our first restaurants from November.",
  },
];
