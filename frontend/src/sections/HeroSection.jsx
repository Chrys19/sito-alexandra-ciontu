import { motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { ASSETS, CONTACT } from "@/data/constants";

export const HeroSection = () => {
  return (
    <section id="hero" data-testid="hero-section" className="min-h-screen gradient-hero pt-24 pb-16 md:pt-32 md:pb-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <p className="text-secondary-700 font-medium mb-3 md:mb-4 tracking-wide uppercase text-xs md:text-sm">
              Psicologa Clinica &bull; Ostia &amp; Fiumicino
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-primary-800 tracking-tight mb-6 md:mb-8 leading-tight">
              Dott.ssa Alexandra<br />Diana Ciontu
            </h1>
            <blockquote className="text-base md:text-lg lg:text-xl text-primary-600 italic mb-8 md:mb-10 px-4 lg:px-0 lg:pl-4 border-l-0 lg:border-l-2 border-secondary">
              "Se continui a fare ciò che hai sempre fatto, continuerai ad ottenere ciò che hai sempre ottenuto"
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <a
                href={`https://wa.me/39${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-cta-primary"
                className="btn-glow inline-flex items-center justify-center gap-2 bg-primary text-white px-6 md:px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-primary-600 transition-all duration-300 shadow-soft hover:shadow-hover"
              >
                <MessageCircle size={20} />
                Prenota un primo colloquio
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                data-testid="hero-cta-secondary"
                className="inline-flex items-center justify-center gap-2 bg-secondary/20 text-primary px-6 md:px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-secondary/30 transition-all duration-300 cursor-pointer"
              >
                Scopri il mio approccio
                <ChevronDown size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/30 rounded-full blur-3xl transform scale-110" />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px] rounded-full overflow-hidden border-4 border-white shadow-hover">
                <img src={ASSETS.profile} alt="Dott.ssa Alexandra Diana Ciontu" className="w-full h-full object-cover" data-testid="hero-profile-image" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 md:w-24 h-16 md:h-24 bg-secondary/40 rounded-full blur-2xl" />
              <div className="absolute -top-4 md:-top-6 -left-4 md:-left-6 w-12 md:w-16 h-12 md:h-16 bg-primary/20 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex flex-col items-center text-primary-400 hover:text-primary transition-colors cursor-pointer"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scorri</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};
