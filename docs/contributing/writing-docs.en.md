---
title: Writing documentation
description: How to add and organize pages in this documentation.
section: Contributing
section_order: 6
order: 90
---

# Writing documentation

Every `.md` file in the site's `docs/` folder automatically becomes a page. No code changes are needed: just add the
file and reload.

## Paths

| File                         | Address               |
| ---------------------------- | --------------------- |
| `docs/index.en.md`           | `/docs`               |
| `../architecture/mqtt.en.md` | `/docs/firmware/mqtt` |
| `docs/app/index.en.md`       | `/docs/app`           |

## Frontmatter

At the top of each file you can set some metadata:

```markdown
---
title: MQTT protocol
description: Topics and payloads exchanged between Agrosmart and the server.
section: Firmware
section_order: 4
order: 31
draft: true
---
```

| Field           | Required | Description                                                                                          |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `title`         | no       | Title in the sidebar. Defaults to the first `# heading`                                              |
| `description`   | no       | Short page description                                                                               |
| `section`       | no       | Sidebar group (default: _General_)                                                                   |
| `section_order` | no       | Position of the section in the sidebar (1 = first). Use the same number in every page of the section |
| `order`         | no       | Reading order. Sections follow the order of their first page                                         |
| `draft`         | no       | `true` shows the **Draft** label                                                                     |

> [!TIP]
> Use spaced-out numbers for `order` (10, 11, 20, 30...) so you can insert new pages without renumbering everything.

## Translations

The site is available in Italian and English. The English version is `page.en.md`; the Italian translation goes next to
it as `page.it.md` and keeps the same address.

- The translation inherits `order` and `draft` from the English version: you only need to translate `title`,
  `description` and `section`.
- If a page has no translation, the English version is shown with a notice.
- Links between pages always point to the English file (`../hardware/components.en.md`): the site opens the version in
  the current language.

Interface texts (menus, buttons, labels) live in `src/locales/it.ts` and `src/locales/en.ts`.

## Supported Markdown

GitHub-flavored Markdown is supported: tables, lists, code blocks, links and images.

### Links between pages

Use paths relative to the `.md` file: they are converted to the right address.

```markdown
See [Hardware components](../hardware/components.en.md#default-gpios).
```

### Callouts

```markdown
> [!NOTE]
> Useful information.
```

Available types: `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`.

> [!CAUTION]
> Example of a danger callout.

### Images

Save images in `public/docs-assets/` and reference them with an absolute path:

```markdown
![Wiring diagram](/docs-assets/schema.png)
```
