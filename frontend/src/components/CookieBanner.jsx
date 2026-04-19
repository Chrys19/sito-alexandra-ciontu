import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          data-testid="cookie-banner"
        >
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-hover border border-secondary/20 p-5 md:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-10 h-10 bg-secondary/20 rounded-xl items-center justify-center flex-shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base text-primary-700 leading-relaxed">
                  Questo sito utilizza cookie tecnici necessari al funzionamento. Nessun dato viene utilizzato a fini di profilazione.{" "}
                  <Link to="/privacy" className="text-primary underline hover:no-underline font-medium">
                    Leggi la privacy policy
                  </Link>
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={handleAccept}
                    data-testid="cookie-accept-btn"
                    className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary-600 transition-colors"
                  >
                    Accetta
                  </button>
                  <button
                    onClick={handleReject}
                    data-testid="cookie-reject-btn"
                    className="bg-muted text-primary-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-secondary/20 transition-colors"
                  >
                    Solo necessari
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
