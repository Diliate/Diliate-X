import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { countryOptions } from "@/lib/countries";
import { findPlan } from "@/lib/plans";
import SignupProgress from "../SignupProgress";
import DetailsForm from "./DetailsForm";

export const metadata: Metadata = {
  title: "Create your account — Diliate",
  description:
    "Tell us about you and your company to set up your Diliate sending identity.",
  robots: { index: false },
  openGraph: {
    title: "Create your account — Diliate",
    description: "Set up your Diliate sending identity.",
    url: "https://diliate.com/signup/details",
    siteName: "Diliate",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Create your account — Diliate",
    description: "Set up your Diliate sending identity.",
  },
};

/** Step 2 of signup: account + company details for the plan chosen in step 1. */
export default async function SignupDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[] }>;
}) {
  const plan = findPlan((await searchParams).plan);
  if (!plan) redirect("/signup");

  return (
    <div className="pt-2">
      <SignupProgress current={2} />
      <DetailsForm plan={plan} countries={countryOptions()} />
    </div>
  );
}
