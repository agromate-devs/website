---
title: Venus Flytrap
description: Parameters of the default Venus flytrap plant and how they were chosen.
section: Plants
section_order: 4
order: 33
---

# Venus Flytrap

This page explains the values of the default Venus flytrap plant. For the meaning and units of each field, see [Default plants](/docs?article=default_plants).

The Venus flytrap (_Dionaea muscipula_) is a carnivorous plant from the bogs of North and South Carolina. It lives in poor, always wet soil and captures insects to get the nutrients the soil doesn't give it. It is the hardest plant in the catalog because it needs a very specific water and a cold winter rest. The values below are for the **growing season** (spring to autumn) and assume a 12–15 cm plastic pot with a mix of peat and perlite (no fertilizer).

**Difficulty**: 5/5 (very hard).

| Field                     | Recommended value                   | Why                                                                                               |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `lightColor`              | White — `4294967295` (`0xFFFFFFFF`) | White, full-spectrum light: good light makes the traps turn red inside.                           |
| `lightDuration`           | 14 hours (07:00–21:00)              | 14 hours, a summer day in its native habitat.                                                     |
| `lightIntensity`          | 10                                  | Maximum: in nature it grows in full sun; with low light the traps get long, weak and green.       |
| `targetHumidity`          | 60 %                                | Medium humidity is enough; very humid, still air in a closed box causes mold on the soil.         |
| `temperatureMax`          | 35 °C                               | It tolerates summer heat up to 35 °C if the soil stays wet.                                       |
| `temperatureMin`          | 5 °C                                | During the growing season stay above 5 °C; in winter it needs cold (see _Winter dormancy_).       |
| `wateringFrequency`       | every 24 hours                      | Every day: bog plant, the peat must never dry out, and a small pot under strong light dries fast. |
| `waterQuantity`           | 100 ml                              | The minimum dose of the app: a small daily amount keeps the peat wet, the excess drains away.     |
| `soilMoisture`            | not set                             | Disabled, because irrigation is time based (`wateringFrequency`).                                 |
| `humidificationFrequency` | not set                             | Humidification follows `targetHumidity`.                                                          |
| `humidificationDuration`  | not set                             | Used only with time-based humidification.                                                         |

## Irrigation

The Venus flytrap uses **time-based irrigation** every day, so the soil is always wet.

- **Use only mineral-free water in the tank**: distilled, demineralized, reverse osmosis or rainwater. Tap or mineral water slowly kills the plant because of the salts. This is the most important rule for this plant.
- If you prefer the classic tray method, keep 1–2 cm of water in a saucer and lengthen the interval to 3 days (72 hours), so the pump only tops up the soil.

## Care notes

- **Winter dormancy**: from about November to February the plant needs 3–4 months at 0–10 °C with short days, otherwise it weakens and dies within a year. The Agrosmart cannot cool, so move the plant to a cold, bright place (an unheated room or a sheltered balcony) and keep the soil only slightly moist. The traps blacken and the plant looks dead: that's normal.
- Don't fertilize and don't trigger the traps for fun: each trap closes only a few times before dying. Indoors, feed it a live insect every few weeks, or not at all if it catches its own.
