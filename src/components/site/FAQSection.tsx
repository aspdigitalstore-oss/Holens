import { FAQS } from "@/lib/content";
import { Reveal } from "@/components/site/Reveal";

export function FAQSection({ title = "Wholesale ordering questions." }: { title?: string }) {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">FAQ</p>
          <h2 className="mt-3 font-display text-5xl leading-[1] md:text-6xl">{title}</h2>
        </Reveal>
        <div className="mt-12 divide-y divide-black/10 border-y border-black/10">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.04}>
              <details className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left font-medium">
                  <span>{faq.question}</span>
                  <span
                    className="text-xl text-muted-foreground transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
