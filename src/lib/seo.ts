import type { Metadata } from "next";

export const SITE_URL = "https://diliate.com";

/** Page metadata per SEO.md: "{Page} | DILIATE" title, canonical URL, OG + Twitter cards. */
export function pageMetadata({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}): Metadata {
  const title = `${name} | DILIATE`;
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Diliate",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** BreadcrumbList JSON-LD (Home → page) for nested marketing pages. */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}
