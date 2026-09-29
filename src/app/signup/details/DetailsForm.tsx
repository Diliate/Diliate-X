"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { saveSession } from "@/lib/auth";
import { PENDING_PLAN_STORAGE_KEY, type Plan } from "@/lib/plans";

/** sessionStorage key the welcome step reads `{ firstName, companyName }` from. */
export const WELCOME_STORAGE_KEY = "diliate_signup_welcome";

const CONTACT_RANGES = ["0-500", "500-2k", "2k-10k", "10k+"];
const WEBSITE_ERROR =
  "We couldn't verify your website. Please enter a valid company website.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;
const DOMAIN_RE = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i;

type FieldName =
  | "firstName"
  | "lastName"
  | "phone"
  | "businessEmail"
  | "companyName"
  | "websiteUrl"
  | "country"
  | "contactCount"
  | "password"
  | "confirmPassword";

type FormState = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  businessEmail: "",
  companyName: "",
  websiteUrl: "",
  country: "",
  contactCount: "",
  password: "",
  confirmPassword: "",
};

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.firstName.trim()) e.firstName = "First name is required";
  if (!f.lastName.trim()) e.lastName = "Last name is required";
  if (!PHONE_RE.test(f.phone.trim())) e.phone = "Enter a valid phone number";
  if (!EMAIL_RE.test(f.businessEmail.trim()))
    e.businessEmail = "Enter a valid email address";
  if (!f.companyName.trim()) e.companyName = "Company name is required";
  if (!DOMAIN_RE.test(f.websiteUrl.trim()))
    e.websiteUrl = "Enter your website, e.g. acme.com";
  if (!f.country) e.country = "Select your country";
  if (!f.contactCount) e.contactCount = "Select how many contacts you have";
  if (f.password.length < 8) e.password = "Use at least 8 characters";
  if (f.confirmPassword !== f.password || !f.confirmPassword)
    e.confirmPassword = "Passwords do not match";
  return e;
}

const inputClass = (invalid: boolean) =>
  cn(
    "bg-signup-input w-full rounded-lg border px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors",
    "focus:border-primary-ink focus:ring-primary/40 focus:ring-2",
    invalid ? "border-red-500" : "border-border",
  );

