import { Headphones, Mail, MessagesSquare } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/sections/PageHero";
import { CONTACT_EMAILS } from "@/lib/marketing";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import ContactForm, { type ContactTopic } from "./ContactForm";

export const metadata = pageMetadata({
  name: "Contact",
  description:
    "Get in touch with Diliate — sales questions, custom volumes, account support or partnerships. We usually reply within one business day.",
  path: "/contact",
});

const channels = [
  {
    icon: MessagesSquare,
    title: "Sales",
    desc: "Custom volumes, the Email API and Business plans.",
    email: CONTACT_EMAILS.sales,
  },
  {
    icon: Headphones,
    title: "Support",
    desc: "Help with your account, campaigns or sending.",
    email: CONTACT_EMAILS.support,
  },
  {
    icon: Mail,
    title: "Everything else",
    desc: "Partnerships, press and general questions.",
    email: CONTACT_EMAILS.general,
  },
];

const isTopic = (v: unknown): v is ContactTopic =>
  typeof v === "string" && Object.hasOwn(CONTACT_EMAILS, v);

/** Contact page; `?topic=sales|support` pre-selects the form topic (used by "Talk to Sales" CTAs). */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string | string[] }>;
}) {
  const { topic } = await searchParams;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Contact", "/contact")} />
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your sending"
        subtitle="Questions about plans, volumes or your account? Send us a message and we'll usually reply within one business day."
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_1.6fr]">
          <ul className="space-y-4">
            {channels.map((c, i) => (
              <Reveal
                as="li"
                key={c.title}
                delay={i}
                className="border-border bg-card flex gap-4 rounded-xl border p-5"
              >
                <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <c.icon aria-hidden className="text-primary-ink h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-foreground font-semibold">{c.title}</h2>
                  <p className="text-secondary-foreground mt-1 text-sm">
                    {c.desc}
                  </p>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-primary-ink mt-2 inline-block text-sm font-semibold hover:underline"
                  >
                    {c.email}
                  </a>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={1}>
            <ContactForm defaultTopic={isTopic(topic) ? topic : "general"} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
