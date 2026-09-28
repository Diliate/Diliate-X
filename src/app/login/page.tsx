"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";

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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("diliate_token", data.token);
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-4">
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-[#f5c842]/3 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f5c842]">
              <Mail className="h-5 w-5 text-[#0d0d0d]" />
            </div>
            <span className="text-xl font-bold text-[#f0f0f0]">Diliate</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-[#f0f0f0]">Welcome back</h1>
          <p className="mt-2 text-sm text-[#666]">Sign in to your Diliate account</p>
        </div>

        <div className="rounded-xl border border-[#1e1e1e] bg-[#111] p-8">
          <button
            onClick={handleGoogleLogin}
            className="mb-6 flex w-full items-center justify-center gap-3 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm font-medium text-[#f0f0f0] transition-all hover:border-[#3a3a3a] hover:bg-[#222]"
          >
            <Globe className="h-4 w-4 text-[#4285F4]" />
            Continue with Google
          </button>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex-1 border-t border-[#1e1e1e]" />
            <span className="text-xs text-[#444]">or sign in with email</span>
            <div className="flex-1 border-t border-[#1e1e1e]" />
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#888]">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#444]" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] py-2.5 pl-10 pr-4 text-sm text-[#f0f0f0] placeholder-[#444] outline-none transition-all focus:border-[#f5c842]/50 focus:ring-1 focus:ring-[#f5c842]/20"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-[#888]">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#555] hover:text-[#888]">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#444]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] py-2.5 pl-10 pr-10 text-sm text-[#f0f0f0] placeholder-[#444] outline-none transition-all focus:border-[#f5c842]/50 focus:ring-1 focus:ring-[#f5c842]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] hover:text-[#888]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#f5c842] py-3 text-sm font-semibold text-[#0d0d0d] transition-all hover:bg-[#f0c030] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[#555]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-[#f5c842] hover:text-[#f0c030]">
            Create one free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
