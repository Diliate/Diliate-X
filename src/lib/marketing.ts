import {
  BarChart3,
  CodeXml,
  Globe,
  Mail,
  Plug,
  Send,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { PLANS, type PlanId } from "@/lib/plans";

/** Marketing-site content shared by the landing, features, pricing and products pages. */

export interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const FEATURES: Feature[] = [
  {
    icon: Send,
    title: "Bulk Email Campaigns",
    desc: "Send thousands of emails simultaneously through high-deliverability infrastructure for unmatched throughput.",
  },
  {
    icon: Mail,
    title: "Gmail OAuth sending",
    desc: "Connect your Gmail accounts via OAuth2 for direct API sending — no SMTP limits, higher deliverability.",
  },
  {
    icon: Zap,
    title: "Multi-Page Campaigns",
    desc: "Send the same template via different IPs at the same time. Multiply your sending capacity across up to 4 simultaneous pages.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    desc: "Track sent counts, failed emails, and campaign status in real time. Know exactly what's happening with your sends.",
  },
  {
    icon: Globe,
    title: "Smart sending agents",
    desc: "Your emails go out through dedicated sending agents — fully isolated, scalable, and under your control.",
  },
  {
    icon: Shield,
    title: "Attachment Support",
    desc: "Attach PDFs, images, and files to your campaigns. Full base64 attachment support across all sending modes.",
  },
];

export interface PricingTier {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  emails: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlight: boolean;
}

const TIER_DETAILS: Record<
  PlanId,
  Omit<PricingTier, "id" | "name" | "price" | "emails" | "period">
> = {
  free: {
    description: "Perfect for testing and small campaigns",
    features: [
      "50 emails per month",
      "1 email campaign",
      "Basic analytics",
      "SMTP sending",
      "Email support",
    ],
    cta: "Get Started Free",
    href: "/signup",
    highlight: false,
  },
  starter: {
    description: "For growing businesses and small teams",
    features: [
      "5,000 emails per month",
      "Unlimited campaigns",
      "Advanced analytics",
      "Gmail OAuth sending",
      "High deliverability infrastructure",
      "Priority support",
    ],
    cta: "Start Starter",
    href: "/signup?plan=starter",
    highlight: true,
  },
  pro: {
    description: "For high-volume senders and agencies",
    features: [
      "25,000 emails per month",
      "Unlimited campaigns",
      "Real-time analytics",
      "Gmail OAuth + Bulk sending",
      "Multi-page campaigns",
      "Clone & reuse campaigns",
      "Dedicated support",
    ],
    cta: "Start Pro",
    href: "/signup?plan=pro",
    highlight: false,
  },
  business: {
    description: "For enterprises with massive sending needs",
    features: [
      "100,000 emails per month",
      "Everything in Pro",
      "Priority infrastructure",
      "Connected email accounts",
      "API access",
      "SLA + dedicated manager",
    ],
    cta: "Talk to Sales",
    href: "/contact?topic=sales",
    highlight: false,
  },
};

/** Pricing tiers: names/prices come from PLANS so pricing and signup never disagree. */
export const PRICING_TIERS: PricingTier[] = PLANS.map((plan) => ({
  id: plan.id,
  name: plan.name,
  price: plan.price,
  period: plan.id === "free" ? "forever" : "per month",
  emails: `${plan.monthlyEmails.toLocaleString("en-US")} emails/month`,
  ...TIER_DETAILS[plan.id],
}));

export interface Product {
  /** Anchor id on /products, used by footer links like /products#email-api. */
  id: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  desc: string;
  points: string[];
  status: "Available" | "Business plan" | "Coming soon";
  href: string;
  cta: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "campaigns",
    icon: Send,
    name: "Diliate Campaigns",
    tagline: "Bulk email, without the bulk headaches",
    desc: "Compose, schedule and launch campaigns to thousands of recipients from one dashboard, sent under your own company identity.",
    points: [
      "Unlimited campaigns on paid plans",
      "Multi-page sending across up to 4 routes",
      "Attachments on every sending mode",
    ],
    status: "Available",
    href: "/signup",
    cta: "Start sending",
  },
  {
    id: "email-api",
    icon: CodeXml,
    name: "Email API",
    tagline: "Send from your own product",
    desc: "Trigger transactional and bulk sends from your backend over a simple REST API, using the same deliverability stack as Campaigns.",
    points: [
      "REST endpoints with bearer-token auth",
      "Per-message delivery status",
      "Same limits and reporting as the dashboard",
    ],
    status: "Business plan",
    href: "/contact?topic=sales",
    cta: "Talk to Sales",
  },
  {
    id: "analytics",
    icon: BarChart3,
    name: "Analytics",
    tagline: "See every send as it happens",
    desc: "Live counters for sent, delivered and failed emails, plus open, click and bounce rates per campaign.",
    points: [
      "Real-time campaign status",
      "Open, click and bounce rates",
      "Usage against your monthly allowance",
    ],
    status: "Available",
    href: "/features",
    cta: "See features",
  },
  {
    id: "integrations",
    icon: Plug,
    name: "Integrations",
    tagline: "Connect the accounts you already use",
    desc: "Link Gmail accounts over OAuth to send through Google's infrastructure, with more providers on the roadmap.",
    points: [
      "Gmail over OAuth — no passwords stored",
      "SMTP sending on every plan",
      "More providers coming soon",
    ],
    status: "Available",
    href: "/features",
    cta: "See features",
  },
  {
    id: "infrastructure",
    icon: Globe,
    name: "Sending Infrastructure",
    tagline: "Deliverability you don't have to manage",
    desc: "Dedicated, isolated sending agents that scale with your volume — priority capacity on the Business plan.",
    points: [
      "Isolated agents per account",
      "Priority infrastructure on Business",
      "99.9% uptime target",
    ],
    status: "Available",
    href: "/pricing",
    cta: "View pricing",
  },
  {
    id: "security",
    icon: Shield,
    name: "Account Security",
    tagline: "Built-in, not bolted on",
    desc: "OAuth-based connections, scoped tokens and verified company identities keep your sending reputation yours.",
    points: [
      "Company website verification at signup",
      "OAuth connections instead of passwords",
      "SLA and dedicated manager on Business",
    ],
    status: "Available",
    href: "/about",
    cta: "About Diliate",
  },
];

/** Placeholder inboxes — replace with real addresses before launch. */
export const CONTACT_EMAILS = {
  general: "hello@diliate.com",
  sales: "sales@diliate.com",
  support: "support@diliate.com",
} as const;
