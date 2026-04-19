import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { CookieBanner } from "@/components/CookieBanner";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { MethodSection } from "@/sections/MethodSection";
import { AreasSection } from "@/sections/AreasSection";
import { ProcessSection } from "@/sections/ProcessSection";
import { LocationsSection } from "@/sections/LocationsSection";
import { ContactSection } from "@/sections/ContactSection";

const HomePage = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <MethodSection />
        <AreasSection />
        <ProcessSection />
        <LocationsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTopButton />
      <CookieBanner />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
