# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site + documentation for **Agromate**, an open source ESP32 smart greenhouse (device: "Agrosmart"). Vue 3 + Vite + TypeScript SPA, styled with Tailwind CSS v4. `main` is **English-only**; the Italian translation (`src/locales/it.ts`, `docs/**/*.it.md`, `LanguageSwitcher.vue`, locale detection in `src/i18n.ts`) lives on the local, unpushed `i18n` branch, ready to be merged back. Related repos are linked from `src/site.ts` (firmware, mobile app).

## Commands

```sh
npm run dev          # Vite dev server
npm run build        # vue-tsc type-check + vite build (run in parallel)
npm run type-check   # vue-tsc --build only
npm run lint         # oxlint --fix, then eslint --fix (both auto-fix)
npm run format       # prettier on src/
npm run preview      # serve dist/
```

There is no test suite. Node `^22.18.0 || >=24.12.0`. Prettier: single quotes, semicolons, 100-col width.

## Architecture

- `src/main.ts` installs `i18n` then `router`. `App.vue` is a shell (header / `RouterView` / footer) that syncs `<html lang>` to the locale. Views set `document.title` themselves via `watchEffect` + `t('meta.*')`.
- **Routing** (`src/router.ts`): `/` → `HomeView` (composed of section components in `src/components/`), `/docs/:slug*` → `DocsView` (lazy), catch-all → `NotFoundView`. Hash scrolling offsets 88px for the sticky header.
- **i18n** (`src/i18n.ts`): vue-i18n Composition API only (legacy flags are disabled in `vite.config.ts`), currently with the single locale `en`. UI strings still go through `t()` in `src/locales/en.ts` so the `i18n` branch can be merged back; on that branch `en.ts` is typed against `it.ts`, so every key must exist in both.
- **Theme**: custom Tailwind palettes (`leaf`, `soil`, `sun`, `water`) and fonts are defined in `@theme` in `src/assets/main.css`; use those instead of default Tailwind colors. Rendered docs are styled via the `.doc-content` class there.

### Documentation system

Docs content lives in `docs/**/*.{en,it}.md` (outside `src/`) and is rendered entirely client-side by `src/views/DocsView.vue`:

- Every markdown file is imported twice with `import.meta.glob` (eager): once through `unplugin-vue-markdown` to get the **frontmatter** as module exports, once with `?raw` to get the source, which is rendered with `marked` + `marked-highlight` (highlight.js) + `marked-alert` (GitHub `> [!NOTE]` callouts). Frontmatter is stripped by regex before rendering.
- Filenames are `<name>.<locale>.md`. The current article is selected by the `?article=<name>` query param (default `index`), matched on the **basename only** — folder is ignored, so basenames must be unique across `docs/`. Falls back to the `en` file when the current locale has no translation.
- Sidebar: pages grouped by frontmatter `section`, sections sorted by `section_order`, pages by `order`; `draft: true` shows a warning banner (strings in `docs.*` locale keys).
- Images go in `public/docs-assets/` and are referenced with absolute paths.

`docs/contributing/writing-docs.en.md` describes the intended authoring behavior, but parts of it are **not implemented yet** in `DocsView.vue`: path-based URLs (`/docs/firmware/mqtt`), rewriting relative `.md` links, title defaulting to the first heading, translation inheriting `order`/`draft`, the missing-translation notice, and setting the doc page title (`meta.docTitle`). Check the code before relying on that guide. `TODO` notes that docs navigation should avoid full page reloads when switching articles.
