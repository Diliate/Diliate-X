/** Plan ids as sent to Railway in the signup payload. */
export type PlanId = "free" | "starter" | "pro" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  emails: string;
  features: [string, string, string];
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    emails: "50 emails/mo",
    features: ["1 email campaign", "Basic analytics", "Email support"],
  },
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    period: "/mo",
    emails: "5,000 emails/mo",
    features: [
      "Unlimited campaigns",
      "Gmail OAuth sending",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "/mo",
    emails: "25,000 emails/mo",
    features: [
      "Real-time analytics",
      "Multi-page campaigns",
      "Dedicated support",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: "$129",
    period: "/mo",
    emails: "100,000 emails/mo",
    features: [
      "Priority infrastructure",
      "API access",
      "SLA + dedicated manager",
    ],
  },
];

/** Resolves a `?plan=` value to a known plan, or `undefined` when missing/unknown. */
export function findPlan(id: string | string[] | undefined): Plan | undefined {
  return typeof id === "string"
    ? PLANS.find((p) => p.id === id.toLowerCase())
    : undefined;
}
