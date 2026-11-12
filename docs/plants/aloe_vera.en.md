---
title: Aloe vera
description: Parameters of the default aloe vera plant and how they were chosen.
section: Plants
section_order: 4
order: 25
---

# Aloe vera

This page explains the values of the default aloe vera plant. For the meaning and units of each field, see [Default plants](/docs?article=default_plants).

Aloe vera is a succulent from arid climates: it stores water in its fleshy leaves and dies more often from too much water than from too little. The values below assume a 2 liter pot with cactus soil and a drainage hole.

**Difficulty**: 1/5 (very easy).

| Field                     | Recommended value                   | Why                                                                                    |
| ------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------- |
| `lightColor`              | White — `4294967295` (`0xFFFFFFFF`) | White light; aloe is not grown for flowers, so a red-rich spectrum is not needed.      |
| `lightDuration`           | 12 hours (07:00–19:00)              | 12 hours of strong light are enough to keep the leaves compact and upright.            |
| `lightIntensity`          | 10                                  | Maximum: with little light aloe stretches and the leaves bend down.                    |
| `targetHumidity`          | 35 %                                | Desert plant: it prefers dry air. A low target keeps the humidifier off almost always. |
| `temperatureMax`          | 32 °C                               | It tolerates heat well; above 32 °C in a closed greenhouse the leaves can still burn.  |
| `temperatureMin`          | 10 °C                               | Below 10 °C, with damp soil, the roots rot; aloe does not tolerate frost.              |
| `wateringFrequency`       | every 14 days (336 hours)           | Every 2 weeks: the soil must dry out completely between waterings.                     |
| `waterQuantity`           | 200 ml                              | A single thorough watering, then nothing until the next one.                           |
| `soilMoisture`            | not set                             | Disabled, because irrigation is time based (`wateringFrequency`).                      |
| `humidificationFrequency` | not set                             | Humidification follows `targetHumidity`.                                               |
| `humidificationDuration`  | not set                             | Used only with time-based humidification.                                              |

## Irrigation

Aloe uses **time-based irrigation**: a soil moisture threshold low enough for a succulent is at the edge of the probe's accuracy, so a fixed interval is more reliable.

- In winter lengthen the interval to 3–4 weeks (504–672 hours).
- Soft, translucent leaves mean too much water: stop watering and let the soil dry.
