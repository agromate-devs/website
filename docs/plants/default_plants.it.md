---
title: Piante predefinite
description: Come sono stati compilati i campi delle piante predefinite nel database e cosa resta da modificare.
section: Piante
section_order: 4
order: 20
---

# Piante predefinite

Il server Agromate include un catalogo di piante predefinite, definito in `prisma/seed/plants.json` nel repository del
server e aggiunto automaticamente al database a ogni avvio del server (vedi la sezione _Catalogo delle piante_ più sotto). Quando scegli
una pianta dal catalogo nell'app, i suoi valori diventano la configurazione iniziale dell'Agrosmart: puoi comunque
modificarli dalle impostazioni di cura della pianta.

Per ora il catalogo contiene una sola pianta: il [basilico](/docs?article=basil).

## Come vengono compilati i campi

Ogni valore parte dalle esigenze agronomiche della pianta (luce, temperatura, umidità, irrigazione) e viene poi
convertito nell'unità che il firmware dell'Agrosmart comprende. La tabella elenca ogni campo, la sua unità e come lo
usa il firmware.

`plants.json` è un oggetto con la `version` del seed e l'elenco delle piante:

```json
{
  "version": 2,
  "plants": [
    { "idSeed": 1, "lastUpdate": 2, "name": "Basil", "docsArticle": "basil", "...": "..." }
  ]
}
```

| Campo                     | Unità / formato                      | Come viene usato                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idSeed`                  | intero                               | Id della pianta dentro il seed, **obbligatorio** e univoco. Il seed lo usa per capire se la pianta esiste già. Non è l'id del database, che viene assegnato dal database.                                                                                                                                                                                                                                                                                                    |
| `lastUpdate`              | versione del seed                    | **Obbligatorio**, solo nel file di seed (non viene salvato nel database). Versione del seed in cui la pianta è stata aggiunta o modificata l'ultima volta.                                                                                                                                                                                                                                                                                                                   |
| `docsArticle`             | nome della pagina                    | **Obbligatorio** per le piante predefinite. Nome della pagina che documenta la pianta su questo sito, cioè il nome del file `docs/plants/<docsArticle>.{en,it}.md` senza la lingua (es. `basil`). Solo lettere minuscole, numeri, `-` e `_`. Il server restituisce solo il nome e l'app costruisce il link `https://agromate-devs.github.io/website/docs?article=<docsArticle>` per il pulsante _Read the full guide_. Le piante aggiunte dagli utenti non ne hanno bisogno. |
| `name`, `description`     | testo                                | Mostrati nel catalogo. Non sono tradotti, quindi sono scritti in inglese.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `image`, `imageCopyright` | nome file, testo                     | L'immagine viene servita da `public/plants/<image>` sul server; il copyright viene mostrato sotto l'immagine.                                                                                                                                                                                                                                                                                                                                                                |
| `difficultyLevel`         | 1 (facile) – 5 (difficile)           | Mostrato nel catalogo.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `temperatureMin`          | °C                                   | Sotto questo valore l'utente riceve una notifica push.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `temperatureMax`          | °C                                   | Sopra questo valore l'utente riceve una notifica push.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `targetHumidity`          | % umidità dell'aria                  | L'umidificatore si accende quando l'umidità scende sotto `targetHumidity - 10` (`CONFIG_HUMIDITY_THRESHOLD_RANGE`). Usato solo se l'umidificazione a tempo è disattivata.                                                                                                                                                                                                                                                                                                    |
| `lightColor`              | ARGB32 come stringa decimale         | Colore della striscia LED. Il canale alfa viene ignorato. Ad esempio `4294967295` = `0xFFFFFFFF` (bianco), `4294901760` = `0xFFFF0000` (rosso).                                                                                                                                                                                                                                                                                                                              |
| `lightIntensity`          | livello 0 – 10                       | Stesso intervallo dello slider nell'app. Al momento il firmware riceve il valore ma non lo usa ancora.                                                                                                                                                                                                                                                                                                                                                                       |
| `lightDuration`           | `HH:MM-HH:MM`                        | Fascia oraria in cui la luce è accesa: le ore di luce sono la differenza tra i due orari.                                                                                                                                                                                                                                                                                                                                                                                    |
| `wateringFrequency`       | ore, oppure `null`                   | Ore tra due irrigazioni. Se impostato, l'irrigazione è **a tempo**.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `waterQuantity`           | ml                                   | Acqua data a ogni irrigazione. Il firmware la converte nel tempo di accensione della pompa in base alla portata (`CONFIG_WATER_PUMP_FLOW_RATE`, 1400 ml/min di default): 300 ml ≈ 12 secondi.                                                                                                                                                                                                                                                                                |
| `soilMoisture`            | % umidità del terreno, oppure `null` | Soglia per l'irrigazione **basata sull'umidità del terreno**: la pompa parte quando il terreno è più secco di questo valore (controllo ogni 15 minuti). Va usato **al posto di** `wateringFrequency`.                                                                                                                                                                                                                                                                        |
| `humidificationFrequency` | ore, oppure `null`                   | Ore tra due umidificazioni. Se impostato, l'umidificazione è **a tempo**. Se `null`, l'umidificazione segue `targetHumidity`.                                                                                                                                                                                                                                                                                                                                                |
| `humidificationDuration`  | minuti, oppure `null`                | Per quanto tempo resta acceso l'umidificatore a ogni umidificazione a tempo.                                                                                                                                                                                                                                                                                                                                                                                                 |

