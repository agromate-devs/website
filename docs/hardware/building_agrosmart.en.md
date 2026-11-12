---
title: Building an Agrosmart
description: Hardware, wiring, default pins and firmware setup to build your own Agrosmart.
section: Hardware
section_order: 3
order: 11
draft: false
---

# Building an Agrosmart

This guide covers building an Agrosmart from scratch: the parts you need, how to wire them to the
ESP32, which GPIOs the firmware uses by default, and how to change them if your board is different.

> [!NOTE]
> The reference board is an **ESP32‑C5** devkit: it is the target built by the firmware CI
> and the one the committed `sdkconfig` is configured for. ESP32 and
> ESP32‑S3 are supported ([but not tested yet](/docs?article=writing-docs)) too, but you will have to
> build the firmware yourself with your pins (see [Customizing the firmware](/docs?article=custom_firmware)).

## Required hardware

| Qty | Part                            | Notes                                                                                                                                |
| --- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | ESP32 devkit                    | ESP32‑C5 recommended due to WiFi 5 GHz support. A board with an onboard RGB LED enable status LED without wiring one                 |
| 1   | Temperature/humidity sensor     | DHT22 / AM2301 / AM2302 / AM2321 (default) or DHT11                                                                                  |
| 1   | Soil moisture probe             | Capacitive (default) or resistive                                                                                                    |
| 1   | Water pump                      | Any DC pump are supported                                                                                                            |
| 1   | Water level sensor              | The firmware is tested with XKC-Y23A-NPN but any low level water level sensor is fine                                                |
| 1   | Humidifier                      | Any humidifier are supported                                                                                                         |
| 1   | Addressable LED strip           | WS2812 (default), WS2811, WS2816 or SK6812                                                                                           |
| 2   | Switching stages                | Logic‑level MOSFET modules or relay modules, one for the pump, one for the humidifier                                                |
| 1   | 5 V power supply                | Sized for the LED strip, pump and humidifier (see _Power_ below)                                                                     |
| —   | Passive parts                   | 10 kΩ pull‑up for the DHT (if not on the module), 330 Ω resistor and 1000 µF capacitor for the LED strip, flyback diode for the pump |
| —   | Wires, breadboard or protoboard |                                                                                                                                      |

## Default config

The firmware reads every pin from Kconfig options in the **Agrosmart configuration** menu. The
defaults depend on the target chip:

| Signal                                                    | Kconfig option                    | ESP32‑C5 | ESP32 / ESP32‑S2 / ESP32‑S3        |
| --------------------------------------------------------- | --------------------------------- | -------- | ---------------------------------- |
| DHT pinout                                                | `CONFIG_DHT_GPIO`                 | 28       | 17                                 |
| Soil moisture probe (ADC)                                 | `CONFIG_SOIL_MOISTURE_GPIO`       | 3        | 8                                  |
| Resistive probe power(if you are using a resistive probe) | `CONFIG_SOIL_MOISTURE_POWER_GPIO` | 15       | 19                                 |
| Humidifier MOSFET/Relay                                   | `CONFIG_HUMIDIFIER_GPIO`          | 10       | 16                                 |
| Water pump MOSFET/Relay                                   | `CONFIG_WATER_PUMP_GPIO`          | 23       | 13                                 |
| Water level sensor                                        | `CONFIG_WATER_LEVEL_SENSOR_GPIO`  | 6        | 14                                 |
| LED strip data (optional)                                 | `CONFIG_LED_STRIP_GPIO`           | 5        | 21                                 |
| Status RGB LED (optional)                                 | `CONFIG_STATUS_LED_GPIO`          | 27       | 48 on ESP32‑S3, none on ESP32 / S2 |

The firmware published in the releases uses these defaults: a DHT22/AM2301 sensor, a capacitive soil
probe, a WS2812 strip with 30 LEDs and a pump flow rate of 1400 ml/min. To change any of them, see
<a href="/docs?article=custom_firmware" target="_blank">Customizing the
firmware</a>.

## Wiring

All signals are **3.3 V**. Never feed 5 V into an ESP32 GPIO, and always connect the grounds of
every power supply together.

### Temperature and humidity sensor

| Sensor pin | ESP32             |
| ---------- | ----------------- |
| VCC        | 3.3 V             |
| DATA       | `CONFIG_DHT_GPIO` |
| GND        | GND               |

Put a 10 kΩ pull‑up resistor between DATA and 3.3 V, unless your sensor is on a breakout board that
already has one.

### Water level sensor

| Sensor pin | XKC-Y23A-NPN                     |
| ---------- | -------------------------------- |
| VCC        | 3.3 V                            |
| DATA       | `CONFIG_WATER_LEVEL_SENSOR_GPIO` |
| GND        | GND                              |

Remember to calibrate the sensor if you use XKC-Y23A-NPN and always use 3.3V to power it otherwise it doesn't work.

### Soil moisture probe

| Probe pin | ESP32                                                               |
| --------- | ------------------------------------------------------------------- |
| VCC       | 3.3 V (capacitive) or `CONFIG_SOIL_MOISTURE_POWER_GPIO` (resistive) |
| AOUT      | `CONFIG_SOIL_MOISTURE_GPIO`                                         |
| GND       | GND                                                                 |

