import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { WholesaleNotice } from "@/components/site/WholesaleNotice";
import { Seo } from "@/lib/seo";
import { BRANDS } from "@/lib/brands";
import { BUSINESS_TYPES } from "@/lib/account";
import { COMPANY } from "@/lib/company";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to submit your inquiry.");
      setSent(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit your inquiry.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Seo
        title="Contact Vitala Global Holdings Wholesale Sales"
        description="Contact Vitala Global Holdings for wholesale skincare, oral care, personal care, distribution and private label inquiries. B2B buyers only."
      />
      <section className="bg-ink pb-20 pt-24 text-white lg:pt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.2em] text-lime">
              Contact / Wholesale inquiries
            </p>
            <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.95] md:text-8xl">
              Let&apos;s talk business.
            </h1>
            <p className="mt-6 max-w-2xl leading-7 text-white/70 md:text-lg">
              Tell us about your company, target market, product interests and expected volume. Our
              partnership team replies {COMPANY.responseTime}.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="space-y-8 lg:col-span-4">
            <Reveal>
              <WholesaleNotice compact />
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Wholesale sales
              </p>
              <a
                href={`mailto:${COMPANY.email}`}
                className="mt-3 flex items-center gap-2 text-sm font-medium hover:underline"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {COMPANY.email}
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Headquarters
              </p>
              <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {COMPANY.legalName}
                  <br />
                  {COMPANY.addressLine1}
                  <br />
                  {COMPANY.addressLine2}
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-sm leading-6 text-muted-foreground">
                Already know which products you need? Build an inquiry cart for the fastest
                product-specific response.
              </p>
              <Link
                to="/brands"
                className="group mt-4 inline-flex items-center gap-2 text-sm font-medium"
              >
                Browse wholesale brands
                <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:col-span-8">
            {sent ? (
              <div
                className="flex flex-col items-start gap-4 rounded-md border border-black/10 bg-bone p-10"
                role="status"
              >
                <CheckCircle2 className="h-8 w-8 text-lime-dim" aria-hidden="true" />
                <h2 className="font-display text-4xl">Thank you.</h2>
                <p className="text-muted-foreground">
                  Your wholesale inquiry has been received. A member of our partnership team will be
                  in touch {COMPANY.responseTime}.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="grid gap-6 rounded-md border border-black/10 p-8 md:grid-cols-2"
              >
                <Field label="Company name" required>
                  <input
                    name="companyName"
                    required
                    className="input"
                    autoComplete="organization"
                  />
                </Field>
                <Field label="Contact person" required>
                  <input name="contactPerson" required className="input" autoComplete="name" />
                </Field>
                <Field label="Business email" required>
                  <input
                    name="email"
                    type="email"
                    required
                    className="input"
                    autoComplete="email"
                  />
                </Field>
                <Field label="Phone number" required>
                  <input
                    name="phoneNumber"
                    type="tel"
                    required
                    className="input"
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Country" required>
                  <input name="country" required className="input" autoComplete="country-name" />
                </Field>
                <Field label="Business type" required>
                  <select name="businessType" required className="input" defaultValue="">
                    <option value="" disabled>
                      Select business type
                    </option>
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Brand of interest" className="md:col-span-2">
                  <select name="brand" className="input" defaultValue="All brands">
                    <option>All brands</option>
                    {BRANDS.map((brand) => (
                      <option key={brand.slug}>{brand.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Tell us more" className="md:col-span-2" required>
                  <textarea
                    name="notes"
                    required
                    className="input min-h-[140px]"
                    placeholder="Share your market, expected volume, product categories and any private label requirements."
                  />
                </Field>
                {error && (
                  <p className="md:col-span-2 text-sm text-red-700" role="alert">
                    {error}
                  </p>
                )}
                <div className="md:col-span-2">
                  <button
                    disabled={loading}
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Submit wholesale inquiry"}
                    <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  required,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
        {required ? " *" : ""}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
