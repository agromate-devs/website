---
title: First steps
section: Getting started
section_order: 3
order: 10
---

# First steps

This guide takes you from the box to your first monitored plant.

## What you need

- An Android or iOS smartphone with the Agromate app
- A Wi‑Fi network (2.4 GHz if you are not using an ESP32-C5)
- A server with Docker or Node.js <= 24, InfluxDB 2 and Mosquitto installed
- [Hardware components](docs?article=components) to build the Agrosmart

### Docker installation

Agromate supports installation of server components using Docker Compose, problem related to misconfiguration or similar
will be **not** solved in the official issues.

Here, there is a sample docker-compose configuration, put it in a clean folder since it will create some files necessary
for the server, you can tweak this configuration if necessary:

```yaml
services:
  mosquitto:
    image: eclipse-mosquitto:2.1.2-alpine
    container_name: mosquitto
    restart: unless-stopped
    ports:
      - "1883:1883"
    volumes:
      - ./mosquitto/mosquitto.conf:/mosquitto/config/mosquitto.conf:ro
      - mosquitto-data:/mosquitto/data
      - mosquitto-log:/mosquitto/log

  influxdb:
    image: influxdb:2
    container_name: influxdb
    restart: unless-stopped
    ports:
      - "8086:8086"
    environment:
      - DOCKER_INFLUXDB_INIT_MODE=setup
      - DOCKER_INFLUXDB_INIT_USERNAME=agromate
      - DOCKER_INFLUXDB_INIT_PASSWORD=mysupersecretpassword
      - DOCKER_INFLUXDB_INIT_ORG=agromate
      - DOCKER_INFLUXDB_INIT_BUCKET=agromate
      - DOCKER_INFLUXDB_INIT_ADMIN_TOKEN=mysupersecrettoken
    volumes:
      - influxdb-storage:/var/lib/influxdb

  telegraf:
    image: telegraf:1.40.1-alpine
    container_name: telegraf
    restart: unless-stopped
    depends_on:
      - influxdb
      - mosquitto
    environment:
      INFLUX_TOKEN: mysupersecrettoken # Same as DOCKER_INFLUXDB_INIT_ADMIN_TOKEN
      INFLUX_ORG: agromate
      INFLUX_BUCKET: agromate
      MQTT_PASSWORD: "somegeneratedpassword"
    volumes:
      - ./telegraf/telegraf.conf:/etc/telegraf/telegraf.conf:ro
    command: [ "--config", "/etc/telegraf/telegraf.conf" ]

  agromate-server:
    image: andreockx/agromate-server
    container_name: agromate
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "3000:3000"
    depends_on:
      - influxdb
      - mosquitto
    volumes:
      - ./server/data:/app/data
      - server_storage:/app/public

volumes:
  influxdb-storage:
  mosquitto-data:
  mosquitto-log:
  server_storage:
```

> [!CAUTION]
> Change all the default password in the docker-compose.yaml file except the MQTT one that will be generated in the
following step.


And here are the mosquitto and telegraf configuration, put it respectivly in:

- `./mosquitto/mosquitto.conf`
- `./telegraf/telegraf.conf`

In the same folder of the docker-compose.yaml file.

```
# mosquitto.conf
listener 1883 0.0.0.0
persistence true
persistence_location /mosquitto/data/
log_dest file /mosquitto/log/mosquitto.log
plugin /usr/lib/mosquitto_dynamic_security.so
plugin_opt_config_file /mosquitto/data/dynamic-security.json
```

```toml
# telegraf.conf
[agent]
  interval = "10s"
  round_interval = true
  flush_interval = "10s"
  flush_jitter = "0s"
  metric_batch_size = 1000
  metric_buffer_limit = 10000
  omit_hostname = true

[[outputs.influxdb_v2]]
   urls = ["http://influxdb:8086"]
   token = "${INFLUX_TOKEN}"
   bucket = "${INFLUX_BUCKET}"
   organization = "${INFLUX_ORG}"

[[inputs.mqtt_consumer]]
  servers = ["tcp://mosquitto:1883"]
  topics = ["agrosmart/metrics"]
  data_format = "json"
  tag_keys = ["id"]
  json_string_fields = ["id", "type", "temperature", "humidity", "last_irrigation", "water_reserve"]
  username = "telegraf_consumer"
  password = "${MQTT_PASSWORD}"
```

