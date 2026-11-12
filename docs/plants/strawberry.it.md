---
title: Fragola
description: Parametri della pianta predefinita fragola e come sono stati scelti.
section: Piante
section_order: 4
order: 28
---

# Fragola

Questa pagina spiega i valori della pianta predefinita fragola. Per il significato e le unità di ogni campo,
vedi [Piante predefinite](/docs?article=default_plants).

La fragola rifiorente (neutrodiurna, _Fragaria × ananassa_) fiorisce e fruttifica indipendentemente dalla durata del
giorno, quindi è il tipo giusto per una serra con luce artificiale. I valori qui sotto presuppongono una pianta in un
vaso da circa 2–3 litri.

**Difficoltà**: 3/5 (media).

| Campo                     | Valore consigliato                  | Perché                                                                                                                       |
|---------------------------|-------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `lightColor`              | Viola — `4286578816` (`0xFF800080`) | Viola (rosso + blu): il rosso stimola fioritura e fruttificazione, il blu mantiene la pianta compatta.                       |
| `lightDuration`           | 14 ore (07:00–21:00)                | 14 ore: le varietà rifiorenti fioriscono con qualsiasi durata del giorno, ma più luce significa frutti più numerosi e dolci. |
| `lightIntensity`          | 9                                   | Alta: la produzione di frutti richiede molta energia.                                                                        |
| `targetHumidity`          | 65 %                                | Un'umidità medio-alta aiuta la fioritura; sopra il 75 % la muffa grigia (_Botrytis_) attacca i frutti.                       |
| `temperatureMax`          | 24 °C                               | Sopra i 24 °C la pianta smette di fiorire e i frutti restano piccoli.                                                        |
| `temperatureMin`          | 12 °C                               | Sotto i 12 °C fioritura e maturazione rallentano molto.                                                                      |
| `wateringFrequency`       | ogni 2 giorni (48 ore)              | Ogni 2 giorni: annaffiature regolari danno frutti regolari; lasciar seccare il terreno li rende piccoli e duri.              |
| `waterQuantity`           | 250 ml                              | Le radici della fragola sono superficiali: dosi medie le mantengono umide senza ristagni.                                    |
| `soilMoisture`            | non impostato                       | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                           |
| `humidificationFrequency` | non impostato                       | L'umidificazione segue `targetHumidity`.                                                                                     |
| `humidificationDuration`  | non impostato                       | Usato solo con l'umidificazione a tempo.                                                                                     |

## Irrigazione

La fragola usa l' **irrigazione a tempo**: un ritmo fisso evita le annaffiature irregolari che causano frutti piccoli o
deformi.

- Mantieni asciutti frutti e foglie: i frutti bagnati marciscono in fretta. Pacciama con paglia così che i frutti non
  tocchino il terreno.
- Durante la fruttificazione abbondante la pianta beve di più: se il terreno è secco prima dell'irrigazione successiva,
  aumenta la quantità a 300 ml o accorcia l'intervallo a 1 giorno (24 ore) con 150 ml.

## Note di coltivazione

- **Impollinazione**: in una serra chiusa non ci sono insetti. Quando i fiori si aprono, passa un pennellino morbido al
  centro di ogni fiore ogni 1–2 giorni, altrimenti i frutti saranno deformi o non si formeranno.
- Elimina gli stoloni se vuoi i frutti: sottraggono energia alla fioritura.
