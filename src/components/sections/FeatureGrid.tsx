import Reveal from "@/components/Reveal";
import type { Feature } from "@/lib/marketing";

/** Responsive grid of icon + title + description cards. */
export default function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => (
        <Reveal
          as="li"
          key={f.title}
          delay={i}
          className="border-border bg-card hover:border-primary/40 rounded-xl border p-6 transition-colors"
        >
          <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
            <f.icon aria-hidden className="text-primary-ink h-5 w-5" />
          </div>
          <h3 className="text-foreground mb-2 text-lg font-semibold">
            {f.title}
          </h3>
          <p className="text-secondary-foreground text-sm leading-relaxed">
            {f.desc}
          </p>
        </Reveal>
      ))}
    </ul>
  );
}
