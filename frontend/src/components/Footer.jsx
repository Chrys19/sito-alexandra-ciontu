import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { ASSETS, CONTACT } from "@/data/constants";

export const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white py-12 md:py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="sm:col-span-2 md:col-span-1">
            <img src={ASSETS.logo} alt="ADC Logo" className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover mb-4 md:mb-6" />
            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              Dott.ssa Alexandra Diana Ciontu<br />
              Psicologa Clinica<br />
              Albo A - Lazio n. 28863
            </p>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-medium mb-4 md:mb-6">Link rapidi</h4>
            <ul className="space-y-2 md:space-y-3">
              {["Mi presento", "Approccio", "Aree di intervento", "Percorso", "Sedi", "Contatti"].map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${["about", "method", "areas", "process", "locations", "contact"][index]}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const section = document.querySelector(`#${["about", "method", "areas", "process", "locations", "contact"][index]}`);
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    className="text-white/70 hover:text-white transition-colors cursor-pointer text-sm md:text-base"
                    data-testid={`footer-link-${index}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-medium mb-4 md:mb-6">Contatti</h4>
            <div className="space-y-3 md:space-y-4">
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm md:text-base">
                <Phone size={18} />
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm md:text-base break-all">
                <Mail size={18} className="flex-shrink-0" />
                {CONTACT.email}
              </a>
              <a
                href={`https://wa.me/39${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm md:text-base"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs md:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Dott.ssa Alexandra Diana Ciontu. Tutti i diritti riservati.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <Link to="/privacy" className="text-white/50 hover:text-white/70 text-xs md:text-sm transition-colors" data-testid="footer-privacy-link">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-white/30">&bull;</span>
            <p className="text-white/50 text-xs md:text-sm">
              Psicologa Ostia &bull; Fiumicino &bull; Roma
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
