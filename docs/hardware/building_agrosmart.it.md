---
title: Costruire un Agrosmart
description: Hardware, collegamenti, pin predefiniti e configurazione del firmware per costruire il tuo Agrosmart.
section: Hardware
section_order: 3
order: 11
draft: false
---

# Costruire un Agrosmart

Questa guida spiega come costruire un Agrosmart da zero: i componenti necessari, come collegarli all'ESP32, quali GPIO
usa il firmware di default e come cambiarli se la tua scheda è diversa.

> [!NOTE]
> La scheda di riferimento è una devkit **ESP32‑C5**: è il target compilato dalla CI del firmware e quello per cui è
> configurato lo `sdkconfig` del repository. Sono supportati anche ESP32 ed
> ESP32‑S3 ([ma non ancora testati](/docs?article=writing-docs)), però dovrai
> compilare tu il firmware con i tuoi pin (vedi [Personalizzare il firmware](/docs?article=custom_firmware)).

## Hardware necessario

| Q.tà | Componente                       | Note                                                                                                                                                      |
| ---- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Devkit ESP32                     | Consigliato l'ESP32‑C5 per il supporto al WiFi a 5 GHz. Con una scheda che ha un LED RGB integrato puoi usare il LED di stato senza collegarne uno        |
| 1    | Sensore di temperatura e umidità | DHT22 / AM2301 / AM2302 / AM2321 (predefinito) oppure DHT11                                                                                               |
| 1    | Sonda di umidità del terreno     | Capacitiva (predefinita) oppure resistiva                                                                                                                 |
| 1    | Pompa dell'acqua                 | È supportata qualsiasi pompa DC                                                                                                                           |
| 1    | Sensore di livello dell'acqua    | Il firmware è testato con l'XKC-Y23A-NPN, ma va bene qualsiasi sensore di livello minimo                                                                  |
| 1    | Umidificatore                    | È supportato qualsiasi umidificatore                                                                                                                      |
| 1    | Striscia LED indirizzabile       | WS2812 (predefinita), WS2811, WS2816 oppure SK6812                                                                                                        |
| 2    | Stadi di commutazione            | Moduli MOSFET logic‑level oppure moduli relè, uno per la pompa e uno per l'umidificatore                                                                  |
| 1    | Alimentatore 5 V                 | Dimensionato per striscia LED, pompa e umidificatore (vedi _Alimentazione_ più sotto)                                                                     |
| —    | Componenti passivi               | Pull‑up da 10 kΩ per il DHT (se non è già sul modulo), resistenza da 330 Ω e condensatore da 1000 µF per la striscia LED, diodo di ricircolo per la pompa |
| —    | Cavi, breadboard o millefori     |                                                                                                                                                           |

## Configurazione predefinita

Il firmware legge ogni pin dalle opzioni Kconfig del menu **Agrosmart configuration**. I valori predefiniti dipendono
dal chip:

| Segnale                                                    | Opzione Kconfig                   | ESP32‑C5 | ESP32 / ESP32‑S2 / ESP32‑S3             |
| ---------------------------------------------------------- | --------------------------------- | -------- | --------------------------------------- |
| Pin del DHT                                                | `CONFIG_DHT_GPIO`                 | 28       | 17                                      |
| Sonda di umidità del terreno (ADC)                         | `CONFIG_SOIL_MOISTURE_GPIO`       | 3        | 8                                       |
| Alimentazione della sonda resistiva (se usi una resistiva) | `CONFIG_SOIL_MOISTURE_POWER_GPIO` | 15       | 19                                      |
| MOSFET/relè dell'umidificatore                             | `CONFIG_HUMIDIFIER_GPIO`          | 10       | 16                                      |
| MOSFET/relè della pompa                                    | `CONFIG_WATER_PUMP_GPIO`          | 23       | 13                                      |
| Sensore di livello dell'acqua                              | `CONFIG_WATER_LEVEL_SENSOR_GPIO`  | 6        | 14                                      |
| Dati della striscia LED (opzionale)                        | `CONFIG_LED_STRIP_GPIO`           | 5        | 21                                      |
| LED RGB di stato (opzionale)                               | `CONFIG_STATUS_LED_GPIO`          | 27       | 48 sull'ESP32‑S3, nessuno su ESP32 / S2 |

