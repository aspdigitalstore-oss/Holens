import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowUpRight, Building2, Globe2, PackageCheck, ShieldCheck } from "lucide-react";
import { VideoHero } from "@/components/site/VideoHero";
import AccountModal from "@/components/site/AccountModal";
import { Reveal } from "@/components/site/Reveal";
import { FAQSection, FAQ_JSON_LD } from "@/components/site/FAQSection";
import { ContactPanel } from "@/components/site/ContactPanel";
import { MOQNotice, WholesaleNotice } from "@/components/site/WholesaleNotice";
import { BRANDS } from "@/lib/brands";
import { CATEGORY_CONTENT } from "@/lib/content";
import { COMPANY, NO_RETAIL_NOTICE, WHOLESALE_HERO_NOTICE } from "@/lib/company";
import { MIN_ORDER_QUANTITY, MOQ_NOTICE } from "@/lib/moq";
import { Seo } from "@/lib/seo";
import wellbeing from "@/assets/people-wellbeing.jpg";
import lab from "@/assets/lab-research.jpg";

const STATS = [
  { k: "B2B", v: "wholesale buyers only" },
  { k: "2,000", v: "minimum total units" },
  { k: "Mixed", v: "brands and categories" },
  { k: "USA", v: "target wholesale market" },
];

export default function Home() {
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<"create" | "login">("create");

  function openCreate() {
    setInitialMode("create");
    setAccountModalOpen(true);
  }

  function openLogin() {
    setInitialMode("login");
    setAccountModalOpen(true);
  }

  return (
    <>
      <Seo
        title="Wholesale Cosmetics Supplier USA | Vitala Global Holdings B2B"
        description="Vitala Global Holdings is a wholesale-only supplier for USA-focused buyers sourcing bulk skincare, oral care, beauty and personal care products."
        keywords={[
          "wholesale cosmetics supplier USA",
          "bulk skincare products",
          "wholesale skincare USA",
          "wholesale oral care products",
          "B2B beauty products",
        ]}
        ogImage={wellbeing}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: COMPANY.name,
            email: COMPANY.email,
            url: typeof window !== "undefined" ? window.location.origin : "",
            slogan: "Better everyday health, for business buyers.",
            brand: BRANDS.map((brand) => ({ "@type": "Brand", name: brand.name })),
          },
          FAQ_JSON_LD,
        ]}
      />

      <VideoHero
        eyebrow="Vitala Global Holdings B2B Wholesale"
        videoSrc="https://videos.pexels.com/video-files/4124482/4124482-uhd_2560_1440_25fps.mp4"
        poster={wellbeing}
        title={
          <>
            Wholesale beauty and
            <br />
            personal care,{" "}
            <em className="italic text-lime not-italic font-display">with humanity.</em>
          </>
        }
        subtitle="A wholesale-only supplier for distributors, pharmacies, beauty retailers and ecommerce businesses sourcing skincare, oral care and everyday wellness products."
        notices={[WHOLESALE_HERO_NOTICE, NO_RETAIL_NOTICE]}
        actions={
          <div className="flex flex-wrap gap-3">
            <Link
              to="/brands"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-medium text-ink hover:bg-lime/90"
            >
              Explore wholesale brands
              <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
            </Link>
            <Link
              to="/wholesale"
              className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white hover:text-ink"
            >
              How ordering works
            </Link>
            <button onClick={openCreate} className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white">
              Create account
            </button>
            <button onClick={openLogin} className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white">
              Log in
            </button>
          </div>
        }
      />

      <AccountModal open={accountModalOpen} setOpen={setAccountModalOpen} initialMode={initialMode} />

      <section className="border-y border-black/5 bg-bone">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-black/10 px-6 lg:grid-cols-4 lg:px-10">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.v}
              delay={index * 0.06}
              className="px-4 py-8 first:pl-0 md:px-6 md:py-10"
            >
              <p className="font-display text-4xl tracking-tight md:text-6xl">{stat.k}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:text-xs">
                {stat.v}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Wholesale cosmetics supplier USA
              </p>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-8">
              <h2 className="font-display text-4xl leading-[1.08] text-balance md:text-6xl">
                A practical B2B partner for{" "}
                <span className="text-lime-dim">bulk beauty products</span> and everyday personal
                care.
              </h2>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <p className="text-pretty text-base leading-7 text-muted-foreground md:text-lg">
                  Vitala Global Holdings supports commercial buyers sourcing wholesale skincare, oral care
                  and wellness products for the USA and international markets. Our inquiry-led
                  process keeps availability, documentation and shipping conversations tied to your
                  real business needs.
                </p>
                <p className="text-pretty text-base leading-7 text-muted-foreground md:text-lg">
                  We do not accept consumer orders. Every request is reviewed by our partnership
                  team so distributors, beauty retailers, pharmacies and ecommerce businesses
                  receive terms suited to wholesale purchasing.
                </p>
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <WholesaleNotice compact />
                <MOQNotice compact />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              Wholesale categories
            </p>
            <h2 className="mt-3 max-w-4xl font-display text-5xl leading-[1] md:text-7xl">
              Build a mixed-category inquiry.
            </h2>
            <p className="mt-6 max-w-2xl text-white/65">
              {MOQ_NOTICE} Browse our core categories and combine products that fit your commercial
              assortment.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CATEGORY_CONTENT.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.06}>
                <Link
                  to={`/categories/${category.slug}`}
                  className="group block h-full rounded-md border border-white/10 bg-white/[0.04] p-7 transition hover:border-white/30 hover:bg-white/[0.07]"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                    {category.eyebrow}
                  </p>
                  <h3 className="mt-4 font-display text-4xl">{category.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/60">{category.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                    View category{" "}
                    <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-end justify-between gap-8">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Vitala brand families
              </p>
              <h2 className="mt-3 font-display text-5xl leading-[1] md:text-7xl">
                Brands built for repeat demand.
              </h2>
            </Reveal>
            <Link
              to="/brands"
              className="group hidden items-center gap-2 text-sm font-medium md:inline-flex"
            >
              View all brands <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BRANDS.map((brand, index) => (
              <Reveal key={brand.slug} delay={index * 0.05}>
                <Link
                  to={`/brands/${brand.slug}`}
                  className="group block overflow-hidden rounded-md bg-white ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
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
                  <div className="p-6">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {brand.categoryGroup}
                    </p>
                    <h3 className="mt-2 font-display text-3xl">{brand.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{brand.short}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-md">
              <img
                src={lab}
                alt="Vitala Global Holdings product research and quality review"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              A considered wholesale process
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[1] md:text-6xl">
              Commercial clarity before commitment.
            </h2>
            <p className="mt-6 max-w-lg text-pretty text-base leading-7 text-muted-foreground md:text-lg">
              Product availability, documentation, destination requirements and shipping terms vary
              by inquiry. We review those details before issuing a quotation, rather than pushing
              business buyers through a retail checkout.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { icon: Building2, text: "Verified B2B buyers" },
                { icon: PackageCheck, text: `${MIN_ORDER_QUANTITY.toLocaleString()} unit MOQ` },
                { icon: ShieldCheck, text: "Inquiry review" },
                { icon: Globe2, text: "USA-focused supply" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 border-t border-black/10 pt-4">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FAQSection />
      <ContactPanel />
    </>
  );
}
