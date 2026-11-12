---
title: Strawberry
description: Parameters of the default strawberry plant and how they were chosen.
section: Plants
section_order: 4
order: 28
---

# Strawberry

This page explains the values of the default strawberry plant. For the meaning and units of each field,
see [Default plants](/docs?article=default_plants).

The everbearing (day-neutral) strawberry (_Fragaria × ananassa_) flowers and fruits regardless of day length, so it is
the right type for a greenhouse with artificial light. The values below assume one plant in a pot of about 2–3 liters.

**Difficulty**: 3/5 (medium).

| Field                     | Recommended value                    | Why                                                                                                      |
|---------------------------|--------------------------------------|----------------------------------------------------------------------------------------------------------|
| `lightColor`              | Purple — `4286578816` (`0xFF800080`) | Purple (red + blue): red stimulates flowering and fruiting, blue keeps the plant compact.                |
| `lightDuration`           | 14 hours (07:00–21:00)               | 14 hours: everbearing varieties flower with any day length, but more light means more and sweeter fruit. |
| `lightIntensity`          | 9                                    | High: fruit production needs a lot of energy.                                                            |
| `targetHumidity`          | 65 %                                 | Moderate-high humidity helps flowering; above 75 % gray mold (_Botrytis_) attacks the fruit.             |
| `temperatureMax`          | 24 °C                                | Above 24 °C the plant stops flowering and the fruit stays small.                                         |
| `temperatureMin`          | 12 °C                                | Below 12 °C flowering and ripening slow down a lot.                                                      |
| `wateringFrequency`       | every 2 days (48 hours)              | Every 2 days: regular watering gives regular fruit; letting the soil dry out makes fruit small and hard. |
| `waterQuantity`           | 250 ml                               | Strawberry roots are shallow: medium doses keep them moist without waterlogging.                         |
| `soilMoisture`            | not set                              | Disabled, because irrigation is time based (`wateringFrequency`).                                        |
| `humidificationFrequency` | not set                              | Humidification follows `targetHumidity`.                                                                 |
| `humidificationDuration`  | not set                              | Used only with time-based humidification.                                                                |

## Irrigation

Strawberry uses **time-based irrigation**: a fixed rhythm avoids the irregular watering that causes small or deformed
fruit.

- Keep fruit and leaves dry: wet fruit rots quickly. Mulch with straw so the fruit doesn't touch the soil.
- During heavy fruiting the plant drinks more: if the soil is dry before the next irrigation, increase the quantity to
  300 ml or shorten the interval to 1 day (24 hours) with 150 ml.

## Care notes

- **Pollination**: in a closed greenhouse there are no insects. When the flowers open, brush the center of each flower
  with a small soft brush every 1–2 days, otherwise the fruit will be deformed or won't form at all.
- Remove runners (stolons) if you want fruit: they take energy away from flowering.
