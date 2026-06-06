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
  const [selectedCategory, setSelectedCategory] = useState("Cosmetics & Skincare");
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<"create" | "login">("create");
  const { items } = useInquiry();

  const MEGA_CATEGORIES = [
    { label: "Cosmetics & Skincare", groups: ["Dermaceutical Skincare"] },
    { label: "Oral Care", groups: ["Oral Health", "Denture Care"] },
    { label: "Healthcare", groups: ["Pain Relief", "Cold & Flu", "Respiratory Care", "Digestive Health", "Quit Smoking"] },
    { label: "Nutrition", groups: ["Vitamins & Supplements", "Wellness & Nutrition", "Children Nutrition"] },
    { label: "Personal Care", groups: ["Lip Care"] },
    { label: "Wellness", groups: ["Wellness & Nutrition", "Sleep & Wellness"] },
  ];

  const activeCategory = MEGA_CATEGORIES.find((category) => category.label === selectedCategory);
  const filteredBrands = BRANDS.filter((brand) =>
    activeCategory ? activeCategory.groups.includes(brand.categoryGroup) : true,
  );
  const featuredBrands = filteredBrands.slice(0, 12);

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
                      className="absolute left-1/2 top-full z-40 mt-3 w-[95vw] max-w-[1600px] -translate-x-1/2 overflow-hidden rounded-[28px] border border-white/10 bg-white/90 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
                      style={{ overscrollBehavior: "contain" }}
                    >
                      <div className="grid min-h-[55vh] max-h-[75vh] grid-cols-1 overflow-hidden lg:grid-cols-[280px_1fr]">
                        <aside className="sticky top-0 hidden h-full overflow-y-auto border-r border-white/10 bg-slate-950/80 p-6 text-white lg:block">
                          <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                            Product categories
                          </p>
                          <div className="mt-6 space-y-3">
                            {MEGA_CATEGORIES.map((category) => (
                              <button
                                key={category.label}
                                type="button"
                                onClick={() => setSelectedCategory(category.label)}
                                onMouseEnter={() => setSelectedCategory(category.label)}
                                onFocus={() => setSelectedCategory(category.label)}
                                className={`w-full rounded-3xl border px-4 py-3 text-left text-sm transition ${
                                  category.label === selectedCategory
                                    ? "border-white/20 bg-white/10 text-white shadow-lg shadow-black/10"
                                    : "border-white/5 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10 hover:text-white"
                                }`}
                              >
                                {category.label}
                              </button>
                            ))}
                          </div>
                        </aside>

                        <section className="overflow-hidden bg-slate-950/90 p-5 md:p-6">
                          <div className="mb-5 flex items-center justify-between gap-4 rounded-3xl bg-white/5 px-5 py-4 text-white/80 shadow-inner shadow-black/10 backdrop-blur-sm">
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
                                Showing
                              </p>
                              <h2 className="mt-2 text-2xl font-semibold text-white">
                                {selectedCategory}
                              </h2>
                            </div>
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
                              {filteredBrands.length} brands
                            </span>
                          </div>

                          <div className="grid gap-5 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3">
                            {featuredBrands.map((brand) => (
                              <div
                                key={brand.slug}
                                role="link"
                                tabIndex={0}
                                onClick={() => navigate(`/brands/${brand.slug}`)}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    navigate(`/brands/${brand.slug}`);
                                  }
                                }}
                                className="group relative flex min-h-[22rem] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-slate-900 shadow-xl shadow-black/20 transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(0,0,0,0.22)] cursor-pointer"
                              >
                                <div className="absolute inset-0 overflow-hidden">
                                  <img
                                    src={brand.image}
                                    alt={brand.imageAlt}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />
                                </div>
                                <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                                  <div>
                                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">
                                      {brand.categoryGroup.toUpperCase()}
                                    </p>
                                    <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                                      {brand.name}
                                    </h3>
                                    <p className="mt-3 max-w-[70%] text-sm leading-6 text-white/80">
                                      {brand.tagline}
                                    </p>
                                  </div>

                                  <div className="mt-6 space-y-3 text-sm text-white/80">
                                    {brand.products.slice(0, 4).map((product) => (
                                      <Link
                                        key={product.id}
                                        to={`/brands/${brand.slug}`}
                                        className="block rounded-2xl bg-white/10 px-3 py-2 transition hover:bg-white/15"
                                        onClick={(event) => event.stopPropagation()}
                                      >
                                        <p className="font-medium text-white">{product.name}</p>
                                        <p className="text-xs text-white/60">{product.tagline}</p>
                                      </Link>
                                    ))}
                                  </div>

                                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white transition group-hover:text-white/90">
                                    <span>Explore</span>
                                    <span aria-hidden="true">→</span>
                                  </div>
                                </div>
                              </div>
                            ))}
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
