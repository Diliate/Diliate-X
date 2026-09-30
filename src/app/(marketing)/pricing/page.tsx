import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/sections/PageHero";
import PricingCards from "@/components/sections/PricingCards";
import CtaBand from "@/components/sections/CtaBand";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  name: "Pricing",
  description:
    "Simple, transparent Diliate pricing. Start free with 50 emails a month, or choose Starter, Pro or Business for up to 100,000 emails.",
  path: "/pricing",
});

const faqs = [
  {
    q: "Do I need a credit card to start?",
    a: "No. The Free plan includes 50 emails a month and never asks for a card. You can upgrade whenever you need more volume.",
  },
  {
    q: "When am I charged for a paid plan?",
    a: "Every account starts on Free. Payment is set up after your account is created, and your paid allowance unlocks once payment is complete.",
  },
  {
    q: "What happens if I hit my monthly limit?",
    a: "Sending pauses until your allowance resets at the start of the next month, or until you upgrade.",
  },
  {
    q: "Can I change or cancel my plan later?",
    a: "Yes — move between plans from your dashboard settings. Downgrades take effect at the end of the current billing month.",
  },
  {
    q: "Do you offer custom volumes above 100,000 emails?",
    a: "Yes. Talk to our sales team about custom volumes, dedicated infrastructure and SLAs for your organisation.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Pricing", "/pricing")} />
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        subtitle="Start free. Scale as you grow. No hidden fees — every plan includes the same deliverability stack."
      />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <PricingCards />
          <p className="text-muted-foreground mt-8 text-center text-sm">
            Prices in USD. Paid plans are billed monthly; payment is set up
            after account creation.
          </p>
        </div>
      </section>

      <section className="border-border bg-card border-y py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="text-foreground mb-10 text-center text-3xl font-bold">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group border-border bg-background rounded-lg border px-5 py-4"
              >
                <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {q}
                  <span
                    aria-hidden
                    className="text-primary-ink text-xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <p className="text-secondary-foreground mt-3 text-sm leading-relaxed">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need more than 100,000 emails?"
        subtitle="Custom volumes, dedicated infrastructure and SLAs are available for larger teams."
        secondary={{ href: "/contact?topic=sales", label: "Talk to Sales" }}
      />
    </>
  );
}
