"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT_EMAILS } from "@/lib/marketing";

export type ContactTopic = keyof typeof CONTACT_EMAILS;

const TOPICS: { value: ContactTopic; label: string }[] = [
  { value: "general", label: "General question" },
  { value: "sales", label: "Sales & custom plans" },
  { value: "support", label: "Support for my account" },
  { value: "legal", label: "Legal & privacy" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "message";

const inputClass = (invalid: boolean) =>
  cn(
    "bg-background text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors",
    "focus:border-primary-ink focus:ring-primary/40 focus:ring-2",
    invalid ? "border-red-500" : "border-border",
  );

/** Contact form; sends the message via POST /api/contact. */
export default function ContactForm({
  defaultTopic,
}: {
  defaultTopic: ContactTopic;
}) {
  const emptyForm = {
    name: "",
    email: "",
    company: "",
    topic: defaultTopic,
    message: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [formError, setFormError] = useState("");

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
      if (status === "sent" || status === "error") setStatus("idle");
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) found.name = "Please enter your name";
    if (!EMAIL_RE.test(form.email.trim()))
      found.email = "Enter a valid email address";
    if (form.message.trim().length < 10)
      found.message = "Tell us a little more (at least 10 characters)";
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    const topicLabel =
      TOPICS.find((t) => t.value === form.topic)?.label ?? "Enquiry";
    const company = form.company.trim();
    setStatus("sending");
    setFormError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: `${topicLabel} — ${form.name.trim()}`,
          // The API has no company field, so keep it with the message.
          message: company
            ? `${form.message.trim()}\n\nCompany: ${company}`
            : form.message.trim(),
          topic: form.topic,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(
          data.error ||
            "Could not send your message right now. Please try again later.",
        );
      }
      setStatus("sent");
      setForm(emptyForm);
    } catch (err: unknown) {
      setStatus("error");
      setFormError(
        err instanceof Error
          ? err.message
          : "Could not send your message right now. Please try again later.",
      );
    }
  };

  const control = (key: Field) => ({
    id: `contact-${key}`,
    name: key,
    value: form[key],
    onChange: update(key),
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    className: inputClass(Boolean(errors[key])),
  });

  const error = (key: Field) =>
    errors[key] ? (
      <p id={`contact-${key}-error`} className="mt-1.5 text-xs text-red-700">
        {errors[key]}
      </p>
    ) : null;

  const labelClass = "text-foreground mb-1.5 block text-sm font-medium";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-border bg-card space-y-5 rounded-xl border p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input {...control("name")} autoComplete="name" />
          {error("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            {...control("email")}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
          />
          {error("email")}
        </div>
        <div>
          <label htmlFor="contact-company" className={labelClass}>
            Company{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </label>
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={update("company")}
            className={inputClass(false)}
          />
        </div>
        <div>
          <label htmlFor="contact-topic" className={labelClass}>
            Topic
          </label>
          <select
            id="contact-topic"
            name="topic"
            value={form.topic}
            onChange={update("topic")}
            className={inputClass(false)}
          >
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          {...control("message")}
          rows={6}
          placeholder="How can we help?"
        />
        {error("message")}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {status === "sending" ? (
          <Loader2
            aria-hidden
            className="h-4 w-4 animate-spin motion-reduce:animate-none"
          />
        ) : (
          <Send aria-hidden className="h-4 w-4" />
        )}
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <div aria-live="polite">
        {status === "sent" && (
          <p className="flex items-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <CheckCircle2 aria-hidden className="h-5 w-5 shrink-0" />
            Message sent! We&apos;ll get back to you within 1 business day.
          </p>
        )}
        {status === "error" && (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {formError} You can also email us directly at{" "}
            <a
              href={`mailto:${CONTACT_EMAILS[form.topic]}`}
              className="font-semibold underline underline-offset-2"
            >
              {CONTACT_EMAILS[form.topic]}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
