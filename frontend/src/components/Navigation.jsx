import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ASSETS } from "@/data/constants";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Mi presento", href: "#about" },
    { label: "Approccio", href: "#method" },
    { label: "Aree di intervento", href: "#areas" },
    { label: "Percorso", href: "#process" },
    { label: "Sedi", href: "#locations" },
    { label: "Contatti", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      data-testid="navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-soft py-2 md:py-3" : "py-3 md:py-5 bg-white/95 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
        <a href="#hero" onClick={(e) => scrollToSection(e, "#hero")} data-testid="nav-logo" className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/30 rounded-full blur-md transform scale-110" />
            <img src={ASSETS.logo} alt="ADC Logo" className="relative h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border-2 border-secondary/50 shadow-soft" />
          </div>
          <div className="hidden sm:block">
            <p className="text-primary-800 font-medium text-sm md:text-base leading-tight">Dott.ssa Ciontu</p>
            <p className="text-primary-500 text-xs">Psicologa Clinica</p>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              data-testid={`nav-link-${link.href.replace("#", "")}`}
              className="nav-link text-sm font-medium text-primary-800 hover:text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, "#contact")}
          data-testid="nav-cta-call"
          className="hidden lg:flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-600 transition-all duration-300 hover:shadow-hover hover:-translate-y-0.5 cursor-pointer"
        >
          Prenota
        </a>

        <button
          data-testid="mobile-menu-toggle"
          className="lg:hidden p-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden glass mt-2 mx-4 rounded-2xl p-6 shadow-soft"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                data-testid={`mobile-nav-${link.href.replace("#", "")}`}
                className="text-primary-800 font-medium py-3 px-2 border-b border-secondary/20 cursor-pointer text-base active:bg-secondary/20 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              data-testid="mobile-cta-call"
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-medium mt-3 cursor-pointer text-base"
            >
              Prenota un appuntamento
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};
