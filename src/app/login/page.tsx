"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";
import { saveSession } from "@/lib/auth";

const inputClass =
  "w-full rounded-md border border-border bg-background py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20";

/** Only allow same-site relative redirects after login. */
function safeNext(next: string | null) {
  return next && next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/dashboard";
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Login failed");
      if (!data.token)
        throw new Error("Login failed — no session token returned");
      saveSession(data.token, data.user);
      window.location.href = safeNext(
        new URLSearchParams(window.location.search).get("next"),
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="bg-primary/3 h-[500px] w-[500px] rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image
              src="/brand/diliate-logo.png"
              alt=""
              width={40}
              height={40}
              className="rounded-lg"
              priority
            />
            <span className="text-foreground text-xl font-bold">Diliate</span>
          </Link>
          <h1 className="text-foreground mt-6 text-2xl font-bold">
            Welcome back
          </h1>
          <p className="text-secondary-foreground mt-2 text-sm">
            Sign in to your Diliate account
          </p>
        </div>

        <div className="border-border bg-card rounded-xl border p-8">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="border-border bg-popover text-foreground hover:bg-secondary mb-6 flex w-full items-center justify-center gap-3 rounded-md border px-4 py-3 text-sm font-medium transition-all"
          >
            <Globe aria-hidden className="h-4 w-4 text-blue-700" />
            Continue with Google
          </button>

          <div className="mb-6 flex items-center gap-3">
            <div className="border-border flex-1 border-t" />
            <span className="text-muted-foreground text-xs">
              or sign in with email
            </span>
            <div className="border-border flex-1 border-t" />
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
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
                  id="login-email"
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

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="text-secondary-foreground text-sm font-medium"
                >
                  Password
                </label>
                <span className="text-muted-foreground text-xs">
                  Forgot password? Contact support
                </span>
              </div>
              <div className="relative">
                <Lock
                  aria-hidden
                  className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Your password"
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
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-secondary-foreground mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-primary-ink hover:text-primary-ink/90 font-medium"
          >
            Create one free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
