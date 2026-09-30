import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";

/** Closing call-to-action band: primary signup button plus an optional secondary link. */
export default function CtaBand({
  title = "Ready to send at scale?",
  subtitle = "Join businesses that trust Diliate to deliver their most important emails.",
  secondary,
}: {
  title?: string;
  subtitle?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="border-border bg-card border-t py-24">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-foreground text-4xl font-bold">{title}</h2>
        <p className="text-secondary-foreground mt-4">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-8 py-3.5 text-base font-semibold transition-all hover:shadow-[0_0_30px_-6px_var(--primary)]"
          >
            Get Started Free
            <ChevronRight aria-hidden className="h-4 w-4" />
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="border-border text-foreground hover:bg-secondary rounded-md border px-8 py-3.5 text-base font-semibold transition-all"
            >
              {secondary.label}
            </Link>
          )}
        </div>
        <p className="text-secondary-foreground mt-4 text-sm">
          No credit card required • 50 emails free
        </p>
      </Reveal>
    </section>
  );
}
