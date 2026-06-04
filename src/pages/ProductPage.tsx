import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, Check, ChevronRight, ShoppingBag } from "lucide-react";
import { getProduct } from "@/lib/brands";
import { useInquiry } from "@/lib/inquiry";
import { MOQNotice, WholesaleNotice } from "@/components/site/WholesaleNotice";
import { ContactPanel } from "@/components/site/ContactPanel";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/lib/seo";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const result = productId ? getProduct(productId) : undefined;
  const { addItem } = useInquiry();
  const [quantity, setQuantity] = useState(500);
  const [added, setAdded] = useState(false);

  if (!result) return <Navigate to="/brands" replace />;

  const { brand, product } = result;
  const relatedProducts = brand.products.filter((relatedProduct) => relatedProduct.id !== product.id);

  const addToCart = () => {
    addItem({
      productId: product.id,
      brandSlug: brand.slug,
      brandName: brand.name,
      category: brand.categoryGroup,
      productName: product.name,
      productTagline: product.tagline,
      image: product.image,
      imageAlt: product.imageAlt,
      quantity,
    });
    setAdded(true);
  };

  return (
    <>
      <Seo
        title={`${product.name} Wholesale | ${brand.name} | Vitala`}
        description={`${product.description} Request wholesale availability and quotation from Vitala Global Holdings. B2B buyers only; no personal purchases.`}
        keywords={brand.keywords}
        ogImage={product.image}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          image: product.image,
          description: product.description,
          brand: { "@type": "Brand", name: brand.name },
          category: brand.categoryGroup,
          audience: { "@type": "BusinessAudience", audienceType: "Wholesale buyers" },
        }}
      />

      <section className="relative overflow-hidden bg-black pb-20 pt-20 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <nav
            className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-ink">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link to="/brands" className="hover:text-ink">
              Brands
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <Link to={`/brands/${brand.slug}`} className="hover:text-ink">
              {brand.name}
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span>{product.name}</span>
          </nav>

          <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
            <Reveal>
              <div className="rounded-md border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-white md:text-7xl">
                  {product.name}
                </h1>
                <p className="mt-4 font-display text-2xl text-white/80">{product.tagline}</p>
                <p className="mt-6 max-w-xl leading-7 text-white/75 md:text-lg">
                  {product.description}
                </p>

                <ul className="mt-8 space-y-3 border-t border-white/10 pt-6 text-white/75">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-dim" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-dim" aria-hidden="true" />
                    Packaging: {product.packaging}
                  </li>
                </ul>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <label
                    htmlFor="quantity"
                    className="text-xs font-medium uppercase tracking-[0.16em] text-white/70"
                  >
                    Requested quantity
                  </label>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <input
                      id="quantity"
                      type="number"
                      min={1}
                      step={100}
                      value={quantity}
                      onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
                      className="w-32 rounded-full border border-white/15 bg-white px-4 py-3 text-sm outline-none focus:border-white"
                    />
                    <button
                      type="button"
                      onClick={addToCart}
                      className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85"
                    >
                      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                      Add to inquiry cart
                      <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
                    </button>
                    {/* 'Explore solutions' link removed as requested */}
                  </div>
                  {added && (
                    <p className="mt-4 text-sm text-white/75" role="status">
                      Added to your inquiry cart. <Link to="/cart" className="font-medium underline text-white">
                        View cart
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8 lg:mt-0 rounded-md border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  decoding="async"
                  className="w-full h-auto object-contain rounded"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-white py-24 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Signature products
              </p>
              <h2 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">
                More from {brand.name}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} brand={brand} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-[1400px] gap-4 px-6 md:grid-cols-2 lg:px-10">
          <WholesaleNotice />
          <MOQNotice />
        </div>
      </section>

      <ContactPanel />
    </>
  );
}
