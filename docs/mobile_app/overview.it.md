---
title: Panoramica dell'mobile_app
description: Le funzionalità dell'mobile_app mobile Agromate.
section: App mobile
section_order: 5
---

# Panoramica dell'app

L'app è sviluppata in **Flutter** con gestione dello stato tramite **MobX** e funziona su Android e iOS.

## Schermate principali

### Home

<!-- TODO -->

_Sezione da scrivere._

### Dettaglio Agrosmart

<!-- TODO: grafici storici e medie, controllo remoto -->

_Sezione da scrivere._

### Impostazioni della pianta

<!-- TODO: atmosfera (temperatura, umidità, luce) e idratazione -->

_Sezione da scrivere._

### Ricerca e wishlist

<!-- TODO -->

_Sezione da scrivere._

### Webcam

<!-- TODO: streaming WebRTC -->

_Sezione da scrivere._

## Notifiche

L'app può avvisarti quando il serbatoio dell'acqua di un Agrosmart sta finendo o la sua temperatura esce dal
**Temperature Range** impostato nelle impostazioni della pianta. Dopo il primo login chiede il permesso di mostrare le
notifiche, e quando esci dall'account dalla scheda **Profile** quel telefono smette di ricevere i tuoi avvisi.

Le notifiche sono inviate dal server tramite Firebase Cloud Messaging e richiedono una configurazione su entrambi i
lati: vedi [Notifiche push](/docs?article=push_notifications).
