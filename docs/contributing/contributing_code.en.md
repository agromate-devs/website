---
title: Contributing to the code
description: How the Agromate repositories are organized and how to send your first pull request.
section: Contributing
section_order: 6
order: 90
---

# Contributing to the code

Agromate is fully open source, and every part of it — the firmware, the server, the app, the webcam streamer and this
website — lives in its own repository under the [agromate-devs](https://github.com/agromate-devs) GitHub organization.
This page explains how the pieces fit together, how each repository is organized and what to check before opening a
pull request.

> [!TIP]
> Not sure where to start? Open an issue in the repository you want to work on
> and describe the bug or the idea before writing code: it's the quickest way to find out whether someone is already on
> it and which approach fits the project.

## How the pieces talk to each other

```text
                     REST (HTTP)                       MQTT
  ┌────────────┐  ───────────────►  ┌──────────┐  ◄──────────►  ┌───────────┐
  │ Mobile app │                    │  Server  │    Mosquitto   │ Agrosmart │
  │  Flutter   │  ◄── FCM push ───  │ Fastify  │                │   ESP32   │
  └────────────┘                    └──────────┘                └───────────┘
        ▲                             │      ▲                        │
        │ WebRTC (signaling on MQTT)  │      │ Flux queries           │ agrosmart/metrics
        ▼                             ▼      │                        ▼
  ┌────────────┐                   SQLite   InfluxDB  ◄──────────  Telegraf
  │   Webcam   │                  (Prisma)
  │   Python   │
  └────────────┘
```

- The **app** only talks to the **server** over REST, except for the webcam viewer (WebRTC, with MQTT as signaling
  channel) and the pairing, which sends the Wi‑Fi credentials and the MQTT broker address to the Agrosmart.
- The **server** pushes the plant configuration and the manual commands to the **Agrosmart** on
  `agrosmart/<MAC>/settings`, and manages the broker users and ACLs at runtime through Mosquitto's dynamic security
  plugin.
- The **Agrosmart** publishes its readings on `agrosmart/metrics`. They are **not** read by the server: Telegraf
  stores them in InfluxDB, and the server queries InfluxDB when the app asks for the charts.

The topics and payloads are listed in the server and firmware sources (`src/app/mqtt.ts`, `components/mqtt_helper/`).

## Repositories

| Repository                                                        | Component          | Stack                                    |
| ----------------------------------------------------------------- | ------------------ | ---------------------------------------- |
| [agrosmart](https://github.com/agromate-devs/agrosmart)           | Agrosmart firmware | C, ESP‑IDF, FreeRTOS                     |
| [server](https://github.com/agromate-devs/server)                 | Backend            | TypeScript, Fastify 5, Prisma 7 (SQLite) |
| [mobile_app](https://github.com/agromate-devs/mobile_app) | Mobile app         | Dart, Flutter, MobX                      |
| [camera](https://github.com/agromate-devs/camera)                 | Webcam broadcaster | Python, aiortc, aiomqtt                  |
| [website](https://github.com/agromate-devs/website)               | Site and docs      | TypeScript, Vue 3, Vite, Tailwind CSS    |

Each repository builds and runs on its own, but most features cross at least two of them: see
[Changes across repositories](#changes-across-repositories).

## The workflow

1. **Fork** the repository and clone your fork.
2. Create a branch from `main` with a descriptive name, for example `fix-pump-timeout` or `add-co2-sensor`.
3. Make your change and keep it focused: one bug or one feature per pull request is much easier to review.
4. Run the checks listed for that repository below.
5. Write commits with a short message in the imperative mood, like the existing history: _Add notification on
   irrigation_, _Avoid irrigating if water tank is empty_.
6. Open a **pull request** against `main`, explaining what changes, why, and how you tested it. If the change depends
   on a pull request in another repository, link it.

> [!IMPORTANT]
> Never commit secrets or local configuration: `.env` files, `sdkconfig` changes made only for your board,
> `firebase-service-account.json`, `google-services.json`, `camera_config.json`, the SQLite database. Check
> `git status` before every commit.

## Firmware — `agrosmart`

The firmware is a standard ESP‑IDF project. Follow [Customizing the firmware](/docs?article=custom_firmware) to set up
ESP‑IDF and build it.

```text
agrosmart/
├── main/
│   ├── main.c                 # startup: NVS, Wi‑Fi, pairing, MQTT, tasks
│   ├── Kconfig.projbuild      # the "Agrosmart configuration" menuconfig entries
│   └── idf_component.yml      # dependencies from the ESP Component Registry
├── components/                # one ESP‑IDF component per feature
│   ├── wifi/                  # Wi‑Fi connection and SmartConfig (ESP‑Touch) pairing
│   ├── mqtt_helper/           # broker connection and topic handling
│   ├── plant_manager/         # plant config parsing, sensors, monitoring tasks
│   ├── water_manager/         # pump control
│   ├── water_level_sensor/    # tank level
│   ├── humidifier_manager/    # humidifier control
│   ├── light_manager/         # LED strip and light schedule
│   ├── adc/                   # ADC helpers for the soil probe
│   ├── keystore/              # read/write values in NVS
│   ├── ota_manager/           # over‑the‑air updates
│   └── telemetry/             # device info and diagnostic messages to the server
├── tools/package_release.py   # packages the release images and the web flasher manifest
├── partitions.csv
└── sdkconfig.defaults         # the configuration of the official release
```

**Guidelines**

- New features go in a **component** under `components/` with its own `CMakeLists.txt` and a public header in
  `include/`. Keep `main.c` limited to the initialization.
- Anything a user may want to change (pins, intervals, thresholds, sensor type) should be a **Kconfig option** in
  `main/Kconfig.projbuild` with a sensible default, not a constant in the code. Document new options in
  [Customizing the firmware](/docs?article=custom_firmware).
- Format the code with `clang-format` (the `.clang-format` in the repository is based on the Google style) and
  document public functions with Doxygen comments (`@brief`, `@param`, `@return`), like the existing headers.
- Use `ESP_LOGx` with a per-file `TAG` for logging, and check the return value of every ESP‑IDF call.
- Don't commit your `sdkconfig`. Only update `sdkconfig.defaults` when the **default** configuration changes (for
  example a new option): run `idf.py save-defconfig` on a build with the standard configuration.

**Before opening the pull request**

- `idf.py build` must succeed for the **ESP32‑C5**, the target of the official firmware. The **ESP‑IDF build**
  workflow builds every push and pull request with the same ESP‑IDF version used for releases (currently v6.1).
- Flash it on a real board and watch the serial monitor (`idf.py flash monitor`): there is no automated test, so
  describe in the pull request what you verified on the hardware.
- If you touched pins or ADC code, check that the build still works for the other targets listed in
  [Building an Agrosmart](/docs?article=building_agrosmart).

**Releases** are made by the maintainers by pushing a `v*` tag: the **Release standard firmware** workflow builds the
firmware from `sdkconfig.defaults` and publishes it on GitHub, where the OTA updates and the
[web flasher](/flasher) pick it up.

## Server — `server`

A Fastify 5 + TypeScript (ESM) REST API backed by SQLite through Prisma.

```text
server/
├── src/
│   ├── index.ts
│   ├── app.d.ts               # global types: User, PlantEntry, PlantConfig, ...
│   ├── app/                   # server setup, auth hook, MQTT, InfluxDB, Firebase, utilities
│   ├── routes/
│   │   └── <resource>/        # one file per HTTP method + <resource>.routes.ts
│   └── workers/               # push notification worker (metrics → FCM)
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   ├── seed/plants.json       # the default plant catalog
│   └── validatePlants.ts
└── public/                    # static files: plant images, OTA files
```

**Running it locally**

Start Mosquitto, InfluxDB and Telegraf as described in [First steps](/docs?article=first_steps), then:

```bash
npm install
npx prisma generate      # generates the client in ./generated/prisma
npx prisma migrate dev   # creates the local database
npm run seed             # loads the plant catalog
npm run dev              # http://localhost:3000, Swagger UI on /docs
```

**Guidelines**

- Each resource lives in `src/routes/<resource>/` with **one file per HTTP method** (`plant.get.ts`, `plant.post.ts`,
  ...), aggregated by `<resource>.routes.ts` and registered in `src/routes/index.ts`.
- Every route declares a **full JSON schema** (headers, body or query string, responses). It is used for validation
  and for the Swagger docs, and Fastify serializes the response through it: **a field missing from the response schema
  is silently dropped**. When you return a new field, add it to the schema too.
- Responses use the shape `{ success: boolean, message?: string, data?: ... }`.
- All routes require authentication, except those listed in `noAuthRoutes` in `src/app/authHooks.ts`. The hook only
  tells you who the user is: each handler must check that the user **owns** the Agrosmart or webcam it is touching, and
  answer `403` otherwise.
- Database changes: edit `prisma/schema.prisma` and run `npx prisma migrate dev --name <what-changed>`. Commit the
  generated migration together with the schema.

**Before opening the pull request**

- Type-check: `npx tsc --noEmit -p .`
- There is no test suite yet: try the endpoints you touched from the Swagger UI and describe the requests in the pull
  request.

## Mobile app — `mobile_app`

A Flutter app for Android and iOS. Follow [Building the app](/docs?article=building) to set up the `.env` file,
Firebase (or build without it) and the MobX code generation.

```text
mobile_app/
├── lib/
│   ├── main.dart
│   ├── views/
│   │   └── <Screen>/
│   │       ├── <screen>_view.dart         # the widgets
│   │       ├── <screen>_view_model.dart   # state and logic
│   │       ├── <screen>_repository.dart   # calls to the server
│   │       ├── <screen>_model.dart        # MobX store (generates *.g.dart)
│   │       └── widgets/                   # widgets used only by this screen
│   ├── widgets/               # widgets shared between screens
│   ├── models/                # data classes (Plant, OwnedAgrosmart, Webcam, ...)
│   ├── mqtt_client/           # MQTT client, native and web implementations
│   └── utils/                 # HTTP client, base repository, validation, dialogs
└── test/                      # same layout as lib/
```

**Guidelines**

- Every screen has its own folder in `lib/views/`, split into view, view model and repository. Keep HTTP calls in the
  repository and logic in the view model: the view should only build widgets.
- Split complex widgets (roughly more than 50 lines) into their own file in the `widgets/` folder of the screen, if it
  makes the code easier to read. Widgets used by several screens go in `lib/widgets/`.
- The `*.g.dart` files are generated and ignored by git: after changing a store, run
  `dart run build_runner build --delete-conflicting-outputs`.
- New configuration values go in `.env`. If you add a variable, document it in
  [Building the app](/docs?article=building).

**Before opening the pull request**

```bash
dart format lib test
flutter analyze
flutter test
```

`flutter analyze` uses the rules in `analysis_options.yaml` (the Flutter lints plus a few extra rules, such as
`prefer_const_constructors`). Add or update the tests in `test/` for the view models and widgets you change, and
include screenshots in the pull request when you change the UI.

## Webcam — `camera`

A single Python process (`main.py`) that captures a camera and streams it over WebRTC, using the MQTT broker for the
signaling. The protocol is described in `camera_protocol.md` in the repository; the setup is in
[Webcam configuration](/docs?article=webcam_config).

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python main.py --test     # streams a sample video instead of a real camera
```

If you change the signaling messages, update `camera_protocol.md` and the viewer in the mobile app in the same round of
pull requests.

## Website and docs — `website`

This site: a Vue 3 + Vite SPA, styled with Tailwind CSS. The documentation is plain Markdown in `docs/`.

```bash
npm install
npm run dev
```

- Every `docs/<section>/<name>.en.md` file becomes a page, reachable at `/docs?article=<name>`. The name must be
  **unique** across all folders.
- The sidebar is built from the frontmatter: `title`, `description`, `section`, `section_order`, `order` and
  `draft: true` for unfinished pages. Copy the frontmatter of a page in the same section to get it right.
- GitHub alerts (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`) are supported. Images go in
  `public/docs-assets/` and are referenced with an absolute path (`/docs-assets/...`).
- Interface texts go through `t()`, with the strings in `src/locales/en.ts`. Use the theme colors (`leaf`, `soil`,
  `sun`, `water`) defined in `src/assets/main.css` instead of the default Tailwind palette.

Before opening the pull request run `npm run lint`, `npm run format` and `npm run build` (which also type-checks).
Every push to `main` is deployed to GitHub Pages.

## Changes across repositories

Most new features touch more than one repository. These are the most common cases.

### Adding a sensor reading

1. **Firmware**: read the sensor in a new component (or in `plant_manager/sensors/`) and add the field to the JSON
   published on `agrosmart/metrics`.
2. **Telegraf**: its JSON parser keeps **only numeric fields** by default. String and boolean fields must be added to
   `json_string_fields` in `telegraf.conf`, otherwise they are dropped.
3. **Server**: add the field to the Flux `keep(columns: [...])` in `src/routes/agrosmart_metrics/` **and** to the
   response schema of the route.
4. **App**: add it to `AgrosmartMetric` in `lib/models/agrosmart_metrics.dart` and show it in the UI.
5. **Docs**: document the new reading in the pages that list the metrics.

### Adding a plant care setting

1. **App**: add the control to the plant settings widgets and send the new field to the server.
2. **Server**: validate it in `preparePlantConfiguration` (`src/app/utils.ts`) and add it to the `PlantConfig` type
   in `src/app.d.ts`. The configuration is saved as JSON and published, retained, on `agrosmart/<MAC>/settings`.
3. **Firmware**: parse it in `plant_manager/config_parser/` and use it in the monitoring tasks. Keep a sensible default
   when the field is missing, so that older servers keep working.
4. **Docs**: update the [App overview](/docs?article=overview).

> [!WARNING]
> Agrosmarts in the field are updated over the air, but not all at the same time. A message format change must stay
> compatible with the firmware already installed: add fields instead of renaming or removing them.

### Adding a plant to the catalog

You don't need to write code to add a plant:

1. Add it to `prisma/seed/plants.json` in the **server** repository, with its image in `public/plants/`. Set
   `docsArticle` to the name of its documentation page.
2. Run `npm run seed:validate:strict`: the **Validate seed** workflow runs the same check on every pull request that
   touches the catalog, and fails on both errors and warnings.
3. Add the care guide in `docs/plants/<name>.en.md` in the **website** repository, using one of the existing plant
   pages (for example [Basil](/docs?article=basil)) as a template.

Open the two pull requests together and link them to each other.
