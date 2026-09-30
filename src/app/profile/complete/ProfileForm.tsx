"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { clearSession } from "@/lib/auth";
import { apiFetch } from "@/lib/dashboard";
import { CONTACT_RANGES, type CountryOption } from "@/lib/countries";

type FieldName =
  | "firstName"
  | "lastName"
  | "phone"
  | "companyName"
  | "websiteUrl"
  | "country"
  | "contactCount";

type FormState = Record<FieldName, string>;

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  companyName: "",
  websiteUrl: "",
  country: "",
  contactCount: "",
};

const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;
const DOMAIN_RE = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i;

function validate(f: FormState): Partial<Record<FieldName, string>> {
  const e: Partial<Record<FieldName, string>> = {};
  if (!f.firstName.trim()) e.firstName = "First name is required";
  if (!f.lastName.trim()) e.lastName = "Last name is required";
  if (!PHONE_RE.test(f.phone.trim())) e.phone = "Enter a valid phone number";
  if (!f.companyName.trim()) e.companyName = "Company name is required";
  if (!DOMAIN_RE.test(f.websiteUrl.trim()))
    e.websiteUrl = "Enter your website, e.g. acme.com";
  if (!f.country) e.country = "Select your country";
  if (!f.contactCount) e.contactCount = "Select how many contacts you have";
  return e;
}

/** Maps the Railway profile row (snake_case) onto the form, keeping blanks for missing values. */
function formFromProfile(data: unknown): Partial<FormState> {
  const u = (data as { user?: Record<string, unknown> })?.user ?? {};
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  const [first = "", ...rest] = s(u.name).split(" ");
  return {
    firstName: s(u.first_name) || first,
    lastName: s(u.last_name) || rest.join(" "),
    phone: s(u.phone),
    companyName: s(u.company_name),
    websiteUrl: s(u.website_url),
    country: s(u.country),
    contactCount: s(u.contact_count),
  };
}

const inputClass = (invalid: boolean) =>
  cn(
    "bg-background text-foreground placeholder:text-muted-foreground w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors",
    "focus:border-primary-ink focus:ring-primary/40 focus:ring-2",
    invalid ? "border-red-500" : "border-border",
  );

/** Profile completion form: POSTs to /api/user/profile/complete, then returns to the dashboard. */
export default function ProfileForm({
  countries,
}: {
  countries: CountryOption[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [formError, setFormError] = useState("");
  const [loadNote, setLoadNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Pre-fill whatever the account already has (e.g. name from signup).
    apiFetch("/api/user/profile")
      .then((data) => {
        const prefill = formFromProfile(data);
        setForm((f) => {
          const next = { ...f };
          for (const key of Object.keys(prefill) as FieldName[]) {
            if (!next[key] && prefill[key]) next[key] = prefill[key]!;
          }
          return next;
        });
      })
      .catch(() =>
        setLoadNote(
          "We couldn't load your saved details — please fill in the form.",
        ),
      );
  }, []);

  const set =
    (name: FieldName) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setForm((f) => ({ ...f, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

  const control = (name: FieldName) => ({
    id: `profile-${name}`,
    name,
    value: form[name],
    onChange: set(name),
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `profile-${name}-error` : undefined,
    className: inputClass(Boolean(errors[name])),
  });

  const label = (name: FieldName, text: string) => (
    <label
      htmlFor={`profile-${name}`}
      className="text-foreground mb-1.5 block text-sm font-medium"
    >
      {text}
    </label>
  );

  const fieldError = (name: FieldName) =>
    errors[name] ? (
      <p id={`profile-${name}-error`} className="mt-1.5 text-xs text-red-700">
        {errors[name]}
      </p>
    ) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const found = validate(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`profile-${first}`)?.focus();
      return;
    }

    setSaving(true);
    try {
      await apiFetch("/api/user/profile/complete", {
        method: "POST",
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(form).map(([k, v]) => [k, v.trim()]),
          ),
        ),
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Could not save your profile. Please try again.",
      );
      setSaving(false);
    }
  };

  const signOut = () => {
    clearSession();
    window.location.href = "/login";
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border-border bg-card rounded-2xl border p-6 shadow-sm sm:p-8"
    >
      {formError && (
        <div
          role="alert"
          className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {formError}
        </div>
      )}
      {loadNote && !formError && (
        <p className="text-muted-foreground mb-6 text-sm">{loadNote}</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
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
          {label("phone", "Phone")}
          <input
            {...control("phone")}
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 123 4567"
          />
          {fieldError("phone")}
        </div>
        <div>
          {label("companyName", "Company Name")}
          <input {...control("companyName")} autoComplete="organization" />
          {fieldError("companyName")}
        </div>
        <div className="sm:col-span-2">
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
          {label("contactCount", "Contact Count")}
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
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-primary text-primary-foreground hover:bg-primary/90 mt-8 flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving && (
          <Loader2
            aria-hidden
            className="h-4 w-4 animate-spin motion-reduce:animate-none"
          />
        )}
        {saving ? "Saving…" : "Complete Profile"}
      </button>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Not you?{" "}
        <button
          type="button"
          onClick={signOut}
          className="text-foreground font-medium underline underline-offset-2"
        >
          Sign out
        </button>
      </p>
    </form>
  );
}
