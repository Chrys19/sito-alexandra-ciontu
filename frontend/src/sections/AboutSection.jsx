import { motion } from "framer-motion";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { fadeInUp } from "@/data/constants";

export const AboutSection = () => {
  return (
    <AnimatedSection className="section-padding bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 md:px-12" data-testid="about-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <motion.span variants={fadeInUp} className="text-secondary-700 font-medium tracking-wide uppercase text-xs md:text-sm">
              Chi sono
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-light text-primary-800 mt-2 md:mt-3 mb-6 md:mb-8">
              Mi presento
            </motion.h2>
          </div>

          <motion.div variants={fadeInUp} className="space-y-5 md:space-y-6 text-primary-700 leading-relaxed text-base md:text-lg">
            <p>
              Sono la <strong className="text-primary">Dott.ssa Alexandra Diana Ciontu</strong>, psicologa clinica iscritta all'Albo A della regione Lazio con il n. <strong>28863</strong> e psicoterapeuta ad orientamento strategico integrato in formazione presso la scuola di specializzazione SCUPSIS di Roma.
            </p>
            <p>
              Il mio modo di lavorare nasce da una formazione teorica e pratica in continua evoluzione, maturata in contesti diversi (scolastico, riabilitativo, domiciliare). Questo mi ha insegnato a leggere i bisogni delle persone in modo concreto e a scegliere strumenti mirati, adattandoli alla situazione ed agli obiettivi del percorso.
            </p>
            <p>
              Credo che ogni sintomo, anche se doloroso, nasca per proteggerci. Ma quando smette di esserci utile, può diventare un ostacolo: <em>il mio compito è aiutare chi si rivolge a me a superarlo</em>, riscoprendo risorse personali per affrontare la realtà in modo più autentico e flessibile.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 md:mt-10">
            <a
              href="https://www.guidapsicologi.it/studio/dottssa-alexandra-diana-ciontu"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="guidapsicologi-link"
              className="group flex items-center gap-4 mx-auto max-w-md p-4 md:p-5 bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/25 rounded-2xl hover:border-secondary/50 hover:shadow-soft transition-all duration-500"
            >
              <div className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 group-hover:shadow-md transition-shadow">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-secondary-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-medium text-primary-800 leading-tight">Scopri il mio profilo su GuidaPsicologi</p>
                <p className="text-xs md:text-sm text-primary-500 mt-0.5">Recensioni, disponibilità e informazioni</p>
              </div>
              <ExternalLink size={16} className="text-primary-400 group-hover:text-primary flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-6 md:mt-8 text-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              data-testid="about-cta"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-600 transition-colors group cursor-pointer text-base md:text-lg"
            >
              Richiedi informazioni
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};
