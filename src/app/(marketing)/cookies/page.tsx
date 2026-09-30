import LegalPlaceholder from "@/components/sections/LegalPlaceholder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  name: "Cookie Policy",
  description:
    "Which cookies and similar technologies Diliate uses, why we use them, and how you can control them.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPlaceholder
      title="Cookie Policy"
      path="/cookies"
      summary="Which cookies we use and how you can control them."
      sections={[
        "What Cookies Are",
        "Cookies We Use",
        "Third-Party Cookies",
        "Managing Your Preferences",
        "Contact Us",
      ]}
    />
  );
}
