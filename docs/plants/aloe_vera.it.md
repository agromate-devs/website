---
title: Aloe vera
description: Parametri della pianta predefinita aloe vera e come sono stati scelti.
section: Piante
section_order: 4
order: 25
---

# Aloe vera

Questa pagina spiega i valori della pianta predefinita aloe vera. Per il significato e le unità di ogni campo, vedi [Piante predefinite](/docs?article=default_plants).

L'aloe vera è una succulenta dei climi aridi: accumula acqua nelle foglie carnose e muore più spesso per troppa acqua che per troppo poca. I valori qui sotto presuppongono un vaso da 2 litri con terriccio per cactacee e foro di drenaggio.

**Difficoltà**: 1/5 (molto facile).

| Campo                     | Valore consigliato                   | Perché                                                                                                      |
| ------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `lightColor`              | Bianco — `4294967295` (`0xFFFFFFFF`) | Luce bianca; l'aloe non si coltiva per i fiori, quindi uno spettro ricco di rosso non serve.                |
| `lightDuration`           | 12 ore (07:00–19:00)                 | 12 ore di luce forte bastano per mantenere le foglie compatte ed erette.                                    |
| `lightIntensity`          | 10                                   | Massima: con poca luce l'aloe si allunga e le foglie si piegano verso il basso.                             |
| `targetHumidity`          | 35 %                                 | Pianta del deserto: preferisce l'aria secca. Un obiettivo basso tiene il nebulizzatore quasi sempre spento. |
| `temperatureMax`          | 32 °C                                | Sopporta bene il caldo; sopra i 32 °C in una serra chiusa le foglie possono comunque bruciarsi.             |
| `temperatureMin`          | 10 °C                                | Sotto i 10 °C, con il terreno umido, le radici marciscono; l'aloe non tollera il gelo.                      |
| `wateringFrequency`       | ogni 14 giorni (336 ore)             | Ogni 2 settimane: il terreno deve asciugarsi completamente tra un'annaffiatura e l'altra.                   |
| `waterQuantity`           | 200 ml                               | Una sola annaffiatura completa, poi niente fino alla successiva.                                            |
| `soilMoisture`            | non impostato                        | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                          |
| `humidificationFrequency` | non impostato                        | L'umidificazione segue `targetHumidity`.                                                                    |
| `humidificationDuration`  | non impostato                        | Usato solo con l'umidificazione a tempo.                                                                    |

## Irrigazione

L'aloe usa l'**irrigazione a tempo**: una soglia di umidità abbastanza bassa per una succulenta è al limite della precisione della sonda, quindi un intervallo fisso è più affidabile.

- In inverno allunga l'intervallo a 3–4 settimane (504–672 ore).
- Foglie molli e traslucide indicano troppa acqua: sospendi le annaffiature e lascia asciugare il terreno.
