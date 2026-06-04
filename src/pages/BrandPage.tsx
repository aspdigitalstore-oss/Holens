import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { BRANDS, getBrand } from "@/lib/brands";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { ContactPanel } from "@/components/site/ContactPanel";
import { MOQNotice, WholesaleNotice } from "@/components/site/WholesaleNotice";
import { Seo } from "@/lib/seo";

export default function BrandPage() {
  const { slug } = useParams<{ slug: string }>();
  const brand = slug ? getBrand(slug) : undefined;

  if (!brand) return <Navigate to="/brands" replace />;

  return (
    <>
      <Seo
        title={`${brand.name} Wholesale ${brand.category} Products | Vitala`}
        description={`${brand.description} Wholesale inquiries only. Mix products across brands and categories to reach the 2000-unit MOQ.`}
        keywords={brand.keywords}
        ogImage={brand.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Brand",
          name: brand.name,
          description: brand.description,
          slogan: brand.tagline,
          parentOrganization: { "@type": "Organization", name: "Vitala Global Holdings" },
        }}
      />

      <section className="bg-ink pb-20 pt-20 text-white lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <nav
            className="flex flex-wrap items-center gap-2 text-xs text-white/60"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link to="/brands" className="hover:text-white">
              Brands
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span>{brand.name}</span>
          </nav>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.2em] text-lime">
                {brand.categoryGroup} wholesale
              </p>
              <h1 className="mt-4 font-display text-7xl leading-[0.9] tracking-tight md:text-9xl">
                {brand.name}
              </h1>
              <p className="mt-6 max-w-2xl font-display text-2xl text-white/85 md:text-3xl">
                {brand.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="overflow-hidden rounded-md">
                <img
                  src={brand.image}
                  alt={brand.imageAlt}
                  decoding="async"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <Reveal className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Brand overview
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <h2 className="font-display text-4xl leading-[1.1] text-balance md:text-6xl">
              {brand.description}
            </h2>
            <p className="mt-8 max-w-2xl text-pretty leading-7 text-muted-foreground md:text-lg">
              {brand.story}
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <WholesaleNotice compact />
              <MOQNotice compact />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              B2B supply overview
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
              Wholesale support for commercial buyers.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { label: "Availability", value: brand.supplyAvailability },
              { label: "Distribution support", value: brand.distributionSupport },
              { label: "Shipping", value: brand.shippingAvailability },
            ].map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <div className="h-full rounded-md border border-black/10 bg-white p-7">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {item.label}
                  </h3>
                  <p className="mt-4 text-lg leading-7 text-ink">{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Wholesale products
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[1] md:text-6xl">
              {brand.name} products
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {brand.products.map((product) => (
              <ProductCard key={product.id} brand={brand} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center lg:px-10">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl">Planning a mixed-brand order?</h2>
            <p className="mt-3 max-w-2xl text-white/65">
              Combine {brand.name} products with other Vitala categories to reach the 2000-unit
              minimum order quantity.
            </p>
          </Reveal>
          <Link
            to="/brands"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-medium text-ink"
          >
            Explore all products <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Show other brands for mixed-brand ordering */}
      <section className="bg-bone py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <h3 className="text-sm text-muted-foreground">Other Vitala brands</h3>
          <p className="mt-2 text-muted-foreground">You can mix products from other brands to reach MOQ.</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BRANDS.filter((b) => b.slug !== brand.slug).map((other) => (
              <Link
                key={other.slug}
                to={`/brands/${other.slug}`}
                className="group block overflow-hidden rounded-md bg-white ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={other.image} alt={other.imageAlt} className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{other.categoryGroup}</p>
                  <h4 className="mt-1 font-display text-2xl">{other.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
