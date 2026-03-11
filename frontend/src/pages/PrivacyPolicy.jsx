import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-secondary/20 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
            data-testid="privacy-back-link"
          >
            <ArrowLeft size={20} />
            Torna al sito
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg max-w-none"
        >
          <h1 className="text-3xl md:text-4xl font-light text-primary-800 mb-8">
            Privacy Policy
          </h1>
          
          <p className="text-primary-600 mb-8">
            <strong>Ultimo aggiornamento:</strong> {new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-medium text-primary-800 mb-4">1. Titolare del Trattamento</h2>
            <p className="text-primary-700 leading-relaxed">
              Il Titolare del trattamento dei dati personali è la <strong>Dott.ssa Alexandra Diana Ciontu</strong>, 
              Psicologa Clinica iscritta all'Albo A della Regione Lazio con il n. 28863.
            </p>
            <ul className="text-primary-700 mt-4 space-y-2">
              <li><strong>Email:</strong> alexandra.ciontu.psi@gmail.com</li>
              <li><strong>Telefono:</strong> 327 556 9910</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-medium text-primary-800 mb-4">2. Tipologia di Dati Raccolti</h2>
            <p className="text-primary-700 leading-relaxed mb-4">
              Attraverso il modulo di contatto presente sul sito vengono raccolti i seguenti dati personali:
            </p>
            <ul className="text-primary-700 space-y-2 list-disc pl-6">
              <li>Nome e Cognome</li>
              <li>Indirizzo email</li>
              <li>Numero di telefono</li>
              <li>Contenuto del messaggio</li>
            </ul>
            <p className="text-primary-700 leading-relaxed mt-4">
              Il conferimento di tali dati è facoltativo, ma necessario per rispondere alle richieste di informazioni 
              o per fissare un appuntamento.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-medium text-primary-800 mb-4">3. Finalità del Trattamento</h2>
            <p className="text-primary-700 leading-relaxed mb-4">
              I dati personali forniti vengono trattati esclusivamente per le seguenti finalità:
            </p>
            <ul className="text-primary-700 space-y-2 list-disc pl-6">
              <li>Rispondere alle richieste di informazioni inviate tramite il modulo di contatto</li>
              <li>Gestire la prenotazione di appuntamenti</li>
              <li>Fornire informazioni sui servizi offerti</li>
            </ul>
            <p className="text-primary-700 leading-relaxed mt-4">
              I dati <strong>non</strong> verranno utilizzati per finalità di marketing, profilazione o ceduti a terzi.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-medium text-primary-800 mb-4">4. Base Giuridica del Trattamento</h2>
            <p className="text-primary-700 leading-relaxed">
              Il trattamento dei dati personali si basa sul <strong>consenso dell'interessato</strong> (art. 6, par. 1, 
              lett. a del GDPR), espresso mediante l'invio volontario del modulo di contatto e l'accettazione 
              della presente informativa.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-medium text-primary-800 mb-4">5. Modalità di Trattamento e Conservazione</h2>
            <p className="text-primary-700 leading-relaxed mb-4">
              I dati personali sono trattati con strumenti elettronici e/o manuali, con logiche strettamente 
              correlate alle finalità sopra indicate e, comunque, in modo da garantire la sicurezza e la 
              riservatezza dei dati stessi.
            </p>
            <p className="text-primary-700 leading-relaxed">
              I dati verranno conservati per il tempo strettamente necessario a conseguire le finalità per cui 
              sono stati raccolti e, in ogni caso, non oltre <strong>24 mesi</strong> dalla raccolta, salvo 
              obblighi di legge.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-medium text-primary-800 mb-4">6. Diritti dell'Interessato</h2>
            <p className="text-primary-700 leading-relaxed mb-4">
              Ai sensi degli articoli 15-22 del Regolamento UE 2016/679 (GDPR), l'interessato ha il diritto di:
            </p>
            <ul className="text-primary-700 space-y-2 list-disc pl-6">
              <li><strong>Accesso:</strong> ottenere conferma dell'esistenza di dati personali che lo riguardano</li>
              <li><strong>Rettifica:</strong> ottenere la correzione di dati inesatti o l'integrazione di dati incompleti</li>
              <li><strong>Cancellazione:</strong> ottenere la cancellazione dei dati ("diritto all'oblio")</li>
              <li><strong>Limitazione:</strong> ottenere la limitazione del trattamento</li>
              <li><strong>Portabilità:</strong> ricevere i dati in formato strutturato e leggibile</li>
              <li><strong>Opposizione:</strong> opporsi al trattamento dei dati</li>
              <li><strong>Revoca del consenso:</strong> revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="text-primary-700 leading-relaxed mt-4">
              Per esercitare i propri diritti, l'interessato può inviare una richiesta all'indirizzo email: 
              <a href="mailto:alexandra.ciontu.psi@gmail.com" className="text-primary hover:underline ml-1">
                alexandra.ciontu.psi@gmail.com
              </a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-medium text-primary-800 mb-4">7. Reclamo all'Autorità di Controllo</h2>
            <p className="text-primary-700 leading-relaxed">
              L'interessato che ritenga che il trattamento dei propri dati personali avvenga in violazione del 
              GDPR ha il diritto di proporre reclamo al <strong>Garante per la Protezione dei Dati Personali</strong> 
              (www.garanteprivacy.it).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-medium text-primary-800 mb-4">8. Cookie</h2>
            <p className="text-primary-700 leading-relaxed">
              Questo sito utilizza esclusivamente cookie tecnici necessari al funzionamento del sito stesso. 
              Non vengono utilizzati cookie di profilazione o di terze parti per finalità di marketing.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-medium text-primary-800 mb-4">9. Modifiche alla Privacy Policy</h2>
            <p className="text-primary-700 leading-relaxed">
              Il Titolare si riserva il diritto di apportare modifiche alla presente Privacy Policy in qualunque 
              momento, dandone informazione agli utenti su questa pagina. Si prega di consultare periodicamente 
              questa pagina per verificare eventuali aggiornamenti.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-secondary/30">
            <p className="text-primary-500 text-sm">
              Questa informativa è resa ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR).
            </p>
          </div>
        </motion.article>
      </main>

      {/* Simple Footer */}
      <footer className="bg-primary-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} Dott.ssa Alexandra Diana Ciontu - Psicologa Clinica - Albo Lazio n. 28863
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
