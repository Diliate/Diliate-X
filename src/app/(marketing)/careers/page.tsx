import { Briefcase, Earth, Rocket, Target } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/sections/PageHero";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import InterestForm from "./InterestForm";

export const metadata = pageMetadata({
  name: "Careers",
  description:
    "Join the Diliate team. We're a small, remote-first team building the future of email infrastructure — see why people work here.",
  path: "/careers",
});

const values = [
  {
    icon: Earth,
    title: "Remote-first",
    desc: "Work from wherever you do your best work. We write things down, keep meetings rare, and trust people with their own schedules.",
  },
  {
    icon: Target,
    title: "High ownership",
    desc: "Everyone owns real parts of the product end to end — from the first sketch to the customer conversation after launch.",
  },
  {
    icon: Rocket,
    title: "Fast shipping",
    desc: "Small increments, shipped often. We'd rather learn from a real release this week than polish a plan for a month.",
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Careers", "/careers")} />
      <PageHero
        eyebrow="Careers"
        title="Join the Diliate Team"
        subtitle="We're a small team building the future of email infrastructure"
      />

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mb-12 text-center">
            <h2 className="text-foreground text-3xl font-bold">Why Diliate?</h2>
          </Reveal>
          <ul className="grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                delay={i}
                className="border-border bg-card rounded-xl border p-6"
              >
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <v.icon aria-hidden className="text-primary-ink h-5 w-5" />
                </div>
                <h3 className="text-foreground mt-4 text-lg font-semibold">
                  {v.title}
                </h3>
                <p className="text-secondary-foreground mt-2 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="open-roles"
        className="border-border bg-card border-t py-24"
      >
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2
              id="open-roles"
              className="text-foreground mb-8 text-center text-3xl font-bold"
            >
              Open Roles
            </h2>
            <div className="border-border bg-background rounded-2xl border border-dashed px-6 py-12 text-center">
              <div className="bg-muted mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                <Briefcase
                  aria-hidden
                  className="text-muted-foreground h-6 w-6"
                />
              </div>
              <p className="text-foreground mt-4 text-lg font-semibold">
                No open roles right now
              </p>
              <p className="text-secondary-foreground mx-auto mt-2 max-w-md text-sm leading-relaxed">
                We&apos;ll post here when we&apos;re hiring. Follow us or drop
                your email to stay in the loop.
              </p>
              <InterestForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
