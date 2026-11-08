---
title: Webcam configuration
section: Getting started
section_order: 3
order: 12
draft: true
---

# Webcam configuration

Agromate can show a live view of your plants in the **Webcam** tab of the app. The video is streamed by the
[camera service](https://github.com/agromate-devs/camera), a small Python program that runs on any Linux machine with a
webcam attached (a Raspberry Pi works well) and talks to the rest of the Agromate stack.

This guide assumes you already have a working server, as described in [First steps](/docs?article=first_steps).

## What you need

- A Linux machine with a USB or CSI webcam, reachable as a V4L2 device
- Python 3 with `venv`
- The address of your Mosquitto broker
- The URL of your Agromate server
- The Agromate app, logged in with the account that will own the camera
- Optionally, a TURN server to watch the camera in case of "strict" NAT with your ISP (typically mobile ones)

## Installing dependencies

On Debian, Ubuntu or derivates:

```bash
sudo apt update
sudo apt install git python3 python3-venv v4l-utils
```

Then download the camera service and install its Python dependencies (`aiomqtt`, `aiortc`, `aiohttp`) in a virtual
environment. In this guide it is installed in `/opt/agrosmart-camera`:

```bash
sudo git clone https://github.com/agromate-devs/camera.git /opt/agrosmart-camera
sudo chown -R $USER: /opt/agrosmart-camera
cd /opt/agrosmart-camera
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

> [!NOTE]
> `aiortc` uses PyAV, which ships prebuilt wheels with FFmpeg included for the most common platforms. If pip has to
> build it from source, install the FFmpeg development headers first:
> `sudo apt install libavdevice-dev libavfilter-dev libopus-dev libvpx-dev pkg-config`.

## Finding your webcam

List the video devices and the resolutions they support:

```bash
v4l2-ctl --list-devices
v4l2-ctl -d /dev/videoN --list-formats-ext
```

Many webcams register more than one `/dev/videoN` node: use the one that lists actual resolutions. Note down the device
and a supported resolution (e.g. `640x480`): you will pass them to the camera service later.

The user running the service must be able to read the device. On most distributions this means being in the `video`
group:

```bash
sudo usermod -aG video $USER
```

Log out and back in for the change to take effect.

## Generating the camera credentials

Each camera has its own **username** (`cam_xxxxxxxx`) and **password**. The username identifies the camera everywhere:
on the Agromate server, on the MQTT broker and during the WebRTC signaling. Generate them with
`setup_mqtt_client.py`:

```bash
cd /opt/agrosmart-camera
source .venv/bin/activate
python setup_mqtt_client.py \
  --broker broker-ip \
  --server-url http://server-url:3000
```

| Option           | Default              | Description                                |
|------------------|----------------------|--------------------------------------------|
| `--broker`, `-b` | (required)           | Hostname or IP of the Mosquitto broker     |
| `--port`, `-p`   | `1883`               | Broker port                                |
| `--server-url`   | (required)           | Base URL of the Agromate server            |
| `--output`, `-o` | `camera_config.json` | Where to write the generated configuration |

The script works offline: it generates a random username and password, saves them in `camera_config.json` and prints
them. It does not need the Mosquitto admin password and does not contact the broker or the server: the camera is
registered by the server when you add it from the app.

```text
[OK] Config saved in: camera_config.json
Add the webcam from the Agromate app with these credentials:
  Username: cam_...
  Password: ...
```

```json
{
  "broker": "broker-ip",
  "port": 1883,
  "username": "cam_...",
  "password": "...",
  "server_url": "http://server-ip:3000"
}
```

> [!CAUTION]
> `camera_config.json` contains the camera's password in clear text. Keep it readable only by the user running the
> service: `chmod 600 camera_config.json`. Whoever has the username and password can add the camera to their account.

## Pairing the camera with the app

You need the username and password printed by `setup_mqtt_client.py`. If you no longer have them, read them from the
configuration file:

```bash
grep -E '"(username|password)"' /opt/agrosmart-camera/camera_config.json
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

When you add the camera, the server:

1. stores it, linked to your Agromate account, with its password hashed;
2. creates the camera's account on the MQTT broker;
3. creates a role dedicated to the camera, which grants access only to its own signaling topics (`webrtc/<username>/#`),
   and assigns it to the camera and to your account.

The camera shows up on every phone where you log in with the same account, and no other account can watch it. Start the
camera service only **after** adding it to the app: until then its MQTT account does not exist and the connection to the
broker is refused.

To watch it, tap the camera in the list. The app asks for your **account password**: it is used to log in to the MQTT
broker, through which the phone and the camera exchange the WebRTC connection details. Tap **Connect to Webcam** and the
video opens in landscape full screen once the connection is established.

<img src="/webcam_psw_dialog.png" class="w-80">

> [!NOTE]
> The MQTT password of your account is kept in sync with your Agromate password: after changing it from the app, use the
> new one to watch the cameras too.

<!-- TODO: screenshot of the live video -->

[//]: # (![Live video]&#40;/docs-assets/webcam/webcam-viewer.png&#41;)

> [!NOTE]
> A camera can be paired with only one account. If adding it fails with _Failed to add webcam_, check that username and
> password are copied exactly (the username has the form `cam_` followed by 8 lowercase letters or digits, the password
> is at least 16 characters long) and that the camera has not already been added, then look at the server log.

### Removing a camera

Swipe the camera to the left in the list and confirm the deletion. The server removes the camera, its MQTT account and
its role, so
the camera service can no longer connect to the broker. To use it again, generate new credentials with
`setup_mqtt_client.py` (or reuse the ones in `camera_config.json`) and add it from the app again.

## Running it manually

Before turning it into a service, start the camera by hand to check that everything works. The service reads
`camera_config.json` from the **current directory**, so run it from the installation folder:

```bash
cd /opt/agrosmart-camera
source .venv/bin/activate
python main.py --video-device /dev/videoN --video-size 640x480
```

| Option                  | Default       | Description                                                   |
|-------------------------|---------------|---------------------------------------------------------------|
| `--video-device`, `-vd` | `/dev/video0` | Video device to stream                                        |
| `--video-size`, `-v`    | `640x480`     | Resolution, must be one supported by the webcam               |
| `--video-format`, `-vf` | `v4l2`        | FFmpeg input format (`v4l2` on Linux)                         |
| `--log-level`, `-l`     | `INFO`        | `DEBUG`, `INFO`, `WARNING`, `ERROR` or `CRITICAL`             |
| `--test`, `-t`          | off           | Stream a sample video from the internet instead of the webcam |

You should see something like:

```text
Starting WebRTC camera cam_... sender with MQTT signaling to broker broker-ip:1883
2026-10-11 10:00:00 [INFO] root: Subscribed to 'webrtc/cam_.../signaling'
2026-10-11 10:00:01 [INFO] root: TURN credentials updated (ttl=3600s). Next refresh in 3480s.
```

Open the **Webcam** tab in the app: when a viewer connects the log shows `Offer received from viewer` followed by
`Connection state is connected`.

> [!TIP]
> If you have no image, try `--test`: if the sample video plays, the network side is fine and the problem is the webcam
> device, its resolution or its permissions.

## Running it as a systemd service

To start the camera at boot and restart it if it crashes, create a systemd unit. Replace `pi` with the user that owns
`/opt/agrosmart-camera`:

```ini
# /etc/systemd/system/agrosmart-camera.service
[Unit]
Description=Agrosmart camera (WebRTC over MQTT)
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=pi
Group=video
WorkingDirectory=/opt/agrosmart-camera
ExecStart=/opt/agrosmart-camera/.venv/bin/python main.py --video-device /dev/video0 --video-size 640x480
Restart=on-failure
RestartSec=10
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
```

> [!IMPORTANT]
> `WorkingDirectory` is required: the service looks for `camera_config.json` in the directory it is started from.

Enable and start it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now agrosmart-camera
sudo systemctl status agrosmart-camera
```

Follow the logs with:

```bash
journalctl -u agrosmart-camera -f
```

After changing the unit file, run `sudo systemctl daemon-reload` and `sudo systemctl restart agrosmart-camera`.

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
|---------------|------------------------------------------------------------------------------------------------|
| `TURN_URL`    | Host and port of the TURN server, **without** the `turn:` prefix, e.g. `turn.example.com:3478` |
| `TURN_SECRET` | The same value as `static-auth-secret` in `turnserver.conf`                                    |

If you run the server with Node.js, add them to the `.env` file in the server folder:

```ini
# .env
# Needed only for TURN support in webcam
TURN_URL=turn.example.com:3478
TURN_SECRET=<same value as static-auth-secret>
```

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

The server returns both `turn:<TURN_URL>?transport=udp` and `turn:<TURN_URL>?transport=tcp`, with credentials valid for
one hour: the camera refreshes them automatically, the app requests new ones every time you open a camera.

`/turn` accepts two kinds of authentication:

| Client | `Authorization` header                              |
|--------|-----------------------------------------------------|
| App    | `Bearer <session token>` obtained from `/login`     |
| Camera | `Basic base64(<camera username>:<camera password>)` |

The camera does not have an Agromate account and never calls `/login`: it authenticates directly with its own
credentials from `camera_config.json`.

> [!CAUTION]
> Anyone who knows `TURN_SECRET` can create valid credentials for your TURN server and use it as a relay. Generate a
> long random value and store it securely.

If no TURN credentials are available the camera still works, using STUN only. Check the log for
`Using TURN server: [...]` when a viewer connects to confirm that TURN is in use.

## Troubleshooting

| Symptom                                              | Likely cause                                                                         |
|------------------------------------------------------|--------------------------------------------------------------------------------------|
| `Configuration file 'camera_config.json' not found.` | The service was started from another directory: check `WorkingDirectory`             |
| `MQTT username or password not found`                | `camera_config.json` is incomplete: run `setup_mqtt_client.py` again                 |
| Connection refused / not authorized on MQTT          | Wrong broker address, or the camera has not been added from the app (or was removed) |
| `GET /turn failed (401)`                             | The camera has not been added from the app, or its credentials do not match          |
| `TURN updater: failed to fetch credentials, ...`     | Agromate server unreachable, or `/turn` disabled (see the server log)                |
| `No video stream available from player.`             | Wrong `--video-device`, unsupported `--video-size`, or missing `video` permissions   |
| Works at home, not on mobile data                    | No TURN server, or its ports are not reachable from the internet                     |
