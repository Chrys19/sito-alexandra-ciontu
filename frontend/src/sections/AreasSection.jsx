import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { AREAS, fadeInUp } from "@/data/constants";

export const AreasSection = () => {
  return (
    <AnimatedSection className="section-padding bg-white" id="areas">
      <div className="max-w-7xl mx-auto px-4 md:px-12" data-testid="areas-section">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.span variants={fadeInUp} className="text-secondary-700 font-medium tracking-wide uppercase text-xs md:text-sm">
            Come posso aiutarti
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-light text-primary-800 mt-2 md:mt-3 mb-4 md:mb-6">
            Aree di intervento
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {AREAS.map((area, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="service-card bg-gradient-to-br from-white to-muted/50 p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-secondary/20 hover:border-secondary/50"
              data-testid={`area-card-${index}`}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/30 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-5">
                <area.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-primary-800 mb-2 md:mb-3">{area.title}</h3>
              <p className="text-primary-600 text-sm leading-relaxed">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
