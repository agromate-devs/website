---
title: Introduction
section: Introduction
section_order: 1
order: 0
---

# Welcome to the Agromate documentation

Agromate is an **open source platform to build your own smart greenhouse** around an ESP32. It is not a ready-made
greenhouse: it provides the firmware, the mobile app and the server, and you build the greenhouse you prefer around
them. The device running the firmware, called **Agrosmart**, reads the plant's vital parameters and autonomously manages
watering, lighting and humidity, following the configuration set from the mobile app.

> [!NOTE]
> The documentation is being written. Pages marked as **Draft** contain a provisional structure that will be completed.

## Project components

| Component          | Technology                           | Repository                                                                      |
| ------------------ | ------------------------------------ | ------------------------------------------------------------------------------- |
| Agrosmart firmware | ESP-IDF                              | [agromate-devs/agrosmart](https://github.com/agromate-devs/agrosmart)           |
| Mobile app         | Flutter                              | [agromate-devs/mobile_app](https://github.com/agromate-devs/mobile_app) |
| Server             | Fastify, Prisma, Mosquitto, InfluxDB | [agromate-devs/server](https://github.com/agromate-devs/server)                 |

## How the docs is organized

- **Getting started** — from the first steps to pairing the device.
- **Hardware** — components, wiring and default GPIOs.
- **Firmware** — building, configuration and MQTT protocol.
- **Mobile app** — app features and screens.
- **Contributing** — how the repositories are organized and how to contribute to the code.

Start from [First steps](/docs?article=first_steps).