The probe is read through **ADC1** so make sure that GPIO is on ADC or build will fail.

With a resistive probe, power it from `CONFIG_SOIL_MOISTURE_POWER_GPIO` instead of 3.3 V: the pin is
meant to power the probe only while taking a reading, which slows down electrode corrosion.

> [!IMPORTANT]
> The probe pin must be an **ADC1** pin, because ADC2 cannot be used while Wi‑Fi is active. The
> firmware checks this at build time and refuses other pins:
>
> | Target              | Allowed GPIOs |
> | ------------------- | ------------- |
> | ESP32               | 32–39         |
> | ESP32‑S2 / ESP32‑S3 | 1–10          |

### Water pump and humidifier

The firmware drives `CONFIG_WATER_PUMP_GPIO` and `CONFIG_HUMIDIFIER_GPIO` as plain digital outputs.
A GPIO cannot power a pump or a humidifier directly, so each load needs a
switching stage:

- **Logic‑level N‑channel MOSFET** (recommended):
  - Source connected to the GND of power supply
  - Gate connected to the GPIO through a 220 Ω resistor
  - Drain connected to the GND of pump/humidifier
  - Put a 10 kΩ resistor between gate and GND
- **Relay module**: use one that switches on with a HIGH input and works with 3.3 V logic.

If your humidifier or water pump runs on mains power, switch it with a properly rated relay module in an enclosed
case, and keep it away from water.

### LED strip

| Strip pin | Connection                                       |
| --------- | ------------------------------------------------ |
| 5V        | 5 V power supply                                 |
| DIN       | `CONFIG_LED_STRIP_GPIO` through a 330 Ω resistor |
| GND       | Power supply GND **and** ESP32 GND               |

Put a 1000 µF capacitor across 5V and GND near the strip. Most WS2812 strips accept a 3.3 V data
signal over short wires; with long wires or flickering LEDs, add a level shifter (e.g. 74AHCT125).
The strip is driven by the RMT peripheral, so any output‑capable GPIO works.

### Status LED

If your devkit has an onboard addressable RGB LED (WS2812 / SK6805), enable `ENABLE_STATUS_LED`
and set `CONFIG_STATUS_LED_GPIO` to its pin (27 on ESP32‑C5 devkits, 48 on ESP32‑S3, 8 on
ESP32‑C6). You can also wire a LED and drive it with a MOSFET like the water pump.

The LED will have the following colors depending on the Agrosmart states:

- Yellow until is not paired and Smartconfig is running
- Blue while the pump is running.
- Green is Agrosmart is paired and all is fine.
- Red in case of errors (can't connect to WiFi, MQTT error, ...)

### Power

Size the 5 V supply for everything it powers. A WS2812 LED draws up to about 60 mA at full white,
so 30 LEDs can draw up to 1.8 A on their own; add the pump current and some margin. 2.5 A power supply should be fine.
Don't connect USB while powering ESP
from a 5V supply through 5V pin

## Flashing the firmware

The ready-to-flash firmware is published in the
[GitHub releases](https://github.com/agromate-devs/agrosmart/releases) of the firmware repository.
It is built for the **ESP32‑C5** with the default pins listed above: if you use another chip or
other pins, build it yourself instead (see [Customizing the firmware](/docs?article=custom_firmware)).

1. Download the `.zip` file from the latest release and extract it. It contains the four files
   needed to flash the ESP32:

| File                   | Flash address |
| ---------------------- | ------------- |
| `bootloader.bin`       | `0x2000`      |
| `partition-table.bin`  | `0x8000`      |
| `ota_data_initial.bin` | `0xe000`      |
| `agrosmart.bin`        | `0x10000`     |

2. Install [esptool](https://docs.espressif.com/projects/esptool/en/latest/) (requires Python):

   ```bash
   pip install esptool
   ```

3. Connect the ESP32 to the computer with a USB cable and find its serial port: `/dev/ttyUSB*` or
   `/dev/ttyACM*` on Linux, `/dev/cu.usbserial-*` or `/dev/cu.usbmodem*` on macOS, `COM*` on Windows.

4. From the folder where you extracted the zip, flash the four files (replace the port with yours):

   ```bash
   esptool --chip esp32c5 -p /dev/ttyUSB0 -b 460800 \
     --before default-reset --after hard-reset \
     write-flash --flash-mode dio --flash-size 4MB --flash-freq 80m \
     0x2000 bootloader.bin \
     0x8000 partition-table.bin \
     0xe000 ota_data_initial.bin \
     0x10000 agrosmart.bin
   ```

   On Windows, write the command on a single line without the `\`.

5. When esptool prints `Hard resetting via RTS pin...`, the Agrosmart restarts with the new
   firmware. Pair it with the app: see [Pairing the Agrosmart](/docs?article=pairing).

> [!NOTE]
> With esptool versions older than 5, the command is `esptool.py` and the options use underscores:
> `write_flash`, `--flash_mode`, `--flash_size`, `--flash_freq`, `--before default_reset`,
> `--after hard_reset`.
