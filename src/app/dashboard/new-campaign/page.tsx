"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import { apiFetch } from "@/lib/dashboard";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-sm font-medium text-secondary-foreground";

/** Splits a free-form recipient list (newlines, commas, semicolons) into unique valid/invalid addresses. */
function parseRecipients(raw: string) {
  const entries = [
    ...new Set(
      raw
        .split(/[\s,;]+/)
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean),
    ),
  ];
  return {
    valid: entries.filter((e) => EMAIL_RE.test(e)),
    invalid: entries.filter((e) => !EMAIL_RE.test(e)),
  };
}

export default function NewCampaignPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    subject: "",
    fromName: "",
    fromEmail: "",
    replyTo: "",
    htmlBody: "",
    recipients: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const recipients = useMemo(
    () => parseRecipients(form.recipients),
    [form.recipients],
  );

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (recipients.valid.length === 0) {
      setError("Add at least one valid recipient email address.");
      return;
    }
    if (recipients.invalid.length > 0) {
      setError(
        `Fix or remove invalid recipients: ${recipients.invalid.slice(0, 5).join(", ")}`,
      );
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch("/api/campaigns", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          subject: form.subject.trim(),
          fromName: form.fromName.trim(),
          fromEmail: form.fromEmail.trim(),
          replyTo: form.replyTo.trim() || undefined,
          htmlBody: form.htmlBody,
          recipients: recipients.valid,
        }),
      });
      router.push("/dashboard/campaigns");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to create campaign",
      );
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">New Campaign</h1>
        <p className="text-secondary-foreground mt-1 text-sm">
          Compose your email and launch it to your recipients.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campaign details */}
        <fieldset className="border-border bg-card space-y-4 rounded-xl border p-5">
          <legend className="text-foreground px-1 text-sm font-semibold">
            Campaign
          </legend>
          <div>
            <label htmlFor="campaign-name" className={labelClass}>
              Campaign Name
            </label>
            <input
              id="campaign-name"
              required
              value={form.name}
              onChange={update("name")}
              placeholder="Q4 Newsletter"
              className={inputClass}
            />
          </div>
        </fieldset>

        {/* Sender + content */}
        <fieldset className="border-border bg-card space-y-4 rounded-xl border p-5">
          <legend className="text-foreground px-1 text-sm font-semibold">
            Email
          </legend>
          <div>
            <label htmlFor="campaign-subject" className={labelClass}>
              Subject
            </label>
            <input
              id="campaign-subject"
              required
              value={form.subject}
              onChange={update("subject")}
              placeholder="Your October update"
              className={inputClass}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="campaign-from-name" className={labelClass}>
                From Name
              </label>
              <input
                id="campaign-from-name"
                required
                value={form.fromName}
                onChange={update("fromName")}
                placeholder="Diliate Team"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="campaign-from-email" className={labelClass}>
                From Email
              </label>
              <input
                id="campaign-from-email"
                type="email"
                required
                value={form.fromEmail}
                onChange={update("fromEmail")}
                placeholder="hello@yourdomain.com"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="campaign-reply-to" className={labelClass}>
              Reply-To{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <input
              id="campaign-reply-to"
              type="email"
              value={form.replyTo}
              onChange={update("replyTo")}
              placeholder="support@yourdomain.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="campaign-html" className={labelClass}>
              HTML Body
            </label>
            <textarea
              id="campaign-html"
              required
              rows={12}
              value={form.htmlBody}
              onChange={update("htmlBody")}
              placeholder="<h1>Hello!</h1><p>Your message here…</p>"
              spellCheck={false}
              className={`${inputClass} font-mono text-xs`}
            />
          </div>
        </fieldset>

        {/* Recipients */}
        <fieldset className="border-border bg-card space-y-2 rounded-xl border p-5">
          <legend className="text-foreground px-1 text-sm font-semibold">
            Recipients
          </legend>
          <label htmlFor="campaign-recipients" className={labelClass}>
            One email per line (commas also work)
          </label>
          <textarea
            id="campaign-recipients"
            required
            rows={8}
            value={form.recipients}
            onChange={update("recipients")}
            placeholder={"jane@example.com\njohn@example.com"}
            aria-describedby="recipients-count"
            spellCheck={false}
            className={`${inputClass} font-mono text-xs`}
          />
          <p
            id="recipients-count"
            className="text-secondary-foreground text-xs"
            aria-live="polite"
          >
            {recipients.valid.length} valid recipient
            {recipients.valid.length === 1 ? "" : "s"}
            {recipients.invalid.length > 0 && (
              <span className="text-red-400">
                {" "}
                · {recipients.invalid.length} invalid
              </span>
            )}
          </p>
        </fieldset>

        <div className="flex justify-end gap-3">
          <Link
            href="/dashboard/campaigns"
            className="border-border text-secondary-foreground hover:bg-secondary hover:text-foreground rounded-md border px-4 py-2.5 text-sm font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Play aria-hidden className="h-4 w-4" />
            {submitting ? "Launching…" : "Launch Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
}
