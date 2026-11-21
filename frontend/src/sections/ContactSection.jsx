import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import axios from "axios";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CONTACT, API, fadeInUp } from "@/data/constants";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    messaggio: "",
    luogo: "",
    privacy_accepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const studioOptions = [
    { value: "Associazione L'Albero della Vita - Fiumicino", label: "Associazione L'Albero della Vita - Via del Canale 18, Fiumicino" },
    { value: "Studio Privato - Ostia", label: "Studio Privato - Via del Mare 43, Ostia" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.privacy_accepted) {
      toast.error("È necessario accettare la privacy policy");
      return;
    }
    if (!formData.luogo) {
      toast.error("Seleziona la sede preferita");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setIsSubmitted(true);
      setFormData({ nome: "", email: "", telefono: "", messaggio: "", luogo: "", privacy_accepted: false });
    } catch (error) {
      toast.error("Errore nell'invio del messaggio. Riprova più tardi.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection className="section-padding bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 md:px-12" data-testid="contact-section">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
          <motion.div variants={fadeInUp}>
            <span className="text-secondary-700 font-medium tracking-wide uppercase text-xs md:text-sm">Parliamone</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-primary-800 mt-2 md:mt-3 mb-4 md:mb-6">Contattami</h2>
            <p className="text-primary-600 leading-relaxed mb-8 md:mb-10 text-sm md:text-base">
              Il primo contatto telefonico è gratuito e non vincolante. Puoi scrivermi o chiamarmi per qualsiasi informazione o per prenotare un appuntamento.
            </p>
            <div className="space-y-4 md:space-y-6">
              <a href={`tel:${CONTACT.phone}`} data-testid="contact-phone" className="flex items-center gap-3 md:gap-4 group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary/30 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-secondary/50 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-primary-500">Telefono</p>
                  <p className="text-base md:text-lg font-medium text-primary-800">{CONTACT.phone}</p>
                </div>
              </a>
              <a href={`mailto:${CONTACT.email}`} data-testid="contact-email" className="flex items-center gap-3 md:gap-4 group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary/30 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-secondary/50 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-primary-500">Email</p>
                  <p className="text-sm md:text-lg font-medium text-primary-800 break-all">{CONTACT.email}</p>
                </div>
              </a>
              <a href={`https://wa.me/39${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp" className="flex items-center gap-3 md:gap-4 group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary/30 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-secondary/50 transition-colors flex-shrink-0">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-primary-500">WhatsApp</p>
                  <p className="text-base md:text-lg font-medium text-primary-800">Scrivimi su WhatsApp</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-muted p-8 md:p-12 rounded-2xl md:rounded-3xl text-center flex flex-col items-center justify-center min-h-[400px]"
                  data-testid="contact-success-message"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 md:w-20 md:h-20 bg-secondary/30 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-light text-primary-800 mb-3">
                    Grazie per avermi contattata!
                  </h3>
                  <p className="text-primary-600 leading-relaxed text-sm md:text-base max-w-sm mb-8">
                    Ho ricevuto il tuo messaggio e ti ricontatterò il prima possibile. A presto!
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    data-testid="contact-send-another"
                    className="text-primary font-medium text-sm hover:text-primary-600 transition-colors underline underline-offset-4"
                  >
                    Invia un altro messaggio
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                  <form onSubmit={handleSubmit} className="bg-muted p-5 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl" data-testid="contact-form">
                    <div className="space-y-4 md:space-y-5">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-primary-700 mb-2">Nome e Cognome *</label>
                        <Input id="nome" type="text" required value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className="bg-white border-secondary/30 focus:border-primary h-11 md:h-12 rounded-xl text-base" placeholder="Il tuo nome" data-testid="form-input-nome" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">Email *</label>
                          <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-white border-secondary/30 focus:border-primary h-11 md:h-12 rounded-xl text-base" placeholder="La tua email" data-testid="form-input-email" />
                        </div>
                        <div>
                          <label htmlFor="telefono" className="block text-sm font-medium text-primary-700 mb-2">Telefono *</label>
                          <Input id="telefono" type="tel" required value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="bg-white border-secondary/30 focus:border-primary h-11 md:h-12 rounded-xl text-base" placeholder="Il tuo numero" data-testid="form-input-telefono" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="messaggio" className="block text-sm font-medium text-primary-700 mb-2">Di cosa hai bisogno? *</label>
                        <Textarea id="messaggio" required rows={4} value={formData.messaggio} onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })} className="bg-white border-secondary/30 focus:border-primary rounded-xl resize-none text-base" placeholder="Descrivi brevemente il motivo del contatto..." data-testid="form-input-messaggio" />
                      </div>
                      <div>
                        <label htmlFor="luogo" className="block text-sm font-medium text-primary-700 mb-2">Sede preferita *</label>
                        <select
                          id="luogo"
                          required
                          value={formData.luogo}
                          onChange={(e) => setFormData({ ...formData, luogo: e.target.value })}
                          className="w-full bg-white border border-secondary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 h-11 md:h-12 rounded-xl text-base px-4 text-primary-700 appearance-none cursor-pointer"
                          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2358355E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
                          data-testid="form-select-luogo"
                        >
                          <option value="">Seleziona una sede...</option>
                          {studioOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-start gap-3 pt-2">
                        <Checkbox id="privacy" checked={formData.privacy_accepted} onCheckedChange={(checked) => setFormData({ ...formData, privacy_accepted: checked })} className="mt-1" data-testid="form-checkbox-privacy" />
                        <label htmlFor="privacy" className="text-xs md:text-sm text-primary-600 leading-relaxed">
                          Ho letto e accetto la <Link to="/privacy" className="text-primary underline hover:no-underline">privacy policy</Link>. I dati inseriti saranno trattati nel rispetto della normativa vigente e utilizzati esclusivamente per rispondere alla richiesta. *
                        </label>
                      </div>
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white hover:bg-primary-600 rounded-full py-5 md:py-6 text-base md:text-lg font-medium transition-all duration-300 shadow-soft hover:shadow-hover disabled:opacity-50 mt-2" data-testid="form-submit-button">
                        {isSubmitting ? "Invio in corso..." : "Invia messaggio"}
                      </Button>
                      <p className="text-xs text-primary-500 text-center">La tua richiesta sarà trattata con la massima riservatezza.</p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};
