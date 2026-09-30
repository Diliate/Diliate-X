import Link from "next/link";
import { CheckCircle, ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/marketing";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  name: "All Products",
  description:
    "Explore Diliate's products: bulk email campaigns, the Email API, real-time analytics, Gmail integrations and managed sending infrastructure.",
  path: "/products",
});

const statusStyles = {
  Available: "bg-green-50 text-green-700",
  "Business plan": "bg-primary/15 text-primary-ink",
  "Coming soon": "bg-muted text-muted-foreground",
} as const;

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("All Products", "/products")} />
      <PageHero
        eyebrow="Products"
        title="One platform for every email you send"
        subtitle="From one-off campaigns to API-driven sends, every Diliate product runs on the same deliverability stack and shows up in the same dashboard."
      />

      <section className="py-24">
        <ul className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal
              as="li"
              key={product.id}
              id={product.id}
              delay={i}
              className="border-border bg-card hover:border-primary/40 flex scroll-mt-24 flex-col rounded-xl border p-6 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="bg-primary/10 flex h-11 w-11 items-center justify-center rounded-lg">
                  <product.icon
                    aria-hidden
                    className="text-primary-ink h-5 w-5"
                  />
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    statusStyles[product.status],
                  )}
                >
                  {product.status}
                </span>
              </div>
              <h2 className="text-foreground mt-5 text-xl font-semibold">
                {product.name}
              </h2>
              <p className="text-primary-ink mt-1 text-sm font-medium">
                {product.tagline}
              </p>
              <p className="text-secondary-foreground mt-3 text-sm leading-relaxed">
                {product.desc}
              </p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {product.points.map((point) => (
                  <li
                    key={point}
                    className="text-secondary-foreground flex items-start gap-2 text-sm"
                  >
                    <CheckCircle
                      aria-hidden
                      className="text-primary-ink mt-0.5 h-4 w-4 shrink-0"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={product.href}
                className="text-primary-ink mt-6 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
              >
                {product.cta} <ChevronRight aria-hidden className="h-4 w-4" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Not sure which product fits?"
        subtitle="Start free and add products as you grow, or talk to us about your sending volume."
        secondary={{ href: "/contact?topic=sales", label: "Talk to Sales" }}
      />
    </>
  );
}
