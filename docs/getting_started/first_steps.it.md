---
title: Primi passi
description: Cosa serve per iniziare a usare Agromate.
section: Per iniziare
section_order: 3
---

# Primi passi

Questa guida ti accompagna dalla scatola alla prima pianta monitorata.

## Cosa ti serve

- Una serra Agrosmart assemblata (vedi [Componenti hardware](../hardware/components.en.md))
- Uno smartphone Android o iOS con l'app Agromate
- Una rete Wi‑Fi a 2,4 GHz
- Un account Agromate
- Facoltativo: un progetto Firebase per ricevere le [notifiche push](/docs?article=push_notifications) su riserva
  d'acqua e temperatura

## Catalogo delle piante

Il server aggiunge le [piante predefinite](/docs?article=default_plants) al database a ogni avvio: non devi
caricarle tu.

> [!WARNING]
> Il volume `./server/public` sostituisce la cartella `public` dell'immagine, quindi al primo avvio le immagini delle
> piante non ci sono. Copia la cartella `public/plants/` del repository del server in `./server/public/plants/`,
> altrimenti il catalogo mostra le piante senza immagine.

## Creare un account

<!-- TODO: descrivere la registrazione e il recupero password dall'mobile_app -->

_Sezione da scrivere._

## Scegliere la pianta

<!-- TODO: catalogo piante, wishlist, livello di difficoltà -->

_Sezione da scrivere._

## Prossimi passi

Prosegui con l'[abbinamento del dispositivo](../mobile_app/pairing.en.md).
