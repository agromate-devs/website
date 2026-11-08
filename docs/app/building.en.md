---
title: Building the app
description: Build the Agromate mobile app from source and configure its environment.
section: Getting started
section_order: 5
order: 13
---

# Building the app

The Agromate app is a **Flutter** project. This guide explains how to build it from source and how to point it at
**your** server through the `.env` file.

You need a running server first: if you don't have one yet, follow [First steps](/docs?article=first_steps).

## Requirements

- The [Flutter SDK](https://docs.flutter.dev/get-started/install).
  Run `flutter doctor` and fix any issue reported for the platforms you want to build.
- For **Android**: Android Studio (or the command line tools) with an Android SDK.
- For **iOS**: a Mac with Xcode and CocoaPods.
- The [Firebase CLI](https://firebase.google.com/docs/cli) and
  the [FlutterFire CLI](https://firebase.google.com/docs/flutter/setup),
  needed to generate the Firebase
  configuration (see below).

> [!NOTE]
> Pairing uses ESP‑Touch over Wi‑Fi, so it only works on a **real device** connected to the network the
> Agrosmart will use. An emulator or the browser is fine for general app testing.

## Getting the source code

```bash
git clone https://github.com/agromate-devs/new_mobile_app.git
cd new_mobile_app
flutter pub get
```

## Configuring the environment

The app reads its configuration at startup from a `.env` file in the project root, loaded with
[`flutter_dotenv`](https://pub.dev/packages/flutter_dotenv). The file is listed as an **asset** in `pubspec.yaml`, so it
is bundled inside the app at build time: if it is missing, the build fails.

Create (or edit) `.env`:

```bash
API_URL=http://192.168.1.10:3000
# Must be reachable by Agrosmart
MQTT_URL=mqtt://192.168.1.10:1883
```

| Variable   | Example                    | Used for                                                                        |
|------------|----------------------------|---------------------------------------------------------------------------------|
| `API_URL`  | `http://192.168.1.10:3000` | Base URL of the Agromate server REST API                                        |
| `MQTT_URL` | `mqtt://192.168.1.10:1883` | MQTT broker. Sent to the Agrosmart during pairing and used by the webcam viewer |

### Rules for the values

- **`API_URL`** is the address of the server that runs the `agromate-server` container (by default on port `3000`).
  Write it **without a trailing slash**: the app appends paths directly.
- **`MQTT_URL`** must contain the scheme (`mqtt://` or `mqtts://`), the host **and the port**: This must be reachable by
  Agrosmart (not behind VPN or localhost for example) and it's used for Agrosmart initialization and for viewing webcam.
- Both addresses must be reachable from the phone. On the local network use the LAN IP of the server; to use the app
  from outside your home, use a public hostname (and preferably HTTPS / MQTTS).

> [!IMPORTANT]
> The values are baked into the app when you build it. After changing `.env`, stop the app and run `flutter run` again
> (or rebuild the APK): a hot reload is not enough.

> [!WARNING]
> Changing `MQTT_URL` does not update the Agrosmarts that are already paired: they keep the broker address they
> received during pairing. Delete them and pair them again to send the new MQTT address.

## Building without notifications

If you don't need push notifications you can skip Firebase entirely and build the app without
`lib/firebase_options.dart` and `google-services.json`. You only need to comment out a few lines in two files.

**1. `lib/main.dart`**: comment out the import of the generated options and the Firebase initialization:

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

The whole `if (!kIsWeb)` block has to go too: it uses `FirebaseMessaging`, which fails at startup if Firebase was
not initialized.

**2. `android/app/build.gradle.kts`** (Android only): comment out the Google Services plugin, which stops the Gradle
build when `google-services.json` is missing:

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

The rest of the app doesn't need any change: the FCM registration done after login catches the error caused by the
missing Firebase app and only writes `Error during FCM registration` to the debug log. The imports that are now unused
(`dart:io`, `firebase_core`, `firebase_messaging`, `local_notifications_utils.dart`) only produce analyzer warnings;
you can comment them out as well.

> [!NOTE]
> These are local changes: don't commit them. To enable notifications later, uncomment the lines and follow
> [Push notifications](/docs?article=push_notifications).

## Generating the MobX code

The app use [MobX](https://pub.dev/packages/mobx) and rely on generated `*.g.dart` files. They are ignored by git,
so generate them after cloning and every time you change a store:

```bash
dart run build_runner build --delete-conflicting-outputs
```

## Running and building

With a device connected (check it with `flutter devices`):

```bash
flutter run              # debug build, with hot reload
flutter run --release    # release build on the device
```

To produce an installable package:

```bash
flutter build apk --release      # Android APK, in build/app/outputs/flutter-apk/
flutter build appbundle          # Android App Bundle, for the Play Store
flutter build ipa                # iOS, requires a configured Apple signing team
```

> [!NOTE]
> The Android release build is currently signed with the **debug key** (see `android/app/build.gradle.kts`), and the
> application ID is `com.agromate.agromate`. You can change it by finding and replacing every entry of
`com.agromate.agromate`.

## Troubleshooting

| Problem                                                  | Cause and solution                                                                                                                      |
|----------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `No file or variants found for asset: .env`              | The `.env` file is missing from the project root. Create it as described above                                                          |
| `Error when reading 'lib/firebase_options.dart'`         | The Firebase configuration was not generated. Run `flutterfire configure`                                                               |
| Errors about missing `_$...` mixins or `*.g.dart` files  | The MobX code was not generated. Run `build_runner build`                                                                               |
| `API_URL is not defined in .env file`                    | The `.env` file exists but doesn't contain `API_URL`. Check the variable name and rebuild                                               |
| Login fails with a connection error                      | `API_URL` is not reachable from the phone: check the IP and port, and that the phone is on the same network as the server               |
| Pairing succeeds but the Agrosmart never appears online  | `MQTT_URL` is not reachable from the ESP32 (e.g. `localhost`), or the Mosquitto server credentials/ACL are wrong. Fix it and pair again |
| `MQTT_URL is not set in .env file` when opening a webcam | Add `MQTT_URL` to `.env` and rebuild                                                                                                    |
