---
title: Phalaenopsis Orchid
description: Parameters of the default Phalaenopsis orchid plant and how they were chosen.
section: Plants
section_order: 4
order: 31
---

# Phalaenopsis Orchid

This page explains the values of the default Phalaenopsis orchid plant. For the meaning and units of each field,
see [Default plants](/docs?article=default_plants).

The moth orchid (_Phalaenopsis_) is an epiphyte: in nature it grows on tree bark, with its roots in the air. Keeping it
alive is not hard, making it bloom again is. The values below assume a plant in a transparent 12 cm pot filled with
bark, with drainage holes.

**Difficulty**: 4/5 (hard).

| Field                     | Recommended value                   | Why                                                                                                       |
|---------------------------|-------------------------------------|-----------------------------------------------------------------------------------------------------------|
| `lightColor`              | White — `4294967295` (`0xFFFFFFFF`) | White light; the orchid needs little light and the spectrum is less important than avoiding excess.       |
| `lightDuration`           | 12 hours (08:00–20:00)              | 12 hours, like the equatorial day of its native forests.                                                  |
| `lightIntensity`          | 4                                   | Low: it lives in the shade of the forest canopy and strong light burns the leaves (yellow-brown patches). |
| `targetHumidity`          | 65 %                                | Used only if you switch to threshold humidification: 50–70 % is the ideal range for Phalaenopsis.         |
| `temperatureMax`          | 30 °C                               | Above 30 °C the plant gets stressed and the flowers drop.                                                 |
| `temperatureMin`          | 15 °C                               | Below 15 °C, especially with wet roots, it suffers cold damage.                                           |
| `wateringFrequency`       | every 7 days (168 hours)            | Once a week: bark must almost dry out between waterings, otherwise the roots rot.                         |
| `waterQuantity`           | 150 ml                              | A small dose: enough to wet the bark, the excess must drain away immediately.                             |
| `soilMoisture`            | not set                             | Disabled, because irrigation is time based (`wateringFrequency`).                                         |
| `humidificationFrequency` | every 4 hours                       | Every 4 hours: short humidity peaks, like morning dew in the forest, with the air drying out in between.  |
| `humidificationDuration`  | 10 minutes                          | 10 minutes, enough to raise the humidity without wetting the leaves for long.                             |

## Irrigation

The orchid uses **time-based irrigation**: the soil probe doesn't work in bark (large pieces with air between them), so
the reading would be meaningless.

- Look at the roots through the transparent pot: silver-gray means dry, bright green means wet. If they are still green
  when the next irrigation comes, lengthen the interval to 10 days (240 hours).
- Never leave water in the center of the leaf rosette (the crown): it causes crown rot, which kills the plant.

## Care notes

- **Humidification** is **time based** here to show the other mode: short cycles give the humidity the orchid likes
  while keeping the leaves dry most of the time. If you prefer, switch to threshold mode in the app and the plant will
  use `targetHumidity`.
- **Reblooming**: after flowering, a few weeks with nights around 16–18 °C (about 5 °C colder than the day) trigger a
  new flower spike. The greenhouse doesn't cool, so in autumn place it in a cooler room.
