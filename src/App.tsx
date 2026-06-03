import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { InquiryProvider } from "@/lib/inquiry";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Innovation = lazy(() => import("@/pages/Innovation"));
const Sustainability = lazy(() => import("@/pages/Sustainability"));
const Brands = lazy(() => import("@/pages/Brands"));
const BrandPage = lazy(() => import("@/pages/BrandPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const Wholesale = lazy(() => import("@/pages/Wholesale"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Inquiry = lazy(() => import("@/pages/Inquiry"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-ink">
        <InquiryProvider>
          <ScrollToTop />
          <a
            href="#main-content"
            className="sr-only z-[100] rounded-md bg-white p-3 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen pt-24">
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/innovation" element={<Innovation />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/wholesale" element={<Wholesale />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/brands/:slug" element={<BrandPage />} />
                <Route path="/products/:productId" element={<ProductPage />} />
                <Route path="/categories/:slug" element={<CategoryPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/inquiry" element={<Inquiry />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </InquiryProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function PageLoading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-bone"
      aria-busy="true"
      aria-label="Loading page"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-ink" />
    </div>
  );
}
