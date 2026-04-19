import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { LOCATIONS, fadeInUp } from "@/data/constants";

const LocationCard = ({ location, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % location.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + location.images.length) % location.images.length);

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white/10 backdrop-blur-sm p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500"
      data-testid={`location-card-${index}`}
    >
      <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 group">
        <img
          src={location.images[currentImageIndex]}
          alt={`${location.name} - Foto ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        {location.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-primary opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              data-testid={`location-prev-${index}`}
              aria-label="Foto precedente"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-primary opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              data-testid={`location-next-${index}`}
              aria-label="Foto successiva"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {location.images.map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={() => setCurrentImageIndex(imgIndex)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    imgIndex === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                  }`}
                  aria-label={`Vai alla foto ${imgIndex + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <h3 className="text-base md:text-lg font-medium text-white mb-2">{location.name}</h3>
      <p className="text-white/70 text-xs md:text-sm mb-3 md:mb-4 flex items-start gap-2">
        <MapPin size={16} className="flex-shrink-0 mt-0.5" />
        {location.address}
      </p>
      <a
        href={location.maps}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`location-maps-${index}`}
        className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors text-xs md:text-sm font-medium"
      >
        <MapPin size={16} />
        Apri in Google Maps
        <ArrowRight size={14} />
      </a>
    </motion.div>
  );
};

export const LocationsSection = () => {
  return (
    <AnimatedSection className="section-padding bg-primary-800" id="locations">
      <div className="max-w-7xl mx-auto px-4 md:px-12" data-testid="locations-section">
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
          <motion.span variants={fadeInUp} className="text-secondary font-medium tracking-wide uppercase text-xs md:text-sm">
            Dove ti accolgo
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-light text-white mt-2 md:mt-3 mb-4 md:mb-6">
            Lo spazio terapeutico
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/70 leading-relaxed text-sm md:text-base px-2">
            Ricevo su appuntamento dal lunedì al venerdì in diversi spazi terapeutici, anche all'interno di contesti multidisciplinari in collaborazione con altre figure specialistiche (nutrizionisti, ostetriche, osteopati, psicologi, psicoterapeuti).
          </motion.p>
        </div>

        <motion.p variants={fadeInUp} className="text-center text-white/50 text-sm mb-8 md:mb-12">
          Ambienti <strong className="text-secondary">accoglienti e riservati</strong> pensati per garantire un setting sicuro e professionale.
        </motion.p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {LOCATIONS.map((location, index) => (
            <LocationCard key={index} location={location} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
