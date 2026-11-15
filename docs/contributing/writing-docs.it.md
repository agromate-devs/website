---
title: Scrivere la documentazione
description: Come aggiungere e organizzare le pagine di questa documentazione.
section: Contribuire
section_order: 6
---

# Scrivere la documentazione

Ogni file `.md` nella cartella `docs/` del sito diventa automaticamente una pagina. Non serve modificare codice: basta
aggiungere il file e ricaricare.

## Percorsi

| File                         | Indirizzo             |
| ---------------------------- | --------------------- |
| `docs/index.en.md`           | `/docs`               |
| `../architecture/mqtt.en.md` | `/docs/firmware/mqtt` |
| `../mobile_app`              | `/docs/app`           |

## Frontmatter

All'inizio di ogni file puoi indicare dei metadati:

```markdown
---
title: Protocollo MQTT
description: Topic e payload scambiati tra Agrosmart e server.
section: Firmware
section_order: 4
order: 31
draft: true
---
```

| Campo           | Obbligatorio | Descrizione                                                                                              |
| --------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| `title`         | no           | Titolo nella sidebar. Se manca si usa il primo `# titolo`                                                |
| `description`   | no           | Breve descrizione della pagina                                                                           |
| `section`       | no           | Gruppo nella sidebar (predefinito: _Generale_)                                                           |
| `section_order` | no           | Posizione della sezione nella sidebar (1 = prima). Usa lo stesso numero in tutte le pagine della sezione |
| `order`         | no           | Ordine di lettura. Le sezioni seguono l'ordine della loro prima pagina                                   |
| `draft`         | no           | `true` mostra l'etichetta **Bozza**                                                                      |

> [!TIP]
> Usa numeri distanziati per `order` (10, 11, 20, 30...) così puoi inserire nuove pagine senza rinumerare tutto.

## Traduzioni

Il sito è disponibile in italiano e in inglese. La versione inglese è `pagina.en.md`; la traduzione italiana va accanto
come `pagina.it.md` e mantiene lo stesso indirizzo.

- La traduzione eredita `order` e `draft` dalla versione inglese: basta tradurre `title`, `description` e `section`.
- Se una pagina non è tradotta, viene mostrata la versione inglese con un avviso.
- I link tra pagine puntano sempre al file inglese (`../hardware/components.en.md`): il sito apre la versione nella
  lingua corrente.

I testi dell'interfaccia (menu, pulsanti, etichette) si trovano in `src/locales/it.ts` e `src/locales/en.ts`.

## Markdown supportato

È supportato il markdown in stile GitHub: tabelle, liste, blocchi di codice, link e immagini.

### Link tra pagine

Usa percorsi relativi al file `.md`: vengono convertiti nell'indirizzo corretto.

```markdown
Vedi [Componenti hardware](../hardware/components.en.md#gpio-predefiniti).
```

### Avvisi

```markdown
> [!NOTE]
> Informazione utile.
```

Tipi disponibili: `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`.

> [!CAUTION]
> Esempio di avviso di pericolo.

### Immagini

Salva le immagini in `public/docs-assets/` e richiamale con un percorso assoluto:

```markdown
![Schema di collegamento](/docs-assets/schema.png)
```
