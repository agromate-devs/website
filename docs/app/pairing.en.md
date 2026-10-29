---
title: Pairing the Agrosmart
description: Connect the greenhouse to Wi-Fi and to your account.
section: Mobile app
section_order: 5
order: 11
---

# Pairing the Agrosmart

Pairing sends the Wi‑Fi credentials to the ESP32 through a protocol called **ESP‑Touch v2** (SmartConfig), straight from
your smartphone.

> [!IMPORTANT]
> To read the Wi‑Fi network name the app needs the **location** permission and location services turned on.

## Procedure

1. Turn on the Agrosmart.
2. In the app, choose the plant to grow in the Search section and tap **Plant** then tap **Start the pairing**. Location
   permission and WiFi
   password will be asked.
4. Wait for the confirmation: the phone will send Wi-Fi SSID+password and MQTT connection details to the Agrosmart
   using the ESP-Touch v2 protocol.

<div class="grid grid-cols-2 gap-2">
    <img src="/pairing_view.png" class="w-70" />
    <img src="/plant_care_view_1.png" class="w-70"/>
</div>

## Troubleshooting

1. If something go wrong after the plant configuration, the Agrosmart will have the status LED (if present) of red
   color.
   In this case can be useful to attach Agrosmart to PC and read the serial console in order to debug the problem.

2. If you go back in the app before completing the plant configuration, the Agrosmart remains in a stall phase where it
   waits for plant configuration indefinitely. In that case the only possible solution at the moment is to attach
   Agrosmart
   to PC and erase the flash:

    ```bash
    esptool erase-flash
    ```

3. If the Agrosmart can't connect to the supplied network, you can check two thing:

    - The supplied Wi-Fi network is 5GHz and it's not separated from the 2.4GHz. In there are two solutions:
        - Use an ESP32 that supports the 5GHZ Wi-Fi like the ESP32-C5
        - Separate the 2.4GHZ and the 5GHZ by giving them two different SSID then connect the phone to the 2.4GHz one
          before
          starting the pairing process
    - The Wi-Fi is too far from the Agrosmart. Use a Wi-Fi extender or build an antenna to help gaining signal
      if possible

