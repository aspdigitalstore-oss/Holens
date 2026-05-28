import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronRight, Quote, ShoppingCart } from "lucide-react";
import { BRANDS, getBrand, type Brand } from "@/lib/brands";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/lib/seo";
import { useInquiry } from "@/lib/inquiry";

export default function BrandPage() {
  const { slug } = useParams<{ slug: string }>();
  const brand = slug ? getBrand(slug) : undefined;
  const { addItem } = useInquiry();

  if (!brand) {
    return <Navigate to="/brands" replace />;
  }

  return (
    <>
      <Seo
        title={`${brand.name} — ${brand.categoryGroup} | Haleon Healthcare`}
        description={brand.description}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Brand",
          name: brand.name,
          description: brand.description,
          slogan: brand.tagline,
          parentOrganization: { "@type": "Organization", name: "Haleon Healthcare Wholesale" },
          keywords: brand.keywords.join(", "),
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-gradient-to-br from-ink to-ink/80 text-white">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="dots" x="50" y="50" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="1200" height="800" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
          <nav className="flex items-center gap-2 text-xs text-white/70">
            <Link to="/" className="hover:text-white">
              Haleon
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/brands" className="hover:text-white">
              {brand.categoryGroup}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>{brand.name}</span>
          </nav>
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand.accent }} />
              {brand.categoryGroup}
            </p>
            <h1 className="font-display text-[14vw] leading-[0.9] tracking-tight md:text-[10vw] lg:text-[8vw]">
              {brand.name}
            </h1>
            <p className="mt-6 max-w-2xl font-display text-2xl text-white/90 md:text-3xl">{brand.tagline}</p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-white py-28 lg:py-40">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <Reveal className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Brand story</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <p className="font-display text-4xl leading-[1.1] text-balance md:text-5xl">{brand.description}</p>
            <p className="mt-10 max-w-2xl text-pretty text-muted-foreground md:text-lg">{brand.story}</p>
          </Reveal>
        </div>
      </section>

      {/* Commercial Overview */}
      <section className="bg-bone py-24 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">B2B Supply Overview</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
              Enterprise terms for wholesale distribution.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Minimum Order", value: "200 units (mixed brands allowed)" },
              { label: "Availability", value: brand.supplyAvailability },
              { label: "Distribution Support", value: brand.distributionSupport },
              { label: "Shipping", value: brand.shippingAvailability },
            ].map((item) => (
              <Reveal key={item.label} delay={0.05}>
                <div className="rounded-[2rem] border border-black/10 bg-white p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
                  <p className="mt-4 text-2xl font-semibold text-ink">{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="border-y border-black/5 bg-bone py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Product Lines</p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-black/10 md:grid-cols-3">
            {brand.subcategories.map((c, i) => (
              <Reveal key={c} delay={i * 0.05}>
                <div className="group flex h-full items-end justify-between bg-bone p-8 transition-colors hover:bg-white">
                  <span className="font-display text-xl md:text-2xl">{c}</span>
                  <ArrowUpRight className="h-5 w-5 opacity-30 transition-opacity group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="bg-white py-28 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Product Catalog</p>
                <h2 className="mt-3 font-display text-5xl leading-[1] md:text-6xl">{brand.name} Products</h2>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 space-y-24">
            {brand.products.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.1}>
                <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
                  <div className="lg:col-span-5 lg:[direction:ltr]">
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.tagline}</p>
                        <h3 className="mt-3 font-display text-4xl leading-[1.05] md:text-5xl">{p.name}</h3>
                      </div>
                      <p className="text-muted-foreground md:text-lg">{p.description}</p>

                      {/* Pricing */}
                      <div className="pt-4 space-y-2">
                        <div className="flex items-baseline gap-4">
                          <div>
                            <p className="text-xs text-muted-foreground">USD Price</p>
                            <p className="text-3xl font-bold text-ink">${p.usdPrice.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">EUR Price</p>
                            <p className="text-3xl font-bold text-ink">€{p.eurPrice.toFixed(2)}</p>
                          </div>
                        </div>
                        {p.ean && (
                          <p className="text-xs text-muted-foreground">
                            <strong>EAN/GTIN:</strong> {p.ean}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          <strong>Packaging:</strong> {p.packaging}
                        </p>
                      </div>

                      {/* Product Details */}
                      <ul className="mt-8 space-y-3 border-t pt-6">
                        {p.details.map((d) => (
                          <li key={d} className="flex items-start gap-3 text-sm">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: brand.accent }} />
                            {d}
                          </li>
                        ))}
                      </ul>

                      {/* Actions */}
                      <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t">
                        <button
                          className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-ink/85"
                          onClick={() => {
                            addItem({
                              brandSlug: brand.slug,
                              brandName: brand.name,
                              productName: p.name,
                              productTagline: p.tagline,
                              quantity: 1,
                            });
                            window.location.assign("/inquiry");
                          }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Request Quote
                          <ArrowUpRight className="h-4 w-4 hover-arrow" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 lg:[direction:ltr]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg" style={{ background: `linear-gradient(135deg, ${brand.accent}33, ${brand.accent}11)` }}>
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl font-bold opacity-10" style={{ color: brand.accent }}>
                            {brand.monogram}
                          </div>
                          <p className="mt-4 text-muted-foreground font-semibold">{p.name}</p>
                          <p className="text-sm text-muted-foreground">{brand.categoryGroup}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ink py-28 text-white lg:py-36">
        <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-10">
          <Reveal>
            <Quote className="mx-auto h-8 w-8 text-lime" />
            <blockquote className="mt-8 font-display text-4xl leading-[1.15] md:text-6xl">
              "Quality healthcare products trusted by distributors and healthcare professionals worldwide."
            </blockquote>
            <p className="mt-8 text-sm text-white/60">Haleon Healthcare Portfolio</p>
          </Reveal>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="bg-lime">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-32">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink/60">B2B Distribution</p>
            <h2 className="mt-3 font-display text-5xl leading-[1] text-ink md:text-7xl">
              Become a {brand.name} distributor.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-end">
            <p className="text-ink/80 md:text-lg">
              Distributors, pharmacies, wholesalers and healthcare retailers — submit your bulk inquiry for {brand.categoryGroup} products from our B2B wholesale platform. Minimum order: 200 units (mixed brands).
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/inquiry" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85">
                Start B2B Inquiry <ShoppingCart className="h-4 w-4 hover-arrow" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink hover:bg-ink hover:text-white">
                Contact Sales Team
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MOQ Notice */}
      <section className="bg-amber-50 border-t border-amber-200 py-12">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="rounded-lg bg-white border border-amber-200 p-6 md:p-8">
            <p className="font-semibold text-amber-900 mb-2">📦 Minimum Order Quantity (MOQ)</p>
            <p className="text-amber-800">
              Minimum mixed order quantity is <strong>200 units across Haleon healthcare product categories</strong>. You can combine multiple brands and products to reach the 200-unit minimum. No purchase limits on the maximum.
            </p>
          </div>
        </div>
      </section>

      {/* Other Brands */}
      <section className="bg-bone py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Explore the Portfolio</p>
            <h3 className="mt-3 font-display text-4xl md:text-5xl">Other Haleon Brands</h3>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {BRANDS.filter((b) => b.slug !== brand.slug).slice(0, 4).map((otherBrand) => (
              <Link
                key={otherBrand.slug}
                to={`/brands/${otherBrand.slug}`}
                className="group block overflow-hidden rounded-lg bg-white ring-1 ring-black/5 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br" style={{ background: `linear-gradient(135deg, ${otherBrand.accent}33, ${otherBrand.accent}11)` }}>
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold opacity-20" style={{ color: otherBrand.accent }}>
                        {otherBrand.monogram}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-display text-2xl">{otherBrand.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{otherBrand.categoryGroup}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
