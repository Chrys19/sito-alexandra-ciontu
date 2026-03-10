# PRD - Sito Vetrina Dott.ssa Alexandra Diana Ciontu

## Problem Statement
Creare un sito vetrina premium, elegante, rassicurante e altamente professionale per una psicologa (Dott.ssa Alexandra Diana Ciontu), con design moderno, ottima user experience, navigazione fluida, struttura chiara, ottimizzazione mobile-first e attenzione alla conversione dei visitatori in richieste di contatto.

## User Personas
- **Persone in cerca di supporto psicologico** nella zona Ostia/Fiumicino/Lazio
- **Genitori** che cercano supporto per i propri figli
- **Coppie e famiglie** con difficoltà relazionali
- **Professionisti** in fase di transizione o crisi

## Core Requirements (Static)
- One-page landing premium
- Palette: #58355E (viola), #C4D6B0 (verde salvia)
- Font: Roboto Flex + Meie Script
- Sezioni: Hero, Mi presento, Metodo, Aree di intervento, Percorso, Spazi terapeutici, Sedi, Contatti, Footer
- Form contatto funzionante con salvataggio MongoDB
- Design responsive mobile-first
- SEO locale (psicologa Ostia, Fiumicino)

## What's Been Implemented ✅
**Data: 2025-01-XX (Primo rilascio MVP)**

### Backend
- FastAPI server con endpoint `/api/contact` per form
- Modello ContactMessage con validazione Pydantic
- Salvataggio messaggi in MongoDB
- Health check endpoint

### Frontend
- ✅ Hero section con foto profilo, CTA buttons
- ✅ Sezione "Mi presento" con immagine studio
- ✅ Sezione "Metodo di lavoro" con 3 cards
- ✅ Sezione "Aree di intervento" con 7 cards
- ✅ Sezione "Come funziona il percorso" con timeline 4 step
- ✅ Sezione "Lo spazio terapeutico" con gallery 3 studi
- ✅ Sezione "Sedi" con 3 location cards + link Google Maps
- ✅ Sezione "Contatti" con info + form funzionante
- ✅ Footer professionale
- ✅ Navigation sticky con glass effect
- ✅ Mobile responsive con hamburger menu
- ✅ Animazioni fluide con Framer Motion
- ✅ Toast notifications con Sonner

### Assets Utilizzati
- Logo: ADC Logo fornito dal cliente
- Foto profilo: fornita dal cliente
- Foto studi: 3 immagini fornite dal cliente (Ostia Simonetti, Fiumicino, Ostia Bono)

### Contatti Implementati
- Telefono: 3275569910
- Email: alexandra.ciontu.psi@gmail.com
- WhatsApp: 3275569910

## Prioritized Backlog

### P0 (Critical) - COMPLETATO ✅
- [x] Hero section
- [x] Navigation responsive
- [x] Form contatto funzionante
- [x] Tutte le sezioni richieste

### P1 (High Priority)
- [ ] Aggiungere seconda foto per ogni studio (richiesta utente)
- [ ] Implementare email notification al submit del form (Resend/SendGrid)
- [ ] Meta tags SEO ottimizzati

### P2 (Medium Priority)
- [ ] Privacy policy page
- [ ] Cookie banner GDPR
- [ ] Pagina grazie dopo invio form
- [ ] Integrazione Google Analytics

### P3 (Nice to Have)
- [ ] Blog section
- [ ] Testimonianze pazienti
- [ ] Integrazione booking online (Calendly)
- [ ] Multi-lingua (IT/EN/RO)

## Next Tasks
1. Aggiungere immagini aggiuntive degli studi quando fornite
2. Configurare invio email automatico per nuovi messaggi
3. Ottimizzare meta tags per SEO locale
