"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ChevronRight, Send, Users, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import FeatureGrid from "@/components/sections/FeatureGrid";
import CtaBand from "@/components/sections/CtaBand";
import { FEATURES, PRICING_TIERS } from "@/lib/marketing";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Diliate",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/diliate-logo.png`,
  sameAs: ["https://github.com/Diliate"],
};

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: EASE },
  }),
};

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 2s", label: "Send latency" },
  { value: "10M+", label: "Emails sent" },
  { value: "50+", label: "Countries reached" },
];

const steps = [
  {
    step: "01",
    icon: Users,
    title: "Create your account",
    desc: "Sign up in minutes. No credit card required for the free plan.",
  },
  {
    step: "02",
    icon: Mail,
    title: "Create a campaign",
    desc: "Add your recipient list, compose your email, add attachments, and configure sending mode.",
  },
  {
    step: "03",
    icon: Send,
    title: "Send & track",
    desc: "Hit send and watch real-time delivery stats roll in. Monitor your campaign from any device.",
  },
];

/** Section heading block shared by the landing sections. */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-16 text-center">
      <p className="text-primary-ink mb-3 text-sm font-semibold tracking-widest uppercase">
        {eyebrow}
      </p>
      <h2 className="text-foreground text-4xl font-bold">{title}</h2>
      {subtitle && <p className="text-secondary-foreground mt-4">{subtitle}</p>}
    </Reveal>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      {/* ── Hero ── */}
      <section className="relative flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
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
            <Zap aria-hidden className="h-3.5 w-3.5" />
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-8 py-3.5 text-base font-semibold transition-all hover:shadow-[0_0_30px_-6px_var(--primary)]"
            >
              Start for Free
              <ChevronRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="border-border text-foreground hover:bg-secondary flex items-center gap-2 rounded-md border px-8 py-3.5 text-base font-semibold transition-all"
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
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={i} className="text-center">
              <div className="text-primary-ink text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-secondary-foreground mt-1 text-sm">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── Features preview ── */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to send at scale"
            subtitle="Built by email senders, for email senders — the same engine powering MailEngine Pro, now on the web."
          />
          <FeatureGrid features={FEATURES.slice(0, 3)} />
          <div className="mt-10 text-center">
            <Link
              href="/features"
              className="text-primary-ink inline-flex items-center gap-1 text-sm font-semibold hover:underline"
            >
              See all features <ChevronRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-border bg-card border-y py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="How It Works"
            title="From signup to sending in minutes"
          />
          <ol className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i} className="text-center">
                <div className="border-primary/30 bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border">
                  <step.icon aria-hidden className="text-primary-ink h-6 w-6" />
                </div>
                <div className="text-muted-foreground mb-1 text-xs font-bold tracking-widest">
                  {step.step}
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-secondary-foreground text-sm">{step.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Pricing preview ── */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, transparent pricing"
            subtitle="Start free. Scale as you grow. No hidden fees."
          />
          <ul className="border-border bg-card grid divide-y rounded-xl border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {PRICING_TIERS.map((plan, i) => (
              <Reveal
                as="li"
                key={plan.id}
                delay={i}
                className="border-border p-6 text-center"
              >
                <p className="text-foreground font-semibold">{plan.name}</p>
                <p className="mt-2">
                  <span className="text-foreground text-3xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-secondary-foreground ml-1 text-sm">
                    {plan.period}
                  </span>
                </p>
                <p className="text-primary-ink mt-1 text-sm">{plan.emails}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/pricing"
              className="border-border text-foreground hover:bg-secondary rounded-md border px-6 py-3 text-sm font-semibold transition-all"
            >
              View Pricing
            </Link>
            <Link
              href="/contact?topic=sales"
              className="text-primary-ink text-sm font-semibold hover:underline"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

      <CtaBand secondary={{ href: "/features", label: "See Features" }} />
    </>
  );
}
