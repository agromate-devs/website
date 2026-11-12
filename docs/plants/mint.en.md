---
title: Mint
description: Parameters of the default mint plant and how they were chosen.
section: Plants
section_order: 4
order: 22
---

# Mint

This page explains the values of the default mint plant. For the meaning and units of each field, see [Default plants](/docs?article=default_plants).

Mint (_Mentha spicata_) is a fast-growing aromatic herb that tolerates almost every mistake except dry soil. The values below assume mint grown in a pot of about 2 liters.

**Difficulty**: 1/5 (very easy).

| Field                     | Recommended value                   | Why                                                                                                                  |
| ------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `lightColor`              | White — `4294967295` (`0xFFFFFFFF`) | Leafy plant: a full-spectrum white gives the balance of blue (compact leaves) and red (growth) it needs.             |
| `lightDuration`           | 14 hours (07:00–21:00)              | 14 hours is a long summer day: mint grows bushy and aromatic.                                                        |
| `lightIntensity`          | 7                                   | Medium-high: mint also grows in partial shade, but with more light the aroma is stronger.                            |
| `targetHumidity`          | 60 %                                | Mint likes fresh, fairly humid air; above 75 % rust and powdery mildew become more likely.                           |
| `temperatureMax`          | 28 °C                               | Above 28–30 °C the leaves wilt and the aroma fades.                                                                  |
| `temperatureMin`          | 10 °C                               | Mint survives frost outdoors, but below 10 °C it stops growing.                                                      |
| `wateringFrequency`       | every 2 days (48 hours)             | Every 2 days: mint wants soil that is always slightly moist and dries a 2 liter pot quickly under 14 hours of light. |
| `waterQuantity`           | 250 ml                              | Wets the whole root ball of a 2 liter pot without flooding it.                                                       |
| `soilMoisture`            | not set                             | Disabled, because irrigation is time based (`wateringFrequency`).                                                    |
| `humidificationFrequency` | not set                             | Humidification follows `targetHumidity`.                                                                             |
| `humidificationDuration`  | not set                             | Used only with time-based humidification.                                                                            |

## Irrigation

Mint uses **time-based irrigation**: frequent waterings keep the soil moist, which is what this plant needs most.

- If the soil is still wet when the next irrigation comes, lengthen the interval to 3 days (72 hours); if the leaves droop before it, shorten it to 1 day (24 hours) and lower the quantity to 150 ml.
- Mint spreads with runners: grow it alone in its pot, it would choke other plants.