/** Step 2 form: collects account + company details, verifies the website, then creates the account. */
export default function DetailsForm({
  plan,
  countries,
}: {
  plan: Plan;
  countries: { code: string; name: string }[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "creating">(
    "idle",
  );

  const set =
    (name: FieldName) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setForm((f) => ({ ...f, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

  /** Shared props wiring each control to its label and inline error. */
  const control = (name: FieldName) => ({
    id: `signup-${name}`,
    name,
    value: form[name],
    onChange: set(name),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `signup-${name}-error` : undefined,
    className: inputClass(Boolean(errors[name])),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`signup-${firstInvalid}`)?.focus();
      return;
    }

    try {
      setStatus("verifying");
      const checkRes = await fetch("/api/auth/validate-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: form.websiteUrl }),
      });
      if (checkRes.status === 429) {
        throw new Error(
          "Too many attempts. Please wait a minute and try again.",
        );
      }
      const check = (await checkRes.json().catch(() => ({}))) as {
        valid?: boolean;
      };
      if (!check.valid) {
        setErrors({ websiteUrl: WEBSITE_ERROR });
        document.getElementById("signup-websiteUrl")?.focus();
        setStatus("idle");
        return;
      }

      setStatus("creating");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan: plan.id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data.error || "Could not create your account");

      const name = `${form.firstName.trim()} ${form.lastName.trim()}`;
      const companyName = form.companyName.trim();
      if (data.token) {
        saveSession(data.token, {
          name,
          email: form.businessEmail.trim(),
          plan: "free", // every signup starts on Free; paid plans are set up after payment
          companyName,
          ...data.user,
        });
      }
      try {
        sessionStorage.setItem(
          WELCOME_STORAGE_KEY,
          JSON.stringify({ firstName: form.firstName.trim(), companyName }),
        );
      } catch {
        // Welcome page falls back to a generic greeting.
      }
      try {
        // Kept for the future payment step; the account itself is created on Free.
        localStorage.setItem(PENDING_PLAN_STORAGE_KEY, plan.id);
      } catch {
        // The ?plan= param below still carries it to the welcome page.
      }
      router.push(`/signup/welcome?plan=${plan.id}`);
    } catch (err: unknown) {
      setFormError(
        err instanceof Error ? err.message : "Could not create your account",
      );
      setStatus("idle");
    }
  };

  const busy = status !== "idle";
  const fieldError = (name: FieldName) =>
    errors[name] ? (
      <p id={`signup-${name}-error`} className="mt-1.5 text-xs text-red-700">
        {errors[name]}
      </p>
    ) : null;
  const label = (name: FieldName, text: string) => (
    <label
      htmlFor={`signup-${name}`}
      className="text-secondary-foreground mb-1.5 block text-sm font-medium"
    >
      {text}
    </label>
  );

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="text-secondary-foreground mt-2">
          <span className="text-primary-ink font-medium">{plan.name}</span> plan
          · {plan.emails} ·{" "}
          <Link
            href={`/signup?plan=${plan.id}`}
            className="hover:text-foreground underline underline-offset-2"
          >
            Change plan
          </Link>
        </p>
        {plan.id !== "free" && (
          <p className="text-secondary-foreground mt-1.5 text-xs">
            Payment setup after account creation
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-signup-input/40 border-border rounded-2xl border p-6 sm:p-8"
      >
        {formError && (
          <div
            role="alert"
            className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {formError}
          </div>
        )}

        <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
          <div>
            {label("firstName", "First Name")}
            <input {...control("firstName")} autoComplete="given-name" />
            {fieldError("firstName")}
          </div>
          <div>
            {label("lastName", "Last Name")}
            <input {...control("lastName")} autoComplete="family-name" />
            {fieldError("lastName")}
          </div>

          <div>
            {label("phone", "Phone Number")}
            <input
              {...control("phone")}
              type="tel"
              autoComplete="tel"
              placeholder="+1 555 123 4567"
            />
            {fieldError("phone")}
          </div>
          <div>
            {label("businessEmail", "Business Email")}
            <input
              {...control("businessEmail")}
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
            />
            {fieldError("businessEmail")}
          </div>

          <div>
            {label("companyName", "Company Name")}
            <input {...control("companyName")} autoComplete="organization" />
            {fieldError("companyName")}
          </div>
          <div>
            {label("websiteUrl", "Website URL")}
            <input
              {...control("websiteUrl")}
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://company.com"
            />
            {fieldError("websiteUrl")}
          </div>

          <div>
            {label("country", "Country")}
            <select {...control("country")} autoComplete="country">
              <option value="">Select country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            {fieldError("country")}
          </div>
          <div>
            {label("contactCount", "Number of Contacts")}
            <select {...control("contactCount")}>
              <option value="">Select range</option>
              {CONTACT_RANGES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            {fieldError("contactCount")}
          </div>

          <div>
            {label("password", "Password")}
            <input
              {...control("password")}
              type="password"
              autoComplete="new-password"
              placeholder="Min. 8 characters"
            />
            {fieldError("password")}
          </div>
          <div>
            {label("confirmPassword", "Confirm Password")}
            <input
              {...control("confirmPassword")}
              type="password"
              autoComplete="new-password"
            />
            {fieldError("confirmPassword")}
          </div>
        </div>

        <p className="bg-signup-background/60 border-border text-secondary-foreground mt-8 rounded-lg border p-4 text-xs leading-relaxed">
          By signing up you agree that Diliate will send emails on behalf of{" "}
          <span className="text-foreground font-semibold">
            {form.companyName.trim() || "[Company Name]"}
          </span>{" "}
          using our sending infrastructure. Your company name and branding will
          appear in all emails.
        </p>

        <button
          type="submit"
          disabled={busy}
          className="bg-signup-accent hover:bg-signup-accent/90 focus-visible:ring-signup-accent focus-visible:ring-offset-signup-background text-primary-foreground mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy && (
            <Loader2
              aria-hidden
              className="h-4 w-4 animate-spin motion-reduce:animate-none"
            />
          )}
          {status === "verifying"
            ? "Verifying website…"
            : status === "creating"
              ? "Creating account…"
              : "Create Account →"}
        </button>
        <p className="sr-only" aria-live="polite">
          {status === "verifying"
            ? "Verifying your website"
            : status === "creating"
              ? "Creating your account"
              : ""}
        </p>
      </form>
    </div>
  );
}
