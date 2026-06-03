import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { Reveal } from "@/components/site/Reveal";

export function ContactPanel() {
  return (
    <section className="bg-lime">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 lg:grid-cols-2 lg:items-end lg:px-10 lg:py-24">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink/60">Wholesale inquiries</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-[1] text-ink md:text-6xl">
            Talk directly with our partnership team.
          </h2>
          <p className="mt-5 max-w-xl text-ink/75">
            Share your market, product mix and expected volume. We reply {COMPANY.responseTime}.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5">
          <a
            href={`mailto:${COMPANY.email}`}
            className="flex items-center gap-3 text-sm font-medium text-ink"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {COMPANY.email}
          </a>
          <p className="flex items-start gap-3 text-sm text-ink/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {COMPANY.legalName}
              <br />
              {COMPANY.addressLine1}, {COMPANY.addressLine2}
            </span>
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85"
          >
            Contact wholesale sales
            <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
