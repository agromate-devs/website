---
title: Calathea
description: Parametri della pianta predefinita calathea e come sono stati scelti.
section: Piante
section_order: 4
order: 32
---

# Calathea

Questa pagina spiega i valori della pianta predefinita calathea. Per il significato e le unità di ogni campo, vedi [Piante predefinite](/docs?article=default_plants).

La calathea (_Goeppertia_, prima _Calathea_) si coltiva per le sue foglie decorate, che si richiudono di notte. Viene dal sottobosco delle foreste tropicali e reagisce subito ad aria secca, acqua calcarea e sbalzi di temperatura. I valori qui sotto presuppongono un vaso da circa 2 litri.

**Difficoltà**: 4/5 (difficile).

| Campo                     | Valore consigliato                   | Perché                                                                                                               |
| ------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `lightColor`              | Bianco — `4294967295` (`0xFFFFFFFF`) | La luce bianca mantiene i colori naturali del disegno delle foglie.                                                  |
| `lightDuration`           | 12 ore (08:00–20:00)                 | 12 ore; le foglie seguono il ciclo giorno-notte, aprendosi con la luce e chiudendosi al buio.                        |
| `lightIntensity`          | 3                                    | Molto bassa: una luce forte sbiadisce il disegno e brucia le foglie.                                                 |
| `targetHumidity`          | 70 %                                 | Alta: sotto il 60 % i bordi delle foglie seccano e si arrotolano. È il valore più importante per questa pianta.      |
| `temperatureMax`          | 28 °C                                | Sopra i 28 °C, soprattutto con aria secca, le foglie si arrotolano.                                                  |
| `temperatureMin`          | 18 °C                                | Sotto i 18 °C smette di crescere e le foglie si danneggiano; odia gli sbalzi improvvisi.                             |
| `wateringFrequency`       | ogni 3 giorni (72 ore)               | Ogni 3 giorni: la calathea non tollera di seccarsi, ma con poca luce beve poco e i ristagni fanno marcire le radici. |
| `waterQuantity`           | 200 ml                               | Una dose media; il terreno deve restare umido, mai fradicio.                                                         |
| `soilMoisture`            | non impostato                        | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                   |
| `humidificationFrequency` | non impostato                        | L'umidificazione segue `targetHumidity`.                                                                             |
| `humidificationDuration`  | non impostato                        | Usato solo con l'umidificazione a tempo.                                                                             |

## Irrigazione

La calathea usa l'**irrigazione a tempo**, per mantenere il terreno uniformemente umido.

- **Riempi il serbatoio con acqua piovana, distillata o demineralizzata**: sali, cloro e fluoro dell'acqua del rubinetto causano le tipiche punte marroni delle foglie.
- Foglie che restano arrotolate di giorno indicano sete o aria secca: accorcia l'intervallo a 2 giorni (48 ore). Foglie gialle alla base indicano troppa acqua: allungalo a 4 giorni (96 ore).
