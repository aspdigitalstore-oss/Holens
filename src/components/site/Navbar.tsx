import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, ShoppingBag, X, LogIn, UserPlus } from "lucide-react";
import { CATEGORY_CONTENT } from "@/lib/content";
import { BRANDS } from "@/lib/brands";
import { COMPANY, NO_RETAIL_NOTICE, WHOLESALE_ONLY_LABEL } from "@/lib/company";
import { useInquiry } from "@/lib/inquiry";
import AccountModal from "@/components/site/AccountModal";

const NAV = [
  { label: "Brands", to: "/brands" },
  { label: "About", to: "/about" },
  { label: "Innovation", to: "/innovation" },
  { label: "Sustainability", to: "/sustainability" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [brandsPanelOpen, setBrandsPanelOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<"create" | "login">("create");
  const { items } = useInquiry();

  const MEGA_CATEGORIES = [
    "Cosmetics & Skincare",
    "Oral Care",
    "Healthcare",
    "Nutrition",
    "Personal Care",
    "Wellness",
  ];

  const featuredBrands = BRANDS;

  function openCreate() {
    setInitialMode("create");
    setAccountModalOpen(true);
  }

  function openLogin() {
    setInitialMode("login");
    setAccountModalOpen(true);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-lime text-ink">
        <div className="mx-auto flex h-7 max-w-[1400px] items-center justify-between gap-4 px-6 text-[10px] font-semibold uppercase tracking-[0.16em] lg:px-10">
          <span>{WHOLESALE_ONLY_LABEL}</span>
          <span className="hidden sm:inline">{NO_RETAIL_NOTICE}</span>
          <a
            href={`mailto:${COMPANY.email}`}
            className="normal-case tracking-normal hover:underline"
          >
            {COMPANY.email}
          </a>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${scrolled ? "border-b border-black/5 bg-white/95 shadow-sm backdrop-blur-xl" : "bg-white/90 backdrop-blur-xl"}`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <Link to="/" className="group flex items-center gap-2" aria-label="Vitala Global Holdings home">
            <span className="grid h-7 w-7 place-items-center rounded-sm bg-ink font-display text-lg leading-none text-white">
              V
            </span>
            <span className="font-display text-2xl tracking-tight">Vitala</span>
            <span className="ml-1 hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
              B2B
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex relative" aria-label="Primary navigation">
            {NAV.map((item) =>
              item.label === "Brands" ? (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => setBrandsPanelOpen(true)}
                  onMouseLeave={() => setBrandsPanelOpen(false)}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        isActive ? "text-ink" : "text-ink/70 hover:text-ink"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>

                  {brandsPanelOpen && (
                    <div
                      className="absolute left-1/2 top-full z-40 mt-3 w-[90vw] max-w-[1600px] -translate-x-1/2 overflow-hidden rounded-[28px] border border-slate-200/10 bg-white/95 shadow-[0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl"
                      style={{ overscrollBehavior: "contain" }}
                    >
                      <div className="grid min-h-[55vh] max-h-[75vh] grid-cols-1 overflow-hidden lg:grid-cols-[260px_1fr]">
                        <aside className="sticky top-0 hidden h-full overflow-y-auto border-r border-slate-200/10 bg-slate-950/95 p-6 text-white lg:block">
                          <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                            Product categories
                          </p>
                          <div className="mt-6 space-y-3">
                            {MEGA_CATEGORIES.map((category) => (
                              <div
                                key={category}
                                className="rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-white/80"
                              >
                                {category}
                              </div>
                            ))}
                          </div>
                        </aside>

                        <section className="overflow-hidden bg-slate-950/95 p-4 md:p-5">
                          <div
                            className="max-h-[64vh] overflow-y-auto pr-2"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                          >
                            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                              {featuredBrands.map((brand) => (
                                <div
                                  key={brand.slug}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => navigate(`/brands/${brand.slug}`)}
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                      navigate(`/brands/${brand.slug}`);
                                    }
                                  }}
                                  className="group flex min-h-[16rem] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-slate-900 shadow-lg shadow-black/20 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)] cursor-pointer"
                                >
                                  <div className="relative h-28 overflow-hidden bg-slate-800">
                                    <img
                                      src={brand.image}
                                      alt={brand.imageAlt}
                                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                                  </div>
                                  <div className="relative z-10 flex flex-col p-4 text-white">
                                    <div>
                                      <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                                        {brand.categoryGroup}
                                      </p>
                                      <h3 className="mt-2 text-lg font-semibold leading-tight text-white">
                                        {brand.name}
                                      </h3>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between text-sm font-medium text-white/90">
                                      <span>Explore</span>
                                      <span aria-hidden="true">→</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-ink" : "text-ink/70 hover:text-ink"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            )}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-full border border-ink px-3 py-2 text-sm font-medium text-ink hover:bg-ink/5" title="Create account">
              <UserPlus className="h-4 w-4" aria-hidden="true" />
            </button>
            <button onClick={openLogin} className="inline-flex items-center gap-2 rounded-full border border-ink px-3 py-2 text-sm font-medium text-ink hover:bg-ink/5" title="Log in">
              <LogIn className="h-4 w-4" aria-hidden="true" />
            </button>
            <Link
              to="/cart"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ink/85"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Inquiry Cart{items.length > 0 ? ` (${items.length})` : ""}
              <ArrowUpRight className="h-4 w-4 hover-arrow" aria-hidden="true" />
            </Link>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen ? "true" : "false"}
            className="lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

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
              <div className="mt-3 rounded-md border border-black/10 bg-bone p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Shop by category
                </p>
                <div className="mt-3 space-y-2">
                  {CATEGORY_CONTENT.map((category) => (
                    <Link
                      key={category.slug}
                      to={`/categories/${category.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-md bg-white px-3 py-2 text-sm"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white"
              >
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                Inquiry Cart{items.length > 0 ? ` (${items.length})` : ""}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AccountModal open={accountModalOpen} setOpen={setAccountModalOpen} initialMode={initialMode} />
    </header>
  );
}
