---
title: Default plants
description: How the fields of the default plants in the database were filled in, and what still needs to change.
section: Plants
section_order: 4
order: 20
---

# Default plants

The Agromate server ships with a catalog of default plants, defined in `prisma/seed/plants.json` in the server
repository and added to the database automatically every time the server starts (see the _Plant catalog_ section below).
When you pick a plant from the catalog in the app, its values are used as the starting configuration of the Agrosmart:
you can still change them
from the plant care settings.

You can see all the plants in the catalog in the other pages of this section. Each plant has its own page that explains
how its parameters were chosen.

## How the fields are filled in

Each value starts from the agronomic needs of the plant (light, temperature, humidity, watering) and is then converted
to the unit the Agrosmart firmware understands. The table below lists every field, its unit and how the firmware uses
it.

`plants.json` is an object with the seed `version` and the list of plants:

```json
{
  "version": 2,
  "plants": [
    {
      "idSeed": 1,
      "lastUpdate": 2,
      "name": "Basil",
      "docsArticle": "basil",
      "...": "..."
    }
  ]
}
```

| Field                     | Unit / format              | How it is used                                                                                                                                                                                                                                                           |
| ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `idSeed`                  | integer                    | Id of the plant inside the seed, **required** and unique. The seed uses it to tell whether the plant already exists. It is not the database id, which is assigned by the database.                                                                                       |
| `lastUpdate`              | seed version               | **Required**, only in the seed file (not stored in the database). Version of the seed in which the plant was last added or changed.                                                                                                                                      |
| `docsArticle`             | page name                  | **Required** for default plants. Name of the page that documents the plant on this site, the file name of `docs/plants/<docsArticle>.{en,it}.md` without the language (e.g. `basil`). Only lowercase letters, numbers, `-` and `_`. Plants added by users don't need it. |
| `name`, `description`     | text                       | Shown in the catalog. They are not translated, so they are written in English.                                                                                                                                                                                           |
| `image`, `imageCopyright` | file name, text            | The image is served from `public/plants/<image>` on the server; the copyright is shown under it.                                                                                                                                                                         |
| `difficultyLevel`         | 1 (easy) – 5 (hard)        | Shown in the catalog.                                                                                                                                                                                                                                                    |
| `temperatureMin`          | °C                         | Below this value the user gets a push notification.                                                                                                                                                                                                                      |
| `temperatureMax`          | °C                         | Above this value the user gets a push notification.                                                                                                                                                                                                                      |
| `targetHumidity`          | % air humidity             | The humidifier turns on when the humidity drops below `targetHumidity +- CONFIG_HUMIDITY_THRESHOLD_RANGE`. Only used when time-based humidification is off.                                                                                                              |
| `lightColor`              | ARGB32 as a decimal string | Color of the LED strip. The alpha channel is ignored. For example `4294967295` = `0xFFFFFFFF` (white), `4294901760` = `0xFFFF0000` (red).                                                                                                                                |
| `lightIntensity`          | level 0 – 10               | Same range as the slider in the app. The firmware currently receives the value but doesn't use it yet.                                                                                                                                                                   |
| `lightDuration`           | `HH:MM-HH:MM`              | Time range in which the light is on, so the number of light hours is the difference between the two times.                                                                                                                                                               |
| `wateringFrequency`       | hours, or `null`           | Hours between two irrigations. When set, irrigation is **time based**.                                                                                                                                                                                                   |
| `waterQuantity`           | ml                         | Water given at each irrigation.                                                                                                                                                                                                                                          |
| `soilMoisture`            | % soil moisture, or `null` | Threshold for **soil moisture based** irrigation: the pump runs when the soil is drier than this value. Use it **instead of** `wateringFrequency`.                                                                                                                       |
| `humidificationFrequency` | hours, or `null`           | Hours between two humidifications. When set, humidification is **time based**. When `null`, humidification follows `targetHumidity`.                                                                                                                                     |
| `humidificationDuration`  | minutes, or `null`         | How long the humidifier runs at each time-based humidification.                                                                                                                                                                                                          |

> [!NOTE]
> The app decides the irrigation and humidification modes from these fields: irrigation is time based when
> `wateringFrequency` is not `null`, humidification is time based when `humidificationFrequency` is not `null`. So
> set **either** `wateringFrequency` **or** `soilMoisture`, not both.

> [!IMPORTANT]
> Every default plant must have its own article on this site, which explains what its values mean and how they were
> chosen, and `docsArticle` must point to it. A plant without `docsArticle` makes `npm run seed:validate` fail, so it
> can't be added to the catalog.

## Available plants

Plants are grouped by `difficultyLevel`, from 1 (easy) to 5 (hard).

**Difficulty 1**

- [Mint](/docs?article=mint)
- [Lettuce](/docs?article=lettuce)
- [Pothos](/docs?article=pothos)
- [Aloe vera](/docs?article=aloe_vera)

