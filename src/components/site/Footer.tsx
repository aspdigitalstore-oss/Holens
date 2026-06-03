import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { BRANDS } from "@/lib/brands";
import { CATEGORY_CONTENT } from "@/lib/content";
import { COMPANY, NO_RETAIL_NOTICE, WHOLESALE_ONLY_LABEL } from "@/lib/company";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-lime">
              {WHOLESALE_ONLY_LABEL}
            </p>
            <p className="mt-4 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl">
              Better everyday health,
              <br />
              <span className="text-lime">for business buyers.</span>
            </p>
            <p className="mt-5 max-w-md text-sm leading-6 text-white/60">
              {NO_RETAIL_NOTICE}. Submit an inquiry for wholesale pricing, availability and shipping
              terms.
            </p>
            <Link
              to="/cart"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm transition-colors hover:bg-white hover:text-ink"
            >
              View inquiry cart
              <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 lg:col-span-7 lg:grid-cols-4">
            <FooterCol
              title="Company"
              links={[
                { label: "About", to: "/about" },
                { label: "Brands", to: "/brands" },
                { label: "Innovation", to: "/innovation" },
                { label: "Sustainability", to: "/sustainability" },
                { label: "Wholesale", to: "/wholesale" },
                { label: "FAQ", to: "/faq" },
                { label: "Contact", to: "/contact" },
              ]}
            />
            <FooterCol
              title="Brands"
              links={BRANDS.map((brand) => ({ label: brand.name, to: `/brands/${brand.slug}` }))}
            />
            <FooterCol
              title="Categories"
              links={CATEGORY_CONTENT.map((category) => ({
                label: category.name,
                to: `/categories/${category.slug}`,
              }))}
            />
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Contact</p>
              <div className="mt-4 space-y-4 text-sm text-white/80">
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-start gap-2 hover:text-lime"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {COMPANY.email}
                </a>
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {COMPANY.addressLine1}
                    <br />
                    {COMPANY.addressLine2}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p>Wholesale inquiries only</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm text-white/80 transition-colors hover:text-lime">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
