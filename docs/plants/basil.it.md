---
title: Basilico
description: Parametri della pianta predefinita basilico e come sono stati scelti.
section: Piante
section_order: 4
order: 21
---

# Basilico

Questa pagina spiega i valori della pianta predefinita basilico. Per il significato e le unità di ogni campo, vedi
[Piante predefinite](/docs?article=default_plants).

Il basilico (_Ocimum basilicum_) è un'aromatica da foglia che ha bisogno di molto caldo e molta luce. I valori qui sotto
presuppongono un basilico coltivato in un vaso da circa 2 litri, in casa o sul balcone.

| Campo                     | Valore consigliato                                         | Perché                                                                                                                            |
| ------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `lightColor`              | Bianco a spettro pieno, con una buona quota di blu e rosso | Il blu mantiene la pianta compatta, il rosso guida la fotosintesi.                                                                |
| `lightDuration`           | 14 ore                                                     | Sufficienti per una crescita vigorosa senza stress; all'aperto d'estate il basilico riceve 12–14 ore.                             |
| `lightIntensity`          | 8-10                                                       | Il basilico ama la luce forte: con poca luce si allunga e perde aroma.                                                            |
| `targetHumidity`          | 60 % (intervallo 50–70 %)                                  | Sopra l'80 % aumenta il rischio di muffe e peronospora.                                                                           |
| `temperatureMax`          | 30 °C                                                      | Sopra i 32 °C la crescita rallenta e le foglie vanno in stress.                                                                   |
| `temperatureMin`          | 15 °C                                                      | Sotto i 10 °C il basilico subisce danni da freddo.                                                                                |
| `wateringFrequency`       | ogni 2 giorni (48 ore)                                     | Mantiene il terreno leggermente umido, mai fradicio.                                                                              |
| `waterQuantity`           | 200 ml                                                     | Giusto per un vaso da 2 litri; con un vaso di dimensioni diverse annaffia finché l'acqua esce dal fondo, poi svuota il sottovaso. |
| `soilMoisture`            | non impostato                                              | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                                |
| `humidificationFrequency` | non impostato                                              | L'umidificazione segue `targetHumidity`.                                                                                          |

## Irrigazione

Il basilico usa l'**irrigazione a tempo**, ma la frequenza e la quantità d'acqua possono cambiare nel tempo in base alle
condizioni meteo:

- Evita di bagnare le foglie, soprattutto la sera, per prevenire le malattie fungine: avvia l'irrigazione/configura
  l'Agrosmart prima che la luce si spenga.
- Se la temperatura massima supera i 28–30 °C, accorcia l'intervallo a 1 giorno (24 ore).
- In inverno o con temperature basse, allungalo a 3–4 giorni (72–96 ore), perché il terreno si asciuga molto più
  lentamente.
