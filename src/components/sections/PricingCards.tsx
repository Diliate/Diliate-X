import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { PRICING_TIERS } from "@/lib/marketing";

/** The four plan cards, with the highlighted tier marked "Most Popular". */
export default function PricingCards() {
  return (
    <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {PRICING_TIERS.map((plan, i) => (
        <Reveal
          as="li"
          key={plan.id}
          delay={i}
          className={cn(
            "relative flex flex-col rounded-xl border p-6",
            plan.highlight
              ? "border-primary bg-primary/5 shadow-[0_0_40px_-12px_var(--primary)]"
              : "border-border bg-card",
          )}
        >
          {plan.highlight && (
            <span className="bg-primary text-primary-foreground absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-bold">
              Most Popular
            </span>
          )}
          <h3 className="text-foreground text-lg font-bold">{plan.name}</h3>
          <p className="text-secondary-foreground mt-1 text-sm">
            {plan.description}
          </p>
          <p className="mt-4">
            <span className="text-foreground text-4xl font-bold">
              {plan.price}
            </span>
            <span className="text-secondary-foreground ml-1 text-sm">
              {plan.period}
            </span>
          </p>
          <p className="text-primary-ink mt-2 text-sm font-medium">
            {plan.emails}
          </p>
          <ul className="mt-6 mb-8 flex-1 space-y-3">
            {plan.features.map((feat) => (
              <li
                key={feat}
                className="text-secondary-foreground flex items-center gap-2 text-sm"
              >
                <CheckCircle
                  aria-hidden
                  className="text-primary-ink h-4 w-4 shrink-0"
                />
                {feat}
              </li>
            ))}
          </ul>
          <Link
            href={plan.href}
            className={cn(
              "block rounded-md py-2.5 text-center text-sm font-semibold transition-all",
              plan.highlight
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "border-border text-foreground hover:bg-secondary border",
            )}
          >
            {plan.cta}
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
