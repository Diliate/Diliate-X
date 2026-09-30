import LegalPlaceholder from "@/components/sections/LegalPlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  name: "Privacy Policy",
  description:
    "How Diliate collects, uses and protects your personal data, and the rights you have over it.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPlaceholder
      title="Privacy Policy"
      path="/privacy"
      summary="How we collect, use and protect your personal data."
      sections={[
        "Data We Collect",
        "How We Use It",
        "Sharing and Processors",
        "Your Rights",
        "Contact Us",
      ]}
    />
  );
}
