---
title: Introduzione
section: Introduzione
section_order: 1
---

# Benvenuto nella documentazione di Agromate

Agromate è una **serra smart open source** costruita attorno a un ESP32. Il dispositivo, chiamato **Agrosmart**, legge i
parametri vitali della pianta e gestisce in autonomia irrigazione, illuminazione e umidità, seguendo la configurazione
impostata dall'app mobile.

> [!NOTE]
> La documentazione è in fase di scrittura. Le pagine contrassegnate come **Bozza** contengono una struttura provvisoria
> che verrà completata.

## Componenti del progetto

| Componente         | Tecnologia                           | Repository                                                                      |
| ------------------ | ------------------------------------ | ------------------------------------------------------------------------------- |
| Firmware Agrosmart | C, ESP-IDF, FreeRTOS                 | [agromate-devs/agrosmart](https://github.com/agromate-devs/agrosmart)           |
| App mobile         | Flutter, MobX                        | [agromate-devs/new_mobile_app](https://github.com/agromate-devs/new_mobile_app) |
| Server             | Fastify, Prisma, Mosquitto, InfluxDB | —                                                                               |

## Come è organizzata

- **Per iniziare** — dai primi passi all'abbinamento del dispositivo.
- **Hardware** — componenti, collegamenti e GPIO predefiniti.
- **Firmware** — compilazione, configurazione e protocollo MQTT.
- **App mobile** — funzionalità e schermate dell'app.
- **Contribuire** — come scrivere nuove pagine di documentazione.

Inizia da [Primi passi](getting_started/first_steps.en.md).
