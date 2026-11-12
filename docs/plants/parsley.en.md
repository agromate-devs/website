---
title: Parsley
description: Parameters of the default parsley plant and how they were chosen.
section: Plants
section_order: 4
order: 26
---

# Parsley

This page explains the values of the default parsley plant. For the meaning and units of each field, see [Default plants](/docs?article=default_plants).

Parsley (_Petroselinum crispum_) is a biennial herb grown for its leaves. The hardest part is germination, which can take 3–4 weeks; after that it is an easy plant. The values below assume a deep pot of about 2 liters, because parsley has a long taproot.

**Difficulty**: 2/5 (easy).

| Field                     | Recommended value                   | Why                                                                                  |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------ |
| `lightColor`              | White — `4294967295` (`0xFFFFFFFF`) | Leafy herb: white light keeps the plant compact and dark green.                      |
| `lightDuration`           | 14 hours (07:00–21:00)              | 14 hours give steady growth of new leaves.                                           |
| `lightIntensity`          | 7                                   | Medium-high: parsley tolerates partial shade but grows faster with good light.       |
| `targetHumidity`          | 55 %                                | Average humidity; very humid air favors leaf spot diseases.                          |
| `temperatureMax`          | 26 °C                               | Above 26 °C growth slows down and the plant can go to seed early.                    |
| `temperatureMin`          | 8 °C                                | It tolerates the cold, but below 8 °C it grows very slowly.                          |
| `wateringFrequency`       | every 3 days (72 hours)             | Every 3 days: evenly moist soil, with the surface drying slightly between waterings. |
| `waterQuantity`           | 200 ml                              | Enough to reach the deep root without saturating the pot.                            |
| `soilMoisture`            | not set                             | Disabled, because irrigation is time based (`wateringFrequency`).                    |
| `humidificationFrequency` | not set                             | Humidification follows `targetHumidity`.                                             |
| `humidificationDuration`  | not set                             | Used only with time-based humidification.                                            |

## Irrigation

Parsley uses **time-based irrigation**.

- During germination water more often, every 1–2 days (24–48 hours) with 100 ml: seeds that dry out even once often don't sprout. Go back to 3 days once the seedlings have a few true leaves.
- Harvest the outer stems first, so the plant keeps producing from the center.
