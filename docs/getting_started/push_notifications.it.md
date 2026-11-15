---
title: Notifiche push
description: Configurare Firebase Cloud Messaging sul server e nell'mobile_app per ricevere gli avvisi su riserva d'acqua e temperatura.
section: Per iniziare
section_order: 3
order: 25
---

# Notifiche push

Il server Agromate controlla le metriche pubblicate dai tuoi Agrosmart e invia una **notifica push** al telefono quando
qualcosa richiede la tua attenzione: il serbatoio dell'acqua sta finendo oppure la temperatura è fuori dall'intervallo
che hai scelto per la pianta. Le notifiche vengono consegnate tramite **Firebase Cloud Messaging** (FCM), quindi sia il
server sia l'app devono essere collegati a un progetto Firebase.

Le notifiche sono facoltative: senza Firebase il server e l'app continuano a funzionare, semplicemente non ricevi gli
avvisi.

Questa guida presuppone che tu abbia già un server funzionante, come descritto
in [Primi passi](/docs?article=first_steps).

## Avvisi

| Avviso                       | Inviato quando                                                                                       | Esempio                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Riserva d'acqua**          | Il [sensore di livello dell'acqua](/docs?article=building_agrosmart) segnala il serbatoio in riserva | _Greenhouse 1: water reserve_ The water tank is almost empty, refill it to keep...       |
| **Temperatura troppo bassa** | La temperatura è sotto il minimo del **Temperature Range** dell'Agrosmart                            | _Greenhouse 1: temperature too low_ The temperature is 12.5°C, below the minimum of 15°C |
| **Temperatura troppo alta**  | La temperatura è sopra il massimo del **Temperature Range** dell'Agrosmart                           | _Greenhouse 1: temperature too high_ The temperature is 36°C, above the maximum of 30°C  |

Il titolo della notifica inizia con il nome che hai dato all'Agrosmart, o con il suo indirizzo MAC se non ha un nome. I
limiti di temperatura sono quelli impostati nelle [impostazioni di cura della pianta](/docs?article=overview) di ciascun
Agrosmart, quindi puoi cambiarli in qualsiasi momento dall'app.

Alcune regole evitano di sommergere il telefono di notifiche:

- lo stesso avviso dello stesso Agrosmart viene inviato **al massimo una volta ogni 6 ore** (configurabile con
  `NOTIFICATION_COOLDOWN_MINUTES`). Il tempo di attesa è tenuto in memoria, quindi riparte da zero quando il server si
  riavvia;
- il proprietario e le impostazioni di ciascun Agrosmart restano in cache per **15 minuti** (`AGROSMART_CACHE_TTL_MS`):
  dopo aver cambiato l'intervallo di temperatura nell'app, i nuovi limiti possono impiegare fino a 15 minuti per essere
  usati negli avvisi;
- gli avvisi vengono inviati a **tutti i telefoni** su cui il proprietario dell'Agrosmart ha effettuato l'accesso.

> [!NOTE]
> Il testo delle notifiche è generato dal server e per ora è solo in inglese.

## Come funziona

1. Dopo il login, l'app si registra a FCM e ottiene il suo **Firebase Installation ID** (FID), un identificativo di
   quella installazione dell'app. Invia il FID al server (`POST /fcm_installation`), che lo collega al tuo account.
2. L'Agrosmart pubblica le metriche sul topic MQTT `agrosmart/metrics`, come sempre.
3. Un worker thread del server, iscritto a `agrosmart/metrics`, confronta ogni metrica con le impostazioni
   dell'Agrosmart e decide se deve essere inviato un avviso.
4. Il server invia l'avviso a FCM, autenticandosi con un **service account** Firebase, indirizzato a tutti i FID del
   proprietario.
5. FCM consegna la notifica ai telefoni.

Quando esci dall'account dalla scheda **Profile**, l'app rimuove il suo FID dal server (`DELETE /fcm_installation`),
così quel telefono smette di ricevere i tuoi avvisi. I FID che FCM segnala come non più validi (ad esempio perché l'app
è stata disinstallata) vengono rimossi automaticamente, ed eliminando l'account vengono rimossi tutti.

> [!IMPORTANT]
> L'app e il server devono usare lo **stesso progetto Firebase**: un service account può inviare notifiche solo alle
> installazioni dell'app del proprio progetto. Se ospiti un tuo server, devi creare un tuo progetto Firebase e compilare
> l'app con quel progetto, come descritto di seguito.

