---
title: Personalizzare il firmware
description: Compila il firmware dai sorgenti per cambiare pin, intervalli e altre opzioni.
section: Firmware
section_order: 4
order: 30
draft: false
---

# Personalizzare il firmware

Il firmware pubblicato nelle [release di GitHub](https://github.com/agromate-devs/agrosmart/releases)
è compilato per l'**ESP32‑C5** con la configurazione predefinita. Compilalo tu se:

- usi un chip diverso (ESP32, ESP32‑S3, ...);
- hai collegato i componenti a GPIO diversi dai
  [pin predefiniti](/docs?article=building_agrosmart);
- usi un sensore, una sonda o un tipo di striscia LED diversi, oppure una striscia con un numero diverso di LED;
- vuoi cambiare gli intervalli di controllo e di pubblicazione, la portata della pompa o le impostazioni OTA;
- vuoi migliorare il firmware.

## Compilare dai sorgenti

Ti serve <a href="https://docs.espressif.com/projects/esp-idf/en/stable/get-started/index.html" target="_blank">
ESP‑IDF</a>
installato (al momento la versione supportata ufficialmente è la v6.0.1).

1. Clona il firmware:

   ```bash
   git clone https://github.com/agromate-devs/agrosmart.git
   cd agrosmart
   ```

2. Seleziona il chip (in questo esempio ESP32-S3). Su un ESP32‑C5 salta questo passaggio, il repository è già
   configurato per quel chip:

   ```bash
   idf.py set-target esp32s3
   ```

3. Apri il menu di configurazione e modifica le opzioni o i pin in **Agrosmart configuration**:

   ```bash
   idf.py menuconfig
   ```

4. Compila, carica il firmware e apri il monitor seriale (sostituisci la porta con la tua):

   ```bash
   idf.py build
   idf.py flash monitor
   ```

5. Associa il dispositivo all'app, se non l'hai ancora fatto: vedi [Abbinare l'Agrosmart](/docs?article=pairing).

## Opzioni di configurazione

I pin predefiniti di ogni chip sono elencati in
[Costruire un Agrosmart](/docs?article=building_agrosmart).

1. Esegui `idf.py menuconfig` e apri **Agrosmart configuration**.
2. Queste sono (quasi) tutte le opzioni disponibili nel menuconfig:

| Configurazione                    | Opzioni                                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| DHT Configuration                 | Tipo di chip, GPIO dei dati del DHT                                                                          |
| Humidifier configuration          | GPIO di controllo dell'umidificatore, intervallo di soglia, intervallo di controllo                          |
| Water pump/tank configuration     | Portata, GPIO di controllo della pompa, GPIO del sensore di livello dell'acqua                               |
| Soil moisture probe configuration | Tipo di sonda, GPIO della sonda, GPIO di alimentazione della sonda (solo resistiva), intervallo di controllo |
| LED strip configuration           | Tipo di chip, GPIO di controllo della striscia LED, numero di LED                                            |
| Status LED configuration          | Abilita il LED RGB di stato, GPIO del LED RGB di stato                                                       |
| OTA Configuration                 | URL di base delle risorse OTA (predefinito: GitHub), intervallo di controllo, opzioni di sicurezza           |
| NTP Configuration                 | Attesa tra i tentativi di sincronizzazione NTP, numero massimo di tentativi, server NTP                      |
| `METRIC_PUBLISH_INTERVAL`         | Ogni quanto temperatura, umidità e umidità del terreno vengono lette e pubblicate su MQTT                    |

> [!NOTE]
> Attenzione alle unità: `SOIL_MOISTURE_CHECK_INTERVAL_MS` e `HUMIDIFIER_CHECK_INTERVAL_MS` sono in
> **millisecondi**, gli altri intervalli in **secondi**. Con l'irrigazione a tempo l'intervallo del terreno
> non viene usato: la pompa parte ogni _n_ ore, come impostato per la pianta nell'app.

3. Salva con `S`, esci con `Q`, poi ricompila e carica il firmware:

   ```bash
   idf.py build
   idf.py flash monitor
   ```

I valori vengono salvati in `sdkconfig`. Senza menuconfig puoi anche modificare direttamente il file, per
esempio:

```ini
CONFIG_DHT_GPIO=4
CONFIG_WATER_PUMP_GPIO=12
CONFIG_HUMIDIFIER_GPIO=13
```

> [!TIP]
> `idf.py set-target` rigenera `sdkconfig` dai valori predefiniti, quindi quando cambi chip perdi i tuoi pin. Per
> conservarli esegui `idf.py save-defconfig`: scrive le opzioni diverse da quelle predefinite in
> `sdkconfig.defaults`, che viene applicato ogni volta che `sdkconfig` viene rigenerato.

Quando scegli i nuovi pin:

- la sonda del terreno deve usare un pin **ADC1**, altrimenti la compilazione fallisce:

| Target              | GPIO ammessi |
| ------------------- | ------------ |
| ESP32               | 32–39        |
| ESP32‑S2 / ESP32‑S3 | 1–10         |
| ESP32‑C5            | 1–5          |

- evita i pin usati dalla flash e dalla PSRAM (GPIO 6–11 sull'ESP32, 26–32 sulla maggior parte dei moduli ESP32‑S3)
  e gli **strapping pin**, che decidono la modalità di avvio al reset: controlla il datasheet del tuo chip;
- i pin solo di ingresso (GPIO 34–39 sull'ESP32) si possono usare solo per la sonda del terreno;
- evita i pin USB (D+/D−) e TX/RX della UART0 se li usi per caricare il firmware e monitorare la scheda.

## Calibrare la pompa

Il firmware fa girare la pompa per `60 × quantità d'acqua / WATER_PUMP_FLOW_RATE` secondi, quindi la
quantità d'acqua erogata è corretta solo se la portata corrisponde a quella della tua pompa.

Di solito la portata delle pompe DC è indicata nel datasheet. Se non è il tuo caso, puoi misurarla così:

1. Metti l'uscita della pompa in un recipiente graduato e falla girare per un minuto esatto.
2. Leggi la quantità d'acqua in millilitri.
3. Imposta quel valore in **Agrosmart configuration → Water pump configuration → Water pump flow rate**
   e ricompila.
