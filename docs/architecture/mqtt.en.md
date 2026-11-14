---
title: MQTT protocol
description: Topics and payloads exchanged between Agrosmart and the server.
section: Architecture
section_order: 5
order: 31
draft: true
---

# MQTT protocol

The Agrosmart talks to the **Mosquitto** broker. Each device is identified by its MAC address (12 hexadecimal digits, no
separators) and has dedicated permissions through dynamic ACLs.

## Topics

| Topic                      | Direction       | Content                             |
| -------------------------- | --------------- | ----------------------------------- |
| `agrosmart/metrics`        | device → server | Periodic sensor measurements        |
| `agrosmart/<MAC>/info`     | device → server | Firmware and connection information |
| `agrosmart/<MAC>/settings` | server → device | Plant configuration and commands    |

## Metrics

Published every `METRIC_PUBLISH_INTERVAL` seconds and collected by Telegraf into InfluxDB.

```json
{
  "id": "A1B2C3D4E5F6",
  "temperature": 22.4,
  "humidity": 54,
  "soil_moisture": 38
}
```

## Plant configuration

Example message sent on `agrosmart/<MAC>/settings`:

```json
{
  "type": "config",
  "soilMoisture": 30,
  "targetHumidity": 50,
  "lightIntensity": 5,
  "temperatureMin": 20,
  "temperatureMax": 25,
  "lightDuration": "09:00-17:00",
  "lightColor": "4294901760",
  "isTimeBasedIrrigationEnabled": false,
  "wateringFrequency": null,
  "waterQuantity": 202
}
```

> [!NOTE]
> `lightColor` is the 32-bit ARGB value of the color chosen in the app, serialized as a string.

### Fields

<!-- TODO: describe each field, unit of measure and allowed values -->

_Section to be written._

## Device information

<!-- TODO: document the agrosmart/info fields (firmware_hash, idf_version, wifi_rssi, ...) -->

_Section to be written._

## Webcam signaling

Webcams use the broker to exchange the WebRTC connection details with the app. Each webcam is identified by its
username (`cam_xxxxxxxx`), which is also its MQTT username.

| Topic                           | Content                                                       |
| ------------------------------- | ------------------------------------------------------------- |
| `webrtc/<username>/signaling`   | Main channel: `register-viewer` and `viewer-registered`       |
| `webrtc/<username>/<viewer id>` | Channel reserved to one viewer: offer, answer, ICE candidates |

When the webcam is added from the app, the server uses the dynamic security plugin to create the webcam's MQTT client
and a `webcam_<username>` role that allows publish and subscribe only on `webrtc/<username>/#`. The role is assigned to
the webcam and to the owner's account, so no other user can watch the stream. When the webcam is deleted, both the
client and the role are removed.
