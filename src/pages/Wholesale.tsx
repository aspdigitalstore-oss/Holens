import { Link } from "react-router-dom";
import { ArrowUpRight, ClipboardCheck, FileText, PackagePlus, Send } from "lucide-react";
import { ContactPanel } from "@/components/site/ContactPanel";
import { FAQSection, FAQ_JSON_LD } from "@/components/site/FAQSection";
import { MOQNotice, WholesaleNotice } from "@/components/site/WholesaleNotice";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { BRANDS } from "@/lib/brands";
import { Seo } from "@/lib/seo";

const STEPS = [
  {
    icon: PackagePlus,
    title: "Add wholesale products",
    text: "Select products across Vitala brands and categories, then enter your requested quantities.",
  },
  {
    icon: ClipboardCheck,
    title: "Review the inquiry cart",
    text: "Combine products until the total reaches the 2000-unit mixed MOQ.",
  },
  {
    icon: FileText,
    title: "Complete checkout details",
    text: "Share your company, contact, market and business information. No payment is taken online.",
  },
  {
    icon: Send,
    title: "Submit the inquiry",
    text: "Our partnership team reviews availability, documentation, shipping and commercial terms.",
  },
];

export default function Wholesale() {
  return (
    <>
      <Seo
        title="Wholesale Cosmetics, Skincare & Personal Care | Vitala Global Holdings"
        description="Learn how Vitala Global Holdings supports B2B buyers sourcing wholesale cosmetics, bulk skincare products, oral care and personal care through an inquiry-based process."
        keywords={[
          "wholesale cosmetics supplier USA",
          "private label cosmetics",
          "bulk skincare products",
          "wholesale personal care products",
          "cosmetics distributor USA",
        ]}
        jsonLd={FAQ_JSON_LD}
      />

      <section className="bg-ink pb-20 pt-24 text-white lg:pb-28 lg:pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-lime">Wholesale only</p>
            <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">
              B2B beauty and personal care supply, without a retail checkout.
            </h1>
            <p className="mt-8 max-w-2xl text-pretty leading-7 text-white/70 md:text-lg">
              Vitala Global Holdings works with distributors, wholesalers, pharmacies, beauty retailers and
              ecommerce businesses. Add products, build a mixed order and submit an inquiry for
              tailored commercial terms.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <WholesaleNotice dark />
            <MOQNotice dark />
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Signature products
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
              Signature wholesale products.
            </h2>
            <p className="mt-6 text-sm leading-7 text-muted-foreground md:text-lg">
              Browse our signature products and add them directly to your inquiry cart. Each card includes product details, an Add to cart button and an Explore solution link.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BRANDS.flatMap((brand, index) =>
              brand.products.map((product) => (
                <Reveal key={product.id} delay={index * 0.05}>
                  <ProductCard brand={brand} product={product} />
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              How wholesale ordering works
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[1] md:text-6xl">
              A clear inquiry path for serious buyers.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.05}>
                <div className="h-full rounded-md border border-black/10 p-6">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-3xl">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              to="/brands"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85"
            >
              Start with wholesale brands
              <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Wholesale skincare USA
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
              Built for mixed-category assortment planning.
            </h2>
            <p className="mt-6 text-pretty leading-7 text-muted-foreground md:text-lg">
              Buyers do not always need a single-category order. Our 2000-unit MOQ can be reached by
              combining bulk skincare products, wholesale oral care products and wellness items
              across multiple Vitala brands.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Private label cosmetics
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
              Have a private label brief?
            </h2>
            <p className="mt-6 text-pretty leading-7 text-muted-foreground md:text-lg">
              Buyers exploring private label cosmetics or a private label skincare manufacturer can
              share product, packaging, target market and volume goals with our partnership team.
              Program fit is reviewed case by case.
            </p>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium"
            >
              Discuss a private label inquiry
              <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <FAQSection title="Wholesale terms, MOQ and ordering." />
      <ContactPanel />
    </>
  );
}