Il firmware pubblicato nelle release usa questi valori: un sensore DHT22/AM2301, una sonda del terreno capacitiva, una
striscia WS2812 da 30 LED e una portata della pompa di 1400 ml/min. Per cambiarli vedi
<a href="/docs?article=custom_firmware" target="_blank">Personalizzare il
firmware</a>.

## Collegamenti

Tutti i segnali sono a **3,3 V**. Non portare mai 5 V su un GPIO dell'ESP32 e collega sempre tra loro le masse di
tutti gli alimentatori.

### Sensore di temperatura e umidità

| Pin del sensore | ESP32             |
| --------------- | ----------------- |
| VCC             | 3,3 V             |
| DATA            | `CONFIG_DHT_GPIO` |
| GND             | GND               |

Metti una resistenza di pull‑up da 10 kΩ tra DATA e 3,3 V, a meno che il sensore non sia su una breakout board che ne
ha già una.

### Sensore di livello dell'acqua

| Pin del sensore | XKC-Y23A-NPN                     |
| --------------- | -------------------------------- |
| VCC             | 3,3 V                            |
| DATA            | `CONFIG_WATER_LEVEL_SENSOR_GPIO` |
| GND             | GND                              |

Se usi l'XKC-Y23A-NPN ricordati di calibrarlo e alimentalo sempre a 3,3 V, altrimenti non funziona.

### Sonda di umidità del terreno

| Pin della sonda | ESP32                                                                   |
| --------------- | ----------------------------------------------------------------------- |
| VCC             | 3,3 V (capacitiva) oppure `CONFIG_SOIL_MOISTURE_POWER_GPIO` (resistiva) |
| AOUT            | `CONFIG_SOIL_MOISTURE_GPIO`                                             |
| GND             | GND                                                                     |

La sonda viene letta tramite l'**ADC1**, quindi assicurati che quel GPIO sia un pin ADC, altrimenti la compilazione
fallisce.

Con una sonda resistiva, alimentala da `CONFIG_SOIL_MOISTURE_POWER_GPIO` invece che dai 3,3 V: il pin serve ad
alimentare la sonda solo durante la lettura, così gli elettrodi si corrodono più lentamente.

> [!IMPORTANT]
> Il pin della sonda deve essere un pin **ADC1**, perché l'ADC2 non si può usare mentre il Wi‑Fi è attivo. Il firmware
> lo controlla in fase di compilazione e rifiuta gli altri pin:
>
> | Target              | GPIO ammessi |
> | ------------------- | ------------ |
> | ESP32               | 32–39        |
> | ESP32‑S2 / ESP32‑S3 | 1–10         |

### Pompa dell'acqua e umidificatore

Il firmware pilota `CONFIG_WATER_PUMP_GPIO` e `CONFIG_HUMIDIFIER_GPIO` come semplici uscite digitali.
Un GPIO non può alimentare direttamente una pompa o un umidificatore, quindi ogni carico ha bisogno di uno
stadio di commutazione:

- **MOSFET a canale N logic‑level** (consigliato):
  - Source collegato al GND dell'alimentatore
  - Gate collegato al GPIO tramite una resistenza da 220 Ω
  - Drain collegato al GND della pompa o dell'umidificatore
  - Una resistenza da 10 kΩ tra gate e GND
- **Modulo relè**: usane uno che si attiva con un ingresso HIGH e funziona con la logica a 3,3 V.

Se l'umidificatore o la pompa funzionano a tensione di rete, commutali con un modulo relè adeguato chiuso in una
scatola, e tienilo lontano dall'acqua.

### Striscia LED

| Pin della striscia | Collegamento                                            |
| ------------------ | ------------------------------------------------------- |
| 5V                 | Alimentatore 5 V                                        |
| DIN                | `CONFIG_LED_STRIP_GPIO` tramite una resistenza da 330 Ω |
| GND                | GND dell'alimentatore **e** GND dell'ESP32              |

Metti un condensatore da 1000 µF tra 5V e GND vicino alla striscia. La maggior parte delle strisce WS2812 accetta un
segnale dati a 3,3 V su cavi corti; con cavi lunghi o LED che sfarfallano aggiungi un traslatore di livello
(es. 74AHCT125). La striscia è pilotata dalla periferica RMT, quindi va bene qualsiasi GPIO che può fare da uscita.

