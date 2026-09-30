import Reveal from "@/components/Reveal";

/** Top-of-page hero used by every marketing subpage: eyebrow label, h1, and subheading. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  /** Optional CTAs rendered under the subtitle. */
  children?: React.ReactNode;
}) {
  return (
    <section className="border-border bg-card relative overflow-hidden border-b">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <Reveal className="relative mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <p className="text-primary-ink mb-3 text-sm font-semibold tracking-widest uppercase">
          {eyebrow}
        </p>
        <h1 className="text-foreground text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="text-secondary-foreground mx-auto mt-5 max-w-2xl text-lg leading-relaxed">
          {subtitle}
        </p>
        {children && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {children}
          </div>
        )}
      </Reveal>
    </section>
  );
}
