import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** Shell for the public marketing pages. Auth and dashboard routes live outside this group. */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
