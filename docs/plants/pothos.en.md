---
title: Pothos
description: Parameters of the default pothos plant and how they were chosen.
section: Plants
section_order: 4
order: 24
---

# Pothos

This page explains the values of the default pothos plant. For the meaning and units of each field, see [Default plants](/docs?article=default_plants).

Pothos (_Epipremnum aureum_) is a tropical climber and one of the toughest houseplants: it tolerates low light, dry air and the occasional forgotten watering. The values below assume a pot of about 2 liters.

**Difficulty**: 1/5 (very easy).

| Field                     | Recommended value                   | Why                                                                                          |
| ------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `lightColor`              | White — `4294967295` (`0xFFFFFFFF`) | Foliage plant: white light is enough and keeps the natural color of the leaves.              |
| `lightDuration`           | 12 hours (08:00–20:00)              | 12 hours, like the tropical day of its native forests.                                       |
| `lightIntensity`          | 4                                   | Low: in nature it grows in the shade of trees and direct strong light bleaches the leaves.   |
| `targetHumidity`          | 50 %                                | It appreciates humidity but adapts to normal indoor air.                                     |
| `temperatureMax`          | 30 °C                               | Above 30 °C it suffers, especially with dry air.                                             |
| `temperatureMin`          | 15 °C                               | Tropical plant: below 15 °C it stops growing and below 10 °C the leaves get damaged.         |
| `wateringFrequency`       | every 7 days (168 hours)            | Once a week: the soil can dry out on the surface between waterings, which prevents root rot. |
| `waterQuantity`           | 300 ml                              | A generous watering that soaks the whole pot, then a week to dry.                            |
| `soilMoisture`            | not set                             | Disabled, because irrigation is time based (`wateringFrequency`).                            |
| `humidificationFrequency` | not set                             | Humidification follows `targetHumidity`.                                                     |
| `humidificationDuration`  | not set                             | Used only with time-based humidification.                                                    |

## Irrigation

Pothos uses **time-based irrigation**: it is a good choice if your Agrosmart has no soil probe or the probe is not reliable.

- The most common mistake is too much water: yellow leaves usually mean the soil stays wet too long. In that case lengthen the interval to 10 days (240 hours).
- In winter, with low temperatures, water every 10–14 days (240–336 hours).
