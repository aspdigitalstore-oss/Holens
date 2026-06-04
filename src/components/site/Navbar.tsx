import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, ShoppingBag, X, LogIn, UserPlus } from "lucide-react";
import { CATEGORY_CONTENT } from "@/lib/content";
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<"create" | "login">("create");
  const { items } = useInquiry();

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

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {NAV.map((item) => (
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
            ))}
          </nav>

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
