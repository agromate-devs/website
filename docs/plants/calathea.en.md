---
title: Calathea
description: Parameters of the default calathea plant and how they were chosen.
section: Plants
section_order: 4
order: 32
---

# Calathea

This page explains the values of the default calathea plant. For the meaning and units of each field, see [Default plants](/docs?article=default_plants).

Calathea (_Goeppertia_, formerly _Calathea_) is grown for its striking patterned leaves, which fold up at night. It comes from the undergrowth of tropical forests and reacts quickly to dry air, hard water and temperature changes. The values below assume a pot of about 2 liters.

**Difficulty**: 4/5 (hard).

| Field                     | Recommended value                   | Why                                                                                                                      |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `lightColor`              | White — `4294967295` (`0xFFFFFFFF`) | White light keeps the natural colors of the leaf pattern.                                                                |
| `lightDuration`           | 12 hours (08:00–20:00)              | 12 hours; the leaves follow the day-night cycle, opening with the light and closing in the dark.                         |
| `lightIntensity`          | 3                                   | Very low: strong light fades the pattern and burns the leaves.                                                           |
| `targetHumidity`          | 70 %                                | High: below 60 % the leaf edges dry out and curl. It is the most important value for this plant.                         |
| `temperatureMax`          | 28 °C                               | Above 28 °C, especially with dry air, the leaves curl.                                                                   |
| `temperatureMin`          | 18 °C                               | Below 18 °C it stops growing and the leaves get damaged; it hates sudden changes.                                        |
| `wateringFrequency`       | every 3 days (72 hours)             | Every 3 days: Calathea doesn't tolerate drying out, but with low light it drinks little and waterlogging rots the roots. |
| `waterQuantity`           | 200 ml                              | A medium dose; the soil must stay moist, never soaked.                                                                   |
| `soilMoisture`            | not set                             | Disabled, because irrigation is time based (`wateringFrequency`).                                                        |
| `humidificationFrequency` | not set                             | Humidification follows `targetHumidity`.                                                                                 |
| `humidificationDuration`  | not set                             | Used only with time-based humidification.                                                                                |

## Irrigation

Calathea uses **time-based irrigation**, to keep the soil evenly moist.

- **Fill the tank with rainwater, distilled or demineralized water**: the salts, chlorine and fluoride in tap water cause the typical brown leaf tips.
- Leaves that stay rolled up during the day mean thirst or dry air: shorten the interval to 2 days (48 hours). Yellow leaves at the base mean too much water: lengthen it to 4 days (96 hours).
