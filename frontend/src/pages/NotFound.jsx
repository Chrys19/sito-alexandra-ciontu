import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-md"
      >
        <p className="font-script text-6xl md:text-7xl text-secondary-700 mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-light text-primary-800 mb-4">
          Pagina non trovata
        </h1>
        <p className="text-primary-600 mb-8 text-sm md:text-base leading-relaxed">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link
          to="/"
          data-testid="404-back-home"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-600 transition-all duration-300 shadow-soft hover:shadow-hover"
        >
          <ArrowLeft size={16} />
          Torna alla home
        </Link>
      </motion.div>
    </div>
  );
}
