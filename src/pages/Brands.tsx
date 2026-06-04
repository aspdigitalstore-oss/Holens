import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { BRANDS } from "@/lib/brands";
import { CATEGORY_CONTENT } from "@/lib/content";
import { Reveal } from "@/components/site/Reveal";
import { MOQNotice, WholesaleNotice } from "@/components/site/WholesaleNotice";
import { ContactPanel } from "@/components/site/ContactPanel";
import { Seo } from "@/lib/seo";

export default function Brands() {
  return (
    <>
      <Seo
        title="B2B Beauty Products & Wholesale Personal Care | Vitala Global Holdings"
        description="Explore Vitala Global Holdings wholesale skincare, oral care and wellness products for distributors, pharmacies, beauty retailers and ecommerce businesses."
        keywords={[
          "B2B beauty products",
          "bulk beauty products",
          "wholesale personal care products",
          "wholesale skincare USA",
          "wholesale oral care products",
        ]}
      />
      <section className="bg-bone pb-20 pt-24 lg:pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Vitala Global Holdings brand catalog
            </p>
            <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">
              Wholesale brands for business buyers.
            </h1>
            <p className="mt-8 max-w-2xl text-pretty leading-7 text-muted-foreground md:text-lg">
              Browse retail-ready skincare, oral care and wellness products for distributors,
              wholesalers, pharmacies, beauty retailers and ecommerce channels.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <WholesaleNotice compact />
            <MOQNotice compact />
          </div>
        </div>
      </section>

      <section className="border-y border-black/5 bg-white py-14">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl">Shop wholesale categories</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {CATEGORY_CONTENT.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.05}>
                <Link
                  to={`/categories/${category.slug}`}
                  className="group block rounded-md border border-black/10 bg-bone p-5 transition hover:border-ink/30"
                >
                  <p className="text-sm font-medium">{category.name}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {category.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium">
                    View category{" "}
                    <ArrowUpRight className="h-3.5 w-3.5 hover-arrow" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Product families
            </p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">
              Explore the Vitala portfolio.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BRANDS.map((brand, index) => (
              <Reveal key={brand.slug} delay={index * 0.05}>
                <Link
                  to={`/brands/${brand.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-md border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={brand.image}
                      alt={brand.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {brand.categoryGroup}
                    </p>
                    <h3 className="mt-2 font-display text-3xl">{brand.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{brand.short}</p>
                    <span className="mt-6 inline-flex w-max items-center gap-2 rounded-full border border-black/10 bg-bone px-4 py-3 text-sm font-medium text-ink transition hover:border-ink/30 hover:bg-white">
                      View products
                      <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
