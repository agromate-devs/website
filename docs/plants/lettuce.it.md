---
title: Lattuga
description: Parametri della pianta predefinita lattuga e come sono stati scelti.
section: Piante
section_order: 4
order: 23
---

# Lattuga

Questa pagina spiega i valori della pianta predefinita lattuga. Per il significato e le unità di ogni campo,
vedi [Piante predefinite](/docs?article=default_plants).

La lattuga da taglio (_Lactuca sativa_) è una delle colture più facili da coltivare in casa: puoi raccogliere le foglie
esterne appena sono abbastanza grandi. I valori qui sotto presuppongono un vaso o una cassetta da circa 2 litri.

**Difficoltà**: 1/5 (molto facile).

| Campo                     | Valore consigliato                   | Perché                                                                                                                                   |
|---------------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `lightColor`              | Bianco — `4294967295` (`0xFFFFFFFF`) | La lattuga si coltiva per le foglie: la luce bianca, ricca di blu, la mantiene compatta.                                                 |
| `lightDuration`           | 14 ore (07:00–21:00)                 | 14 ore danno una buona crescita; giornate molto più lunghe, insieme al caldo, fanno andare la lattuga a seme (fiorisce e diventa amara). |
| `lightIntensity`          | 6                                    | La lattuga ha bisogno di meno luce delle piante da frutto; troppa luce e calore favoriscono la salita a seme.                            |
| `targetHumidity`          | 60 %                                 | Umidità moderata; con aria molto umida e ferma le foglie basse possono marcire.                                                          |
| `temperatureMax`          | 22 °C                                | Sopra i 24 °C la lattuga va a seme e le foglie diventano amare.                                                                          |
| `temperatureMin`          | 8 °C                                 | La lattuga sopporta il freddo, ma sotto gli 8 °C la crescita quasi si ferma.                                                             |
| `wateringFrequency`       | ogni 2 giorni (48 ore)               | Ogni 2 giorni: la lattuga ha radici superficiali e ha bisogno di umidità costante, altrimenti le foglie diventano dure e amare.          |
| `waterQuantity`           | 200 ml                               | La lattuga ha radici superficiali: meglio irrigazioni piccole e frequenti che abbondanti.                                                |
| `soilMoisture`            | non impostato                        | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                                       |
| `humidificationFrequency` | non impostato                        | L'umidificazione segue `targetHumidity`.                                                                                                 |
| `humidificationDuration`  | non impostato                        | Usato solo con l'umidificazione a tempo.                                                                                                 |

## Irrigazione

La lattuga usa l' **irrigazione a tempo**: dosi piccole e regolari mantengono umide le radici superficiali.

- Evita ristagni attorno al colletto, le foglie basse possono marcire. Se il terreno resta fradicio, allunga
  l'intervallo a 3 giorni (72 ore).
- Semina qualche seme ogni 2–3 settimane per avere sempre foglie pronte da raccogliere.
