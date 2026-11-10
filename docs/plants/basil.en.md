---
title: Basil
description: Parameters of the default basil plant and how they were chosen.
section: Plants
section_order: 4
order: 21
---

# Basil

This page explains the values of the default basil plant. For the meaning and
units of each field, see [Default plants](/docs?article=default_plants).

Basil (_Ocimum basilicum_) is a leafy herb that needs plenty of heat and light. The values below assume basil grown in
a pot of about 2 liters, indoors or on a balcony.

| Field                     | Recommended value                                      | Why                                                                                                                         |
|---------------------------|--------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `lightColor`              | Full-spectrum white, with a good share of blue and red | Blue keeps the plant compact, red drives photosynthesis.                                                                    |
| `lightDuration`           | 14 hours                                               | Enough for vigorous growth without stress; outdoors in summer basil gets 12–14 hours.                                       |
| `lightIntensity`          | 8-10                                                   | Basil loves strong light: With low light it stretches and loses aroma.                                                      |
| `targetHumidity`          | 60 % (range 50–70 %)                                   | Above 80 % the risk of mold and downy mildew grows.                                                                         |
| `temperatureMax`          | 30 °C                                                  | Above 32 °C growth slows down and the leaves get stressed.                                                                  |
| `temperatureMin`          | 15 °C                                                  | Below 10 °C basil suffers cold damage.                                                                                      |
| `wateringFrequency`       | every 2 days (48 hours)                                | Keeps the soil slightly moist, never soaked.                                                                                |
| `waterQuantity`           | 200 ml                                                 | Right for a 2 liter pot, if you have a different size of pot: water until it drains from the bottom, then empty the saucer. |
| `soilMoisture`            | not set                                                | Disabled, because irrigation is time based (`wateringFrequency`).                                                           |
| `humidificationFrequency` | not set                                                | Humidification follows `targetHumidity`.                                                                                    |

## Irrigation

Basil uses **time-based irrigation** but the frequency and the quantity of water can change over time due to changes in
weather condition:

- Avoid wetting the leaves, especially in the evening, to prevent fungal diseases: Start irrigation/Configure agrosmart
  before the light turns out.
- If the maximum temperature goes above 28–30 °C, shorten the interval to 1 day (24 hours).
- In winter or with low temperatures, lengthen it to 3–4 days (72–96 hours), because the soil dries much more slowly.

