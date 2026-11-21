# Agromate website

Website, documentation and web flasher of [Agromate](https://agromate-devs.github.io/website/), the open source smart
greenhouse built around the ESP32-based **Agrosmart**.

Live at <https://agromate-devs.github.io/website/>.

Built with **Vue 3**, **Vite**, **TypeScript** and **Tailwind CSS v4**.

## The Agromate project

| Repository                                                        | Component          |
| ----------------------------------------------------------------- | ------------------ |
| [agrosmart](https://github.com/agromate-devs/agrosmart)           | Agrosmart firmware |
| [server](https://github.com/agromate-devs/server)                 | Backend            |
| [mobile_app](https://github.com/agromate-devs/mobile_app) | Mobile app         |
| [camera](https://github.com/agromate-devs/camera)                 | Webcam broadcaster |
| **website** (this repository)                                     | Site and docs      |

## Development

Requires Node.js `^22.18.0` or `>=24.12.0`.

```bash
npm install
npm run fetch-firmware   # optional: downloads the latest firmware release for the web flasher
npm run dev              # dev server with hot reload
```

| Command                  | What it does                                                  |
| ------------------------ | ------------------------------------------------------------- |
| `npm run dev`            | Vite dev server                                               |
| `npm run build`          | Type-check (`vue-tsc`) and production build in `dist/`        |
| `npm run preview`        | Serve the production build                                    |
| `npm run lint`           | oxlint and ESLint, with auto-fix                              |
| `npm run format`         | Prettier on `src/` and `docs/`                                |
| `npm run fetch-firmware` | Download the latest Agrosmart release into `public/firmware/` |

## Project structure

```text
docs/                  # documentation pages (Markdown)
public/                # static files, docs images in public/docs-assets/
scripts/               # fetch-firmware.ts
src/
├── components/        # home page sections and shared components
├── views/             # Home, Docs, web flasher, 404
├── locales/en.ts      # interface texts
├── assets/main.css    # Tailwind theme (leaf, soil, sun, water palettes) and docs styles
├── router.ts
└── site.ts            # links to the other repositories
```

## Writing documentation

Every `docs/<section>/<name>.en.md` file becomes a page at `/docs?article=<name>`: no code changes are needed. The
`<name>` must be unique across all folders.

The sidebar is built from the frontmatter:

```markdown
---
title: MQTT protocol
description: Topics and payloads exchanged between Agrosmart and the server.
section: Architecture
section_order: 5
order: 31
draft: true
---
```

GitHub-flavored Markdown is supported, including tables, code blocks and alerts (`> [!NOTE]`, `> [!TIP]`,
`> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`). Save images in `public/docs-assets/` and reference them with an
absolute path (`/docs-assets/...`). Link other pages with `/docs?article=<name>`.

## Deployment

Every push to `main` is built and deployed to GitHub Pages by the **Deploy to GitHub Pages** workflow, which also
downloads the latest firmware release for the web flasher.

## Contributing

Fixes, new pages and translations are welcome. Read
[Contributing to the code](https://agromate-devs.github.io/website/docs?article=contributing_code) before opening a pull
request.
