"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Zap,
  BarChart3,
  Shield,
  Globe,
  ChevronRight,
  CheckCircle,
  Send,
  Users,
} from "lucide-react";

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: EASE },
  }),
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for testing and small campaigns",
    emails: "50 emails/month",
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
  {
    name: "Starter",
    price: "$19",
    period: "per month",
    description: "For growing businesses and small teams",
    emails: "5,000 emails/month",
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
  {
    name: "Pro",
    price: "$49",
    period: "per month",
    description: "For high-volume senders and agencies",
    emails: "25,000 emails/month",
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
  {
    name: "Business",
    price: "$129",
    period: "per month",
    description: "For enterprises with massive sending needs",
    emails: "100,000 emails/month",
    features: [
      "100,000 emails per month",
      "Everything in Pro",
      "Priority infrastructure",
      "Connected email accounts",
      "API access",
      "SLA + dedicated manager",
    ],
    cta: "Contact Sales",
    href: "/signup?plan=business",
    highlight: false,
  },
];

const features = [
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

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 2s", label: "Send latency" },
  { value: "10M+", label: "Emails sent" },
  { value: "50+", label: "Countries reached" },
];

export default function HomePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* ── Navbar ── */}
      <nav className="border-border bg-background/90 fixed top-0 z-50 w-full border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md">
              <Mail className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-foreground text-lg font-bold">Diliate</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-secondary-foreground hover:text-foreground text-sm transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-secondary-foreground hover:text-foreground text-sm transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-secondary-foreground hover:text-foreground text-sm transition-colors"
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-secondary-foreground hover:text-foreground text-sm transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-semibold transition-all"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="bg-primary/5 h-[600px] w-[600px] rounded-full blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="border-primary/30 bg-primary/10 text-primary-ink mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
          >
            <Zap className="h-3.5 w-3.5" />
            Bulk email sending made simple
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="text-foreground mb-6 text-5xl leading-tight font-bold tracking-tight md:text-7xl"
          >
            Send Emails at <span className="text-primary-ink">Scale</span>.
            <br />
            No Limits.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="text-secondary-foreground mx-auto mb-10 max-w-2xl text-lg leading-relaxed"
          >
            Diliate is your all-in-one bulk email marketing platform. Run
            campaigns through dedicated sending agents, connect Gmail accounts
            via OAuth, and track every send in real time.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-8 py-3.5 text-base font-semibold transition-all hover:shadow-[0_0_30px_rgba(245,200,66,0.3)]"
            >
              Start for Free
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="#pricing"
              className="border-border text-foreground hover:border-border hover:bg-secondary flex items-center gap-2 rounded-md border px-8 py-3.5 text-base font-semibold transition-all"
            >
              View Pricing
            </Link>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="text-secondary-foreground mt-6 text-sm"
          >
            Free plan includes 50 emails/month. No credit card required.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-border bg-card border-y">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <div className="text-primary-ink text-3xl font-bold">
                  {stat.value}
                </div>
                <div className="text-secondary-foreground mt-1 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <div className="text-primary-ink mb-3 text-sm font-semibold tracking-widest uppercase">
              Features
            </div>
            <h2 className="text-foreground text-4xl font-bold">
              Everything you need to send at scale
            </h2>
            <p className="text-secondary-foreground mt-4">
              Built by email senders, for email senders — the same engine
              powering MailEngine Pro, now on the web.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="border-border bg-card hover:border-primary/30 hover:bg-card rounded-xl border p-6 transition-all"
              >
                <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
                  <f.icon className="text-primary-ink h-5 w-5" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  {f.title}
                </h3>
                <p className="text-secondary-foreground text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-border bg-card border-y py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <div className="text-primary-ink mb-3 text-sm font-semibold tracking-widest uppercase">
              How It Works
            </div>
            <h2 className="text-foreground text-4xl font-bold">
              From signup to sending in minutes
            </h2>
          </motion.div>

          <div className="relative grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Users,
                title: "Create your account",
                desc: "Sign up with email or Google. No credit card required for the free plan.",
              },
              {
                step: "02",
                icon: Mail,
                title: "Create a campaign",
                desc: "Upload your recipient list, compose your email, add attachments, and configure sending mode.",
              },
              {
                step: "03",
                icon: Send,
                title: "Send & track",
                desc: "Hit send and watch real-time delivery stats roll in. Monitor your campaign from any device.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="relative text-center"
              >
                <div className="border-primary/30 bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border">
                  <step.icon className="text-primary-ink h-6 w-6" />
                </div>
                <div className="text-muted-foreground mb-1 text-xs font-bold tracking-widest">
                  {step.step}
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-secondary-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <div className="text-primary-ink mb-3 text-sm font-semibold tracking-widest uppercase">
              Pricing
            </div>
            <h2 className="text-foreground text-4xl font-bold">
              Simple, transparent pricing
            </h2>
            <p className="text-secondary-foreground mt-4">
              Start free. Scale as you grow. No hidden fees.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className={`relative rounded-xl border p-6 ${
                  plan.highlight
                    ? "border-primary bg-primary/5 shadow-[0_0_40px_rgba(245,200,66,0.1)]"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlight && (
                  <div className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-foreground text-lg font-bold">
                    {plan.name}
                  </h3>
                  <p className="text-secondary-foreground mt-1 text-sm">
                    {plan.description}
                  </p>
                </div>
                <div className="mb-6">
                  <span className="text-foreground text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-secondary-foreground ml-1 text-sm">
                    /{plan.period}
                  </span>
                  <div className="text-primary-ink mt-2 text-sm font-medium">
                    {plan.emails}
                  </div>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="text-secondary-foreground flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="text-primary-ink h-4 w-4 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block rounded-md py-2.5 text-center text-sm font-semibold transition-all ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border-border text-foreground hover:border-border hover:bg-secondary border"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-border bg-card border-t py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-foreground text-4xl font-bold">
              Ready to send at scale?
            </h2>
            <p className="text-secondary-foreground mt-4">
              Join businesses that trust Diliate to deliver their most important
              emails.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-8 py-3.5 text-base font-semibold transition-all hover:shadow-[0_0_30px_rgba(245,200,66,0.3)]"
              >
                Get Started Free
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-secondary-foreground mt-4 text-sm">
              No credit card required • 50 emails free
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-border border-t py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="bg-primary flex h-7 w-7 items-center justify-center rounded-md">
                <Mail className="text-primary-foreground h-4 w-4" />
              </div>
              <span className="text-foreground font-bold">Diliate</span>
            </div>
            <div className="text-secondary-foreground flex items-center gap-6 text-sm">
              <Link href="/privacy" className="hover:text-secondary-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-secondary-foreground">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-secondary-foreground">
                Contact
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2026 Diliate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
