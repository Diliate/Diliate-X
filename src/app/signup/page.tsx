"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, Globe } from "lucide-react";
import { saveSession } from "@/lib/auth";

const inputClass =
  "w-full rounded-md border border-border bg-background py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Signup failed");
      if (!data.token)
        throw new Error("Signup failed — no session token returned");
      saveSession(
        data.token,
        data.user ?? { name: form.name, email: form.email },
      );
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="bg-primary/3 h-[500px] w-[500px] rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-lg">
              <Mail aria-hidden className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-foreground text-xl font-bold">Diliate</span>
          </Link>
          <h1 className="text-foreground mt-6 text-2xl font-bold">
            Create your account
          </h1>
          <p className="text-secondary-foreground mt-2 text-sm">
            Start with 50 free emails. No credit card required.
          </p>
        </div>

        {/* Card */}
        <div className="border-border bg-card rounded-xl border p-8">
          {/* Google signup */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="border-border bg-popover text-foreground hover:bg-secondary mb-6 flex w-full items-center justify-center gap-3 rounded-md border px-4 py-3 text-sm font-medium transition-all"
          >
            <Globe aria-hidden className="h-4 w-4 text-blue-400" />
            Continue with Google
          </button>

          <div className="mb-6 flex items-center gap-3">
            <div className="border-border flex-1 border-t" />
            <span className="text-muted-foreground text-xs">
              or continue with email
            </span>
            <div className="border-border flex-1 border-t" />
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 rounded-md border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="text-secondary-foreground mb-1.5 block text-sm font-medium"
              >
                Full name
              </label>
              <div className="relative">
                <User
                  aria-hidden
                  className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                />
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${inputClass} pr-4`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="text-secondary-foreground mb-1.5 block text-sm font-medium"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  aria-hidden
                  className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                />
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`${inputClass} pr-4`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="text-secondary-foreground mb-1.5 block text-sm font-medium"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  aria-hidden
                  className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                />
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden className="h-4 w-4" />
                  ) : (
                    <Eye aria-hidden className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-muted-foreground mt-6 text-center text-xs">
            By signing up, you agree to our{" "}
            <Link
              href="/terms"
              className="text-secondary-foreground hover:text-foreground"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-secondary-foreground hover:text-foreground"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <p className="text-secondary-foreground mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary/90 font-medium"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
