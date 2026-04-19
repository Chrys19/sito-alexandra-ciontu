import { motion } from "framer-motion";
import { Shield, Heart, Brain } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { fadeInUp } from "@/data/constants";

export const MethodSection = () => {
  return (
    <AnimatedSection className="section-padding bg-muted" id="method">
      <div className="max-w-7xl mx-auto px-4 md:px-12" data-testid="method-section">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <motion.span variants={fadeInUp} className="text-secondary-700 font-medium tracking-wide uppercase text-xs md:text-sm">
            L'approccio
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-light text-primary-800 mt-2 md:mt-3 mb-4 md:mb-6">
            Metodo di lavoro
          </motion.h2>
          <motion.p variants={fadeInUp} className="font-script text-xl md:text-2xl text-secondary-700">
            La relazione come strumento di cura
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
          {[
            { icon: Shield, title: "Spazio sicuro", text: "Offro uno spazio sicuro in cui potersi sentire accolti, riconosciuti e sostenuti. L'intervento è sempre personalizzato." },
            { icon: Heart, title: "Relazione terapeutica", text: "Il sintomo nasce nella relazione e nella relazione può curarsi. È dentro un legame sicuro che ciò che fa soffrire può essere trasformato." },
            { icon: Brain, title: "Cambiamento sostenibile", text: "È la qualità della relazione – fatta di presenza, ascolto e responsabilità – a permettere un cambiamento possibile e sostenibile." },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-soft hover:shadow-hover transition-shadow duration-500">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary/30 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-primary-800 mb-3 md:mb-4">{item.title}</h3>
              <p className="text-primary-600 leading-relaxed text-sm md:text-base">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="mt-10 md:mt-16 text-center">
          <p className="text-base md:text-lg text-primary-700 max-w-3xl mx-auto leading-relaxed px-2">
            Si lavora sia sul sintomo, con <strong>tecniche pratiche e mirate</strong>, sia sulle sue radici più profonde, promuovendo un cambiamento che integri benessere psicologico, crescita personale e maggiore consapevolezza di sé.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};
