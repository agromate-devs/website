---
title: App overview
description: Features of the Agromate mobile app.
section: Mobile app
section_order: 5
order: 8
---

# App overview

The app is built with **Flutter**, uses **MobX** for state management and runs on Android and iOS. It is the only way
to pair an Agrosmart, choose what it grows and control it remotely.

<div class="grid grid-cols-3 gap-5">
    <img src="/overview_view.png"/>
    <img src="/search_view.png"/>
    <img src="/profile_view.png"/>
</div>

## Navigation

Once logged in, the app is organized in five tabs reachable from the bottom navigation bar:

| Tab          | What it does                                                        |
| ------------ | ------------------------------------------------------------------- |
| **Home**     | Your Agrosmarts with their latest readings                          |
| **Webcam**   | Live view of the webcams watching your plants                       |
| **Search**   | The plant catalog: browse, add and edit plants, start a new pairing |
| **Favorite** | Your wishlist of plants                                             |
| **Profile**  | Account, profile picture and app settings                           |

## Plant care settings

When planting a new plant, the app will ask you to decide how the Agrosmart takes care of its plant: when and how
much to water, which
humidity and temperature to keep and how to drive the grow light. There are some default settings for the plant in the
catalog but feel free to modify it and, you deem it appropriate, open an issue on GitHub to discuss the changes. You can
also modify the parameters every time you need in the specific Agrosmart section.

The settings you choose here belong **only to that Agrosmart**: they don't change the plant in the catalog, so you can
grow the same plant with different settings on different Agrosmarts.

At the top a header shows the plant picture, its name and whose Agrosmart it is. Below it the settings are split into
two groups: **Hydration parameters** and **Atmosphere & light**.

<div class="grid grid-cols-3 gap-5">
    <img src="/plant_care_view_1.png"/>
    <img src="/plant_care_view_2.png"/>
    <img src="/plant_care_view_3.png"/>
</div>

> [!WARNING]
> During the pairing, don't leave this screen without tapping **Assign plant to Agrosmart**. If you go back, the
> Agrosmart keeps waiting for its configuration and must be reset before it can be paired again (see
> [Troubleshooting](/docs?article=pairing)).

### Hydration parameters

#### Irrigation mode

Two switches select how the Agrosmart decides **when** to water. They are mutually exclusive: turning one on turns the
other off.

- **Soil moisture threshold irrigation** (default): the Agrosmart waters the plant when the soil moisture measured by
  its sensor drops **below a threshold**. This is the best choice in for plants that suffer dehydration a lot.
- **Time-Based Irrigation**: the Agrosmart waters at **fixed intervals**, regardless of the soil moisture. When it is
  active it overrides the threshold. Useful if the soil moisture sensor is missing or unreliable, or for plants that
  need a regular schedule.

#### Water quantity

How much water to give on each irrigation, from **100 to 1000 ml** in steps of 1 ml. It is used in both irrigation
modes.

#### Soil Moisture Threshold

_Shown only with soil moisture threshold irrigation._

The soil moisture percentage (**1–100 %**) below which an irrigation starts. A higher value keeps the soil wetter;
a lower value lets it dry out more between irrigations.

#### Irrigation Frequency

_Shown only with time-based irrigation._

How often to water. The slider works in two scales:

- **hours**, from **1 to 24 h**;
- **days**, from **1 to 30 d**: drag the hours slider all the way to the right (past 24 h) to switch to days. Going
  back to **1 d** switches to the hours scale again.

#### Humidification mode

Like irrigation, two mutually exclusive switches select how the Agrosmart decides **when** to run the humidifier:

- **Humidity threshold Humidification** (default): the Agrosmart turns on the humidifier when the air humidity
  measured by its sensor drops **below the target humidity**.
- **Time-Based Humidification**: the Agrosmart runs the humidifier at **fixed intervals** for a fixed time,
  regardless of the measured humidity. When it is active it overrides the threshold. Useful if the humidity sensor is
  missing or unreliable, or for plants that need a regular misting schedule.

#### Target Humidity

_Shown only with humidity threshold humidification._

The ideal air humidity for the plant (**1–100 %**): below this value the humidifier is turned on. It can't be zero:
the app refuses to save the settings in that case.

#### Humidification Duration

_Shown only with time-based humidification._

How long the humidifier runs on each humidification, from **1 to 60 minutes**.

#### Humidification Frequency

_Shown only with time-based humidification._

How often to humidify. Like the irrigation frequency, the slider works in two scales:

- **hours**, from **1 to 24 h**;
- **days**, from **1 to 30 d**: drag the hours slider all the way to the right (past 24 h) to switch to days. Going
  back to **1 d** switches to the hours scale again.

### Atmosphere & light

<!-- SCREENSHOT: /docs-assets/app/atmosphere-light.png — atmosphere & light section -->

#### Temperature Range

A two-handle slider from **0 to 50 °C** with the minimum and maximum temperature for a healthy growth of the plant.

#### Disable light

Turns off the artificial light completely, for plants that grow with natural light only or Agrosmarts built without a
grow light. When it is on:

- the light intensity is set to **0** and can't be changed;
- the start and end time pickers are greyed out;
- no light color is selected.

Turning it off again restores the light values you had before.

#### Light Intensity

The brightness of the grow light, from **0** (off) to **10** (full intensity).

#### Light Duration

The time window in which the light is on each day. Tap **Start Time** and **End Time** to choose them with the clock
picker; the total duration (e.g. _8 h_) is shown next to the title.

The window must be inside the same day: if you choose a start time after the end time, the end time is moved one hour
after the start, and vice versa.

#### Light Color

The predominant color (wavelength) of the light, chosen among **White**, **Red**, **Orange**, **Yellow**, **Green**,
**Blue**, **Purple** and **Pink**. The selected color is circled.

> [!TIP]
> Red and blue are the wavelengths plants use the most for photosynthesis: red light favors flowering, blue light
> favors leaf growth.

<!-- SCREENSHOT: /docs-assets/app/light-color.png — light duration and color picker -->

### Saving

Tap **Assign plant to Agrosmart** (pairing) or **Update** (Modify) to send the settings to the server, which forwards
them to the Agrosmart. A message confirms the result and brings you back to the Home.

## Plant editor

Used to add a new plant to the catalog or to edit an existing one. It contains:

- **Plant picture**: picked from the gallery and cropped to a square (max 2 MB);
- **Plant info**: name (letters and numbers only), description and image copyright (e.g. _Wikipedia_);
- the **Hydration parameters** and **Atmosphere & light** sections, identical to the ones of the
  plant care settings. Here they define the **recommended values** that are pre-filled when
  someone pairs an Agrosmart with this plant;
- **Difficulty**: from 1 to 5 stars.

Tap **Add plant to database** (or **Update plant to database** when editing) to save, or **Cancel** to discard the
changes.

<!-- SCREENSHOT: /docs-assets/app/plant-editor.png — plant editor -->

## Notifications

The app can notify you when the water tank of an Agrosmart is running low or its temperature goes out of the
**Temperature Range** set in the plant care settings. After the first login it asks for the permission to show
notifications, and when you log out from the **Profile** tab that phone stops receiving your alerts.

Notifications are sent by the server through Firebase Cloud Messaging and need some configuration on both sides: see
[Push notifications](/docs?article=push_notifications).
