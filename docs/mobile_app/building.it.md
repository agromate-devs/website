---
title: Compilare l'mobile_app
description: Compilare l'mobile_app mobile Agromate dai sorgenti e configurarne l'ambiente.
section: App mobile
section_order: 5
order: 8
---

# Compilare l'app

L'app Agromate è un progetto **Flutter**. Questa guida spiega come compilarla dai sorgenti e come collegarla al **tuo**
server tramite il file `.env`.

Prima ti serve un server funzionante: se non ce l'hai ancora, segui [Primi passi](/docs?article=first_steps).

## Requisiti

- Il [Flutter SDK](https://docs.flutter.dev/get-started/install) (Dart `^3.11.1`, come dichiarato in `pubspec.yaml`).
  Esegui `flutter doctor` e risolvi i problemi segnalati per le piattaforme che vuoi compilare.
- Per **Android**: Android Studio (o i command line tools) con un Android SDK, e un telefono con il debug USB attivo
  oppure un emulatore.
- Per **iOS**: un Mac con Xcode e CocoaPods.
- La [Firebase CLI](https://firebase.google.com/docs/cli) e la FlutterFire CLI, necessarie per generare la
  configurazione di Firebase (vedi sotto).

> [!NOTE]
> L'abbinamento usa ESP‑Touch via Wi‑Fi, quindi funziona solo su un **dispositivo reale** collegato alla rete a 2,4 GHz
> che userà l'Agrosmart. Per tutto il resto va bene anche un emulatore.

## Scaricare il codice sorgente

```bash
git clone https://github.com/agromate-devs/new_mobile_app.git
cd new_mobile_app
flutter pub get
```

## Configurare l'ambiente

All'avvio l'app legge la configurazione da un file `.env` nella cartella principale del progetto, caricato con
[`flutter_dotenv`](https://pub.dev/packages/flutter_dotenv). Il file è elencato tra gli **asset** in `pubspec.yaml`,
quindi viene incluso nell'app al momento della compilazione: se manca, la build fallisce.

Crea (o modifica) `.env`:

```bash
API_URL=http://192.168.1.10:3000
# Must be reachable by Agrosmart
MQTT_URL=mqtt://192.168.1.10:1883
# The signaling server used by webcam viewer
SIGNALING_SERVER_URL=mqtt://192.168.1.10:1883
```

| Variabile              | Esempio                    | Usata per                                                                         |
|------------------------|----------------------------|-----------------------------------------------------------------------------------|
| `API_URL`              | `http://192.168.1.10:3000` | URL di base delle API REST del server Agromate: login, piante, Agrosmart, webcam… |
| `MQTT_URL`             | `mqtt://192.168.1.10:1883` | Broker MQTT inviato all'Agrosmart durante l'abbinamento                           |
| `SIGNALING_SERVER_URL` | `mqtt://192.168.1.10:1883` | Broker MQTT usato dal visualizzatore webcam per il signaling WebRTC               |

### Regole per i valori

- **`API_URL`** è l'indirizzo del container `agromate-server` (porta `3000` nella
  [configurazione Docker Compose](/docs?article=first_steps)). Scrivilo **senza la barra finale**: l'app aggiunge
  direttamente percorsi come `/login`.
- **`MQTT_URL`** deve contenere lo schema (`mqtt://` o `mqtts://`), l'host **e la porta**.
- Durante l'[abbinamento](/docs?article=pairing) l'app invia `MQTT_URL` all'Agrosmart, che poi vi si collega da solo.
  L'indirizzo deve quindi essere raggiungibile **dall'ESP32**, non solo dal telefono: non usare `localhost`,
  `127.0.0.1` o `10.0.2.2` (l'alias del computer nell'emulatore Android).
- **`SIGNALING_SERVER_URL`** è il broker MQTT a cui si collega il visualizzatore webcam per il signaling WebRTC. Usa
  lo stesso formato di `MQTT_URL`, porta compresa. Deve essere raggiungibile solo dal telefono (e dalle webcam), non
  dall'Agrosmart, quindi può essere diverso da `MQTT_URL`: ad esempio un hostname pubblico `mqtts://` per guardare le
  webcam fuori casa. Di solito è lo stesso broker di `MQTT_URL`.
- Tutti gli indirizzi devono essere raggiungibili dal telefono. In rete locale usa l'IP LAN del server; per usare
  l'app fuori casa usa un hostname pubblico (preferibilmente con HTTPS / MQTTS).

> [!IMPORTANT]
> I valori vengono inclusi nell'app al momento della compilazione. Dopo aver modificato `.env`, ferma l'app ed esegui di
> nuovo `flutter run` (o ricompila l'APK): l'hot reload non basta.

> [!WARNING]
> Cambiare `MQTT_URL` non aggiorna gli Agrosmart già abbinati: continuano a usare l'indirizzo del broker ricevuto
> durante l'abbinamento. Abbinali di nuovo per inviare il nuovo indirizzo.

## Configurazione di Firebase

All'avvio l'app inizializza Firebase (`Firebase.initializeApp()` in `lib/main.dart`) per le
[notifiche push](/docs?article=push_notifications) e importa `lib/firebase_options.dart`. Questo file, insieme a
`android/app/google-services.json`, **non è nel repository**, quindi un clone appena scaricato non compila finché non
li generi:

```bash
npm install -g firebase-tools
firebase login
dart pub global activate flutterfire_cli
flutterfire configure --project=<id-del-tuo-progetto>
```

Usa lo **stesso progetto Firebase** del server, altrimenti le notifiche non vengono recapitate. La procedura completa,
compresa la creazione del progetto, è descritta in [Notifiche push](/docs?article=push_notifications).

### Compilare senza notifiche

Se non ti servono le notifiche push puoi fare a meno di Firebase e compilare l'app senza `lib/firebase_options.dart` e
`google-services.json`. Basta commentare alcune righe in due file.

**1. `lib/main.dart`**: commenta l'import delle opzioni generate e l'inizializzazione di Firebase:

```dart
// import 'firebase_options.dart';

void main() async {
  // ...

  // await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  // if (!kIsWeb) {
  //   if (Platform.isIOS) {
  //     FirebaseMessaging.instance.setForegroundNotificationPresentationOptions(
  //       alert: true,
  //       badge: true,
  //       sound: true,
  //     );
  //   }
  //   if (Platform.isAndroid) await setupForegroundNotifications();
  // }
  runApp(
    // ...
```

Va commentato anche tutto il blocco `if (!kIsWeb)`: usa `FirebaseMessaging`, che all'avvio genera un errore se
Firebase non è stato inizializzato.

**2. `android/app/build.gradle.kts`** (solo Android): commenta il plugin Google Services, che blocca la build Gradle
quando manca `google-services.json`:

```kotlin
plugins {
    id("com.android.application")
    // START: FlutterFire Configuration
    // id("com.google.gms.google-services")
    // END: FlutterFire Configuration
    id("kotlin-android")
    id("dev.flutter.flutter-gradle-plugin")
}
```

Il resto dell'app non va modificato: la registrazione a FCM eseguita dopo il login intercetta l'errore dovuto
all'assenza di Firebase e scrive solo `Error during FCM registration` nel log di debug. Gli import rimasti inutilizzati
(`dart:io`, `firebase_core`, `firebase_messaging`, `local_notifications_utils.dart`) producono solo warning
dell'analyzer; puoi commentare anche quelli.

> [!NOTE]
> Sono modifiche locali: non farne il commit. Per attivare le notifiche in seguito, togli i commenti e segui
> [Notifiche push](/docs?article=push_notifications).

## Generare il codice MobX

Gli store usano [MobX](https://pub.dev/packages/mobx) e si basano su file generati `*.g.dart`. Sono ignorati da git,
quindi generali dopo il clone e ogni volta che modifichi uno store:

```bash
dart run build_runner build --delete-conflicting-outputs
```

Durante lo sviluppo puoi lasciare il generatore attivo, così aggiorna i file a ogni salvataggio:

```bash
dart run build_runner watch --delete-conflicting-outputs
```

## Avviare e compilare

Con un dispositivo collegato (verificalo con `flutter devices`):

```bash
flutter run              # build di debug, con hot reload
flutter run --release    # build di release sul dispositivo
```

Per generare un pacchetto installabile:

```bash
flutter build apk --release      # APK Android, in build/mobile_app/outputs/flutter-apk/
flutter build appbundle          # Android App Bundle, per il Play Store
flutter build ipa                # iOS, richiede un team di firma Apple configurato
```

> [!NOTE]
> Al momento la build Android di release è firmata con la **chiave di debug** (vedi `android/app/build.gradle.kts`) e
> l'application ID è `com.example.agromate_mobile_app`. Va bene per installare l'APK sui tuoi telefoni; per pubblicare
> su uno store configura una tua chiave di firma e un tuo application ID (poi esegui di nuovo `flutterfire configure`).

## Riepilogo

1. `flutter pub get`
2. `.env` con `API_URL`, `MQTT_URL` e `SIGNALING_SERVER_URL` che puntano al tuo server
3. `flutterfire configure` → `lib/firebase_options.dart` e `google-services.json` (oppure segui **Compilare senza
   notifiche**)
4. `dart run build_runner build --delete-conflicting-outputs`
5. `flutter run`

## Risoluzione dei problemi

| Problema                                                          | Causa e soluzione                                                                                                                   |
|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `No file or variants found for asset: .env`                       | Manca il file `.env` nella cartella principale del progetto. Crealo come descritto sopra                                            |
| `Error when reading 'lib/firebase_options.dart'`                  | La configurazione di Firebase non è stata generata. Esegui `flutterfire configure`                                                  |
| Errori su mixin `_$...` o file `*.g.dart` mancanti                | Il codice MobX non è stato generato. Esegui `build_runner build`                                                                    |
| `API_URL is not defined in .env file`                             | Il file `.env` esiste ma non contiene `API_URL`. Controlla il nome della variabile e ricompila                                      |
| Il login fallisce con un errore di connessione                    | `API_URL` non è raggiungibile dal telefono: controlla IP e porta, e che il telefono sia sulla stessa rete del server                |
| L'abbinamento riesce ma l'Agrosmart non risulta mai online        | `MQTT_URL` non è raggiungibile dall'ESP32 (es. `localhost`), oppure credenziali/ACL di Mosquitto errate. Correggi e abbina di nuovo |
| `SIGNALING_SERVER_URL is not set in .env file` aprendo una webcam | Aggiungi `SIGNALING_SERVER_URL` a `.env` e ricompila                                                                                |