## 1. Creare il progetto Firebase

1. Apri la [console Firebase](https://console.firebase.google.com/) e accedi con un account Google.
2. Fai clic su **Crea un progetto** (o **Aggiungi progetto**), scegli un nome, ad esempio `agromate`, e completa la
   procedura guidata. Google Analytics non serve e può essere disattivato.
3. Annota l' **ID progetto** mostrato in **Impostazioni progetto → Generali** (ad esempio `agromate-1a2b3`): ti serve
   per configurare l'app.
4. In **Impostazioni progetto → Cloud Messaging**, verifica che **API Firebase Cloud Messaging (V1)** sia _Attivata_.
   Se non lo è, apri il menu accanto e attivala dalla console Google Cloud.

Il piano gratuito **Spark** è sufficiente: Cloud Messaging non ha costi.

## 2. Configurare il server

### Generare la chiave del service account

Il server si autentica a FCM con la chiave privata di un service account:

1. Nella console Firebase, apri **Impostazioni progetto → Account di servizio**.
2. Con **Firebase Admin SDK** selezionato, fai clic su **Genera nuova chiave privata** e conferma. Viene scaricato un
   file JSON.
3. Rinominalo in `firebase-service-account.json`.

> [!CAUTION]
> Questo file contiene una chiave privata con accesso amministrativo al tuo progetto Firebase. Non condividerlo e non
> metterlo sotto versione: il repository del server ignora già `*service-account*.json`. **Non** metterlo mai nella
> cartella `public/` del server, il cui contenuto è servito a chiunque senza autenticazione.

Il server legge sempre la chiave da `./firebase-service-account.json`, un percorso **relativo alla cartella da cui viene
avviato**. Se il file manca, il worker delle notifiche non riesce a partire (vedi **Risoluzione dei problemi** più
avanti).

### Variabili d'ambiente

Tutte le variabili delle notifiche sono facoltative:

| Variabile                       | Predefinito       | Descrizione                                                                                       |
| ------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| `NOTIFICATION_COOLDOWN_MINUTES` | `360`             | Tempo minimo tra due notifiche dello stesso avviso per lo stesso Agrosmart                        |
| `AGROSMART_CACHE_TTL_MS`        | `900000` (15 min) | Per quanto tempo il worker tiene in cache il proprietario e le impostazioni di un Agrosmart       |
| `ALERT_DRY_RUN`                 | non impostata     | Se `true`, Firebase non viene usato affatto: gli avvisi vengono solo scritti nel log (per i test) |

### Con Node.js

Copia `firebase-service-account.json` nella cartella del server, la stessa che contiene `package.json` e `.env`, e se
vuoi aggiungi le variabili a `.env`:

```ini
# .env
# Push notifications
NOTIFICATION_COOLDOWN_MINUTES=360
AGROSMART_CACHE_TTL_MS=900000
```

Se stai aggiornando un server installato prima dell'introduzione delle notifiche, applica le migrazioni del database,
che creano la tabella dei FID, poi riavvia il server:

```bash
npx prisma migrate deploy
npm run dev
```

### Con Docker

Metti la chiave nella cartella `server` creata dalla [configurazione Docker Compose](/docs?article=first_steps), accanto
a `data` e `public`, e montala **in sola lettura** nel container in `/app/firebase-service-account.json` (`/app` è la
cartella di lavoro dell'immagine):

```yaml
agromate-server:
  # ...
  environment:
    NOTIFICATION_COOLDOWN_MINUTES: 360
  volumes:
    - ./server/data:/mobile_app/data
    - ./server/public:/mobile_app/public
    - ./server/firebase-service-account.json:/mobile_app/firebase-service-account.json:ro
```

Nel container il server gira con l'utente non privilegiato `agromate`, quindi il file deve essere leggibile da
quell'utente:

```bash
chmod 644 server/firebase-service-account.json
```

Poi ricrea il container:

```bash
docker compose up -d agromate-server
```

### Permessi MQTT

Il worker delle notifiche apre una propria connessione MQTT con l'utente `api_server` e si iscrive a
`agrosmart/metrics`. Il ruolo `api_server` creato in [Primi passi](/docs?article=first_steps) lo consente già
(`subscribePattern "agrosmart/#"`). Se hai creato il ruolo in modo diverso, aggiungi le ACL:

```bash
dynsec addRoleACL api_server subscribePattern "agrosmart/#" allow
dynsec addRoleACL api_server publishClientReceive "agrosmart/#" allow
```

### Verificare il server

Dopo il riavvio, il log del server dovrebbe contenere:

```text
Connected to MQTT Broker, subscribing to agrosmart/metrics
Subscribed to agrosmart/metrics
```

## 3. Configurare l'app mobile

L'app contiene già tutto il codice per ricevere le notifiche: devi solo collegarla al **tuo** progetto Firebase e
compilarla.

### Requisiti

- Il [Flutter SDK](https://docs.flutter.dev/get-started/install) e il
  [codice sorgente dell'app](https://github.com/agromate-devs/new_mobile_app)
- La [Firebase CLI](https://firebase.google.com/docs/cli), con l'accesso fatto con l'account proprietario del progetto:

  ```bash
  npm install -g firebase-tools
  firebase login
  ```

- La FlutterFire CLI:

  ```bash
  dart pub global activate flutterfire_cli
  ```

### Collegare l'app a Firebase

Dalla cartella dell'app, esegui:

```bash
flutterfire configure --project=<id-del-tuo-progetto>
```

Seleziona le piattaforme che vuoi compilare (**android**, e **ios** se ti serve). FlutterFire registra le app nel tuo
progetto Firebase (su Android con il nome di pacchetto `com.example.agromate_mobile_app`) e genera:

| File                                  | Contenuto                                                     |
| ------------------------------------- | ------------------------------------------------------------- |
| `lib/firebase_options.dart`           | Opzioni Firebase usate da `Firebase.initializeApp()`          |
| `android/app/google-services.json`    | Configurazione Android, letta dal plugin Google Services      |
| `ios/Runner/GoogleService-Info.plist` | Configurazione iOS (solo se hai selezionato iOS)              |
| `firebase.json`                       | Impostazioni di FlutterFire, usate quando rilanci `configure` |

Se questi file esistono già appartengono a un altro progetto Firebase: lascia che `flutterfire configure` li
sovrascriva, altrimenti l'app si registra a un progetto a cui il tuo server non può inviare notifiche. Rilancialo ogni
volta che cambi l'`applicationId` Android o aggiungi una piattaforma.

> [!NOTE]
> A differenza della chiave del service account, questi file non sono segreti: identificano solo il progetto Firebase
> e non permettono di inviare notifiche.

Verifica che `API_URL` nel file `.env` dell'app punti al tuo server, poi compila e avvia l'app:

```bash
flutter pub get
flutter run
```

Il progetto include già il resto della configurazione, non devi modificarlo:

- le dipendenze `firebase_core`, `firebase_messaging` e `flutter_local_notifications`;
- il plugin Gradle `com.google.gms.google-services` e il core library desugaring richiesto da
  `flutter_local_notifications`;
- in `AndroidManifest.xml`, `firebase_messaging_installation_id_enabled` impostato a `true`, che fa identificare l'app
  con il FID (il server invia le notifiche ai FID, non ai registration token), e `default_notification_channel_id`
  impostato a `agromate_notifications`.

### Android

Dopo il primo login l'app chiede il permesso di mostrare le notifiche (Android 13 e successivi). Se lo neghi, l'app
resta registrata ma le notifiche non vengono mostrate: attivale dalle impostazioni delle notifiche dell'app nelle
**Impostazioni** di sistema.

Le notifiche usano il canale **Agromate notifications**. Quando l'app è in background o chiusa le mostra il sistema,
quando è in primo piano le mostra l'app stessa.

### iOS

> [!WARNING]
> Le notifiche su iOS non sono ancora configurate nel repository e non sono state testate. I passaggi seguenti sono
> quelli standard richiesti da FCM su iOS.

1. Nel tuo [account Apple Developer](https://developer.apple.com/account/resources/authkeys/list) crea una **chiave di
   autenticazione APNs** (`.p8`) e annota il suo **Key ID** e il tuo **Team ID**.
2. Nella console Firebase, apri **Impostazioni progetto → Cloud Messaging → Configurazione app Apple** e carica la
   chiave con Key ID e Team ID.
3. Esegui `flutterfire configure` selezionando **ios**.
4. Apri `ios/Runner.xcworkspace` in Xcode e, in **Signing & Capabilities** del target `Runner`, aggiungi la capability
   **Push Notifications** e **Background Modes** con **Remote notifications** selezionato.
5. Avvia l'app su un dispositivo reale e accetta il permesso per le notifiche dopo il login.

> [!NOTE]
> Le notifiche non sono disponibili nella versione web dell'app.

## 4. Provare le notifiche

1. Avvia il server e controlla le righe di log mostrate in **Verificare il server**.
2. Accedi all'app e accetta il permesso per le notifiche. Il log del server mostra `FID registered`.
3. Fai scattare un avviso. Il più semplice è quello della temperatura: nelle impostazioni di un Agrosmart imposta un
   **Temperature Range** con il massimo più basso della temperatura attuale, salva e **riavvia il server** per svuotare
   la cache di 15 minuti e il tempo di attesa. Entro un intervallo di pubblicazione delle metriche il log del server
   mostra:

   ```text
   Alert temperature_high for A1B2C3D4E5F6 sent to mario: 1/1 delivered
   ```

   e la notifica compare sul telefono. Ricordati poi di ripristinare l'intervallo di temperatura.

Puoi anche abbassare l'acqua nel serbatoio sotto il sensore di livello per provare l'avviso di **riserva d'acqua**.

### Dry run

Per verificare le regole degli avvisi senza Firebase, ad esempio durante lo sviluppo, avvia il server con
`ALERT_DRY_RUN=true`. Il service account non viene letto, un avviso all'avvio segnala che le notifiche verranno solo
scritte nel log, e ogni avviso che verrebbe inviato viene invece registrato nel log:

```text
[dry run] Alert water_reserve for A1B2C3D4E5F6 to mario (1 FIDs): The water tank is almost empty, refill it to keep irrigating your plant.
```

## Risoluzione dei problemi

Il worker delle notifiche scrive i suoi messaggi nel log del server con `module: "metrics-notifier"`.

| Sintomo                                                                      | Causa probabile                                                                                                                                                                          |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Metrics notifier worker exited with code 1, restarting in 5s` a ripetizione | `firebase-service-account.json` manca o non è leggibile nella cartella di lavoro del server (`/app` con Docker): controlla il percorso, il volume e i permessi del file                  |
| `Subscribe to agrosmart/metrics denied by broker`                            | Il ruolo `api_server` non può iscriversi alle metriche: aggiungi le ACL indicate in **Permessi MQTT**                                                                                    |
| Nessun `FID registered` dopo il login                                        | `API_URL` errato nel `.env` dell'app, oppure l'app è stata compilata senza una configurazione Firebase valida (cerca `Error during FCM registration` nella console di Flutter)           |
| `Alert ... not sent: user ... has no FID` (log di debug)                     | Il proprietario dell'Agrosmart non ha effettuato l'accesso su nessun telefono, oppure la registrazione del FID non è riuscita                                                            |
| `FCM errors for ...: messaging/mismatched-credential: ...`                   | Il service account appartiene a un progetto Firebase diverso da quello dell'app: rilancia `flutterfire configure` con il progetto della chiave, o genera la chiave nel progetto dell'app |
| `FCM errors for ...: messaging/third-party-auth-error: ...` (iOS)            | La chiave APNs manca o è errata nel progetto Firebase                                                                                                                                    |
| `1/1 delivered` nel log ma niente sul telefono                               | Permesso per le notifiche negato, _Non disturbare_ attivo o canale **Agromate notifications** disattivato nelle impostazioni di sistema                                                  |
| L'app riceve un `409` registrando il FID                                     | Il FID del telefono è ancora collegato a un altro account, ad esempio dopo una sessione scaduta senza logout: cancella i dati dell'app o reinstallala per ottenere un nuovo FID          |
| Un avviso arriva una volta e poi non più                                     | Comportamento previsto: lo stesso avviso viene ripetuto solo dopo il tempo di attesa (6 ore di default, `NOTIFICATION_COOLDOWN_MINUTES`)                                                 |
| Un nuovo intervallo di temperatura viene ignorato                            | Le impostazioni restano in cache fino a 15 minuti (`AGROSMART_CACHE_TTL_MS`): attendi o riavvia il server                                                                                |