**Difficulty 2**

- [Parsley](/docs?article=parsley)
- [Rosemary](/docs?article=rosemary)

**Difficulty 3**

- [Basil](/docs?article=basil)
- [Strawberry](/docs?article=strawberry)
- [Cherry Tomato](/docs?article=cherry_tomato)
- [Chili Pepper](/docs?article=chili_pepper)

**Difficulty 4**

- [Phalaenopsis Orchid](/docs?article=phalaenopsis)
- [Calathea](/docs?article=calathea)

**Difficulty 5**

- [Venus Flytrap](/docs?article=venus_flytrap)

Each plant has its own page that explains how its parameters were chosen.

## Plant catalog

You don't need to load the plant catalog yourself: every time the server starts, it validates
`prisma/seed/plants.json` and adds the default plants that are not in the database yet.
If `plants.json` contains errors, the seed stops and the server doesn't start.

Default plants are matched by their `idSeed` (the id of the plant inside `plants.json`), not by the database id. The
plants you added yourself have no `idSeed`, so the seed **never touches them**. The default plants that already exist
are **never overwritten** at startup, so any change you made to them is kept.

**Seed version**: `plants.json` has a `version`, and each plant has a `lastUpdate`, the version in which it was last
added or changed. The database stores the version of the last seed applied (in the `SeedVersion` table), and every run
of the seed, including the one at startup, updates it at the end. A run checks only the plants whose `lastUpdate` is
greater than the stored version; the others are counted as _up to date_. If `plants.json` is older than the version
stored in the database, the seed stops without changing anything (unless you pass `--force`, see below).

When a new version of the server changes the values of a default plant that you already have, the existing plant keeps
the old values, but the stored version is updated anyway. To update the plant too, run the seed by hand with `--all`,
which checks every plant regardless of the version. Updating a plant replaces its values with the ones in
`plants.json`, so **the changes you made to that plant are lost**.

**Interactive mode**: for each existing plant with different values, the seed prints the fields that would change and
asks what to do:

```bash
docker exec -it agromate npm run seed -- --all
```

Answer `y` to update this plant, `n` to skip it, `a` to update this one and all the following ones, `s` to skip all the
following ones.

**Automatic mode**: updates every existing plant without asking, for example in a script:

```bash
docker exec agromate npm run seed -- --all --yes
```

**Forcing the update**: `--force` ignores the seed version stored in the database. It checks every plant (like
`--all`), runs even if `plants.json` is older than the stored version, and at the end overwrites the stored version
with the one of `plants.json`, even if it is lower. Use it, for example, to go back to an older catalog or when the
stored version is wrong. Combine it with `--yes` to update every changed plant without being asked:

```bash
docker exec agromate npm run seed -- --force --yes
```

You can also use `-y` instead of `--yes`. In both modes `npm run seed` first validates `plants.json`, then creates the
missing plants, never deletes any, applies all the changes in a single transaction and at the end prints how many
plants were created, updated, skipped, unchanged and up to date, and the new seed version stored in the database.

> [!CAUTION]
> Check the proposed changes before confirming, and use automatic mode only if you don't need to keep your changes.
> Without a terminal (no `-it`) and without `--yes`, the seed doesn't update anything. The plants you skip are not
> proposed again by the next runs, because the stored version is updated anyway: use `--all` to review them again.

## Adding or changing a default plant

1. Increase the `version` at the top of `prisma/seed/plants.json` by one. Do it once for each release of the catalog,
   even if you add or change more than one plant.
2. To add a plant, add an object to `plants` with a new, unique `idSeed` and all the fields above, including
   `docsArticle` with the name of the page you write in the last step. To change a plant,
   edit its fields and keep its `idSeed`. In both cases set `lastUpdate` to the new `version`: the seed checks only the
   plants with a `lastUpdate` greater than the version already applied to the database.
3. Put the image in `public/plants/` on the server, with the same name used in `image`.
4. Fill in the values following the same approach used for [basil](/docs?article=basil): start from the agronomic needs
   of the plant and convert them to the units in the table at the top of this page.
5. Check the file with `npm run seed:validate` in the server repository. It reports as errors the missing required
   fields (including `docsArticle`), the values out of the ranges in the table, a `lastUpdate` greater than `version`,
   duplicate `idSeed`s, and
   plants with both or neither of `wateringFrequency` and `soilMoisture`, or with `humidificationDuration` set without
   `humidificationFrequency` (and vice versa). Unknown fields, duplicate names and missing images are only warnings.
6. Restart the server to add the new plant. To update a plant that is already in the database, run the seed by hand as
   described in _Plant catalog_ above.
7. **Required**: document the plant in a new page `docs/plants/<docsArticle>.{en,it}.md`. The page must explain what
   each value of the plant
   means and how it was chosen, and its file name must match `docsArticle`, otherwise the button in the app opens a
   page that doesn't exist. Publish the page together with the new version of the catalog.
