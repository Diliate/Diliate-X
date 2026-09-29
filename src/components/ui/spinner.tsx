import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Accessible loading indicator; pass `label` to change the screen-reader text. */
export function Spinner({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="status"
      className={cn("inline-flex items-center justify-center", className)}
    >
      <Loader2
        aria-hidden
        className="text-primary h-5 w-5 animate-spin motion-reduce:animate-none"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
