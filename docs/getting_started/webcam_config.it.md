---
title: Configurazione della webcam
section: Per iniziare
section_order: 3
order: 12
---

# Configurazione della webcam

Agromate può mostrare le tue piante in diretta nella scheda **Webcam** dell'app. Il video è trasmesso dal [servizio
camera](https://github.com/agromate-devs/camera), un piccolo programma distribuito come immagine Docker che gira su
qualsiasi macchina Linux con una webcam collegata (un Raspberry Pi va benissimo) e comunica con il resto dello stack
Agromate.

Questa guida presuppone che tu abbia già un server funzionante, come descritto
in [Primi passi](/docs?article=first_steps).

## Cosa ti serve

- Una macchina Linux con una webcam USB o CSI, accessibile come dispositivo V4L2
- Docker Engine con il plugin Compose
- Python 3, solo per generare le credenziali della camera: non servono ambienti virtuali né moduli aggiuntivi
- L'indirizzo del tuo broker Mosquitto
- L'URL del tuo server Agromate
- L'app Agromate, con l'accesso fatto con l'account a cui apparterrà la camera
- Facoltativo: un server TURN per vedere la camera quando il tuo operatore usa un NAT "rigido" (di solito succede con
  le connessioni mobili)

> [!WARNING]
> La camera richiede **Docker Engine su Linux**. Docker Desktop su macOS e Windows esegue i container in una macchina
> virtuale: non può passare la webcam al container e la rete dell'host non funziona allo stesso modo.

## Installare le dipendenze

Installa Docker Engine seguendo la [guida ufficiale](https://docs.docker.com/engine/install/) per la tua distribuzione.
Poi, su Debian, Ubuntu o derivate, installa gli altri strumenti:

```bash
sudo apt update
sudo apt install git python3 v4l-utils
```

La camera vera e propria gira nell'immagine `andreockx/agromate-webcam:latest`, che contiene già tutte le sue
dipendenze. Dal [repository della camera](https://github.com/agromate-devs/camera) ti serve solo
`setup_mqtt_client.py`, lo script che genera le credenziali:

```bash
git clone https://github.com/agromate-devs/camera.git ~/agromate-camera
```

## Trovare la webcam

Elenca i dispositivi video e le risoluzioni che supportano:

```bash
v4l2-ctl --list-devices
v4l2-ctl -d /dev/videoN --list-formats-ext
```

Molte webcam registrano più di un nodo `/dev/videoN`: usa quello che elenca delle risoluzioni vere e proprie. Annota il
dispositivo e una risoluzione supportata (es. `640x480`): li imposterai più avanti nel servizio Docker Compose.

Annota anche il GID numerico del gruppo `video`, a cui appartengono i dispositivi della webcam (spesso è `44`):

```bash
getent group video | cut -d: -f3
```

## Generare le credenziali della camera

Ogni camera ha il suo **username** (`cam_xxxxxxxx`) e la sua **password**. Lo username identifica la camera ovunque:
sul server Agromate, sul broker MQTT e durante la segnalazione WebRTC. Generali con `setup_mqtt_client.py`, scrivendo
la configurazione in una cartella `webcam` accanto al tuo `docker-compose.yaml`:

```bash
cd /percorso/della/cartella/compose
mkdir -p webcam
python3 ~/agromate-camera/setup_mqtt_client.py \
  --broker 127.0.0.1 \
  --server-url http://127.0.0.1:3000 \
  --output webcam/camera_config.json
```

| Opzione          | Predefinito          | Descrizione                              |
| ---------------- | -------------------- | ---------------------------------------- |
| `--broker`, `-b` | (obbligatorio)       | Nome host o IP del broker Mosquitto      |
| `--port`, `-p`   | `1883`               | Porta del broker                         |
| `--server-url`   | (obbligatorio)       | URL di base del server Agromate          |
| `--output`, `-o` | `camera_config.json` | Dove scrivere la configurazione generata |

Il container usa la rete dell'host, quindi se gira sulla stessa macchina del resto dello stack il broker e il server
sono raggiungibili su `127.0.0.1`: i nomi dei servizi di Compose (`mosquitto`, `agromate-server`) **non** vengono
risolti. Se la camera gira su un'altra macchina, usa invece l'indirizzo IP del server.

Lo script funziona offline: genera uno username e una password casuali, li salva in `camera_config.json` e li stampa.
Non gli serve la password di amministrazione di Mosquitto e non contatta né il broker né il server: la camera viene
registrata dal server quando la aggiungi dall'app.

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

Dentro il container la camera gira con l'utente non privilegiato con UID `10001`: assegna il file a quell'utente e
rendilo leggibile solo da lui:

```bash
sudo chown 10001 webcam/camera_config.json
sudo chmod 600 webcam/camera_config.json
```

> [!CAUTION]
> `camera_config.json` contiene la password della camera in chiaro. Chi conosce username e password può aggiungere la
> camera al proprio account.

> [!IMPORTANT]
> Crea `camera_config.json` **prima** di avviare il container. Se il file non esiste, Docker crea al suo posto una
> cartella vuota con lo stesso nome e la camera si ferma con `IsADirectoryError`.

## Associare la camera all'app

Ti servono lo username e la password stampati da `setup_mqtt_client.py`. Se non li hai più, leggili dal file di
configurazione:

```bash
sudo grep -E '"(username|password)"' webcam/camera_config.json
```

Poi, nell'app:

1. Apri la scheda **Webcam** dalla barra di navigazione in basso.
2. Tocca il pulsante **+** in alto a destra. Si apre la finestra **Add Webcam**.
3. Compila **Webcam username** e **Webcam password** con le credenziali della camera e, in **Webcam Name**, scegli un
   nome per riconoscerla, es. `Serra 1`.
4. Conferma: la camera compare nell'elenco.

<div class="grid grid-cols-2">
    <img class="w-80" src="/add_webcam_view.png" alt="Finestra per aggiungere una webcam" />
    <img class="w-80" src="/webcam_view.png" alt="Scheda Webcam"/>
</div>

Quando aggiungi la camera, il server:

1. la salva collegata al tuo account Agromate, con la password cifrata con un hash;
2. crea l'account della camera sul broker MQTT;
3. crea un ruolo dedicato alla camera, che dà accesso solo ai suoi topic di segnalazione (`webrtc/<username>/#`), e lo
   assegna alla camera e al tuo account.

La camera compare su ogni telefono su cui accedi con lo stesso account, e nessun altro account può vederla. Avvia il
container della camera solo **dopo** averla aggiunta all'app: fino a quel momento il suo account MQTT non esiste e il
broker rifiuta la connessione.

Per guardarla, tocca la camera nell'elenco. L'app ti chiede la **password del tuo account**: serve per accedere al
broker MQTT, attraverso cui il telefono e la camera si scambiano i dati della connessione WebRTC. Tocca **Connect to
Webcam** e il video si apre a schermo intero in orizzontale appena la connessione è stabilita.

<img src="/webcam_psw_dialog.png" class="w-80">

> [!NOTE]
> La password MQTT del tuo account resta allineata alla tua password Agromate: dopo averla cambiata dall'app, usa
> quella nuova anche per guardare le camere.

<!-- TODO: screenshot of the live video -->

[//]: # '![Live video](/docs-assets/webcam/webcam-viewer.png)'

> [!NOTE]
> Una camera può essere associata a un solo account. Se l'aggiunta fallisce con _Failed to add webcam_, controlla di
> aver copiato esattamente username e password (lo username è `cam_` seguito da 8 lettere minuscole o cifre, la
> password è lunga almeno 16 caratteri) e che la camera non sia già stata aggiunta, poi guarda il log del server.

### Rimuovere una camera

Scorri la camera verso sinistra nell'elenco e conferma l'eliminazione. Il server rimuove la camera, il suo account MQTT
e il suo ruolo, quindi il container della camera non può più connettersi al broker. Per usarla di nuovo, genera nuove
credenziali con `setup_mqtt_client.py` (oppure riusa quelle in `camera_config.json`) e aggiungila di nuovo dall'app.

## Avviarla con Docker

### Aggiungere il servizio

Se usi la configurazione Docker Compose di [Primi passi](/docs?article=first_steps), il servizio `agromate-webcam` è già
presente. Se la camera gira su un'altra macchina, per esempio un Raspberry Pi, crea un `docker-compose.yaml` con solo
questo servizio:

```yaml
services:
  agromate-webcam:
    image: andreockx/agromate-webcam:latest
    container_name: agromate-webcam
    restart: unless-stopped
    network_mode: host
    devices:
      - /dev/video0:/dev/video0
    group_add:
      - '44' # GID del gruppo "video" dell'host, controllalo con: getent group video
    environment:
      VIDEO_DEVICE: /dev/video0
      VIDEO_SIZE: 640x480
      VIDEO_FORMAT: v4l2
    volumes:
      - ./webcam/camera_config.json:/mobile_app/camera_config.json:ro
```

Le opzioni video si impostano con variabili d'ambiente:

| Variabile      | Predefinito   | Descrizione                                                    |
| -------------- | ------------- | -------------------------------------------------------------- |
| `VIDEO_DEVICE` | `/dev/video0` | Dispositivo video da trasmettere                               |
| `VIDEO_SIZE`   | `640x480`     | Risoluzione, deve essere una di quelle supportate dalla webcam |
| `VIDEO_FORMAT` | `v4l2`        | Formato di ingresso di FFmpeg                                  |

Le altre impostazioni del servizio:

- `devices` rende disponibile la webcam nel container. Usa il dispositivo trovato in _Trovare la webcam_ e imposta lo
  stesso percorso in `VIDEO_DEVICE`.
- `group_add` dà al container l'accesso al dispositivo: deve essere il GID **numerico** del gruppo `video` dell'host.
  Il nome del gruppo non funziona, perché gli ID dei gruppi dentro l'immagine sono diversi da quelli dell'host.
- `network_mode: host` permette a WebRTC di annunciare il vero indirizzo IP della macchina. Con la rete predefinita di
  Docker la camera annuncerebbe l'indirizzo interno del container, e i telefoni potrebbero collegarsi solo attraverso un
  server TURN.

Per avere log più dettagliati, aggiungi `command: ['--log-level', 'DEBUG']` al servizio (`DEBUG`, `INFO`, `WARNING`,
`ERROR` oppure `CRITICAL`, predefinito `INFO`).

### Avviarla

Avvia il container solo **dopo** aver aggiunto la camera dall'app: fino ad allora il broker rifiuta la connessione e il
container continua a riavviarsi.

```bash
docker compose up -d agromate-webcam
docker compose logs -f agromate-webcam
```

Dovresti vedere qualcosa del genere:

```text
Starting WebRTC camera cam_... sender with MQTT signaling to broker 127.0.0.1:1883
2026-10-11 10:00:00 [INFO] root: Subscribed to 'webrtc/cam_.../signaling'
2026-10-11 10:00:01 [INFO] root: TURN credentials updated (ttl=3600s). Next refresh in 3480s.
```

Apri la scheda **Webcam** nell'app: quando un visualizzatore si connette, il log mostra `Offer received from viewer`
seguito da `Connection state is connected`.

Dopo aver modificato il servizio, esegui di nuovo `docker compose up -d agromate-webcam` per ricreare il container.
Grazie a `restart: unless-stopped` il container riparte da solo all'accensione e dopo un errore.

> [!TIP]
> Se non vedi l'immagine, prova il video di esempio al posto della webcam con
> `docker compose run --rm agromate-webcam --test`: se si vede, la parte di rete funziona e il problema è il
> dispositivo della webcam, la sua risoluzione o i suoi permessi.

Per aggiornare all'ultima immagine:

```bash
docker compose pull agromate-webcam
docker compose up -d agromate-webcam
```

## Guardare la camera fuori dalla tua rete (TURN)

La camera usa sempre il server STUN pubblico di Google, che basta quando il telefono e la camera sono sulla stessa rete
o dietro NAT semplici. Per guardare la camera in modo affidabile dalla rete mobile ti serve un server TURN, di solito
[coturn](https://github.com/coturn/coturn), raggiungibile da internet.

Il server Agromate distribuisce credenziali TURN temporanee con il meccanismo TURN REST API: coturn e il server
condividono un segreto, e coturn verifica le credenziali senza memorizzare nessun utente. Un `/etc/turnserver.conf`
minimo:

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

Apri la porta `3478` (TCP e UDP) e l'intervallo di relay `49152-65535` (UDP) sul firewall e sul router.

### Configurare il server Agromate

Il server genera le credenziali TURN sia per l'app sia per la camera tramite l'endpoint `/turn`. Per abilitarlo,
imposta due variabili d'ambiente:

| Variabile     | Descrizione                                                                              |
| ------------- | ---------------------------------------------------------------------------------------- |
| `TURN_URL`    | Host e porta del server TURN, **senza** il prefisso `turn:`, es. `turn.example.com:3478` |
| `TURN_SECRET` | Lo stesso valore di `static-auth-secret` in `turnserver.conf`                            |

Se avvii il server con Node.js, aggiungile al file `.env` nella cartella del server:

```ini
# .env
# Needed only for TURN support in webcam
TURN_URL=turn.example.com:3478
TURN_SECRET=<same value as static-auth-secret>
```

Se usi la configurazione Docker Compose di [Primi passi](/docs?article=first_steps), aggiungi le variabili al servizio
`agromate-server`:

```yaml
agromate-server:
  # ...
  environment:
    TURN_URL: turn.example.com:3478
    TURN_SECRET: <same value as static-auth-secret>
```

Le variabili vengono lette solo all'avvio, quindi dopo riavvia il server (`docker compose up -d agromate-server` con
Docker). Se ne manca una delle due, il server scrive nel log
`TURN endpoint disabled: TURN_SECRET and/or TURN_URL not set in environment variables` e `/turn` non è disponibile.

Il server restituisce sia `turn:<TURN_URL>?transport=udp` sia `turn:<TURN_URL>?transport=tcp`, con credenziali valide
per un'ora: la camera le rinnova da sola, l'app ne chiede di nuove ogni volta che apri una camera.

`/turn` accetta due tipi di autenticazione:

| Client | Header `Authorization`                              |
| ------ | --------------------------------------------------- |
| App    | `Bearer <session token>` ottenuto da `/login`       |
| Camera | `Basic base64(<camera username>:<camera password>)` |

La camera non ha un account Agromate e non chiama mai `/login`: si autentica direttamente con le proprie credenziali
di `camera_config.json`.

> [!CAUTION]
> Chiunque conosca `TURN_SECRET` può creare credenziali valide per il tuo server TURN e usarlo come relay. Genera un
> valore lungo e casuale e conservalo in modo sicuro.

Se non ci sono credenziali TURN disponibili la camera funziona comunque, solo con STUN. Quando un visualizzatore si
connette, cerca nel log `Using TURN server: [...]` per verificare che TURN sia in uso.

## Risoluzione dei problemi

| Sintomo                                                    | Causa probabile                                                                                                  |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Configuration file 'camera_config.json' not found.`       | Manca la voce in `volumes`, oppure non monta il file su `/app/camera_config.json`                                |
| `MQTT username or password not found`                      | `camera_config.json` è incompleto: esegui di nuovo `setup_mqtt_client.py`                                        |
| Connessione MQTT rifiutata / non autorizzata               | Indirizzo del broker sbagliato, oppure la camera non è stata aggiunta dall'app (o è stata rimossa)               |
| `GET /turn failed (401)`                                   | La camera non è stata aggiunta dall'app, oppure le sue credenziali non corrispondono                             |
| `TURN updater: failed to fetch credentials, ...`           | Server Agromate non raggiungibile, oppure `/turn` disattivato (vedi il log del server)                           |
| `No video stream available from player.`                   | `VIDEO_DEVICE` sbagliato, oppure `VIDEO_SIZE` non supportato dalla webcam                                        |
| `IsADirectoryError: ... 'camera_config.json'`              | Il file non esisteva al primo avvio: elimina la cartella `webcam/camera_config.json` e crea il file              |
| `PermissionError: ... 'camera_config.json'`                | Il file non è leggibile dall'UID `10001`: `sudo chown 10001 webcam/camera_config.json`                           |
| Permesso negato o dispositivo inesistente su `/dev/videoN` | `VIDEO_DEVICE` è diverso dal percorso in `devices`, oppure `group_add` non è il GID del gruppo `video` dell'host |
| Funziona a casa ma non con la rete mobile                  | Nessun server TURN, oppure le sue porte non sono raggiungibili da internet                                       |
