export const features = [
  {
    kind: "insights",
    title: "Insights and a daily digest that show how yesterday went",
    description: "Today’s net sales against the same weekday last week, one recommendation, and a digest in your inbox before service starts.",
  },
  {
    kind: "alerts",
    title: "Live alerts that catch problems as they happen",
    description: "Low stock, large voids, cash differences, failed payments and sync issues, flagged as they happen.",
  },
  {
    kind: "inventory",
    title: "Inventory and dish costing that show your stock and your costs",
    description: "Stock is reserved when an order is placed and used when the kitchen starts preparing, and the cost of every dish is recorded on every sale.",
  },
  {
    kind: "discounts",
    title: "Discount codes that bring guests back",
    description: "Create codes your cashiers can apply at the counter.",
  },
  {
    kind: "ordering",
    title: "Ordering that makes every order easier",
    description: "Dine-in, pickup and delivery in a few taps, with modifiers, tips and delivery fees. Mark a dish as sold out with one switch.",
  },
  {
    kind: "payments",
    title: "Payments that let guests pay their way",
    description: "Cash, bank transfer and mobile money (MTN, Telecel and AT in Ghana), in full or in part.",
  },
  {
    kind: "fees",
    title: "No transaction fees, so you keep all your sales",
    description: "Ovaal charges a subscription, not a cut of your sales. Payments go straight to your own payment account, and the only fees are your payment provider’s standard fees.",
  },
  {
    kind: "kitchen",
    title: "A kitchen board that keeps everyone in sync",
    description: "New, Preparing, Ready and Completed, with the photo of the dish on every ticket and a chime when an order is ready.",
  },
  {
    kind: "shifts",
    title: "Shifts, roles and PINs that keep you in control",
    description: "Everyone signs in with a PIN and sees only what they need. Closing a shift shows the expected cash, the counted cash and the difference.",
  },
  {
    kind: "tax",
    title: "Built for the market you operate in",
    points: [
      { label: "Tax profiles.", text: "Not registered, standard or custom, with tax-inclusive or tax-exclusive prices." },
      { label: "Local currency.", text: "Prices and receipts in the currency you trade in." },
      { label: "Local payment methods.", text: "In Ghana, mobile money for MTN, Telecel and AT, with more as Ovaal expands." },
    ],
  },
] as const;

export type FeatureKind = (typeof features)[number]["kind"];
