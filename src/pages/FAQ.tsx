import { ContactPanel } from "@/components/site/ContactPanel";
import { FAQSection, FAQ_JSON_LD } from "@/components/site/FAQSection";
import { MOQNotice, WholesaleNotice } from "@/components/site/WholesaleNotice";
import { Reveal } from "@/components/site/Reveal";
import { Seo } from "@/lib/seo";

export default function FAQ() {
  return (
    <>
      <Seo
        title="Wholesale FAQ | MOQ, Ordering & Private Label | Vitala Global Holdings"
        description="Answers about Vitala Global Holdings wholesale-only ordering, the 2000-unit mixed MOQ, inquiry checkout, USA supply and private label program reviews."
        jsonLd={FAQ_JSON_LD}
      />
      <section className="bg-bone pb-20 pt-40 lg:pt-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Wholesale FAQ
            </p>
            <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">
              Clear answers for business buyers.
            </h1>
            <p className="mt-8 max-w-2xl leading-7 text-muted-foreground md:text-lg">
              Review our wholesale-only policy, mixed-category minimum order quantity and
              inquiry-based ordering process before you build a product request.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <WholesaleNotice compact />
            <MOQNotice compact />
          </div>
        </div>
      </section>
      <FAQSection title="Frequently asked wholesale questions." />
      <ContactPanel />
    </>
  );
}
