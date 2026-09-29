import Link from "next/link";
import { Mail } from "lucide-react";

/** Shared shell for every signup step: dark onboarding background, logo, and sign-in link. */
export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-signup-background min-h-screen text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="bg-signup-accent flex h-8 w-8 items-center justify-center rounded-lg">
            <Mail aria-hidden className="h-4 w-4 text-white" />
          </span>
          <span className="text-lg font-bold">Diliate</span>
        </Link>
        <p className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Sign in
          </Link>
        </p>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">{children}</main>
    </div>
  );
}
