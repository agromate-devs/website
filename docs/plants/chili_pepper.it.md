---
title: Peperoncino
description: Parametri della pianta predefinita peperoncino e come sono stati scelti.
section: Piante
section_order: 4
order: 30
---

# Peperoncino

Questa pagina spiega i valori della pianta predefinita peperoncino. Per il significato e le unità di ogni campo, vedi [Piante predefinite](/docs?article=default_plants).

Il peperoncino (_Capsicum annuum_, varietà compatte come 'Cayenna' o i peperoncini ornamentali) è una pianta tropicale che ha bisogno di caldo per tutto: germinazione, fioritura e maturazione. I valori qui sotto presuppongono una pianta in un vaso da circa 3 litri.

**Difficoltà**: 3/5 (media).

| Campo                     | Valore consigliato                  | Perché                                                                                                                                                                   |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `lightColor`              | Viola — `4286578816` (`0xFF800080`) | Viola (rosso + blu) per sostenere la fioritura e la maturazione dei frutti.                                                                                              |
| `lightDuration`           | 16 ore (06:00–22:00)                | 16 ore: il peperoncino cresce lentamente e le giornate lunghe lo accelerano.                                                                                             |
| `lightIntensity`          | 10                                  | Massima: con poca luce la pianta si allunga e fiorisce tardi.                                                                                                            |
| `targetHumidity`          | 60 %                                | Umidità moderata; un'aria molto umida fa cadere i fiori e favorisce le muffe.                                                                                            |
| `temperatureMax`          | 32 °C                               | Il peperoncino ama il caldo, ma sopra i 32 °C i fiori cadono senza allegare.                                                                                             |
| `temperatureMin`          | 18 °C                               | Sotto i 18 °C la crescita rallenta molto, sotto i 12 °C si ferma.                                                                                                        |
| `wateringFrequency`       | ogni 3 giorni (72 ore)              | Ogni 3 giorni: il terreno può asciugarsi un po' tra un'annaffiatura e l'altra; un leggero stress idrico rende i frutti più piccanti, i ristagni fanno marcire le radici. |
| `waterQuantity`           | 350 ml                              | Una dose abbondante per un vaso da 3 litri, poi tre giorni per asciugarsi un po'.                                                                                        |
| `soilMoisture`            | non impostato                       | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                                                                       |
| `humidificationFrequency` | non impostato                       | L'umidificazione segue `targetHumidity`.                                                                                                                                 |
| `humidificationDuration`  | non impostato                       | Usato solo con l'umidificazione a tempo.                                                                                                                                 |

## Irrigazione

Il peperoncino usa l'**irrigazione a tempo**.

- Se le foglie sono afflosciate al mattino, prima che la luce sia piena, il terreno è troppo secco: accorcia l'intervallo a 2 giorni (48 ore).
- Quando i frutti iniziano a cambiare colore puoi allungarlo a 4 giorni (96 ore) per peperoncini più piccanti.

## Note di coltivazione

- La **germinazione** richiede 25–30 °C e può durare 2–3 settimane: fai partire i semi in un posto caldo e sposta le piantine in serra quando hanno le prime foglie vere.
- I fiori si autoimpollinano: scuotere leggermente la pianta ogni giorno durante la fioritura migliora l'allegagione.
