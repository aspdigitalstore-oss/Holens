import { Link, NavLink } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BRANDS } from "@/lib/brands";

const NAV = [
  { label: "About", to: "/about" },
  { label: "Brands", to: "/brands", mega: true },
  { label: "Innovation", to: "/innovation" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<string | null>(null);

  const categories = useMemo(
    () =>
      Object.values(
        BRANDS.reduce<Record<
          string,
          {
            label: string;
            description: string;
            brands: Array<{ slug: string; name: string; short: string; accent: string }>;
          }
        >>(
          (acc, brand) => {
            if (!acc[brand.categoryGroup]) {
              acc[brand.categoryGroup] = {
                label: brand.categoryGroup,
                description: brand.short,
                brands: [],
              };
            }
            acc[brand.categoryGroup].brands.push({
              slug: brand.slug,
              name: brand.name,
              short: brand.short,
              accent: brand.accent,
            });
            return acc;
          },
          {}
        )
      ),
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || megaOpen
          ? "bg-white/90 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      }`}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-7 w-7 place-items-center rounded-sm bg-ink text-white font-display text-lg leading-none">H</span>
          <span className="font-display text-2xl tracking-tight">Haleon</span>
          <span className="ml-1 hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:inline">B2B</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <div
              key={item.to}
              className="relative"
              onMouseEnter={() => setMegaOpen(item.mega ?? false)}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-ink" : "text-ink/80 hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/inquiry"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/85"
          >
            B2B Inquiry
            <ArrowUpRight className="h-4 w-4 hover-arrow" />
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className="lg:hidden"
          onClick={() => {
            setMobileOpen((value) => {
              if (value) setMobileCategory(null);
              return !value;
            });
          }}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            className="hidden border-t border-black/5 bg-white lg:block"
          >
            <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-8 px-6 py-10 lg:px-10">
              <div className="col-span-12 lg:col-span-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Healthcare categories
                </p>
                <h3 className="mt-3 font-display text-3xl text-balance">
                  Premium products for pharmacies, retailers and distributors.
                </h3>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">
                  Explore our clinical categories and discover the brand partners designed for enterprise supply chains.
                </p>
                <Link
                  to="/brands"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-medium"
                >
                  View all categories
                  <ArrowUpRight className="h-4 w-4 hover-arrow" />
                </Link>
              </div>

              <div className="col-span-12 lg:col-span-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {categories.map((category) => (
                  <div key={category.label} className="rounded-[2rem] border border-black/5 bg-bone p-6">
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{category.label}</p>
                    <p className="mt-3 text-sm leading-6 text-ink/80">{category.description}</p>
                    <div className="mt-6 space-y-3">
                      {category.brands.map((brand) => (
                        <Link
                          key={brand.slug}
                          to={`/brands/${brand.slug}`}
                          onClick={() => setMegaOpen(false)}
                          className="block rounded-2xl border border-black/5 bg-white p-4 transition hover:border-ink/20 hover:shadow-xl"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-semibold">{brand.name}</span>
                            <ArrowUpRight className="h-4 w-4 text-ink/70" />
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{brand.short}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-black/5 bg-white lg:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 font-display text-2xl"
                >
                  {item.label}
                </Link>
              ))}
              <div className="rounded-3xl border border-black/10 bg-bone p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Browse categories</p>
                <div className="mt-4 space-y-3">
                  {categories.map((category) => (
                    <div key={category.label} className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
                        onClick={() => setMobileCategory((current) => (current === category.label ? null : category.label))}
                      >
                        <span>{category.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {mobileCategory === category.label ? "Hide" : "Show"}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileCategory === category.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-2 border-t border-black/10 px-4 py-3"
                          >
                            {category.brands.map((brand) => (
                              <Link
                                key={brand.slug}
                                to={`/brands/${brand.slug}`}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setMobileCategory(null);
                                }}
                                className="block rounded-xl px-3 py-2 text-sm text-ink/90 transition hover:bg-bone"
                              >
                                {brand.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
