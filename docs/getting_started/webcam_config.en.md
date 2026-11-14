---
title: Webcam configuration
section: Getting started
section_order: 3
order: 12
---

# Webcam configuration

Agromate can show a live view of your plants in the **Webcam** tab of the app. The video is streamed by the [camera
service](https://github.com/agromate-devs/camera), a small program distributed as a Docker image that runs on any Linux
machine with a webcam attached (a Raspberry Pi works well) and talks to the rest of the Agromate stack.

This guide assumes you already have a working server, as described in [First steps](/docs?article=first_steps).

## What you need

- A Linux machine with a USB or CSI webcam, reachable as a V4L2 device
- Docker Engine with the Compose plugin
- Python 3, only to generate the camera credentials: no virtual environment or extra modules are needed
- The address of your Mosquitto broker that will serve as signaling server for the webcam
- The URL of your Agromate API server
- The Agromate app, logged in with the account that will own the camera
- Optionally, a TURN server to watch the camera in case of "strict" NAT with your ISP (typically mobile ones)

> [!WARNING]
> The camera needs **Docker Engine on Linux**. Docker Desktop on macOS and Windows runs containers in a virtual machine:
> it cannot pass the webcam to the container and the host network does not work the same way.

## Installing dependencies

Install Docker Engine following the [official guide](https://docs.docker.com/engine/install/) for your distribution.
Then, on Debian, Ubuntu or derivates, install the other tools:

```bash
sudo apt update
sudo apt install git python3 v4l-utils
```

The camera itself runs in the `andreockx/agromate-webcam:latest` image, which already contains all its dependencies.
From the [camera repository](https://github.com/agromate-devs/camera) you only need `setup_mqtt_client.py`, the script
that generates the credentials:

```bash
wget https://raw.githubusercontent.com/agromate-devs/camera/refs/heads/main/setup_mqtt_client.py -O setup_mqtt_client.py
```

## Finding your webcam

List the video devices and the resolutions they support:

```bash
v4l2-ctl --list-devices
v4l2-ctl -d /dev/videoN --list-formats-ext
```

Many webcams register more than one `/dev/videoN` node: use the one that lists actual resolutions. Note down the device
and a supported resolution (e.g. `640x480`): you will set them in the Docker Compose service later.

Note down also the numeric GID of the `video` group, which owns the webcam devices:

```bash
getent group video | cut -d: -f3
```

## Generating the camera credentials

Each camera has its own **username** (`cam_xxxxxxxx`) and **password**. The username identifies the camera everywhere:
on the Agromate server, on the MQTT broker and during the WebRTC signaling. Generate them with
`setup_mqtt_client.py`, writing the configuration in a `webcam` folder next to your `docker-compose.yaml`:

```bash
cd /path/to/your/compose/folder
mkdir -p webcam
python3 setup_mqtt_client.py \
  --broker 127.0.0.1 \
  --server-url http://127.0.0.1:3000 \
  --output webcam/camera_config.json
```

| Option           | Default              | Description                                |
| ---------------- | -------------------- | ------------------------------------------ |
| `--broker`, `-b` | (required)           | Hostname or IP of the Mosquitto broker     |
| `--port`, `-p`   | `1883`               | Broker port                                |
| `--server-url`   | (required)           | Base URL of the Agromate server            |
| `--output`, `-o` | `camera_config.json` | Where to write the generated configuration |

The container uses the host network, so if it runs on the same machine as the rest of the stack the broker and the
server are reachable at `127.0.0.1`: the Compose service names (`mosquitto`, `agromate-server`) are **not** resolved.
If the camera runs on another machine, use the IP address of the server instead.

The script works offline: it generates a random username and password, saves them in `camera_config.json` and prints
them. It does not need the Mosquitto admin password and does not contact the broker or the server: the camera is
registered by the server when you add it from the app.

```text
[OK] Config saved in: webcam/camera_config.json
Add the webcam from the Agromate app with these credentials:
  Username: cam_...
  Password: ...
```

```json
{
  "broker": "127.0.0.1",
  "port": 1883,
  "username": "cam_...",
  "password": "...",
  "server_url": "http://127.0.0.1:3000"
}
```

Inside the container the camera runs as the unprivileged user with UID `10001`: give the file to that user and make it
readable only by it:

```bash
sudo chown 10001 webcam/camera_config.json
sudo chmod 600 webcam/camera_config.json
```

> [!CAUTION]
> `camera_config.json` contains the camera's password in clear text. Whoever has the username and password can add the
> camera to their account.

> [!IMPORTANT]
> Create `camera_config.json` **before** starting the container. If the file does not exist, Docker creates an empty
> directory with the same name and the camera fails with `IsADirectoryError`.

## Pairing the camera with the app

You need the username and password printed by `setup_mqtt_client.py`. If you no longer have them, read them from the
configuration file:

```bash
sudo grep -E '"(username|password)"' webcam/camera_config.json
```

Then, in the app:

1. Open the **Webcam** tab from the bottom navigation bar.
2. Tap the **+** button in the top right corner. The **Add Webcam** dialog opens.
3. Fill in **Webcam username** and **Webcam password** with the camera credentials, and in **Webcam Name** choose a
   name to recognize it, e.g. `Greenhouse 1`.
4. Confirm: the camera appears in the list.

<div class="grid grid-cols-2">
    <img class="w-80" src="/add_webcam_view.png" alt="View of the add webcam dialog" />
    <img class="w-80" src="/webcam_view.png" alt="View of the webcam tab"/>
</div>

The camera shows up on every phone where you log in with the same account, and no other account can watch it. Start the
camera container only **after** adding it to the app: until then its MQTT account does not exist and the connection to
the broker is refused.

To watch it, tap the camera in the list. The app asks for your **account password**: it is used to log in to the MQTT
broker, through which the phone and the camera exchange the WebRTC connection details. Tap **Connect to Webcam** and the
video opens in landscape full screen once the connection is established.

<img src="/webcam_psw_dialog.png" class="w-80">

> [!NOTE]
> The MQTT password of your account is kept in sync with your Agromate password: after changing it from the app, use the
> new one to watch the cameras too.

<!-- TODO: screenshot of the live video -->

[//]: # '![Live video](/docs-assets/webcam/webcam-viewer.png)'

> [!NOTE]
> A camera can be paired with only one account. If adding it fails with _Failed to add webcam_, check that username and
> password are copied exactly (the username has the form `cam_` followed by 8 lowercase letters or digits, the password
> is at least 16 characters long) and that the camera has not already been added, then look at the server log.

### Removing a camera

Swipe the camera to the left in the list and confirm the deletion. The server removes the camera, its MQTT account and
its role, so the camera container can no longer connect to the broker. To use it again, generate new credentials with
`setup_mqtt_client.py` (or reuse the ones in `camera_config.json`) and add it from the app again.

## Usage with Docker

### Adding the service

You can start using the webcam server with Docker by creating a docker-compose (or putting it in the same file of the
server):

```yaml
services:
  agromate-webcam:
    image: andreockx/agromate-webcam:latest
    container_name: agromate-webcam
    restart: unless-stopped
    network_mode: host
    # Enable depends_on only if you are sharing docker-compose file with the agromate-server
    #    depends_on:
    #      - agromate-sserver
    #      - mosquitto
    devices:
      - /dev/video0:/dev/video0
    group_add:
      - '39' # GID of the host "video" group, check it with: getent group video
    environment:
      VIDEO_DEVICE: /dev/video0
      VIDEO_SIZE: 640x480
      VIDEO_FORMAT: v4l2
    volumes:
      - ./webcam/camera_config.json:/app/camera_config.json:ro
```

The video options are set with environment variables:

| Variable       | Default       | Description                                                                                                                                                                   |
| -------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VIDEO_DEVICE` | `/dev/video0` | Video device to stream                                                                                                                                                        |
| `VIDEO_SIZE`   | `640x480`     | Resolution, must be one supported by the webcam. Sometimes cheap cameras expose an unsupported resolution, in that case stream will be blank or an error is going to be throw |
| `VIDEO_FORMAT` | `v4l2`        | FFmpeg input format                                                                                                                                                           |

The other settings in the service:

- `devices` makes the webcam available in the container. Use the device you found in _Finding your webcam_ and set the
  same path in `VIDEO_DEVICE`.
- `group_add` gives the container access to the device: it must be the **numeric** GID of the `video` group on the
  host. The group name doesn't work, because the group IDs inside the image are different from the host ones.
- `network_mode: host` lets WebRTC announce the real IP address of the machine. With the default Docker network the
  camera would announce the container's internal address, and phones could connect only through a TURN server.

To get more detailed logs, add `command: ['--log-level', 'DEBUG']` to the service (`DEBUG`, `INFO`, `WARNING`, `ERROR`
or `CRITICAL`, default `INFO`).

### Starting it

Start the container only **after** adding the camera from the app: until then the broker refuses the connection and the
container keeps restarting.

```bash
docker compose up -d agromate-webcam
docker compose logs -f agromate-webcam
```

You should see something like:

```text
Starting WebRTC camera cam_... sender with MQTT signaling to broker 127.0.0.1:1883
2026-10-11 10:00:00 [INFO] root: Subscribed to 'webrtc/cam_.../signaling'
2026-10-11 10:00:01 [INFO] root: TURN credentials updated (ttl=3600s). Next refresh in 3480s.
```

Open the **Webcam** tab in the app: when a viewer connects the log shows `Offer received from viewer` followed by
`Connection state is connected`.

After changing the service, run `docker compose up -d agromate-webcam` again to recreate the container. The container
starts again at boot and after a crash thanks to `restart: unless-stopped`.

> [!TIP]
> If you have no image, try the sample video instead of the webcam with
> `docker compose run --rm agromate-webcam --test`: if it plays, the network side is fine and the problem is the webcam
> device, its resolution or its permissions.

## Watching from outside your network (TURN)

The camera always uses Google's public STUN server, which is enough when the phone and the camera are on the same
network or behind simple NATs. To reliably watch the camera from mobile data you need a TURN server, usually
[coturn](https://github.com/coturn/coturn), reachable from the internet.

The Agromate server hands out temporary TURN credentials using the TURN REST API mechanism: coturn and the server share
a secret, and coturn validates credentials without storing any user. A minimal `/etc/turnserver.conf`:

```ini
listening-port=3478
realm=turn.example.com
external-ip=<your public IP>

use-auth-secret
static-auth-secret=<long random secret, e.g. from `openssl rand -hex 32`>

fingerprint
no-loopback-peers
no-multicast-peers

min-port=49152
max-port=65535
```

Open `3478` (TCP and UDP) and the relay range `49152-65535` (UDP) on your firewall and router.

### Configuring the Agromate server

The server generates the TURN credentials for both the app and the camera through its `/turn` endpoint. To enable it,
set two environment variables:

| Variable      | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `TURN_URL`    | Host and port of the TURN server, **without** the `turn:` prefix, e.g. `turn.example.com:3478` |
| `TURN_SECRET` | The same value as `static-auth-secret` in `turnserver.conf`                                    |

If you use the Docker Compose setup from [First steps](/docs?article=first_steps), add the variables to the
`agromate-server` service:

```yaml
agromate-server:
  # ...
  environment:
    TURN_URL: turn.example.com:3478
    TURN_SECRET: <same value as static-auth-secret>
```

The variables are read only at startup, so restart the server afterwards (`docker compose up -d agromate-server` with
Docker). If one of the two is missing, the server logs
`TURN endpoint disabled: TURN_SECRET and/or TURN_URL not set in environment variables` and `/turn` is not available.

> [!CAUTION]
> Anyone who knows `TURN_SECRET` can create valid credentials for your TURN server and use it as a relay. Generate a
> long random value and store it securely.

## Troubleshooting

| Symptom                                              | Likely cause                                                                                                    |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `Configuration file 'camera_config.json' not found.` | The `volumes` entry is missing, or does not mount the file at `/app/camera_config.json`                         |
| `MQTT username or password not found`                | `camera_config.json` is incomplete: run `setup_mqtt_client.py` again                                            |
| Connection refused / not authorized on MQTT          | Wrong broker address, or the camera has not been added from the app (or was removed)                            |
| `GET /turn failed (401)`                             | The camera has not been added from the app, or its credentials do not match                                     |
| `TURN updater: failed to fetch credentials, ...`     | Agromate server unreachable, or `/turn` disabled (see the server log)                                           |
| `No video stream available from player.`             | Wrong `VIDEO_DEVICE`, or `VIDEO_SIZE` not supported by the webcam                                               |
| `IsADirectoryError: ... 'camera_config.json'`        | The file did not exist at the first start: remove the `webcam/camera_config.json` directory and create the file |
| `PermissionError: ... 'camera_config.json'`          | The file is not readable by UID `10001`: `sudo chown 10001 webcam/camera_config.json`                           |
| Permission denied or no such device on `/dev/videoN` | `VIDEO_DEVICE` differs from the path in `devices`, or `group_add` is not the GID of the host `video` group      |
| Works at home, not on mobile data                    | No TURN server, or its ports are not reachable from the internet                                                |
