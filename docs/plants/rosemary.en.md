---
title: Rosemary
description: Parameters of the default rosemary plant and how they were chosen.
section: Plants
section_order: 4
order: 27
---

# Rosemary

This page explains the values of the default rosemary plant. For the meaning and units of each field,
see [Default plants](/docs?article=default_plants).

Rosemary (_Salvia rosmarinus_) is a woody Mediterranean shrub: it loves sun, dry air and well-drained soil. Indoors it
usually dies from too much water or too little light. The values below assume a 2 liter pot with sandy, well-drained
soil.

**Difficulty**: 2/5 (easy).

| Field                     | Recommended value                   | Why                                                                                                                                   |
|---------------------------|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `lightColor`              | White — `4294967295` (`0xFFFFFFFF`) | White, full-spectrum light, the closest to the Mediterranean sun.                                                                     |
| `lightDuration`           | 14 hours (07:00–21:00)              | 14 hours, a Mediterranean summer day.                                                                                                 |
| `lightIntensity`          | 9                                   | High: with low light rosemary grows thin and loses its aroma.                                                                         |
| `targetHumidity`          | 50 %                                | Rosemary prefers dry air; high humidity causes powdery mildew.                                                                        |
| `temperatureMax`          | 30 °C                               | It tolerates heat well; above 30 °C in a closed space it suffers from lack of ventilation.                                            |
| `temperatureMin`          | 5 °C                                | It survives light frosts, but in a pot it is better to stay above 5 °C.                                                               |
| `wateringFrequency`       | every 7 days (168 hours)            | Once a week: the soil must be almost dry before the next watering, rosemary dies from waterlogging much more often than from drought. |
| `waterQuantity`           | 250 ml                              | One thorough watering, then a long dry period.                                                                                        |
| `soilMoisture`            | not set                             | Disabled, because irrigation is time based (`wateringFrequency`).                                                                     |
| `humidificationFrequency` | not set                             | Humidification follows `targetHumidity`.                                                                                              |
| `humidificationDuration`  | not set                             | Used only with time-based humidification.                                                                                             |

## Irrigation

Rosemary uses **time-based irrigation** with a long interval, so the soil dries out between waterings.

- If the needles turn brown starting from the base, the roots are rotting: lengthen the interval to 10 days (240 hours)
  and check that the pot drains.
- If the needles turn soft and the tips droop, shorten it to 5 days (120 hours). In winter go to 10–14 days (240–336
  hours).
