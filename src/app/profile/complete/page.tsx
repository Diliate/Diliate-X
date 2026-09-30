import type { Metadata } from "next";
import Image from "next/image";
import { countryOptions } from "@/lib/countries";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Complete your profile | DILIATE",
  description:
    "Add your company details to start sending campaigns with Diliate.",
  robots: { index: false },
};

/** Standalone profile-completion page (outside the dashboard and marketing layouts). */
export default function CompleteProfilePage() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Image
            src="/brand/diliate-logo.png"
            alt="Diliate"
            width={40}
            height={40}
            className="mx-auto rounded-lg"
            priority
          />
          <h1 className="text-foreground mt-6 text-2xl font-bold sm:text-3xl">
            Complete your profile to start sending
          </h1>
          <p className="text-secondary-foreground mt-2">
            We need a few details before you can send your first campaign.
          </p>
        </div>
        <ProfileForm countries={countryOptions()} />
      </div>
    </div>
  );
}
