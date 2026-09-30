import { BellRing, Clock } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/sections/PageHero";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  name: "Blog",
  description:
    "The Diliate Blog: insights on email deliverability, growth, and product updates. Our first posts are on the way.",
  path: "/blog",
});

const upcomingPosts = [
  {
    category: "Deliverability",
    title: "Why your bulk emails land in spam — and how to fix it",
    excerpt:
      "Sender reputation, authentication and list hygiene: the three levers that decide whether you reach the inbox.",
  },
  {
    category: "Growth",
    title: "Building a sending cadence that doesn't burn your list",
    excerpt:
      "How often to email, how to segment, and the metrics that tell you when to slow down.",
  },
  {
    category: "Product",
    title: "Inside Diliate: how multi-page campaigns multiply throughput",
    excerpt:
      "A look at how we split one campaign across parallel sending routes without losing tracking.",
  },
];

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Blog", "/blog")} />
      <PageHero
        eyebrow="Blog"
        title="The Diliate Blog"
        subtitle="Insights on email deliverability, growth, and product updates"
      />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <ul className="grid gap-6 md:grid-cols-3">
            {upcomingPosts.map((post, i) => (
              <Reveal
                as="li"
                key={post.title}
                delay={i}
                className="border-border bg-muted/60 flex flex-col overflow-hidden rounded-xl border"
              >
                <div
                  aria-hidden
                  className="bg-border/60 aspect-[16/9] w-full"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                      {post.category}
                    </span>
                    <span className="border-border bg-background text-secondary-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium">
                      <Clock aria-hidden className="h-3 w-3" />
                      Coming Soon
                    </span>
                  </div>
                  <h2 className="text-secondary-foreground mt-4 text-lg leading-snug font-semibold">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="border-primary/40 bg-primary/5 mx-auto mt-16 max-w-2xl rounded-2xl border p-8 text-center">
            <BellRing
              aria-hidden
              className="text-primary-ink mx-auto h-7 w-7"
            />
            <h2 className="text-foreground mt-4 text-2xl font-bold">
              Get notified when we publish
            </h2>
            <p
              id="newsletter-status"
              className="text-secondary-foreground mt-2 text-sm"
            >
              Newsletter sign-up opens with our first post.
            </p>
            <form
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              aria-describedby="newsletter-status"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@company.com"
                disabled
                className="border-border bg-background text-foreground placeholder:text-muted-foreground flex-1 cursor-not-allowed rounded-md border px-3.5 py-2.5 text-sm opacity-70"
              />
              <button
                type="submit"
                disabled
                className="bg-primary text-primary-foreground cursor-not-allowed rounded-md px-5 py-2.5 text-sm font-semibold opacity-60"
              >
                Notify me
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
