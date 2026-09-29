import type { Metadata } from "next";
import { findPlan } from "@/lib/plans";
import SignupProgress from "../SignupProgress";
import WelcomeMessage from "./WelcomeMessage";

export const metadata: Metadata = {
  title: "Welcome to Diliate",
  description:
    "Your Diliate account is ready. Start sending emails with your company identity.",
  robots: { index: false },
  openGraph: {
    title: "Welcome to Diliate",
    description: "Your Diliate account is ready.",
    url: "https://diliate.com/signup/welcome",
    siteName: "Diliate",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Welcome to Diliate",
    description: "Your Diliate account is ready.",
  },
};

/** Step 3 of signup: confirmation + sending identity. */
export default async function SignupWelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[] }>;
}) {
  const plan = findPlan((await searchParams).plan);
  return (
    <div className="pt-2">
      <SignupProgress current={3} />
      <WelcomeMessage plan={plan} />
    </div>
  );
}
