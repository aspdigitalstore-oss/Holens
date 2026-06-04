import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { useInquiry } from "@/lib/inquiry";
import { MIN_ORDER_QUANTITY, MOQ_LABEL, MOQ_NOTICE } from "@/lib/moq";
import { MOQNotice, WholesaleNotice } from "@/components/site/WholesaleNotice";
import { Seo } from "@/lib/seo";

export default function Cart() {
  const { items, totalUnits, hasMinimum, updateQuantity, removeItem } = useInquiry();
  const unitsNeeded = Math.max(0, MIN_ORDER_QUANTITY - totalUnits);
  const progress = Math.min(100, (totalUnits / MIN_ORDER_QUANTITY) * 100);

  return (
    <>
      <Seo
        title="Wholesale Inquiry Cart | Vitala Global Holdings"
        description="Review products and quantities in your Vitala Global Holdings wholesale inquiry cart."
        noIndex
      />
      <section className="bg-bone pb-16 pt-24 lg:pt-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Wholesale inquiry cart
          </p>
          <h1 className="mt-4 font-display text-6xl leading-[0.95] md:text-7xl">
            Review your product request.
          </h1>
          <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">
            Add and combine products across Vitala brands and categories. No payment is taken online; our team will follow up with an invoice.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2">
            <WholesaleNotice compact />
            <MOQNotice compact />
          </div>

          {items.length === 0 ? (
            <div className="mt-12 rounded-md border border-black/10 bg-bone p-10 text-center">
              <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <h2 className="mt-4 font-display text-4xl">Your inquiry cart is empty.</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Browse wholesale brands and add the quantities your business would like us to
                review.
              </p>
              <Link
                to="/brands"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white"
              >
                Explore brands <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="mt-12 grid gap-10 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-8">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="grid gap-5 rounded-md border border-black/10 p-4 sm:grid-cols-[140px_1fr]"
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] h-full w-full rounded-md object-cover"
                    />
                    <div className="flex flex-col justify-between gap-5">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {item.category}
                        </p>
                        <h2 className="mt-2 font-display text-3xl">{item.productName}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">{item.brandName}</p>
                      </div>
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <label>
                          <span className="block text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            Quantity
                          </span>
                          <input
                            type="number"
                            min={1}
                            step={100}
                            value={item.quantity}
                            onChange={(event) =>
                              updateQuantity(item.id, Number(event.target.value))
                            }
                            className="mt-2 w-32 rounded-full border border-black/15 px-4 py-2 text-sm outline-none focus:border-ink"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="inline-flex items-center gap-2 text-sm text-red-700 hover:underline"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="h-fit rounded-md border border-black/10 bg-bone p-6 lg:col-span-4 lg:sticky lg:top-28">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Inquiry summary
                </p>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <span className="text-sm text-muted-foreground">Total requested units</span>
                  <strong className="font-display text-4xl font-normal">
                    {totalUnits.toLocaleString()}
                  </strong>
                </div>
                <div
                  className="mt-5 h-2 overflow-hidden rounded-full bg-black/10"
                  aria-label={`${Math.round(progress)} percent of minimum order quantity`}
                >
                  <div
                    className="h-full rounded-full bg-lime-dim transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-3 text-sm font-medium">{MOQ_LABEL}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{MOQ_NOTICE}</p>
                {!hasMinimum && (
                  <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                    Add {unitsNeeded.toLocaleString()} more units to continue to checkout.
                  </p>
                )}
                {hasMinimum ? (
                  <Link
                    to="/checkout"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85"
                  >
                    Continue to checkout <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <span
                    className="mt-6 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-black/15 px-6 py-3 text-sm font-medium text-black/45"
                    aria-disabled="true"
                  >
                    Continue to checkout <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
                <Link
                  to="/brands"
                  className="mt-4 block text-center text-sm font-medium hover:underline"
                >
                  Add more products
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
