---
title: Orchidea Phalaenopsis
description: Parametri della pianta predefinita orchidea Phalaenopsis e come sono stati scelti.
section: Piante
section_order: 4
order: 31
---

# Orchidea Phalaenopsis

Questa pagina spiega i valori della pianta predefinita orchidea Phalaenopsis. Per il significato e le unità di ogni campo, vedi [Piante predefinite](/docs?article=default_plants).

L'orchidea farfalla (_Phalaenopsis_) è un'epifita: in natura cresce sulla corteccia degli alberi, con le radici all'aria. Tenerla in vita non è difficile, farla rifiorire sì. I valori qui sotto presuppongono una pianta in un vaso trasparente da 12 cm riempito di bark (corteccia), con fori di drenaggio.

**Difficoltà**: 4/5 (difficile).

| Campo                     | Valore consigliato                   | Perché                                                                                                               |
| ------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `lightColor`              | Bianco — `4294967295` (`0xFFFFFFFF`) | Luce bianca; l'orchidea ha bisogno di poca luce e lo spettro conta meno dell'evitare gli eccessi.                    |
| `lightDuration`           | 12 ore (08:00–20:00)                 | 12 ore, come la giornata equatoriale delle sue foreste d'origine.                                                    |
| `lightIntensity`          | 4                                    | Bassa: vive all'ombra della chioma della foresta e una luce forte brucia le foglie (chiazze giallo-marroni).         |
| `targetHumidity`          | 60 %                                 | Usata solo se passi all'umidificazione a soglia: 50–70 % è l'intervallo ideale per la Phalaenopsis.                  |
| `temperatureMax`          | 30 °C                                | Sopra i 30 °C la pianta va in stress e i fiori cadono.                                                               |
| `temperatureMin`          | 15 °C                                | Sotto i 15 °C, soprattutto con le radici bagnate, subisce danni da freddo.                                           |
| `wateringFrequency`       | ogni 7 giorni (168 ore)              | Una volta a settimana: il bark deve quasi asciugarsi tra un'annaffiatura e l'altra, altrimenti le radici marciscono. |
| `waterQuantity`           | 150 ml                               | Una dose piccola: basta a bagnare il bark, l'eccesso deve drenare subito.                                            |
| `soilMoisture`            | non impostato                        | Disattivato, perché l'irrigazione è a tempo (`wateringFrequency`).                                                   |
| `humidificationFrequency` | ogni 4 ore                           | Ogni 4 ore: brevi picchi di umidità, come la rugiada del mattino nella foresta, con l'aria che si asciuga nel mezzo. |
| `humidificationDuration`  | 10 minuti                            | 10 minuti, abbastanza per alzare l'umidità senza bagnare a lungo le foglie.                                          |

## Irrigazione

L'orchidea usa l'**irrigazione a tempo**: la sonda del terreno non funziona nel bark (pezzi grossi con aria in mezzo), quindi la lettura non avrebbe senso.

- Guarda le radici attraverso il vaso trasparente: grigio-argento significa asciutte, verde brillante bagnate. Se sono ancora verdi quando arriva l'irrigazione successiva, allunga l'intervallo a 10 giorni (240 ore).
- Non lasciare mai acqua al centro della rosetta di foglie (il colletto): provoca il marciume del colletto, che uccide la pianta.

## Note di coltivazione

- L'**umidificazione** qui è **a tempo** per mostrare l'altra modalità: cicli brevi danno l'umidità che piace all'orchidea mantenendo le foglie asciutte per la maggior parte del tempo. Se preferisci, passa alla modalità a soglia dall'app e la pianta userà `targetHumidity` (60 %).
- **Rifioritura**: dopo la fioritura, qualche settimana con notti intorno ai 16–18 °C (circa 5 °C più fredde del giorno) fa spuntare un nuovo stelo floreale. La serra non raffredda, quindi in autunno mettila in una stanza più fresca.
