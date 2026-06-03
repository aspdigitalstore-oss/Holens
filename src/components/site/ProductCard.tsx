import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useInquiry } from "@/lib/inquiry";
import type { Brand, Product } from "@/lib/brands";

const DEFAULT_CART_QUANTITY = 500;

export function ProductCard({ brand, product }: { brand: Brand; product: Product }) {
  const { addItem } = useInquiry();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      brandSlug: brand.slug,
      brandName: brand.name,
      category: brand.categoryGroup,
      productName: product.name,
      productTagline: product.tagline,
      image: product.image,
      imageAlt: product.imageAlt,
      quantity: DEFAULT_CART_QUANTITY,
    });
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-md border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/3] overflow-hidden bg-bone">
        <img
          src={product.image}
          alt={product.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {brand.categoryGroup}
        </p>
        <h3 className="mt-2 font-display text-3xl">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-bone px-5 py-3 text-sm font-medium text-ink transition hover:border-ink/30 hover:bg-white"
          >
            Explore solution
            <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-ink/90"
          >
            Add to cart
          </button>
          <p className="text-xs text-muted-foreground">
            Default quantity: {DEFAULT_CART_QUANTITY.toLocaleString()} units.
          </p>
        </div>
      </div>
    </div>
  );
}
