import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Phone, Mail, MapPin, Menu, X, ChevronDown, Heart, Users, Brain, Compass, GraduationCap, Shield, Baby, MessageCircle, ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster, toast } from "sonner";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Assets
const ASSETS = {
  logo: "https://customer-assets.emergentagent.com/job_equilibrio-psiche/artifacts/ngjyckwn_Logo%20ADC.png",
  profile: "https://customer-assets.emergentagent.com/job_equilibrio-psiche/artifacts/6hyxzpyx_6621fa4f-17a9-46da-b45e-8b785f81235e.jpg",
  studioFiumicino: "https://customer-assets.emergentagent.com/job_equilibrio-psiche/artifacts/9shqidqf_fiumicino-canale-2.webp",
  studioOstiaBono: "https://customer-assets.emergentagent.com/job_equilibrio-psiche/artifacts/176wlws3_ostia-bono-2.webp",
  studioOstiaSimonetti: "https://customer-assets.emergentagent.com/job_equilibrio-psiche/artifacts/uem5oenc_ostia-simonetti-1.webp",
};

// Contact info
const CONTACT = {
  phone: "3275569910",
  email: "alexandra.ciontu.psi@gmail.com",
  whatsapp: "3275569910",
};

// Locations data with multiple images
const LOCATIONS = [
  {
    name: "Studio Privato - Ostia Simonetti",
    address: "Via Diego Simonetti 29, 00122, Ostia",
    maps: "https://maps.google.com/?q=Via+Diego+Simonetti+29+00122+Ostia",
    images: [
      ASSETS.studioOstiaSimonetti,
      "https://customer-assets.emergentagent.com/job_equilibrio-psiche/artifacts/op0vm3a3_ostia-simonetti-2.webp"
    ],
  },
  {
    name: "Associazione L'Albero della Vita",
    address: "Via del Canale 18, 00054, Fiumicino",
    maps: "https://maps.google.com/?q=Via+del+Canale+18+00054+Fiumicino",
    images: [
      ASSETS.studioFiumicino,
      "https://customer-assets.emergentagent.com/job_equilibrio-psiche/artifacts/mu7p4mms_fiumicino-canale-1.webp"
    ],
  },
  {
    name: "Associazione Prinea",
    address: "Viale Ammiraglio del Bono 63, 00122, Ostia",
    maps: "https://maps.google.com/?q=Viale+Ammiraglio+del+Bono+63+00122+Ostia",
    images: [
      ASSETS.studioOstiaBono,
      "https://customer-assets.emergentagent.com/job_equilibrio-psiche/artifacts/v27xt6dz_ostia-bono-1.jpg"
    ],
  },
];

// Areas of intervention
const AREAS = [
  {
    icon: Users,
    title: "Difficoltà nelle relazioni",
    description: "Di coppia, familiari, amicali – quando i legami diventano faticosi o conflittuali e le tensioni comunicative generano incomprensioni.",
  },
  {
    icon: Heart,
    title: "Blocchi evolutivi e familiari",
    description: "Nelle fasi in cui il sistema fatica a riorganizzarsi e a trovare nuovi equilibri.",
  },
  {
    icon: Shield,
    title: "Confini e bisogni personali",
    description: "Riconoscimento dei propri bisogni e costruzione di confini più chiari – dire sì, dire no, senza colpa.",
  },
  {
    icon: Brain,
    title: "Identità e autostima",
    description: "Chi sono, cosa mi fa bene, cosa voglio davvero – definizione dell'identità e rafforzamento dell'autostima.",
  },
  {
    icon: Compass,
    title: "Crisi e transizioni",
    description: "Cambiamenti, scelte, separazioni, passaggi di vita – quando serve ritrovare direzione.",
  },
  {
    icon: GraduationCap,
    title: "Orientamento scolastico e professionale",
    description: "Per scegliere con maggiore consapevolezza e ridurre confusione e pressione.",
  },
  {
    icon: Baby,
    title: "Accompagnamento alla genitorialità",
    description: "Quando il legame con i figli attraversa fasi di tensione, crescita o ridefinizione degli equilibri.",
  },
];

