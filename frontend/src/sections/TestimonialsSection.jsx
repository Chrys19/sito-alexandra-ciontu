import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { fadeInUp } from "@/data/constants";

const TESTIMONIALS = [
  {
    text: "La professionalità della Dott.ssa Ciontu, unita a una grande empatia e sensibilità, crea un ambiente sicuro in cui è facile aprirsi e lavorare su se stessi.",
    source: "GuidaPsicologi",
  },
  {
    text: "La dottoressa ha aiutato mia figlia che ad oggi riesce ad affrontare la sua vita in maniera più serena ed ha aiutato anche me che da madre avevo bisogno di essere guidata.",
    source: "GuidaPsicologi",
  },
  {
    text: "Sono una mamma che ha affidato alla Dott.ssa Alexandra sua figlia. Consiglio la dott.ssa Alexandra perché non si occupa solo del minore in carico ma collabora anche con la famiglia per ottimizzare i risultati!",
    source: "GuidaPsicologi",
  },
  {
    text: "Mi ha aiutato a dare il nome e riconoscere ad alcuni aspetti di me e sto imparando ad avere una prospettiva diversa nelle cose che mi accadono. La consiglio vivamente a chi cerca qualcuno che vada dritto al punto.",
    source: "GuidaPsicologi",
  },
];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: (direction) => ({ x: direction > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }),
};

export const TestimonialsSection = () => {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = useCallback((dir) => {
    setCurrent(([prev]) => {
      const next = (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length;
      return [next, dir];
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 7000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <AnimatedSection className="section-padding bg-white overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 md:px-12" data-testid="testimonials-section">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.span variants={fadeInUp} className="text-secondary-700 font-medium tracking-wide uppercase text-xs md:text-sm">
            Chi ci è già passato
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-light text-primary-800 mt-2 md:mt-3 mb-4 md:mb-6">
            Testimonianze
          </motion.h2>
        </div>

        <motion.div variants={fadeInUp} className="max-w-2xl mx-auto">
          {/* Testimonial card */}
          <div className="relative bg-gradient-to-br from-muted to-secondary/5 rounded-3xl p-8 md:p-12 border border-secondary/15 min-h-[260px] md:min-h-[240px] flex flex-col justify-center">
            {/* Decorative quote */}
            <div className="absolute top-5 left-6 md:top-7 md:left-10 font-script text-6xl md:text-7xl text-secondary/25 leading-none select-none">&ldquo;</div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative z-10"
              >
                <p className="text-primary-700 text-base md:text-lg leading-relaxed italic pl-4 md:pl-6" data-testid={`testimonial-text-${current}`}>
                  {TESTIMONIALS[current].text}
                </p>
                <div className="flex items-center gap-3 mt-6 pl-4 md:pl-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-secondary-700 fill-secondary-700" />
                    ))}
                  </div>
                  <span className="text-xs text-primary-400">&mdash; {TESTIMONIALS[current].source}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-6 md:mt-8">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center text-primary-500 hover:bg-secondary/10 hover:border-secondary/50 transition-all"
              data-testid="testimonial-prev"
              aria-label="Precedente"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent([i, i > current ? 1 : -1])}
                  className={`rounded-full transition-all duration-400 ${
                    i === current ? "w-6 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-secondary/40 hover:bg-secondary/60"
                  }`}
                  data-testid={`testimonial-dot-${i}`}
                  aria-label={`Vai alla testimonianza ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-secondary/30 flex items-center justify-center text-primary-500 hover:bg-secondary/10 hover:border-secondary/50 transition-all"
              data-testid="testimonial-next"
              aria-label="Successiva"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="text-center mt-6">
            <a
              href="https://www.guidapsicologi.it/studio/dottssa-alexandra-diana-ciontu"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="testimonials-all-reviews-link"
              className="inline-flex items-center gap-1.5 text-sm text-primary-500 hover:text-primary font-medium transition-colors"
            >
              Vedi tutte le recensioni su GuidaPsicologi
              <ChevronRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};
