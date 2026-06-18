import { Users, Shield, Brain, Compass, GraduationCap, Baby } from "lucide-react";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const ASSETS = {
  logo: "/images/logo.png",
  profile: "/images/profile.jpg",
  studioFiumicino: "/images/studio-fiumicino.webp",
  studioOstiaBono: "/images/studio-ostia-bono.webp",
  studioOstiaSimonetti: "/images/studio-simonetti-1.jpg",
  studioOstiaSimonetti2: "/images/studio-simonetti-2.jpg",
};

export const CONTACT = {
  phone: "3275569910",
  email: "alexandra.ciontu.psi@gmail.com",
  whatsapp: "3275569910",
};

export const LOCATIONS = [
  {
    name: "Studio Privato - Ostia Simonetti",
    address: "Via Diego Simonetti 29, 00122, Ostia",
    maps: "https://maps.google.com/?q=Via+Diego+Simonetti+29+00122+Ostia",
    images: [
      ASSETS.studioOstiaSimonetti,
      ASSETS.studioOstiaSimonetti2,
    ],
  },
  {
    name: "Associazione L'Albero della Vita",
    address: "Via del Canale 18, 00054, Fiumicino",
    maps: "https://maps.google.com/?q=Via+del+Canale+18+00054+Fiumicino",
    images: [
      ASSETS.studioFiumicino,
      ASSETS.studioOstiaBono,
    ],
  },
  {
    name: "Associazione Prinea",
    address: "Viale Ammiraglio del Bono 63, 00122, Ostia",
    maps: "https://maps.google.com/?q=Viale+Ammiraglio+del+Bono+63+00122+Ostia",
    images: [
      "/images/studio-prinea-1.jpg",
      "/images/studio-prinea-2.jpg",
    ],
  },
];

export const AREAS = [
  {
    icon: Users,
    title: "Difficoltà nelle relazioni",
    description: "Di coppia, familiari, amicali – quando i legami diventano faticosi o conflittuali e le tensioni comunicative generano incomprensioni.",
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
    title: "Crisi, blocchi e transizioni",
    description: "Cambiamenti, scelte, separazioni, passaggi di vita – quando serve ritrovare equilibrio e una nuova direzione.",
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

export const PROCESS_STEPS = [
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

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
