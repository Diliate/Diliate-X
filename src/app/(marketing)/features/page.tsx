import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/sections/PageHero";
import FeatureGrid from "@/components/sections/FeatureGrid";
import CtaBand from "@/components/sections/CtaBand";
import { FEATURES } from "@/lib/marketing";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  name: "Features",
  description:
    "Bulk campaigns, Gmail OAuth sending, multi-page campaigns, real-time analytics and attachments — everything Diliate gives you to send at scale.",
  path: "/features",
});

const deepDives = [
  {
    title: "Deliverability built in",
    desc: "Every campaign goes out through isolated sending agents under your verified company identity, so one noisy sender never affects your reputation.",
    points: [
      "Isolated sending agents",
      "Company identity on every email",
      "Website verification at signup",
    ],
  },
  {
    title: "Know what happened to every email",
    desc: "Live counters update while a campaign is sending, and every campaign keeps its sent, delivered and failed totals afterwards.",
    points: [
      "Real-time campaign status",
      "Open, click and bounce rates",
      "Monthly usage against your plan",
    ],
  },
  {
    title: "Scale without re-platforming",
    desc: "Start on the free plan and move up to 100,000 emails a month — or send from your own product with the Email API on Business.",
    points: [
      "50 to 100,000 emails a month",
      "Multi-page sending on Pro",
      "API access on Business",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Features", "/features")} />
      <PageHero
        eyebrow="Features"
        title="Everything you need to send at scale"
        subtitle="Built by email senders, for email senders — the same engine powering MailEngine Pro, now on the web."
      >
        <Link
          href="/signup"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-3 text-sm font-semibold transition-all"
        >
          Start for Free
        </Link>
        <Link
          href="/pricing"
          className="border-border text-foreground hover:bg-secondary rounded-md border px-6 py-3 text-sm font-semibold transition-all"
        >
          View Pricing
        </Link>
      </PageHero>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FeatureGrid features={FEATURES} />
        </div>
      </section>

      <section className="border-border bg-card border-y py-24">
        <div className="mx-auto max-w-5xl space-y-16 px-6">
          {deepDives.map((item, i) => (
            <Reveal
              key={item.title}
              className="grid items-start gap-8 md:grid-cols-2"
            >
              <div className={i % 2 ? "md:order-2" : undefined}>
                <h2 className="text-foreground text-2xl font-bold md:text-3xl">
                  {item.title}
                </h2>
                <p className="text-secondary-foreground mt-4 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <ul className="border-border bg-background space-y-3 rounded-xl border p-6">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="text-foreground flex items-center gap-3 text-sm"
                  >
                    <CheckCircle
                      aria-hidden
                      className="text-primary-ink h-5 w-5 shrink-0"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand secondary={{ href: "/pricing", label: "View Pricing" }} />
    </>
  );
}
