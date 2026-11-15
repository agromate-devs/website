---
title: Protocollo MQTT
description: Topic e payload scambiati tra Agrosmart e server.
section: Firmware
section_order: 4
---

# Protocollo MQTT

L'Agrosmart comunica con il broker **Mosquitto**. Ogni dispositivo è identificato dal proprio indirizzo MAC (12 cifre esadecimali, senza separatori) e ha permessi dedicati tramite le ACL dinamiche.

## Topic

| Topic                      | Direzione            | Contenuto                              |
| -------------------------- | -------------------- | -------------------------------------- |
| `agrosmart/metrics`        | dispositivo → server | Misure periodiche dei sensori          |
| `agrosmart/info`           | dispositivo → server | Informazioni su firmware e connessione |
| `agrosmart/<MAC>/settings` | server → dispositivo | Configurazione della pianta e comandi  |

## Metriche

Pubblicate ogni `METRIC_PUBLISH_INTERVAL` secondi e raccolte da Telegraf in InfluxDB.

```json
{
  "id": "A1B2C3D4E5F6",
  "temperature": 22.4,
  "humidity": 54,
  "soil_moisture": 38
}
```

## Configurazione della pianta

Esempio di messaggio inviato su `agrosmart/<MAC>/settings`:

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
> `lightColor` è il valore ARGB a 32 bit del colore scelto nell'app, serializzato come stringa.

### Campi

<!-- TODO: descrivere ogni campo, unità di misura e valori ammessi -->

_Sezione da scrivere._

## Informazioni sul dispositivo

<!-- TODO: documentare i campi di agrosmart/info (firmware_hash, idf_version, wifi_rssi, ...) -->

_Sezione da scrivere._

## Signaling delle webcam

Le webcam usano il broker per scambiare con l'app i dati della connessione WebRTC. Ogni webcam è identificata dal proprio username (`cam_xxxxxxxx`), che è anche il suo username MQTT.

| Topic                           | Contenuto                                                   |
| ------------------------------- | ----------------------------------------------------------- |
| `webrtc/<username>/signaling`   | Canale principale: `register-viewer` e `viewer-registered`  |
| `webrtc/<username>/<viewer id>` | Canale riservato a un viewer: offer, answer e candidati ICE |

Quando la webcam viene aggiunta dall'app, il server crea tramite il plugin dynamic security il client MQTT della webcam e un ruolo `webcam_<username>` che consente publish e subscribe solo su `webrtc/<username>/#`. Il ruolo viene assegnato alla webcam e all'account del proprietario, quindi nessun altro utente può vedere lo stream. Quando la webcam viene eliminata, client e ruolo vengono rimossi.
