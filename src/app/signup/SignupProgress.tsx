import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Plan", "Details", "Welcome"];

/** "Step 1 ── Step 2 ── Step 3" indicator; `current` is 1-based. */
export default function SignupProgress({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol
      aria-label="Signup progress"
      className="mx-auto mb-10 flex max-w-md items-center"
    >
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li
            key={label}
            aria-current={active ? "step" : undefined}
            className={cn(
              "flex items-center",
              i < STEPS.length - 1 && "flex-1",
            )}
          >
            <span className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                  active &&
                    "border-signup-accent bg-signup-accent text-primary-foreground",
                  done && "border-signup-accent text-primary-ink",
                  !active && !done && "border-border text-secondary-foreground",
                )}
              >
                {done ? <Check aria-hidden className="h-4 w-4" /> : step}
              </span>
              <span
                className={cn(
                  "text-xs",
                  active
                    ? "text-primary-ink font-semibold"
                    : "text-secondary-foreground",
                )}
              >
                Step {step}
                <span className="sr-only"> of {STEPS.length}:</span>{" "}
                <span className="hidden sm:inline">· {label}</span>
                <span className="sr-only sm:hidden"> {label}</span>
              </span>
            </span>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "mx-2 mb-5 h-px flex-1",
                  done ? "bg-signup-accent" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
