import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { BRANDS } from "@/lib/brands";
import { getCategoryContent } from "@/lib/content";
import { ProductCard } from "@/components/site/ProductCard";
import { MOQNotice, WholesaleNotice } from "@/components/site/WholesaleNotice";
import { ContactPanel } from "@/components/site/ContactPanel";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/lib/seo";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryContent(slug) : undefined;

  if (!category) return <Navigate to="/brands" replace />;

  const brands = BRANDS.filter((brand) => category.categoryGroups.includes(brand.categoryGroup));
  const products = brands.flatMap((brand) => brand.products.map((product) => ({ brand, product })));

  return (
    <>
      <Seo
        title={category.seoTitle}
        description={category.seoDescription}
        keywords={category.keywords}
        ogImage={products[0]?.product.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.description,
          isPartOf: { "@type": "WebSite", name: "Vitala Global Holdings" },
        }}
      />

      <section className="bg-ink pb-20 pt-20 text-white lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <nav className="flex items-center gap-2 text-xs text-white/60" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link to="/brands" className="hover:text-white">
              Brands
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span>{category.name}</span>
          </nav>
          <Reveal>
            <p className="mt-12 text-[10px] uppercase tracking-[0.2em] text-lime">
              {category.eyebrow}
            </p>
            <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">
              {category.title}
            </h1>
            <p className="mt-8 max-w-2xl text-pretty leading-7 text-white/70 md:text-lg">
              {category.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-12 lg:px-10">
          <Reveal className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              For USA-focused wholesale buyers
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <h2 className="font-display text-4xl leading-[1.1] md:text-6xl">
              A considered way to source {category.name.toLowerCase()}.
            </h2>
            <p className="mt-8 max-w-3xl text-pretty leading-7 text-muted-foreground md:text-lg">
              {category.intro}
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <WholesaleNotice compact />
              <MOQNotice compact />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Wholesale catalog
            </p>
            <h2 className="mt-3 font-display text-5xl md:text-6xl">{category.name} products</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map(({ brand, product }) => (
              <ProductCard key={product.id} brand={brand} product={product} />
            ))}
          </div>
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