// Process steps
const PROCESS_STEPS = [
  {
    number: "01",
    title: "Colloquio telefonico",
    description: "Il primo contatto telefonico è gratuito e non vincolante. È necessario inquadrare la richiesta e definire, in modo condiviso, quale tipo di intervento può essere più utile. Vengono verificate le disponibilità e si concorda l'appuntamento.",
  },
  {
    number: "02",
    title: "Incontro iniziale",
    description: "Nei primi incontri si esplora insieme la richiesta e vengono definiti gli obiettivi, il setting e le modalità del percorso terapeutico. Nel caso di presa in carico di un minore, il primo incontro viene svolto con entrambi i genitori.",
  },
  {
    number: "03",
    title: "Percorso personalizzato",
    description: "Il percorso viene definito insieme, attraverso una valutazione iniziale e una progressiva ricalibrazione degli obiettivi, adattando strumenti e tecniche in modo flessibile tenendo conto dell'unicità della persona e della sua storia.",
  },
  {
    number: "04",
    title: "Monitoraggio e sostegno",
    description: "Verifica continua del percorso e adattamento in base all'evoluzione della persona e dei suoi bisogni.",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// Section wrapper with animation
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Mi presento", href: "#about" },
    { label: "Metodo", href: "#method" },
    { label: "Aree di intervento", href: "#areas" },
    { label: "Percorso", href: "#process" },
    { label: "Sedi", href: "#locations" },
    { label: "Contatti", href: "#contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      data-testid="navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-soft py-2 md:py-3" : "py-3 md:py-5 bg-white/95 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
        <a 
          href="#hero" 
          onClick={(e) => scrollToSection(e, "#hero")} 
          data-testid="nav-logo" 
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/30 rounded-full blur-md transform scale-110" />
            <img 
              src={ASSETS.logo} 
              alt="ADC Logo" 
              className="relative h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border-2 border-secondary/50 shadow-soft" 
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-primary-800 font-medium text-sm md:text-base leading-tight">Dott.ssa Ciontu</p>
            <p className="text-primary-500 text-xs">Psicologa Clinica</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              data-testid={`nav-link-${link.href.replace("#", "")}`}
              className="nav-link text-sm font-medium text-primary-800 hover:text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, "#contact")}
          data-testid="nav-cta-call"
          className="hidden lg:flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-600 transition-all duration-300 hover:shadow-hover hover:-translate-y-0.5 cursor-pointer"
        >
          Prenota
        </a>

        {/* Mobile Menu Button */}
        <button
          data-testid="mobile-menu-toggle"
          className="lg:hidden p-2 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden glass mt-2 mx-4 rounded-2xl p-6 shadow-soft"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                data-testid={`mobile-nav-${link.href.replace("#", "")}`}
                className="text-primary-800 font-medium py-3 px-2 border-b border-secondary/20 cursor-pointer text-base active:bg-secondary/20 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              data-testid="mobile-cta-call"
              className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-medium mt-3 cursor-pointer text-base"
            >
              Prenota un appuntamento
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="min-h-screen gradient-hero pt-24 pb-16 md:pt-32 md:pb-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <p className="text-secondary-700 font-medium mb-3 md:mb-4 tracking-wide uppercase text-xs md:text-sm">
              Psicologa Clinica • Ostia & Fiumicino
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-primary-800 tracking-tight mb-4 md:mb-6 leading-tight">
              Dott.ssa Alexandra<br />Diana Ciontu
            </h1>
            <p className="font-script text-xl md:text-2xl lg:text-3xl text-secondary-700 mb-4 md:mb-6 leading-relaxed">
              Psicologa clinica specializzanda in psicoterapia strategica integrata.
            </p>
            <blockquote className="text-base md:text-lg lg:text-xl text-primary-600 italic mb-8 md:mb-10 px-4 lg:px-0 lg:pl-4 border-l-0 lg:border-l-2 border-secondary">
              "Se continui a fare ciò che hai sempre fatto, continuerai ad ottenere ciò che hai sempre ottenuto"
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <a
                href={`https://wa.me/39${CONTACT.whatsapp}?text=${encodeURIComponent("Prenota un primo colloquio")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-cta-primary"
                className="btn-glow inline-flex items-center justify-center gap-2 bg-primary text-white px-6 md:px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-primary-600 transition-all duration-300 shadow-soft hover:shadow-hover"
              >
                <MessageCircle size={20} />
                Prenota un primo contatto
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                data-testid="hero-cta-secondary"
                className="inline-flex items-center justify-center gap-2 bg-secondary/20 text-primary px-6 md:px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-secondary/30 transition-all duration-300 cursor-pointer"
              >
                Scopri il mio approccio
                <ChevronDown size={20} />
              </a>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/30 rounded-full blur-3xl transform scale-110" />
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px] rounded-full overflow-hidden border-4 border-white shadow-hover">
                <img
                  src={ASSETS.profile}
                  alt="Dott.ssa Alexandra Diana Ciontu"
                  className="w-full h-full object-cover"
                  data-testid="hero-profile-image"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-16 md:w-24 h-16 md:h-24 bg-secondary/40 rounded-full blur-2xl" />
              <div className="absolute -top-4 md:-top-6 -left-4 md:-left-6 w-12 md:w-16 h-12 md:h-16 bg-primary/20 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <a 
          href="#about" 
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex flex-col items-center text-primary-400 hover:text-primary transition-colors cursor-pointer"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scorri</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <AnimatedSection className="section-padding bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 md:px-12" data-testid="about-section">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
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

          <motion.div variants={fadeInUp} className="mt-8 md:mt-10 text-center">
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

// Method Section
const MethodSection = () => {
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
          <motion.div variants={fadeInUp} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-soft hover:shadow-hover transition-shadow duration-500">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary/30 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
              <Shield className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-medium text-primary-800 mb-3 md:mb-4">Spazio sicuro</h3>
            <p className="text-primary-600 leading-relaxed text-sm md:text-base">
              Offro uno spazio sicuro in cui potersi sentire accolti, riconosciuti e sostenuti. L'intervento è sempre personalizzato.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-soft hover:shadow-hover transition-shadow duration-500">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary/30 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
              <Heart className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-medium text-primary-800 mb-3 md:mb-4">Relazione terapeutica</h3>
            <p className="text-primary-600 leading-relaxed text-sm md:text-base">
              Il sintomo nasce nella relazione e nella relazione può curarsi. È dentro un legame sicuro che ciò che fa soffrire può essere trasformato.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-soft hover:shadow-hover transition-shadow duration-500">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary/30 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
              <Brain className="w-6 h-6 md:w-7 md:h-7 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-medium text-primary-800 mb-3 md:mb-4">Cambiamento sostenibile</h3>
            <p className="text-primary-600 leading-relaxed text-sm md:text-base">
              È la qualità della relazione – fatta di presenza, ascolto e responsabilità – a permettere un cambiamento possibile e sostenibile.
            </p>
          </motion.div>
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

// Areas Section
const AreasSection = () => {
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

// Process Section
const ProcessSection = () => {
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
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-primary/30 to-secondary transform -translate-x-1/2" />

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
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="bg-white p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-soft">
                    <span className="font-script text-3xl md:text-4xl text-secondary">{step.number}</span>
                    <h3 className="text-lg md:text-xl font-medium text-primary-800 mt-2 mb-3 md:mb-4">{step.title}</h3>
                    <p className="text-primary-600 leading-relaxed text-sm md:text-base">{step.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-white shadow-lg" />

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Spaces Section
const SpacesSection = () => {
  return (
    <AnimatedSection className="section-padding bg-white" id="spaces">
      <div className="max-w-7xl mx-auto px-6 md:px-12" data-testid="spaces-section">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span variants={fadeInUp} className="text-secondary-700 font-medium tracking-wide uppercase text-sm">
            Dove ti accolgo
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-light text-primary-800 mt-3 mb-6">
            Lo spazio terapeutico
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-primary-600 leading-relaxed">
            Ricevo su appuntamento dal lunedì al venerdì in diversi spazi terapeutici, anche all'interno di contesti multidisciplinari in collaborazione con altre figure specialistiche (nutrizionisti, ostetriche, osteopati, psicologi, psicoterapeuti).
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {[
            { image: ASSETS.studioOstiaSimonetti, title: "Studio Ostia - Via Simonetti" },
            { image: ASSETS.studioFiumicino, title: "Fiumicino - L'Albero della Vita" },
            { image: ASSETS.studioOstiaBono, title: "Ostia - Associazione Prinea" },
          ].map((studio, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative rounded-3xl overflow-hidden shadow-soft hover:shadow-hover transition-shadow duration-500"
              data-testid={`studio-image-${index}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={studio.image}
                  alt={studio.title}
                  className="w-full h-full object-cover studio-image"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="font-medium">{studio.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p variants={fadeInUp} className="text-center text-primary-600 mt-12 max-w-2xl mx-auto">
          Sono ambienti <strong className="text-primary">accoglienti e riservati</strong> pensati per garantire un setting sicuro e professionale.
        </motion.p>
      </div>
    </AnimatedSection>
  );
};

// Location Card with Image Carousel
const LocationCard = ({ location, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % location.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + location.images.length) % location.images.length);
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white/10 backdrop-blur-sm p-6 lg:p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500"
      data-testid={`location-card-${index}`}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 group">
        <img
          src={location.images[currentImageIndex]}
          alt={`${location.name} - Foto ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        
        {/* Navigation arrows */}
        {location.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-testid={`location-prev-${index}`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              data-testid={`location-next-${index}`}
            >
              <ChevronRight size={18} />
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {location.images.map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={() => setCurrentImageIndex(imgIndex)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    imgIndex === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <h3 className="text-lg font-medium text-white mb-2">{location.name}</h3>
      <p className="text-white/70 text-sm mb-4 flex items-start gap-2">
        <MapPin size={16} className="flex-shrink-0 mt-1" />
        {location.address}
      </p>
      <a
        href={location.maps}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`location-maps-${index}`}
        className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors text-sm font-medium"
      >
        <MapPin size={16} />
        Apri in Google Maps
        <ArrowRight size={14} />
      </a>
    </motion.div>
  );
};

// Locations Section
const LocationsSection = () => {
  return (
    <AnimatedSection className="section-padding bg-primary-800" id="locations">
      <div className="max-w-7xl mx-auto px-6 md:px-12" data-testid="locations-section">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span variants={fadeInUp} className="text-secondary font-medium tracking-wide uppercase text-sm">
            Le sedi
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-light text-white mt-3 mb-6">
            Dove ricevo
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {LOCATIONS.map((location, index) => (
            <LocationCard key={index} location={location} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    messaggio: "",
    privacy_accepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.privacy_accepted) {
      toast.error("È necessario accettare la privacy policy");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Messaggio inviato con successo! Ti ricontatterò al più presto.");
      setFormData({
        nome: "",
        email: "",
        telefono: "",
        messaggio: "",
        privacy_accepted: false,
      });
    } catch (error) {
      toast.error("Errore nell'invio del messaggio. Riprova più tardi.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection className="section-padding bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-12" data-testid="contact-section">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <span className="text-secondary-700 font-medium tracking-wide uppercase text-sm">
              Parliamone
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-primary-800 mt-3 mb-6">
              Contattami
            </h2>
            <p className="text-primary-600 leading-relaxed mb-10">
              Il primo contatto telefonico è gratuito e non vincolante. Puoi scrivermi o chiamarmi per qualsiasi informazione o per prenotare un appuntamento.
            </p>

            <div className="space-y-6">
              <a
                href={`tel:${CONTACT.phone}`}
                data-testid="contact-phone"
                className="flex items-center gap-4 group"
              >
                <div className="w-14 h-14 bg-secondary/30 rounded-2xl flex items-center justify-center group-hover:bg-secondary/50 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary-500">Telefono</p>
                  <p className="text-lg font-medium text-primary-800">{CONTACT.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                data-testid="contact-email"
                className="flex items-center gap-4 group"
              >
                <div className="w-14 h-14 bg-secondary/30 rounded-2xl flex items-center justify-center group-hover:bg-secondary/50 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary-500">Email</p>
                  <p className="text-lg font-medium text-primary-800">{CONTACT.email}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/39${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp"
                className="flex items-center gap-4 group"
              >
                <div className="w-14 h-14 bg-secondary/30 rounded-2xl flex items-center justify-center group-hover:bg-secondary/50 transition-colors">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-primary-500">WhatsApp</p>
                  <p className="text-lg font-medium text-primary-800">Scrivimi su WhatsApp</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp}>
            <form onSubmit={handleSubmit} className="bg-muted p-8 lg:p-10 rounded-3xl" data-testid="contact-form">
              <div className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-primary-700 mb-2">
                    Nome e Cognome *
                  </label>
                  <Input
                    id="nome"
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="bg-white border-secondary/30 focus:border-primary h-12 rounded-xl"
                    placeholder="Il tuo nome"
                    data-testid="form-input-nome"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white border-secondary/30 focus:border-primary h-12 rounded-xl"
                      placeholder="La tua email"
                      data-testid="form-input-email"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-primary-700 mb-2">
                      Telefono *
                    </label>
                    <Input
                      id="telefono"
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="bg-white border-secondary/30 focus:border-primary h-12 rounded-xl"
                      placeholder="Il tuo numero"
                      data-testid="form-input-telefono"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="messaggio" className="block text-sm font-medium text-primary-700 mb-2">
                    Messaggio *
                  </label>
                  <Textarea
                    id="messaggio"
                    required
                    rows={5}
                    value={formData.messaggio}
                    onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                    className="bg-white border-secondary/30 focus:border-primary rounded-xl resize-none"
                    placeholder="Descrivi brevemente il motivo del contatto..."
                    data-testid="form-input-messaggio"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacy_accepted}
                    onCheckedChange={(checked) => setFormData({ ...formData, privacy_accepted: checked })}
                    className="mt-1"
                    data-testid="form-checkbox-privacy"
                  />
                  <label htmlFor="privacy" className="text-sm text-primary-600 leading-relaxed">
                    Ho letto e accetto la privacy policy. I dati inseriti saranno trattati nel rispetto della normativa vigente e utilizzati esclusivamente per rispondere alla richiesta. *
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white hover:bg-primary-600 rounded-full py-6 text-lg font-medium transition-all duration-300 shadow-soft hover:shadow-hover disabled:opacity-50"
                  data-testid="form-submit-button"
                >
                  {isSubmitting ? "Invio in corso..." : "Invia messaggio"}
                </Button>

                <p className="text-xs text-primary-500 text-center">
                  La tua richiesta sarà trattata con la massima riservatezza.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

// Scroll to Top Button
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className={`fixed bottom-20 right-6 z-40 w-12 h-12 bg-primary text-white rounded-full shadow-hover flex items-center justify-center hover:bg-primary-600 transition-all duration-300 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      data-testid="scroll-to-top-button"
      aria-label="Torna all'inizio"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white py-12 md:py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Logo & Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <img src={ASSETS.logo} alt="ADC Logo" className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover mb-4 md:mb-6" />
            <p className="text-white/70 leading-relaxed text-sm md:text-base">
              Dott.ssa Alexandra Diana Ciontu<br />
              Psicologa Clinica<br />
              Albo A - Lazio n. 28863
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base md:text-lg font-medium mb-4 md:mb-6">Link rapidi</h4>
            <ul className="space-y-2 md:space-y-3">
              {["Mi presento", "Metodo", "Aree di intervento", "Percorso", "Sedi", "Contatti"].map((link, index) => (
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

          {/* Contacts */}
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
            © {new Date().getFullYear()} Dott.ssa Alexandra Diana Ciontu. Tutti i diritti riservati.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <Link 
              to="/privacy" 
              className="text-white/50 hover:text-white/70 text-xs md:text-sm transition-colors"
              data-testid="footer-privacy-link"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline text-white/30">•</span>
            <p className="text-white/50 text-xs md:text-sm">
              Psicologa Ostia • Fiumicino • Roma
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <MethodSection />
        <AreasSection />
        <ProcessSection />
        <SpacesSection />
        <LocationsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Toaster position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