> [!NOTE]
> L'app ricava le modalità di irrigazione e umidificazione da questi campi: l'irrigazione è a tempo quando
> `wateringFrequency` non è `null`, l'umidificazione è a tempo quando `humidificationFrequency` non è `null`. Imposta
> quindi **o** `wateringFrequency` **o** `soilMoisture`, non entrambi.

> [!IMPORTANT]
> Ogni pianta predefinita deve avere un suo articolo su questo sito, che spiega il significato dei suoi valori e come
> sono stati scelti, e `docsArticle` deve puntare a quell'articolo. Una pianta senza `docsArticle` fa fallire
> `npm run seed:validate`, quindi non può entrare nel catalogo.

## Piante disponibili

Le piante sono raggruppate per `difficultyLevel`, da 1 (facile) a 5 (difficile).

**Difficoltà 1**

- [Menta](/docs?article=mint)
- [Lattuga](/docs?article=lettuce)
- [Pothos](/docs?article=pothos)
- [Aloe vera](/docs?article=aloe_vera)

**Difficoltà 2**

- [Prezzemolo](/docs?article=parsley)
- [Rosmarino](/docs?article=rosemary)

**Difficoltà 3**

- [Basilico](/docs?article=basil)
- [Fragola](/docs?article=strawberry)
- [Pomodoro ciliegino](/docs?article=cherry_tomato)
- [Peperoncino](/docs?article=chili_pepper)

**Difficoltà 4**

- [Orchidea Phalaenopsis](/docs?article=phalaenopsis)
- [Calathea](/docs?article=calathea)

**Difficoltà 5**

- [Dionea](/docs?article=venus_flytrap)

Ogni pianta ha una sua pagina che spiega come sono stati scelti i parametri.

## Catalogo delle piante

Non devi caricare tu il catalogo delle piante: a ogni avvio il server controlla `prisma/seed/plants.json` e aggiunge
le piante predefinite non ancora presenti nel database. Se `plants.json` contiene
errori, il seed si ferma e il server non parte.

