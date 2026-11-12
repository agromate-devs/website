---
title: Dionea
description: Parametri della pianta predefinita dionea e come sono stati scelti.
section: Piante
section_order: 4
order: 33
---

# Dionea

Questa pagina spiega i valori della pianta predefinita dionea. Per il significato e le unità di ogni campo, vedi [Piante predefinite](/docs?article=default_plants).

La dionea (_Dionaea muscipula_) è una pianta carnivora delle torbiere della Carolina del Nord e del Sud. Vive in un terreno povero e sempre bagnato e cattura insetti per ottenere i nutrienti che il terreno non le dà. È la pianta più difficile del catalogo perché richiede un'acqua molto particolare e un riposo invernale al freddo. I valori qui sotto valgono per la **stagione vegetativa** (da primavera ad autunno) e presuppongono un vaso di plastica da 12–15 cm con una miscela di torba e perlite (senza concime).

**Difficoltà**: 5/5 (molto difficile).

| Campo                     | Valore consigliato                   | Perché                                                                                                                          |
| ------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `lightColor`              | Bianco — `4294967295` (`0xFFFFFFFF`) | Luce bianca a spettro pieno: una buona luce fa diventare rosso l'interno delle trappole.                                        |
| `lightDuration`           | 14 ore (07:00–21:00)                 | 14 ore, una giornata estiva nel suo habitat d'origine.                                                                          |
| `lightIntensity`          | 10                                   | Massima: in natura cresce in pieno sole; con poca luce le trappole diventano lunghe, deboli e verdi.                            |
| `targetHumidity`          | 60 %                                 | Un'umidità media è sufficiente; un'aria molto umida e ferma in un box chiuso fa ammuffire il terreno.                           |
| `temperatureMax`          | 35 °C                                | Sopporta il caldo estivo fino a 35 °C se il terreno resta bagnato.                                                              |
| `temperatureMin`          | 5 °C                                 | Durante la stagione vegetativa resta sopra i 5 °C; in inverno ha bisogno di freddo (vedi _Riposo invernale_).                   |
| `wateringFrequency`       | ogni 24 ore                          | Ogni giorno: pianta di torbiera, la torba non deve mai asciugarsi, e un vaso piccolo sotto una luce forte si asciuga in fretta. |
| `waterQuantity`           | 100 ml                               | La dose minima dell'app: una piccola quantità quotidiana mantiene la torba bagnata, l'eccesso drena.                            |
| `soilMoisture`            | non impostato                        | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                              |
| `humidificationFrequency` | non impostato                        | L'umidificazione segue `targetHumidity`.                                                                                        |
| `humidificationDuration`  | non impostato                        | Usato solo con l'umidificazione a tempo.                                                                                        |

## Irrigazione

La dionea usa l'**irrigazione a tempo** ogni giorno, così il terreno è sempre bagnato.

- **Nel serbatoio usa solo acqua priva di minerali**: distillata, demineralizzata, da osmosi inversa o piovana. L'acqua del rubinetto o minerale uccide lentamente la pianta a causa dei sali. È la regola più importante per questa pianta.
- Se preferisci il classico metodo del sottovaso, tieni 1–2 cm d'acqua nel sottovaso e allunga l'intervallo a 3 giorni (72 ore), così la pompa si limita a rabboccare il terreno.

## Note di coltivazione

- **Riposo invernale**: indicativamente da novembre a febbraio la pianta ha bisogno di 3–4 mesi a 0–10 °C con giornate corte, altrimenti si indebolisce e muore entro un anno. L'Agrosmart non può raffreddare, quindi sposta la pianta in un luogo freddo e luminoso (una stanza non riscaldata o un balcone riparato) e tieni il terreno solo leggermente umido. Le trappole anneriscono e la pianta sembra morta: è normale.
- Non concimare e non far scattare le trappole per gioco: ogni trappola si chiude solo poche volte prima di morire. In casa dalle un insetto vivo ogni qualche settimana, o niente se ne cattura da sola.
