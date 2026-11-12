---
title: Rosmarino
description: Parametri della pianta predefinita rosmarino e come sono stati scelti.
section: Piante
section_order: 4
order: 27
---

# Rosmarino

Questa pagina spiega i valori della pianta predefinita rosmarino. Per il significato e le unità di ogni campo,
vedi [Piante predefinite](/docs?article=default_plants).

Il rosmarino (_Salvia rosmarinus_) è un arbusto mediterraneo legnoso: ama il sole, l'aria secca e il terreno ben
drenato. In casa di solito muore per troppa acqua o poca luce. I valori qui sotto presuppongono un vaso da 2 litri con
terriccio sabbioso e ben drenato.

**Difficoltà**: 2/5 (facile).

| Campo                     | Valore consigliato                   | Perché                                                                                                                                                                  |
|---------------------------|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `lightColor`              | Bianco — `4294967295` (`0xFFFFFFFF`) | Luce bianca a spettro pieno, la più vicina al sole mediterraneo.                                                                                                        |
| `lightDuration`           | 14 ore (07:00–21:00)                 | 14 ore, una giornata d'estate mediterranea.                                                                                                                             |
| `lightIntensity`          | 9                                    | Alta: con poca luce il rosmarino cresce esile e perde l'aroma.                                                                                                          |
| `targetHumidity`          | 50 %                                 | Il rosmarino preferisce l'aria secca; l'umidità alta provoca l'oidio.                                                                                                   |
| `temperatureMax`          | 30 °C                                | Sopporta bene il caldo; sopra i 30 °C in uno spazio chiuso soffre per la scarsa ventilazione.                                                                           |
| `temperatureMin`          | 5 °C                                 | Sopravvive a gelate leggere, ma in vaso è meglio restare sopra i 5 °C.                                                                                                  |
| `wateringFrequency`       | ogni 7 giorni (168 ore)              | Una volta a settimana: il terreno deve essere quasi asciutto prima dell'annaffiatura successiva, il rosmarino muore molto più spesso per i ristagni che per la siccità. |
| `waterQuantity`           | 250 ml                               | Un'annaffiatura completa, poi un lungo periodo asciutto.                                                                                                                |
| `soilMoisture`            | non impostato                        | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                                                                      |
| `humidificationFrequency` | non impostato                        | L'umidificazione segue `targetHumidity`.                                                                                                                                |
| `humidificationDuration`  | non impostato                        | Usato solo con l'umidificazione a tempo.                                                                                                                                |

## Irrigazione

Il rosmarino usa l' **irrigazione a tempo** con un intervallo lungo, così il terreno si asciuga tra un'annaffiatura e
l'altra.

- Se gli aghi diventano marroni partendo dalla base, le radici stanno marcendo: allunga l'intervallo a 10 giorni (240
  ore) e controlla che il vaso dreni.
- Se gli aghi diventano molli e le punte si piegano, accorcialo a 5 giorni (120 ore). In inverno passa a 10–14 giorni
  (240–336 ore).
