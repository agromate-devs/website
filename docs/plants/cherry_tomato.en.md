---
title: Cherry Tomato
description: Parameters of the default cherry tomato plant and how they were chosen.
section: Plants
section_order: 4
order: 29
---

# Cherry Tomato

This page explains the values of the default cherry tomato plant. For the meaning and units of each field,
see [Default plants](/docs?article=default_plants).

Only **dwarf** cherry tomatoes (_Solanum lycopersicum_, varieties such as 'Micro Tom' or 'Red Robin') fit in a small
greenhouse: normal varieties grow over 1.5 m. The values below assume one plant in a pot of at least 5 liters.

**Difficulty**: 3/5 (medium).

| Field                     | Recommended value                    | Why                                                                                                                                                                        |
|---------------------------|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `lightColor`              | Purple — `4286578816` (`0xFF800080`) | Purple (red + blue): red drives flowering and fruit set, blue avoids leggy stems.                                                                                          |
| `lightDuration`           | 16 hours (06:00–22:00)               | 16 hours: tomatoes are among the most light-hungry vegetables. Don't go over 18 hours, leaves turn yellow without a dark period.                                           |
| `lightIntensity`          | 10                                   | Maximum: with too little light the plant flowers poorly and drops its flowers.                                                                                             |
| `targetHumidity`          | 65 %                                 | 65 % helps pollen stick; above 80 % the pollen clumps and fungal diseases spread.                                                                                          |
| `temperatureMax`          | 30 °C                                | Above 30–32 °C the pollen becomes sterile and the flowers drop without fruiting.                                                                                           |
| `temperatureMin`          | 13 °C                                | Below 10 °C fruit set fails and growth stops.                                                                                                                              |
| `wateringFrequency`       | every 24 hours                       | Every day: a tomato in production under 16 hours of light drinks a lot, and a daily rhythm prevents blossom end rot and fruit cracking, both caused by irregular watering. |
| `waterQuantity`           | 300 ml                               | A daily dose for a 5 liter pot: enough to wet the root ball without waterlogging it.                                                                                       |
| `soilMoisture`            | not set                              | Disabled, because irrigation is time based (`wateringFrequency`).                                                                                                          |
| `humidificationFrequency` | not set                              | Humidification follows `targetHumidity`.                                                                                                                                   |
| `humidificationDuration`  | not set                              | Used only with time-based humidification.                                                                                                                                  |

## Irrigation

Cherry tomato uses **time-based irrigation** every day: a regular supply of water is the most important factor for
healthy fruit.

- A dark, sunken spot at the bottom of the fruit (blossom end rot) means irregular watering or a pot that is too small.
- Young plants without fruit need less: start with 150 ml a day and go to 300 ml when the plant is loaded with fruit, up
  to 400 ml if the soil is dry before the next irrigation.

## Care notes

- **Pollination**: tomato flowers self-pollinate, but they need vibration. Gently shake the flower clusters or tap the
  stem once a day while the plant is flowering.
- Feed with a tomato fertilizer (rich in potassium) every 2 weeks once the first flowers appear: a small pot runs out of
  nutrients quickly.
