import { Info } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/sections/PageHero";
import { CONTACT_EMAILS } from "@/lib/marketing";
import { breadcrumbJsonLd } from "@/lib/seo";

/** Placeholder legal page: hero, "being updated" notice, and section headings awaiting final text. */
export default function LegalPlaceholder({
  title,
  path,
  summary,
  sections,
}: {
  title: string;
  path: string;
  summary: string;
  sections: string[];
}) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(title, path)} />
      <PageHero eyebrow="Legal" title={title} subtitle={summary} />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div
            role="note"
            className="border-primary/50 bg-primary/10 flex gap-3 rounded-xl border p-5"
          >
            <Info
              aria-hidden
              className="text-primary-ink mt-0.5 h-5 w-5 shrink-0"
            />
            <p className="text-foreground text-sm leading-relaxed">
              <strong className="font-semibold">
                This page is being updated.
              </strong>{" "}
              Full legal text coming soon. For questions, contact{" "}
              <a
                href={`mailto:${CONTACT_EMAILS.legal}`}
                className="text-primary-ink font-semibold underline underline-offset-2"
              >
                {CONTACT_EMAILS.legal}
              </a>
              .
            </p>
          </div>

          <ol className="mt-12 space-y-8">
            {sections.map((heading, i) => (
              <li
                key={heading}
                className="border-border border-b pb-8 last:border-b-0"
              >
                <h2 className="text-foreground text-xl font-semibold">
                  <span className="text-muted-foreground mr-2">{i + 1}.</span>
                  {heading}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  Content coming soon.
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
