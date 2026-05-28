import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { BRANDS } from "@/lib/brands";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/lib/seo";

export default function Brands() {
  // Group brands by categoryGroup
  const brandsByCategory = BRANDS.reduce((acc, brand) => {
    if (!acc[brand.categoryGroup]) {
      acc[brand.categoryGroup] = [];
    }
    acc[brand.categoryGroup].push(brand);
    return acc;
  }, {} as Record<string, typeof BRANDS>);

  const categoryOrder = [
    "Oral Health",
    "Vitamins & Supplements",
    "Pain Relief",
    "Respiratory",
    "Digestive Health",
    "Smoking Cessation",
    "Personal Care",
  ];

  const orderedCategories = categoryOrder.filter((cat) => brandsByCategory[cat]);

  return (
    <>
      <Seo
        title="Haleon Healthcare Brands — B2B Wholesale"
        description="Explore Haleon's healthcare brands for B2B wholesale distribution. Trusted by distributors, pharmacies and healthcare retailers worldwide."
      />
      <section className="bg-bone pt-40 pb-20 lg:pt-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Haleon Healthcare</p>
            <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">
              Premium brands for healthcare wholesale.
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-muted-foreground md:text-lg">
              Explore our portfolio of trusted healthcare brands formulated for distributors, pharmacies, wholesalers and retailers. Minimum order: 200 units (mixed brands allowed).
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories with Brands */}
      {orderedCategories.map((categoryName) => (
        <section key={categoryName} className="border-t border-black/5">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
            <Reveal>
              <div className="py-12 lg:py-16">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{categoryName}</p>
                <h2 className="mt-3 font-display text-4xl md:text-5xl">{categoryName}</h2>
              </div>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-16">
              {brandsByCategory[categoryName].map((b, i) => (
                <Reveal key={b.slug} delay={i * 0.08}>
                  <Link
                    to={`/brands/${b.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg border border-black/5 bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br" style={{ background: `linear-gradient(135deg, ${b.accent}33, ${b.accent}11)` }}>
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl font-bold opacity-20" style={{ color: b.accent }}>
                            {b.monogram}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between p-6 h-full">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{b.categoryGroup}</p>
                        <h3 className="mt-2 font-display text-3xl">{b.name}</h3>
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{b.short}</p>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-ink">
                        Explore <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* MOQ Notice */}
      <section className="bg-amber-50 border-y border-amber-200 py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="rounded-lg bg-white border border-amber-200 p-8 md:p-12">
              <p className="font-display text-3xl text-amber-900 mb-4">📦 Minimum Order Quantity (MOQ)</p>
              <p className="text-lg text-amber-800 leading-relaxed max-w-3xl">
                The minimum order quantity for B2B inquiries is <strong>200 units total</strong>. These 200 units can be <strong>mixed freely</strong> across:
              </p>
              <ul className="mt-6 space-y-2 text-amber-800 max-w-2xl">
                <li className="flex gap-3">
                  <span className="text-xl">✓</span>
                  <span>Any combination of Haleon brands</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">✓</span>
                  <span>Different healthcare categories</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">✓</span>
                  <span>Multiple products per brand</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-xl">✓</span>
                  <span>No maximum order limit</span>
                </li>
              </ul>
              <p className="mt-8 text-sm text-amber-700">
                Example: 50 Sensodyne + 40 Panadol + 30 Centrum + 80 Advil = 200 units ✓
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lime py-24 lg:py-32">
        <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="font-display text-5xl md:text-6xl text-ink mb-4">Ready to wholesale Haleon?</h2>
            <p className="text-lg text-ink/80 mb-8 max-w-2xl mx-auto">
              Select your products, build your mixed order of 200+ units, and submit your B2B inquiry. We'll send you a formal quotation and invoice.
            </p>
            <Link
              to="/inquiry"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3 text-white font-medium hover:bg-ink/85 transition-colors"
            >
              Start Your B2B Inquiry
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
