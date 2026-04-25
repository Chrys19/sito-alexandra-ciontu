# Guida alla Pubblicazione - Sito Dott.ssa Ciontu

## Cosa contiene il file ZIP

```
sito-dottssa-ciontu.zip
├── index.html          (pagina principale)
├── .htaccess           (gestione URL per Apache)
├── favicon.ico         (icona del browser)
├── manifest.json       (configurazione PWA)
├── robots.txt          (istruzioni per Google)
├── sitemap.xml         (mappa del sito per SEO)
├── apple-touch-icon.png
├── logo192.png
├── logo512.png
├── static/
│   ├── css/            (stili del sito)
│   └── js/             (codice del sito)
└── api/
    └── contact.php     (gestione modulo contatto + invio email)
```

---

## Step 1: Acquista dominio e hosting

Scegli un provider che offra:
- Hosting con supporto **PHP 7.4+** (praticamente tutti)
- Supporto **cURL PHP** (attivo di default quasi ovunque)
- Certificato **SSL/HTTPS** (spesso incluso gratis)
- Modulo **mod_rewrite** Apache (per le URL pulite)

Provider consigliati per l'Italia:
- **Netsson** - netsson.com
- **Aruba** - aruba.it
- **SiteGround** - siteground.com
- **Register.it** - register.it

---

## Step 2: Carica i file

1. Accedi al **pannello di controllo** del tuo hosting (cPanel, Plesk, o simile)
2. Apri il **File Manager** oppure collegati via **FTP** (con FileZilla ad esempio)
3. Vai nella cartella principale del sito (di solito si chiama `public_html` o `htdocs`)
4. **Carica tutti i file** contenuti nello ZIP (non la cartella ZIP, ma il suo contenuto)
5. Assicurati che `index.html` sia nella root di `public_html`

La struttura sul server deve essere:
```
public_html/
├── index.html
├── .htaccess
├── favicon.ico
├── static/
│   ├── css/
│   └── js/
└── api/
    └── contact.php
```

---

## Step 3: Verifica

1. Apri il tuo dominio nel browser (es. `https://tuodominio.it`)
2. Il sito dovrebbe caricarsi esattamente come lo vedevi prima
3. Prova a compilare il modulo di contatto → deve apparire la conferma animata
4. Controlla che l'email arrivi a alexandra.ciontu.psi@gmail.com
5. Prova ad andare su una pagina inesistente (es. `/test123`) → deve apparire la pagina 404

---

## Step 4: Aggiorna il dominio (IMPORTANTE)

Dopo la pubblicazione, nel file `index.html` cerca e sostituisci TUTTI i riferimenti a:
```
https://dr-ciontu-therapy.preview.emergentagent.com
```
con il tuo dominio definitivo, ad esempio:
```
https://www.tuodominio.it
```

Questo va fatto in:
- Il tag `<link rel="canonical">`
- I meta tag Open Graph
- Lo Schema.org JSON-LD
- Il file `sitemap.xml`
- Il file `robots.txt`

---

## Risoluzione problemi

### Il sito mostra una pagina bianca
- Verifica che `index.html` sia nella root di `public_html`
- Verifica che `.htaccess` sia presente (è un file nascosto!)

### Le pagine interne danno errore 404
- Il modulo `mod_rewrite` di Apache potrebbe non essere attivo
- Contatta il supporto del tuo hosting per attivarlo

### Il modulo di contatto non funziona
- Verifica che PHP sia attivo sull'hosting
- Verifica che l'estensione cURL di PHP sia abilitata
- Controlla i log degli errori PHP nel pannello hosting

### Le email non arrivano
- Controlla la cartella spam di alexandra.ciontu.psi@gmail.com
- Le email arrivano da "onboarding@resend.dev"
- Se il problema persiste, controlla i log PHP per errori Resend

---

## Sicurezza

La chiave API di Resend è nel file `api/contact.php`. Questo file è sicuro perché:
- È eseguito lato server (il codice PHP non è visibile ai visitatori)
- L'hosting dovrebbe avere PHP configurato correttamente

Se vuoi maggiore sicurezza, sposta la chiave in un file `.env` nella root:
```
RESEND_API_KEY=re_RRmypXJx_g8DUz4zMi99fkJqF1xC3BKE5
```
E modifica `contact.php` per leggerlo con `parse_ini_file('../.env')`.
