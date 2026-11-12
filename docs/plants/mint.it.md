---
title: Menta
description: Parametri della pianta predefinita menta e come sono stati scelti.
section: Piante
section_order: 4
order: 22
---

# Menta

Questa pagina spiega i valori della pianta predefinita menta. Per il significato e le unità di ogni campo, vedi [Piante predefinite](/docs?article=default_plants).

La menta (_Mentha spicata_) è un'aromatica a crescita rapida che perdona quasi ogni errore, tranne il terreno secco. I valori qui sotto presuppongono una menta in un vaso da circa 2 litri.

**Difficoltà**: 1/5 (molto facile).

| Campo                     | Valore consigliato                   | Perché                                                                                                                         |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `lightColor`              | Bianco — `4294967295` (`0xFFFFFFFF`) | Pianta da foglia: il bianco a spettro pieno dà il giusto equilibrio di blu (foglie compatte) e rosso (crescita).               |
| `lightDuration`           | 14 ore (07:00–21:00)                 | 14 ore sono una lunga giornata estiva: la menta cresce folta e profumata.                                                      |
| `lightIntensity`          | 7                                    | Medio-alta: la menta cresce anche a mezz'ombra, ma con più luce l'aroma è più intenso.                                         |
| `targetHumidity`          | 60 %                                 | La menta ama l'aria fresca e abbastanza umida; sopra il 75 % aumentano ruggine e oidio.                                        |
| `temperatureMax`          | 28 °C                                | Sopra i 28–30 °C le foglie appassiscono e l'aroma si attenua.                                                                  |
| `temperatureMin`          | 10 °C                                | All'aperto la menta sopravvive al gelo, ma sotto i 10 °C smette di crescere.                                                   |
| `wateringFrequency`       | ogni 2 giorni (48 ore)               | Ogni 2 giorni: la menta vuole il terreno sempre leggermente umido e, con 14 ore di luce, asciuga in fretta un vaso da 2 litri. |
| `waterQuantity`           | 250 ml                               | Bagna tutto il pane di terra di un vaso da 2 litri senza allagarlo.                                                            |
| `soilMoisture`            | non impostato                        | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                             |
| `humidificationFrequency` | non impostato                        | L'umidificazione segue `targetHumidity`.                                                                                       |
| `humidificationDuration`  | non impostato                        | Usato solo con l'umidificazione a tempo.                                                                                       |

## Irrigazione

La menta usa l'**irrigazione a tempo**: annaffiature frequenti mantengono il terreno umido, che è ciò di cui questa pianta ha più bisogno.

- Se il terreno è ancora bagnato quando arriva l'irrigazione successiva, allunga l'intervallo a 3 giorni (72 ore); se le foglie si afflosciano prima, accorcialo a 1 giorno (24 ore) e scendi a 150 ml.
- La menta si espande con gli stoloni: coltivala da sola nel suo vaso, soffocherebbe le altre piante.
