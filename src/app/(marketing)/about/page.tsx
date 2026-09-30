import Link from "next/link";
import { Gauge, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  name: "About",
  description:
    "Diliate makes high-volume email simple, reliable and on-brand. Learn about our mission, what we value, and how we work.",
  path: "/about",
});

const values = [
  {
    icon: Gauge,
    title: "Reliability first",
    desc: "Email is often the most important message a business sends. We treat every send like it matters — because it does.",
  },
  {
    icon: ShieldCheck,
    title: "Your identity, protected",
    desc: "Verified company identities and OAuth connections keep your sending reputation yours and nobody else's.",
  },
  {
    icon: Sparkles,
    title: "Simple by default",
    desc: "Powerful sending shouldn't need a manual. Every feature has to earn its place on the screen.",
  },
  {
    icon: HeartHandshake,
    title: "Honest pricing",
    desc: "Clear monthly allowances, no surprise overages, and a free plan that stays free.",
  },
];

const stats = [
  { value: "10M+", label: "Emails sent" },
  { value: "50+", label: "Countries reached" },
  { value: "99.9%", label: "Uptime target" },
  { value: "< 2s", label: "Send latency" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("About", "/about")} />
      <PageHero
        eyebrow="About Diliate"
        title="We make high-volume email feel simple"
        subtitle="Diliate grew out of MailEngine Pro, a desktop tool built by email senders who were tired of fragile scripts and opaque delivery. Today it's a web platform for teams that send at scale."
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2">
          <Reveal>
            <h2 className="text-foreground text-3xl font-bold">Our mission</h2>
            <p className="text-secondary-foreground mt-4 leading-relaxed">
              Every business deserves email infrastructure that just works —
              campaigns that go out on time, under their own name, with numbers
              they can trust. We handle the sending agents, deliverability and
              reporting so our customers can focus on what they&apos;re saying,
              not how it gets delivered.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="text-foreground text-3xl font-bold">How we work</h2>
            <p className="text-secondary-foreground mt-4 leading-relaxed">
              We&apos;re a small, product-focused team. We ship in small
              increments, talk to customers every week, and build the features
              senders actually ask for — from multi-page campaigns to real-time
              analytics.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-border bg-card border-y">
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i} className="text-center">
              <div className="text-primary-ink text-3xl font-bold">
                {s.value}
              </div>
              <div className="text-secondary-foreground mt-1 text-sm">
                {s.label}
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mb-12 text-center">
            <h2 className="text-foreground text-3xl font-bold">
              What we value
            </h2>
          </Reveal>
          <ul className="grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                delay={i}
                className="border-border bg-card rounded-xl border p-6"
              >
                <v.icon aria-hidden className="text-primary-ink h-6 w-6" />
                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  {v.title}
                </h3>
                <p className="text-secondary-foreground mt-2 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </Reveal>
            ))}
          </ul>
          <p className="text-secondary-foreground mt-12 text-center text-sm">
            Want to work with us or partner on something?{" "}
            <Link
              href="/contact"
              className="text-primary-ink font-semibold hover:underline"
            >
              Get in touch
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand secondary={{ href: "/contact", label: "Contact Us" }} />
    </>
  );
}
