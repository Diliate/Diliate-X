import LegalPlaceholder from "@/components/sections/LegalPlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  name: "Terms of Service",
  description:
    "The terms that govern your use of Diliate, including accounts, acceptable use, billing and liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPlaceholder
      title="Terms of Service"
      path="/terms"
      summary="The terms that apply when you use Diliate."
      sections={[
        "Your Account",
        "Acceptable Use",
        "Plans, Billing and Cancellation",
        "Limitation of Liability",
        "Changes to These Terms",
      ]}
    />
  );
}
