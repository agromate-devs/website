---
title: Pothos
description: Parametri della pianta predefinita pothos e come sono stati scelti.
section: Piante
section_order: 4
order: 24
---

# Pothos

Questa pagina spiega i valori della pianta predefinita pothos. Per il significato e le unità di ogni campo, vedi [Piante predefinite](/docs?article=default_plants).

Il pothos (_Epipremnum aureum_) è un rampicante tropicale e una delle piante d'appartamento più resistenti: tollera poca luce, aria secca e qualche annaffiatura dimenticata. I valori qui sotto presuppongono un vaso da circa 2 litri.

**Difficoltà**: 1/5 (molto facile).

| Campo                     | Valore consigliato                   | Perché                                                                                                                       |
| ------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `lightColor`              | Bianco — `4294967295` (`0xFFFFFFFF`) | Pianta da fogliame: la luce bianca basta e mantiene il colore naturale delle foglie.                                         |
| `lightDuration`           | 12 ore (08:00–20:00)                 | 12 ore, come la giornata tropicale delle sue foreste d'origine.                                                              |
| `lightIntensity`          | 4                                    | Bassa: in natura cresce all'ombra degli alberi e una luce forte e diretta sbiadisce le foglie.                               |
| `targetHumidity`          | 50 %                                 | Apprezza l'umidità ma si adatta all'aria normale di casa.                                                                    |
| `temperatureMax`          | 30 °C                                | Sopra i 30 °C soffre, soprattutto con aria secca.                                                                            |
| `temperatureMin`          | 15 °C                                | Pianta tropicale: sotto i 15 °C smette di crescere e sotto i 10 °C le foglie si danneggiano.                                 |
| `wateringFrequency`       | ogni 7 giorni (168 ore)              | Una volta a settimana: il terreno può asciugarsi in superficie tra un'annaffiatura e l'altra, evitando il marciume radicale. |
| `waterQuantity`           | 300 ml                               | Un'annaffiatura abbondante che bagna tutto il vaso, poi una settimana per asciugarsi.                                        |
| `soilMoisture`            | non impostato                        | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                           |
| `humidificationFrequency` | non impostato                        | L'umidificazione segue `targetHumidity`.                                                                                     |
| `humidificationDuration`  | non impostato                        | Usato solo con l'umidificazione a tempo.                                                                                     |

## Irrigazione

Il pothos usa l'**irrigazione a tempo**: è una buona scelta se il tuo Agrosmart non ha la sonda del terreno o se la sonda non è affidabile.

- L'errore più comune è l'eccesso d'acqua: foglie gialle di solito significano terreno bagnato troppo a lungo. In quel caso allunga l'intervallo a 10 giorni (240 ore).
- In inverno, con temperature basse, annaffia ogni 10–14 giorni (240–336 ore).