### LED di stato

Se la tua devkit ha un LED RGB indirizzabile integrato (WS2812 / SK6805), abilita `ENABLE_STATUS_LED`
e imposta `CONFIG_STATUS_LED_GPIO` sul suo pin (27 sulle devkit ESP32‑C5, 48 sull'ESP32‑S3, 8
sull'ESP32‑C6). Puoi anche collegare un LED e pilotarlo con un MOSFET, come la pompa.

Il LED cambia colore in base allo stato dell'Agrosmart:

- Giallo finché non è associato e Smartconfig è in esecuzione.
- Blu mentre la pompa è in funzione.
- Verde quando l'Agrosmart è associato e funziona tutto.
- Rosso in caso di errori (connessione al WiFi non riuscita, errore MQTT, ...).

### Alimentazione

Dimensiona l'alimentatore da 5 V per tutto quello che alimenta. Un LED WS2812 assorbe fino a circa 60 mA con il bianco
alla massima luminosità, quindi 30 LED da soli possono arrivare a 1,8 A; aggiungi la corrente della pompa e un po' di
margine. Un alimentatore da 2,5 A dovrebbe bastare.
Non collegare l'USB mentre alimenti l'ESP32 da un alimentatore a 5 V tramite il pin 5V.

## Caricare il firmware

Il firmware pronto da caricare è pubblicato nelle
[release di GitHub](https://github.com/agromate-devs/agrosmart/releases) del repository del firmware.
È compilato per l'**ESP32‑C5** con i pin predefiniti elencati sopra: se usi un altro chip o altri pin, compilalo tu
(vedi [Personalizzare il firmware](/docs?article=custom_firmware)).

### Dal browser

Il modo più semplice è il [flasher web](/flasher): aprilo con Chrome, Edge oppure Opera su desktop,
collega l'ESP32 con un cavo USB, premi **Connetti** e poi **Carica il firmware**. Installa sempre
l'ultima release.

### Con esptool

1. Scarica le quattro immagini dell'ultima release. Ognuna va caricata al proprio indirizzo:

| File                                    | Indirizzo in flash |
| --------------------------------------- | ------------------ |
| `agrosmart-esp32c5-bootloader.bin`      | `0x2000`           |
| `agrosmart-esp32c5-partition-table.bin` | `0x8000`           |
| `agrosmart-esp32c5-ota-data.bin`        | `0xe000`           |
| `agrosmart-esp32c5-app.bin`             | `0x10000`          |

2. Installa [esptool](https://docs.espressif.com/projects/esptool/en/latest/) (richiede Python):

   ```bash
   pip install esptool
   ```

3. Collega l'ESP32 al computer con un cavo USB e trova la sua porta seriale: `/dev/ttyUSB*` o
   `/dev/ttyACM*` su Linux, `/dev/cu.usbserial-*` o `/dev/cu.usbmodem*` su macOS, `COM*` su Windows.

4. Dalla cartella in cui hai scaricato i file, caricali (sostituisci la porta con la tua):

   ```bash
   esptool --chip esp32c5 -p /dev/ttyUSB0 -b 460800 \
     --before default-reset --after hard-reset \
     write-flash --flash-mode dio --flash-size 4MB --flash-freq 80m \
     0x2000 agrosmart-esp32c5-bootloader.bin \
     0x8000 agrosmart-esp32c5-partition-table.bin \
     0xe000 agrosmart-esp32c5-ota-data.bin \
     0x10000 agrosmart-esp32c5-app.bin
   ```

   Su Windows scrivi il comando su una sola riga, senza i `\`.

5. Quando esptool stampa `Hard resetting via RTS pin...`, l'Agrosmart si riavvia con il nuovo
   firmware. Associalo all'app: vedi [Abbinare l'Agrosmart](/docs?article=pairing).

> [!NOTE]
> Con le versioni di esptool precedenti alla 5 il comando è `esptool.py` e le opzioni usano il trattino basso:
> `write_flash`, `--flash_mode`, `--flash_size`, `--flash_freq`, `--before default_reset`,
> `--after hard_reset`.