Le piante predefinite vengono riconosciute tramite il loro `idSeed` (l'id della pianta dentro `plants.json`), non
tramite l'id del database. Le piante che hai aggiunto tu non hanno un `idSeed`, quindi il seed **non le tocca mai**.
Le piante predefinite già presenti **non vengono mai sovrascritte** all'avvio, quindi le modifiche che hai fatto
restano.

**Versione del seed**: `plants.json` ha una `version` e ogni pianta ha un `lastUpdate`, la versione in cui è stata
aggiunta o modificata l'ultima volta. Il database salva la versione dell'ultimo seed applicato (nella tabella
`SeedVersion`) e ogni esecuzione del seed, compresa quella all'avvio, la aggiorna alla fine. Un'esecuzione controlla
solo le piante con `lastUpdate` maggiore della versione salvata; le altre vengono contate come _aggiornate_. Se
`plants.json` è più vecchio della versione salvata nel database, il seed si ferma senza modificare nulla (a meno che
non passi `--force`, vedi sotto).

Se una nuova versione del server cambia i valori di una pianta predefinita che hai già, la pianta esistente mantiene i
vecchi valori, ma la versione salvata viene aggiornata comunque. Per aggiornare anche quella, esegui il seed a mano con
`--all`, che controlla tutte le piante a prescindere dalla versione. Aggiornare una pianta sostituisce i suoi valori
con quelli di `plants.json`, quindi **le modifiche che hai fatto a quella pianta vanno perse**.

**Modalità interattiva**: per ogni pianta esistente con valori diversi, il seed mostra i campi che cambierebbero e
chiede cosa fare:

```bash
docker exec -it agromate npm run seed -- --all
```

Rispondi `y` per aggiornare questa pianta, `n` per saltarla, `a` per aggiornare questa e tutte le successive, `s` per
saltare tutte le successive.

**Modalità automatica**: aggiorna tutte le piante esistenti senza chiedere conferma, ad esempio in uno script:

```bash
docker exec agromate npm run seed -- --all --yes
```

**Forzare l'aggiornamento**: `--force` ignora la versione del seed salvata nel database. Controlla tutte le piante
(come `--all`), parte anche se `plants.json` è più vecchio della versione salvata e alla fine sovrascrive la versione
salvata con quella di `plants.json`, anche se è più bassa. Usalo ad esempio per tornare a un catalogo precedente o
quando la versione salvata è sbagliata. Abbinalo a `--yes` per aggiornare tutte le piante modificate senza conferma:

```bash
docker exec agromate npm run seed -- --force --yes
```

Al posto di `--yes` puoi usare `-y`. In entrambe le modalità `npm run seed` prima controlla `plants.json`, poi crea le
piante mancanti, non ne cancella mai nessuna, applica tutte le modifiche in un'unica transazione e alla fine mostra
quante piante sono state create, aggiornate, saltate, lasciate invariate e già aggiornate, e la nuova versione del seed
salvata nel database.

> [!CAUTION]
> Controlla le modifiche proposte prima di confermare e usa la modalità automatica solo se non ti servono le tue
> modifiche. Senza terminale (senza `-it`) e senza `--yes`, il seed non aggiorna nulla. Le piante che salti non vengono
> riproposte dalle esecuzioni successive, perché la versione salvata viene aggiornata comunque: usa `--all` per
> rivederle.

## Aggiungere o modificare una pianta predefinita

1. Aumenta di uno la `version` in cima a `prisma/seed/plants.json`. Fallo una volta per ogni rilascio del catalogo,
   anche se aggiungi o modifichi più di una pianta.
2. Per aggiungere una pianta, aggiungi un oggetto a `plants` con un `idSeed` nuovo e univoco e tutti i campi descritti
   sopra, compreso `docsArticle` con il nome della pagina che scrivi nell'ultimo passo. Per modificare una pianta, cambia i suoi campi e mantieni il suo `idSeed`. In entrambi i casi imposta
   `lastUpdate` alla nuova `version`: il seed controlla solo le piante con `lastUpdate` maggiore della versione già
   applicata al database.
3. Metti l'immagine in `public/plants/` sul server, con lo stesso nome usato in `image`.
4. Compila i valori con lo stesso approccio usato per il [basilico](/docs?article=basil): parti dalle esigenze
   agronomiche della pianta e convertile nelle unità della tabella in cima a questa pagina.
5. Controlla il file con `npm run seed:validate` nel repository del server. Segnala come errori i campi obbligatori
   mancanti (compreso `docsArticle`), i valori fuori dagli intervalli della tabella, un `lastUpdate` maggiore di `version`, gli `idSeed`
   duplicati e le piante con entrambi o nessuno tra `wateringFrequency` e `soilMoisture`, oppure con
   `humidificationDuration` impostato senza `humidificationFrequency` (e viceversa). Campi sconosciuti, nomi duplicati
   e immagini mancanti sono solo avvisi.
6. Riavvia il server per aggiungere la nuova pianta. Per aggiornare una pianta già presente nel database, esegui il
   seed a mano come descritto in _Catalogo delle piante_ qui sopra.
7. **Obbligatorio**: documenta la pianta in una nuova pagina `docs/plants/<docsArticle>.{en,it}.md`, seguendo la
   pagina del [basilico](/docs?article=basil), e aggiungila all'elenco sopra. La pagina deve spiegare il significato
   di ogni valore della pianta e come è stato scelto, e il nome del file deve coincidere con `docsArticle`, altrimenti
   il pulsante dell'app apre una pagina che non esiste. Pubblica la pagina insieme alla nuova versione del catalogo.