#### Generating Mosquitto password

Now it's time to generate the Mosquitto password, start the Mosquitto container:

```bash
touch .env # Create an empty env file to avoid docker error
docker compose up mosquitto -d
# Wait some time or check that mosquitto has successfully started using: docker logs mosquitto
# Then read the password.
docker exec mosquitto sh -c "cat /mosquitto/data/dynamic-security.json.pw && rm /mosquitto/data/dynamic-security.json.pw"
```

The result of the command should be something similar to:

```text
admin password
democlient password
```

Keep the admin password: you need it to configure the Mosquitto access control list (ACL) in the next step.

#### Configuring the Mosquitto ACL

Mosquitto uses the <a href="https://mosquitto.org/documentation/dynamic-security/" target="_blank">Dynamic Security
plugin</a>, so users, roles
and ACLs are configured by sending commands over MQTT with `mosquitto_ctrl`, the MQTT client included in the Mosquitto
image. The commands are sent as the `admin` user, so define a shell alias to avoid repeating the credentials, replacing
`theadminpassword` with the admin password read above:

```bash
alias dynsec='docker exec mosquitto mosquitto_ctrl -u admin -P "theadminpassword" dynsec'
```

The default roles (`super-admin`, `dynsec-admin`, `sys-observe`, ...) already exist, you only need to create the
Agromate ones.

**Agrosmart role**, used by the Agrosmart devices: they can publish their metrics and exchange messages on the
`agrosmart/` topics, but they can't receive the metrics published by other devices.

```bash
dynsec createRole agrosmart
dynsec addRoleACL agrosmart publishClientSend "agrosmart/#" allow 10
dynsec addRoleACL agrosmart publishClientReceive "agrosmart/#" allow 10
dynsec addRoleACL agrosmart publishClientReceive agrosmart/metrics deny 5
dynsec addRoleACL agrosmart subscribePattern "agrosmart/#" allow 10
dynsec addRoleACL agrosmart subscribePattern agrosmart/metrics deny 5
```

**Camera role**, used by the clients that view or stream the Agrosmart webcam through WebRTC signaling:

```bash
dynsec createRole camera
dynsec addRoleACL camera publishClientSend webrtc/signaling allow
dynsec addRoleACL camera publishClientSend "webrtc/signaling/#" allow
dynsec addRoleACL camera publishClientReceive webrtc/signaling allow
dynsec addRoleACL camera publishClientReceive "webrtc/signaling/#" allow
dynsec addRoleACL camera subscribePattern webrtc/signaling allow
dynsec addRoleACL camera subscribePattern "webrtc/signaling/#" allow
dynsec addRoleACL camera unsubscribePattern webrtc/signaling allow
dynsec addRoleACL camera unsubscribePattern "webrtc/signaling/#" allow
```

**Telegraf role and user**: Telegraf only reads the `agrosmart/` topics and can't publish anything.

```bash
dynsec createRole telegraf_consumer
dynsec addRoleACL telegraf_consumer publishClientSend "agrosmart/#" deny
dynsec addRoleACL telegraf_consumer publishClientReceive "agrosmart/metrics" allow
dynsec addRoleACL telegraf_consumer subscribePattern "agrosmart/metrics" allow
dynsec addRoleACL telegraf_consumer unsubscribePattern "agrosmart/metrics" allow

dynsec createClient telegraf_consumer -p "somegeneratedpassword"
dynsec addClientRole telegraf_consumer telegraf_consumer
```

