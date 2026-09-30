"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Stay in the loop" form for future roles. Static for now: nothing is sent or stored —
 * submitting only swaps in a thank-you message. Wire to a backend before relying on it.
 */
export default function InterestForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p
        role="status"
        className="text-foreground mx-auto mt-6 inline-flex items-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm font-medium"
      >
        <CheckCircle2 aria-hidden className="h-5 w-5 text-green-700" />
        Thanks, we&apos;ll be in touch!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:items-start"
    >
      <div className="flex-1 text-left">
        <label htmlFor="careers-email" className="sr-only">
          Email address
        </label>
        <input
          id="careers-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "careers-email-error" : undefined}
          className={cn(
            "bg-background text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3.5 py-2.5 text-sm transition-colors outline-none",
            "focus:border-primary-ink focus:ring-primary/40 focus:ring-2",
            error ? "border-red-500" : "border-border",
          )}
        />
        {error && (
          <p id="careers-email-error" className="mt-1.5 text-xs text-red-700">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-5 py-2.5 text-sm font-semibold transition-all"
      >
        Keep me posted
      </button>
    </form>
  );
}
