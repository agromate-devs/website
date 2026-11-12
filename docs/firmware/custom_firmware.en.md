---
title: Customizing the firmware
description: Build the firmware from source to change pins, intervals and other options.
section: Firmware
section_order: 4
order: 30
draft: false
---

# Customizing the firmware

The firmware published in the [GitHub releases](https://github.com/agromate-devs/agrosmart/releases)
is built for the **ESP32‑C5** with the default configuration. Build it yourself if you:

- use a different chip (ESP32, ESP32‑S3, ...);
- wired the parts to different GPIOs than the
  [default pins](/docs?article=building_agrosmart);
- use a different sensor, probe or LED strip type, or a strip with a different number of LEDs;
- want to change the check and publish intervals, the pump flow rate or the OTA settings.
- want to imrprove firmware

## Building from source

You need <a href="https://docs.espressif.com/projects/esp-idf/en/stable/get-started/index.html" target="_blank">
ESP‑IDF</a>
installed (currently v6.0.1 is officially supported).

1. Clone the firmware:

   ```bash
   git clone https://github.com/agromate-devs/agrosmart.git
   cd agrosmart
   ```

2. Select your chip (in this case ESP32-S3). Skip this step on an ESP32‑C5, the repository is already configured for it:

   ```bash
   idf.py set-target esp32s3
   ```

3. Open the configuration menu and tweak the config or change the pins and options under **Agrosmart configuration**:

   ```bash
   idf.py menuconfig
   ```

4. Build, flash and open the serial monitor (replace the port with yours):

   ```bash
   idf.py build
   idf.py flash monitor
   ```

5. Pair the device with the app, if you haven't done it yet: see [Pairing the Agrosmart](/docs?article=pairing).

## Configuration options

The default pins for each chip are listed in
[Building an Agrosmart](/docs?article=building_agrosmart).

1. Run `idf.py menuconfig` and open **Agrosmart configuration**.
2. These are (almost) all the options available in the menuconfig:

| Configuration                     | Options                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| DHT Configuration                 | Chip type, DHT data GPIO number                                                         |
| Humidifier configuration          | Humidifier control GPIO number, threshold range, check interval                         |
| Water pump/tank configuration     | Flow rate, water pump control GPIO number, GPIO of water level sensor                   |
| Soil moisture probe configuration | Probe type, probe GPIO number, probe power GPIO number (resistive only), check interval |
| LED strip configuration           | Chip type, LED strip control GPIO number, number of LEDs                                |
| Status LED configuration          | Enable status RGB LED support, GPIO of RGB status LED                                   |
| OTA Configuration                 | OTA resources base URL(default to Github), check interval, security options             |
| NTP Configuration                 | NTP timeout between sync attempts, maximium retry count, NTP server                     |
| `METRIC_PUBLISH_INTERVAL`         | How often temperature, humidity and soil moisture are read and published to MQTT        |

> [!NOTE]
> Mind the units: `SOIL_MOISTURE_CHECK_INTERVAL_MS` and `HUMIDIFIER_CHECK_INTERVAL_MS` are in
> **milliseconds**, the other intervals in **seconds**. With time‑based irrigation the soil interval
> is not used: the pump runs every _n_ hours set for the plant in the app.

3. Save with `S`, exit with `Q`, then rebuild and flash:

   ```bash
   idf.py build
   idf.py flash monitor
   ```

The values are stored in `sdkconfig`. Without menuconfig, you can also edit the file directly, for
example:

```ini
CONFIG_DHT_GPIO=4
CONFIG_WATER_PUMP_GPIO=12
CONFIG_HUMIDIFIER_GPIO=13
```

> [!TIP]
> `idf.py set-target` regenerates `sdkconfig` from the defaults, so your pins are lost when you
> change chip. To keep them, run `idf.py save-defconfig`: it writes the options that differ from the
> defaults to `sdkconfig.defaults`, which is applied every time `sdkconfig` is regenerated.

When picking new pins:

- the soil probe must use an **ADC1** pin, otherwise the build fails:

| Target              | Allowed GPIOs |
| ------------------- | ------------- |
| ESP32               | 32–39         |
| ESP32‑S2 / ESP32‑S3 | 1–10          |
| ESP32‑C5            | 1–5           |

- avoid the pins used by the flash and PSRAM (GPIO 6–11 on the ESP32, 26–32 on most ESP32‑S3
  modules) and the **strapping pins**, which set the boot mode at reset: check your chip's datasheet;
- input‑only pins (GPIO 34–39 on the ESP32) can only be used for the soil probe;
- avoid the USB (D+/D−) and UART0 TX/RX pins if you use them to flash and monitor the board.

## Calibrating the pump

The firmware runs the pump for `60 × water quantity / WATER_PUMP_FLOW_RATE` seconds, so the
amount of water delivered is only correct if the flow rate matches your pump.

Usually the DC pump have the flow rate in the datasheet, if this is not your case, you can use this little workaround:

1. Put the pump outlet into a measuring jug and run it for exactly one minute.
2. Read the amount of water in millilitres.
3. Set that value in **Agrosmart configuration → Water pump configuration → Water pump flow rate**
   and rebuild.
