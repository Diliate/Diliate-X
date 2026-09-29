import Link from "next/link";
import Image from "next/image";

/** Shared shell for every signup step: dark onboarding background, logo, and sign-in link. */
export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-signup-background text-foreground min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/brand/diliate-logo.png"
            alt=""
            width={36}
            height={36}
            className="rounded-lg"
            priority
          />
          <span className="text-lg font-bold">Diliate</span>
        </Link>
        <p className="text-secondary-foreground text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary-ink hover:text-foreground font-medium"
          >
            Sign in
          </Link>
        </p>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">{children}</main>
    </div>
  );
}
