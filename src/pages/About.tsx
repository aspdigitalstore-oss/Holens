import { ContactPanel } from "@/components/site/ContactPanel";
import { MOQNotice, WholesaleNotice } from "@/components/site/WholesaleNotice";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/lib/seo";
import wellbeing from "@/assets/people-wellbeing.jpg";
import lab from "@/assets/lab-research.jpg";

export default function About() {
  return (
    <>
      <Seo
        title="About Vitala Global Holdings | B2B Beauty & Personal Care Supplier"
        description="Meet Vitala Global Holdings, a wholesale-only B2B supplier supporting USA-focused buyers sourcing skincare, oral care, beauty and personal care products."
        keywords={[
          "B2B beauty products",
          "bulk beauty products",
          "wholesale personal care products",
          "cosmetics distributor USA",
        ]}
        ogImage={wellbeing}
      />

      <section className="bg-bone pb-20 pt-24 lg:pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              About Vitala Global Holdings
            </p>
            <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.95] md:text-8xl">
              A wholesale partner built around <span className="text-lime-dim">trust.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-pretty leading-7 text-muted-foreground md:text-lg">
              Vitala Global Holdings helps business buyers source thoughtful beauty, personal care and
              everyday wellness products through a clear, inquiry-led wholesale process.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <img
              src={wellbeing}
              alt="People supported by Vitala Global Holdings everyday health products"
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-md object-cover"
            />
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Human products, commercial discipline
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.1] md:text-6xl">
              Products people understand. Wholesale relationships businesses can rely on.
            </h2>
            <p className="mt-6 text-pretty leading-7 text-muted-foreground md:text-lg">
              We focus on skincare, oral care and wellness formats that fit naturally into modern
              retail assortments. Our role is to help distributors, pharmacies, beauty retailers and
              ecommerce businesses evaluate product fit, availability and order requirements before
              committing.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 text-white lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              B2B wholesale supplier only
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.1] md:text-6xl">
              We are designed for business purchasing, not personal checkout.
            </h2>
            <p className="mt-6 text-pretty leading-7 text-white/65 md:text-lg">
              Every inquiry is reviewed with commercial context in mind: buyer type, market,
              requested volume, product mix and destination requirements. That process helps us give
              serious buyers useful answers instead of generic retail promises.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <img
              src={lab}
              alt="Vitala Global Holdings quality and product review environment"
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-md object-cover"
            />
          </Reveal>
        </div>
      </section>

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
