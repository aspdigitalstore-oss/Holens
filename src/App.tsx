import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Innovation from "@/pages/Innovation";
import Sustainability from "@/pages/Sustainability";
import Brands from "@/pages/Brands";
import BrandPage from "@/pages/BrandPage";
import Inquiry from "@/pages/Inquiry";
import NotFound from "@/pages/NotFound";
import { InquiryProvider } from "@/lib/inquiry";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-ink">
        <InquiryProvider>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/innovation" element={<Innovation />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:slug" element={<BrandPage />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        </InquiryProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
