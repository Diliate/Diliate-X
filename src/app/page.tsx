"use client";

import Link from "next/link";
import Image from "next/image";
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
  Clock,
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
      "SMTP + Gmail API",
      "Multiple EC2 instances",
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
      "SMTP + Gmail API + Bulk",
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
      "Custom EC2 instances",
      "Gmail pool management",
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
    desc: "Send thousands of emails simultaneously through multiple EC2 instances for unmatched throughput and deliverability.",
  },
  {
    icon: Mail,
    title: "Gmail API Integration",
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
    title: "EC2 SMTP Agents",
    desc: "Your emails go out through dedicated AWS EC2 instances — fully isolated, scalable, and under your control.",
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
    <div className="min-h-screen bg-[#0d0d0d] text-[#f0f0f0]">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#1e1e1e] bg-[#0d0d0d]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f5c842]">
              <Mail className="h-5 w-5 text-[#0d0d0d]" />
            </div>
            <span className="text-lg font-bold text-[#f0f0f0]">Diliate</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-[#888] transition-colors hover:text-[#f0f0f0]">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-[#888] transition-colors hover:text-[#f0f0f0]">
              Pricing
            </Link>
            <Link href="#about" className="text-sm text-[#888] transition-colors hover:text-[#f0f0f0]">
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-[#888] transition-colors hover:text-[#f0f0f0]"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-[#f5c842] px-4 py-2 text-sm font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030]"
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
            backgroundImage: `linear-gradient(#f5c842 1px, transparent 1px), linear-gradient(90deg, #f5c842 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[600px] rounded-full bg-[#f5c842]/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f5c842]/30 bg-[#f5c842]/10 px-4 py-1.5 text-sm text-[#f5c842]"
          >
            <Zap className="h-3.5 w-3.5" />
            Bulk email sending made simple
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-[#f0f0f0] md:text-7xl"
          >
            Send Emails at{" "}
            <span className="text-[#f5c842]">Scale</span>.
            <br />
            No Limits.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[#888]"
          >
            Diliate is your all-in-one bulk email marketing platform. Run campaigns through dedicated
            EC2 agents, connect Gmail accounts via API, and track every send in real time.
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
              className="flex items-center gap-2 rounded-md bg-[#f5c842] px-8 py-3.5 text-base font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030] hover:shadow-[0_0_30px_rgba(245,200,66,0.3)]"
            >
              Start for Free
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="#pricing"
              className="flex items-center gap-2 rounded-md border border-[#2a2a2a] px-8 py-3.5 text-base font-semibold text-[#f0f0f0] transition-all hover:border-[#444] hover:bg-[#1e1e1e]"
            >
              View Pricing
            </Link>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="mt-6 text-sm text-[#555]"
          >
            Free plan includes 50 emails/month. No credit card required.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-[#1e1e1e] bg-[#111]">
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
                <div className="text-3xl font-bold text-[#f5c842]">{stat.value}</div>
                <div className="mt-1 text-sm text-[#666]">{stat.label}</div>
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
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f5c842]">
              Features
            </div>
            <h2 className="text-4xl font-bold text-[#f0f0f0]">Everything you need to send at scale</h2>
            <p className="mt-4 text-[#666]">
              Built by email senders, for email senders — the same engine powering MailEngine Pro,
              now on the web.
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
                className="rounded-xl border border-[#1e1e1e] bg-[#111] p-6 transition-all hover:border-[#f5c842]/30 hover:bg-[#141414]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5c842]/10">
                  <f.icon className="h-5 w-5 text-[#f5c842]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#f0f0f0]">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[#666]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-y border-[#1e1e1e] bg-[#111] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16 text-center"
          >
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f5c842]">
              How It Works
            </div>
            <h2 className="text-4xl font-bold text-[#f0f0f0]">From signup to sending in minutes</h2>
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
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#f5c842]/30 bg-[#f5c842]/10">
                  <step.icon className="h-6 w-6 text-[#f5c842]" />
                </div>
                <div className="mb-1 text-xs font-bold tracking-widest text-[#444]">{step.step}</div>
                <h3 className="mb-2 text-lg font-semibold text-[#f0f0f0]">{step.title}</h3>
                <p className="text-sm text-[#666]">{step.desc}</p>
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
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#f5c842]">
              Pricing
            </div>
            <h2 className="text-4xl font-bold text-[#f0f0f0]">Simple, transparent pricing</h2>
            <p className="mt-4 text-[#666]">Start free. Scale as you grow. No hidden fees.</p>
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
                    ? "border-[#f5c842] bg-[#f5c842]/5 shadow-[0_0_40px_rgba(245,200,66,0.1)]"
                    : "border-[#1e1e1e] bg-[#111]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#f5c842] px-3 py-0.5 text-xs font-bold text-[#0d0d0d]">
                    Most Popular
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-[#f0f0f0]">{plan.name}</h3>
                  <p className="mt-1 text-sm text-[#666]">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#f0f0f0]">{plan.price}</span>
                  <span className="ml-1 text-sm text-[#666]">/{plan.period}</span>
                  <div className="mt-2 text-sm font-medium text-[#f5c842]">{plan.emails}</div>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-[#888]">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[#f5c842]" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block rounded-md py-2.5 text-center text-sm font-semibold transition-all ${
                    plan.highlight
                      ? "bg-[#f5c842] text-[#0d0d0d] hover:bg-[#f0c030]"
                      : "border border-[#2a2a2a] text-[#f0f0f0] hover:border-[#444] hover:bg-[#1e1e1e]"
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
      <section className="border-t border-[#1e1e1e] bg-[#111] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl font-bold text-[#f0f0f0]">
              Ready to send at scale?
            </h2>
            <p className="mt-4 text-[#666]">
              Join businesses that trust Diliate to deliver their most important emails.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-md bg-[#f5c842] px-8 py-3.5 text-base font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030] hover:shadow-[0_0_30px_rgba(245,200,66,0.3)]"
              >
                Get Started Free
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#555]">No credit card required • 50 emails free</p>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1e1e1e] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f5c842]">
                <Mail className="h-4 w-4 text-[#0d0d0d]" />
              </div>
              <span className="font-bold text-[#f0f0f0]">Diliate</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#555]">
              <Link href="/privacy" className="hover:text-[#888]">Privacy</Link>
              <Link href="/terms" className="hover:text-[#888]">Terms</Link>
              <Link href="/contact" className="hover:text-[#888]">Contact</Link>
            </div>
            <p className="text-sm text-[#444]">© 2026 Diliate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
