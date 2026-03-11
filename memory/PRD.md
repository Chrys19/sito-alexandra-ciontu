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

### Iterazione 1 - MVP (Completato)
- Struttura base del sito con tutte le sezioni
- Backend con endpoint /api/contact
- Design responsive base

### Iterazione 2 - Modifiche Utente (Completato)
- ✅ Logo tondo nel navigation e footer
- ✅ Menu sticky sempre visibile e funzionante con smooth scroll
- ✅ CTA "Prenota un primo contatto" → link WhatsApp
- ✅ Sezione "Mi presento" senza foto studio
- ✅ Icona GraduationCap per "Orientamento scolastico"
- ✅ Sezione "Dove ricevo" con carousel 2 foto per ogni studio
- ✅ Bottone "Prenota" nel menu → rimanda a sezione contatti
- ✅ Bottone scroll-to-top in basso a destra

### Iterazione 3 - Privacy, SEO e Mobile (Completato - Data odierna)
- ✅ **Privacy Policy page** completa GDPR (/privacy)
- ✅ **SEO ottimizzato** con meta tags (title, description, keywords, Open Graph)
- ✅ **Logo più in risalto** (più grande, con bordo, glow e testo accanto)
- ✅ **Ottimizzazione mobile completa**:
  - Hero centrata con foto più piccola su mobile
  - Cards aree di intervento in griglia 2 colonne su tablet
  - Form contatti ben formattato
  - Carousel frecce sempre visibili su mobile
  - Menu hamburger più grande e cliccabile
  - Spaziature e font ridotti per mobile
- ✅ **Link Privacy** nel footer e nel form contatti

### Assets Utilizzati
- Logo: ADC Logo (visualizzato tondo con bordo)
- Foto profilo: fornita dal cliente
- Foto studi (2 per ogni sede con carousel)

### Contatti Implementati
- Telefono: 3275569910
- Email: alexandra.ciontu.psi@gmail.com
- WhatsApp: 3275569910 (con messaggio precompilato)

## Prioritized Backlog

### P0 (Critical) - COMPLETATO ✅
- [x] Tutte le sezioni richieste
- [x] Form contatto funzionante
- [x] Mobile responsive ottimizzato
- [x] Privacy Policy GDPR
- [x] SEO base ottimizzato
- [x] Logo in risalto

### P1 (High Priority)
- [ ] Implementare email notification al submit del form (Resend/SendGrid)

### P2 (Medium Priority)
- [ ] Cookie banner GDPR
- [ ] Pagina grazie dopo invio form
- [ ] Integrazione Google Analytics
- [ ] Schema.org markup per local business

### P3 (Nice to Have)
- [ ] Blog section
- [ ] Testimonianze pazienti
- [ ] Integrazione booking online (Calendly)
- [ ] Multi-lingua (IT/EN/RO)

## Next Tasks
1. Configurare invio email automatico per nuovi messaggi (quando pronta)
2. Aggiungere cookie banner per compliance GDPR completa
3. Integrare Schema.org markup per migliorare SEO locale
