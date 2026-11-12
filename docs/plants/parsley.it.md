---
title: Prezzemolo
description: Parametri della pianta predefinita prezzemolo e come sono stati scelti.
section: Piante
section_order: 4
order: 26
---

# Prezzemolo

Questa pagina spiega i valori della pianta predefinita prezzemolo. Per il significato e le unità di ogni campo, vedi [Piante predefinite](/docs?article=default_plants).

Il prezzemolo (_Petroselinum crispum_) è un'aromatica biennale coltivata per le foglie. La parte più difficile è la germinazione, che può richiedere 3–4 settimane; dopo è una pianta facile. I valori qui sotto presuppongono un vaso profondo da circa 2 litri, perché il prezzemolo ha una radice a fittone lunga.

**Difficoltà**: 2/5 (facile).

| Campo                     | Valore consigliato                   | Perché                                                                                                             |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| `lightColor`              | Bianco — `4294967295` (`0xFFFFFFFF`) | Aromatica da foglia: la luce bianca mantiene la pianta compatta e di un verde intenso.                             |
| `lightDuration`           | 14 ore (07:00–21:00)                 | 14 ore danno una crescita costante di nuove foglie.                                                                |
| `lightIntensity`          | 7                                    | Medio-alta: il prezzemolo tollera la mezz'ombra ma cresce più velocemente con una buona luce.                      |
| `targetHumidity`          | 55 %                                 | Umidità nella media; un'aria molto umida favorisce le macchie fogliari.                                            |
| `temperatureMax`          | 26 °C                                | Sopra i 26 °C la crescita rallenta e la pianta può andare a seme in anticipo.                                      |
| `temperatureMin`          | 8 °C                                 | Sopporta il freddo, ma sotto gli 8 °C cresce molto lentamente.                                                     |
| `wateringFrequency`       | ogni 3 giorni (72 ore)               | Ogni 3 giorni: terreno uniformemente umido, con la superficie che si asciuga un po' tra un'annaffiatura e l'altra. |
| `waterQuantity`           | 200 ml                               | Sufficiente a raggiungere la radice profonda senza saturare il vaso.                                               |
| `soilMoisture`            | non impostato                        | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                 |
| `humidificationFrequency` | non impostato                        | L'umidificazione segue `targetHumidity`.                                                                           |
| `humidificationDuration`  | non impostato                        | Usato solo con l'umidificazione a tempo.                                                                           |

## Irrigazione

Il prezzemolo usa l'**irrigazione a tempo**.

- Durante la germinazione annaffia più spesso, ogni 1–2 giorni (24–48 ore) con 100 ml: i semi che si seccano anche una sola volta spesso non germogliano. Torna a 3 giorni quando le piantine hanno qualche foglia vera.
- Raccogli prima i gambi esterni, così la pianta continua a produrre dal centro.
