---
title: Lettuce
description: Parameters of the default lettuce plant and how they were chosen.
section: Plants
section_order: 4
order: 23
---

# Lettuce

This page explains the values of the default lettuce plant. For the meaning and units of each field,
see [Default plants](/docs?article=default_plants).

Loose-leaf lettuce (_Lactuca sativa_) is one of the easiest crops to grow indoors: you can pick the outer leaves as soon
as they are big enough. The values below assume a pot or trough of about 2 liters.

**Difficulty**: 1/5 (very easy).

| Field                     | Recommended value                   | Why                                                                                                            |
|---------------------------|-------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `lightColor`              | White — `4294967295` (`0xFFFFFFFF`) | Lettuce is grown for its leaves: white light, rich in blue, keeps it compact.                                  |
| `lightDuration`           | 14 hours (07:00–21:00)              | 14 hours give good growth; much longer days, together with heat, make lettuce bolt (flower and turn bitter).   |
| `lightIntensity`          | 6                                   | Lettuce needs less light than fruiting plants; too much light and heat favor bolting.                          |
| `targetHumidity`          | 60 %                                | Moderate humidity; with very humid and still air the lower leaves can rot.                                     |
| `temperatureMax`          | 22 °C                               | Above 24 °C lettuce bolts and the leaves turn bitter.                                                          |
| `temperatureMin`          | 8 °C                                | Lettuce tolerates the cold, but below 8 °C growth almost stops.                                                |
| `wateringFrequency`       | every 2 days (48 hours)             | Every 2 days: lettuce has shallow roots and needs steady moisture, otherwise the leaves turn tough and bitter. |
| `waterQuantity`           | 200 ml                              | Lettuce has shallow roots: small, frequent irrigations are better than large ones.                             |
| `soilMoisture`            | not set                             | Disabled, because irrigation is time based (`wateringFrequency`).                                              |
| `humidificationFrequency` | not set                             | Humidification follows `targetHumidity`.                                                                       |
| `humidificationDuration`  | not set                             | Used only with time-based humidification.                                                                      |

## Irrigation

Lettuce uses **time-based irrigation**: small, regular doses keep the shallow roots moist.

- Don't let water pool around the plant base, the lower leaves can rot. If the soil stays soggy, lengthen the interval
  to 3 days (72 hours).
- Sow a few seeds every 2–3 weeks to always have leaves ready to harvest.
