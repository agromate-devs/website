---
title: Pomodoro ciliegino
description: Parametri della pianta predefinita pomodoro ciliegino e come sono stati scelti.
section: Piante
section_order: 4
order: 29
---

# Pomodoro ciliegino

Questa pagina spiega i valori della pianta predefinita pomodoro ciliegino. Per il significato e le unità di ogni campo, vedi [Piante predefinite](/docs?article=default_plants).

In una serra piccola stanno solo i pomodori ciliegini **nani** (_Solanum lycopersicum_, varietà come 'Micro Tom' o 'Red Robin'): le varietà normali superano 1,5 m. I valori qui sotto presuppongono una pianta in un vaso di almeno 5 litri.

**Difficoltà**: 3/5 (media).

| Campo                     | Valore consigliato                  | Perché                                                                                                                                                                                            |
| ------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lightColor`              | Viola — `4286578816` (`0xFF800080`) | Viola (rosso + blu): il rosso guida fioritura e allegagione, il blu evita fusti filati.                                                                                                           |
| `lightDuration`           | 16 ore (06:00–22:00)                | 16 ore: il pomodoro è tra gli ortaggi più esigenti di luce. Non superare le 18 ore, senza un periodo di buio le foglie ingialliscono.                                                             |
| `lightIntensity`          | 10                                  | Massima: con poca luce la pianta fiorisce poco e lascia cadere i fiori.                                                                                                                           |
| `targetHumidity`          | 65 %                                | Il 65 % aiuta il polline ad attecchire; sopra l'80 % il polline si impasta e si diffondono le malattie fungine.                                                                                   |
| `temperatureMax`          | 30 °C                               | Sopra i 30–32 °C il polline diventa sterile e i fiori cadono senza allegare.                                                                                                                      |
| `temperatureMin`          | 16 °C                               | Sotto i 13–16 °C l'allegagione fallisce e la crescita si ferma.                                                                                                                                   |
| `wateringFrequency`       | ogni 24 ore                         | Ogni giorno: un pomodoro in produzione con 16 ore di luce beve molto, e un ritmo quotidiano previene il marciume apicale e la spaccatura dei frutti, entrambi causati da annaffiature irregolari. |
| `waterQuantity`           | 300 ml                              | Una dose quotidiana per un vaso da 5 litri: abbastanza da bagnare il pane di terra senza ristagni.                                                                                                |
| `soilMoisture`            | non impostato                       | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                                                                                                |
| `humidificationFrequency` | non impostato                       | L'umidificazione segue `targetHumidity`.                                                                                                                                                          |
| `humidificationDuration`  | non impostato                       | Usato solo con l'umidificazione a tempo.                                                                                                                                                          |

## Irrigazione

Il pomodoro ciliegino usa l'**irrigazione a tempo** ogni giorno: un apporto d'acqua regolare è il fattore più importante per frutti sani.

- Una macchia scura e infossata sul fondo del frutto (marciume apicale) indica annaffiature irregolari o un vaso troppo piccolo.
- Le piante giovani senza frutti hanno bisogno di meno: parti da 150 ml al giorno e passa a 300 ml quando la pianta è carica di frutti, fino a 400 ml se il terreno è secco prima dell'irrigazione successiva.

## Note di coltivazione

- **Impollinazione**: i fiori del pomodoro si autoimpollinano, ma hanno bisogno di vibrazioni. Scuoti delicatamente i grappoli di fiori o picchietta il fusto una volta al giorno durante la fioritura.
- Concima con un fertilizzante per pomodori (ricco di potassio) ogni 2 settimane dalla comparsa dei primi fiori: un vaso piccolo esaurisce in fretta i nutrienti.
