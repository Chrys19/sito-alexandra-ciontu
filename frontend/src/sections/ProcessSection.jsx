import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { PROCESS_STEPS, fadeInUp } from "@/data/constants";

export const ProcessSection = () => {
  return (
    <AnimatedSection className="section-padding bg-muted" id="process">
      <div className="max-w-7xl mx-auto px-4 md:px-12" data-testid="process-section">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.span variants={fadeInUp} className="text-secondary-700 font-medium tracking-wide uppercase text-xs md:text-sm">
            Il tuo percorso
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-light text-primary-800 mt-2 md:mt-3 mb-4 md:mb-6">
            Come funziona
          </motion.h2>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary/30 to-secondary md:transform md:-translate-x-1/2" />

          <div className="space-y-6 md:space-y-0">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative md:flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } md:gap-8 mb-6 md:mb-12`}
                data-testid={`process-step-${index}`}
              >
                <div className="absolute left-6 top-6 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-3 border-white shadow-lg md:hidden z-10" />
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-14 md:pl-0`}>
                  <div className="bg-white p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-soft">
                    <span className="font-script text-3xl md:text-4xl text-secondary">{step.number}</span>
                    <h3 className="text-lg md:text-xl font-medium text-primary-800 mt-2 mb-3 md:mb-4">{step.title}</h3>
                    <p className="text-primary-600 leading-relaxed text-sm md:text-base">{step.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-white shadow-lg" />
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
