---
title: Chili Pepper
description: Parameters of the default chili pepper plant and how they were chosen.
section: Plants
section_order: 4
order: 30
---

# Chili Pepper

This page explains the values of the default chili pepper plant. For the meaning and units of each field,
see [Default plants](/docs?article=default_plants).

Chili pepper (_Capsicum annuum_, compact varieties such as 'Cayenne' or ornamental peppers) is a tropical plant that
needs heat for everything: germination, flowering and ripening. The values below assume one plant in a pot of about 3
liters.

**Difficulty**: 3/5 (medium).

| Field                     | Recommended value                    | Why                                                                                                                              |
|---------------------------|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `lightColor`              | Purple — `4286578816` (`0xFF800080`) | Purple (red + blue) to support flowering and fruit ripening.                                                                     |
| `lightDuration`           | 16 hours (06:00–22:00)               | 16 hours: chili peppers are slow growers and long days speed them up.                                                            |
| `lightIntensity`          | 10                                   | Maximum: with low light the plant stretches and flowers late.                                                                    |
| `targetHumidity`          | 60 %                                 | Moderate humidity; very humid air makes flowers drop and favors mold.                                                            |
| `temperatureMax`          | 32 °C                                | Chili loves heat, but above 32 °C flowers drop without fruiting.                                                                 |
| `temperatureMin`          | 13 °C                                | Below 13 °C growth slows down a lot, below 10 °C it stops.                                                                       |
| `wateringFrequency`       | every 3 days (72 hours)              | Every 3 days: the soil can dry a bit between waterings; slight water stress makes the fruit hotter, waterlogging rots the roots. |
| `waterQuantity`           | 350 ml                               | A generous dose for a 3 liter pot, then three days to dry a little.                                                              |
| `soilMoisture`            | not set                              | Disabled, because irrigation is time based (`wateringFrequency`).                                                                |
| `humidificationFrequency` | not set                              | Humidification follows `targetHumidity`.                                                                                         |
| `humidificationDuration`  | not set                              | Used only with time-based humidification.                                                                                        |

## Irrigation

Chili pepper uses **time-based irrigation**.

- If the leaves droop in the morning, before the light is at full strength, the soil is too dry: shorten the interval to
  2 days (48 hours).
- When the fruit starts to change color you can lengthen it to 4 days (96 hours) for hotter chilies.

## Care notes

- **Germination** needs 25–30 °C and can take 2–3 weeks: start the seeds in a warm spot and move them to the greenhouse
  when they have their first true leaves.
- Flowers self-pollinate: a light shake of the plant every day while flowering improves fruit set.