Put the password chosen for `telegraf_consumer` in the docker-compose file in the `MQTT_PASSWORD` environment variable.

**API server role and user**: the API server can send commands to the devices on the `agrosmart/` topics, but can't
publish fake metrics. It also has the default `dynsec-admin` role, so it can create the MQTT users for the Agrosmart
devices and the cameras, which get the `agrosmart` and `camera` roles created above.

```bash
dynsec createRole api_server
dynsec addRoleACL api_server publishClientSend agrosmart/metrics deny 10
dynsec addRoleACL api_server publishClientSend "agrosmart/#" allow
dynsec addRoleACL api_server publishClientReceive "agrosmart/#" allow
dynsec addRoleACL api_server subscribePattern "agrosmart/#" allow
dynsec addRoleACL api_server unsubscribePattern "agrosmart/#" allow

dynsec createClient api_server -p "someothergeneratedpassword"
dynsec addClientRole api_server api_server
dynsec addClientRole api_server dynsec-admin
```

> [!NOTE]
> Topics containing `#` are quoted so that the shell doesn't treat them as comments. When no priority is given, the
> ACL gets the default priority `-1`.

You can check the result with:

```bash
dynsec listRoles
dynsec getClient telegraf_consumer
dynsec getClient api_server
```

> [!WARNING]
> The default `democlient` user has read/write access to every topic, if you don't need it remove it with
> `dynsec deleteClient democlient`.

#### Configuring the server

The Agromate server reads its configuration from the `.env` file in the same folder of the docker-compose.yaml file.
Replace the empty file created before with the following content:

```bash
DATABASE_URL=file:/app/data/agromate.db
JWT_SECRET=mysupersecret
COOKIE_SECRET=mysupersecret2
MQTT_URL=mqtt://mosquitto:1883
MQTT_PASSWORD=someothergeneratedpassword # Password of the api_server MQTT user
INFLUX_HOST=http://influxdb:8086
INFLUX_TOKEN=mysupersecrettoken # Same as DOCKER_INFLUXDB_INIT_ADMIN_TOKEN
INFLUX_BUCKET=agromate
INFLUX_ORG=agromate
# Needed only for TURN support in webcam
TURN_URL=turn.example.com:50000
TURN_SECRET=replace-with-your-turn-secret
# 2MB in bytes
MAX_IMAGE_SIZE=2097152
# Password reset email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user@example.com
SMTP_PASSWORD=replace-with-your-smtp-password
SMTP_FROM=Agromate <no-reply@example.com>
RESET_PASSWORD_URL=http://your-ip:3000/reset_password.html
# 15 minutes
AGROSMART_CACHE_TTL_MS=900000
NOTIFICATION_COOLDOWN_MINUTES=360
ALERT_DRY_RUN=false
```

> [!CAUTION]
> Replace `JWT_SECRET` and `COOKIE_SECRET` with long random strings (for example generated with
> `openssl rand -hex 32`), and never publish your `.env` file.

Before starting the whole stack, give the server container user (UID `100`, GID `101`) the ownership of the folders
mounted as volumes, otherwise the server can't write the database and the uploaded images:

```bash
mkdir -p server/data server/public
sudo chown -R 100:101 server/data server/public
```

Now you are ready to run the whole Agromate stack!

```bash
docker compose up -d
```

Going to your-ip:3000 should give you an unauthorized response.

> [!TIP]
> The server adds the [default plants](/docs?article=default_plants) to the database automatically every time it
> starts.

> [!WARNING]
> The `./server/public` volume replaces the `public` folder of the image, so the plant images are not there on the
> first start. Copy the `public/plants/` folder of the server repository into `./server/public/plants/`, otherwise the
> catalog shows the plants without images.

If all is fine, you are ready to [build your first Agrosmart!](/docs?article=building_agrosmart)

> [!TIP]
> To receive a notification on your phone when the water tank is running low or the temperature is out of range,
> configure Firebase as described in [Push notifications](/docs?article=push_notifications).
