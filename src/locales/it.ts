export default {
  meta: {
    homeTitle: 'Agromate — La serra smart su ESP32',
    notFoundTitle: 'Pagina non trovata · Agromate',
    flasherTitle: 'Flasher firmware · Agromate',
    docTitle: '{title} · Documentazione Agromate',
  },
  language: {
    label: 'Lingua',
    it: 'Italiano',
    en: 'English',
  },
  nav: {
    main: 'Principale',
    home: 'Agromate, home',
    features: 'Funzionalità',
    architecture: 'Architettura',
    docs: 'Documentazione',
    openMenu: 'Apri menu',
    closeMenu: 'Chiudi menu',
    flasher: 'Flasher',
  },
  hero: {
    title: 'La serra smart che si prende cura {highlight}.',
    highlight: 'delle tue piante',
    text: 'Agromate controlla i parametri vitali della pianta, gestisce idratazione, illuminazione e umidità in automatico e ti tiene aggiornato in tempo reale dallo smartphone.',
    discover: 'Scopri le funzionalità',
    docs: 'Documentazione',
  },
  illustration: {
    label: 'Illustrazione della serra Agrosmart',
    temperature: 'Temperatura',
    airHumidity: 'Umidità aria',
    soil: 'Terreno',
  },
  features: {
    eyebrow: 'Funzionalità',
    title: 'Tutto ciò che serve a una pianta, in un’unica serra.',
    text: 'L’Agrosmart unisce sensori e attuatori in un sistema che lavora da solo, seguendo la configurazione ideale per la tua pianta.',
    vitals: {
      title: 'Parametri vitali sotto controllo',
      text: 'Temperatura e umidità dell’aria misurate dal sensore DHT, umidità del terreno letta via sonda.',
    },
    irrigation: {
      title: 'Irrigazione intelligente',
      text: "La pompa si attiva quando l'umidità terreno scende sotto la soglia oppure a intervalli regolari. Puoi scegliere quanti ml di acqua ha bisogno la pianta.",
    },
    light: {
      title: 'Luce su misura',
      text: 'Striscia LED RGB: scegli colore, intensità e la fascia oraria di accensione per riprodurre il ciclo giorno/notte.',
    },
    humidifier: {
      title: 'Umidificatore automatico',
      text: 'Mantiene l’umidità dell’aria attorno al valore obiettivo.',
    },
    history: {
      title: 'Storico e grafici',
      text: 'Le misure vengono salvate sul server. Dall’app consulti l’andamento nel tempo e le medie dei parametri.',
    },
    webcam: {
      title: 'Guarda la tua pianta',
      text: 'Collega una webcam e osserva la serra in tempo reale dall’app.',
    },
    pairing: {
      title: 'Abbinamento semplice',
      text: 'Le credenziali Wi‑Fi arrivano all’ESP32 direttamente dallo smartphone senza cavi né configurazioni manuali.',
    },
    ota: {
      title: 'Aggiornamenti OTA',
      text: 'Il firmware si aggiorna via rete: nuove funzionalità e correzioni arrivano senza dover ricollegare la scheda al computer.',
    },
    security: {
      title: 'Sicuro',
      text: 'Ogni dispositivo ha permessi MQTT dedicati e le password sono criptate con gli algoritmi più sicuri standard',
    },
  },
  architecture: {
    eyebrow: 'Architettura',
    title: 'Tre semplici componenti per avere la tua serra smart',
    text: 'Il dispositivo, il server e l’app comunicano tramite API REST e messaggi MQTT. Le metriche vengono raccolte da Telegraf e archiviate su InfluxDB.',
    mobileApp: 'App mobile',
  },
  projects: {
    firmware: {
      title: 'Firmware Agrosmart',
      description: 'Firmware di Agromate per la famiglia di microcontrollori ESP32',
    },
    app: {
      title: 'App mobile',
      description: 'L’app per abbinare, configurare e monitorare le tue serre da Android e iOS.',
    },
    docs: {
      title: 'Documentazione',
      text: 'Tutto il necessario per iniziare ad usare Agromate',
      cta: 'Vai alla documentazione',
    },
  },
  footer: {
    tagline:
      'Una serra smart open source basata su ESP32 per far crescere le tue piante con i parametri giusti, sempre.',
    project: 'Progetto',
    source: 'Codice sorgente',
    firmware: 'Firmware Agrosmart',
    app: 'App mobile',
    org: 'agromate-devs su GitHub',
    copyright: '© {year} Agromate · Progetto open source',
  },
  flasher: {
    title: 'Carica il firmware dal browser',
    intro:
      'Collega l’Agrosmart al computer con un cavo USB e installa il firmware standard senza installare nulla: il caricamento avviene direttamente dal browser tramite Web Serial.',
    unsupported:
      'Il tuo browser non supporta Web Serial. Usa Chrome, Edge oppure Opera su desktop, o carica il firmware manualmente con esptool.',
    firmwareTitle: 'Firmware standard',
    firmwareText:
      'L’ultima release ufficiale, compilata con tutte le opzioni Agrosmart ai valori predefiniti (pin, sensori e striscia da 30 LED descritti nella documentazione).',
    loading: 'Caricamento delle informazioni sul firmware…',
    noFirmware: 'Nessun firmware disponibile al momento. Puoi scaricarlo dalle',
    releases: 'release su GitHub',
    version: 'Versione',
    chip: 'Chip',
    flash: 'Flash',
    published: 'Pubblicata il',
    releaseNotes: 'Note di rilascio',
    customFirmware: 'Pin o chip diversi? Compila il tuo firmware',
    connectTitle: 'Collega la scheda',
    connectText:
      'Collega l’ESP32 via USB e scegli la sua porta seriale. Se la scheda non viene rilevata, tieni premuto il pulsante BOOT mentre premi RESET e riprova.',
    connect: 'Connetti',
    connecting: 'Connessione…',
    disconnect: 'Disconnetti',
    wrongChip:
      'La scheda collegata è un {chip}, ma questo firmware è per {expected}. Compila il firmware per il tuo chip.',
    flashTitle: 'Carica il firmware',
    erase: 'Cancella tutta la flash prima di caricare',
    eraseHint:
      'Consigliato alla prima installazione o se hai problemi. Rimuove le credenziali Wi‑Fi e l’abbinamento: dovrai associare di nuovo l’Agrosmart.',
    flashButton: 'Carica il firmware',
    flashing: 'Caricamento in corso…',
    downloading: 'Download del firmware…',
    erasing: 'Cancellazione della flash…',
    writing: 'Scrittura di {part}…',
    done: 'Completato',
    doneText: 'Firmware caricato! L’Agrosmart si è riavviato. Ora puoi associarlo all’app:',
    pairing: 'Abbinare l’Agrosmart',
    errorPrefix: 'Errore',
    log: 'Log',
    troubleshooting: 'Preferisci la riga di comando o qualcosa non funziona?',
    manual: 'Caricare il firmware con esptool',
  },
  docs: {
    index: 'Indice della documentazione',
    navLabel: 'Documentazione',
    draft: 'Bozza',
    draftBadge: 'Bozza — contenuto in lavorazione',
    draftWarning:
      'Questa pagina è una bozza: il contenuto potrebbe essere incompleto o inaccurato.',
    untranslated:
      'Questa pagina non è ancora disponibile in italiano: stai leggendo la versione inglese.',
    adjacent: 'Pagine adiacenti',
    previous: 'Precedente',
    next: 'Successiva',
    onThisPage: 'In questa pagina',
    notFoundTitle: 'Pagina non ancora scritta',
    notFoundText: 'Non esiste una pagina di documentazione per {path}.',
    backToIndex: 'Torna all’indice',
    copyCode: 'Copia',
    copiedCode: 'Copiato!',
    copyCodeLabel: 'Copia il codice negli appunti',
    callouts: {
      NOTE: 'Nota',
      TIP: 'Suggerimento',
      IMPORTANT: 'Importante',
      WARNING: 'Attenzione',
      CAUTION: 'Pericolo',
    },
  },
  notFound: {
    title: 'Questa pianta non è ancora germogliata',
    text: 'La pagina che cerchi non esiste o è stata spostata.',
    back: 'Torna alla home',
  },
};
