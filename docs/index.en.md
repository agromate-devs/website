---
title: Introduction
section: Introduction
section_order: 1
order: 0
---

# Welcome to the Agromate documentation

Agromate is an **open source smart greenhouse** built around an ESP32. The device, called **Agrosmart**, reads the
plant's vital parameters and autonomously manages watering, lighting and humidity, following the configuration set from
the mobile app.

> [!NOTE]
> The documentation is being written. Pages marked as **Draft** contain a provisional structure that will be completed.

## Project components

| Component          | Technology                           | Repository                                                                      |
| ------------------ | ------------------------------------ | ------------------------------------------------------------------------------- |
| Agrosmart firmware | ESP-IDF                              | [agromate-devs/agrosmart](https://github.com/agromate-devs/agrosmart)           |
| Mobile app         | Flutter                              | [agromate-devs/new_mobile_app](https://github.com/agromate-devs/new_mobile_app) |
| Server             | Fastify, Prisma, Mosquitto, InfluxDB | [agromate-devs/server](https://github.com/agromate-devs/server)                 |

## How the docs is organized

- **Getting started** — from the first steps to pairing the device.
- **Hardware** — components, wiring and default GPIOs.
- **Firmware** — building, configuration and MQTT protocol.
- **Mobile app** — app features and screens.
- **Contributing** — how to write new documentation pages.

Start from [First steps](/docs?article=first_steps).
