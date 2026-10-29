import type it from './it';

export default {
  meta: {
    homeTitle: 'Agromate — The smart greenhouse on ESP32',
    notFoundTitle: 'Page not found · Agromate',
    docTitle: '{title} · Agromate Documentation',
  },
  language: {
    label: 'Language',
    it: 'Italiano',
    en: 'English',
  },
  nav: {
    main: 'Main',
    home: 'Agromate, home',
    features: 'Features',
    architecture: 'Architecture',
    docs: 'Documentation',
    openMenu: 'Open menu',
  },
  hero: {
    title: 'The smart greenhouse that takes care {highlight}.',
    highlight: 'of your plants',
    text: 'Agromate monitors your plant’s vital parameters, automatically manages watering, lighting and humidity, and keeps you updated in real time on your smartphone.',
    discover: 'Discover the features',
    docs: 'Documentation',
  },
  illustration: {
    label: 'Illustration of the Agrosmart greenhouse',
    temperature: 'Temperature',
    airHumidity: 'Air humidity',
    soil: 'Soil',
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything a plant needs, in a single greenhouse.',
    text: 'Agrosmart combines sensors and actuators into a system that works on its own, following the ideal configuration for your plant.',
    vitals: {
      title: 'Vital parameters under control',
      text: 'Air temperature and humidity measured by the DHT sensor, soil moisture read by a probe.',
    },
    irrigation: {
      title: 'Smart irrigation',
      text: 'The pump turns on when soil moisture drops below the threshold or at regular intervals. You choose how many ml of water your plant needs.',
    },
    light: {
      title: 'Tailored lighting',
      text: 'RGB LED strip: choose the color, brightness and time window to recreate the day/night cycle.',
    },
    humidifier: {
      title: 'Automatic humidifier',
      text: 'Keeps air humidity around the target value.',
    },
    history: {
      title: 'History and charts',
      text: 'Measurements are stored on the server. From the app you can browse trends over time and parameter averages.',
    },
    webcam: {
      title: 'Watch your plant',
      text: 'Connect a webcam and watch the greenhouse live from the app.',
    },
    pairing: {
      title: 'Easy pairing',
      text: 'Wi‑Fi credentials reach the ESP32 straight from your smartphone, with no cables or manual setup.',
    },
    ota: {
      title: 'OTA updates',
      text: 'The firmware updates over the network: new features and fixes arrive without plugging the board back into a computer.',
    },
    security: {
      title: 'Secure',
      text: 'Each device has dedicated MQTT permissions and passwords are hashed with the strongest standard algorithms.',
    },
  },
  architecture: {
    eyebrow: 'Architecture',
    title: 'Three simple components for your smart greenhouse',
    text: 'The device, the server and the app talk to each other through REST APIs and MQTT messages. Metrics are collected by Telegraf and stored in InfluxDB.',
    mobileApp: 'Mobile app',
  },
  projects: {
    firmware: {
      title: 'Agrosmart firmware',
      description: 'Agromate firmware for the ESP32 family of microcontrollers',
    },
    app: {
      title: 'Mobile app',
      description: 'The app to pair, configure and monitor your greenhouses on Android and iOS.',
    },
    docs: {
      title: 'Documentation',
      text: 'Everything you need to get started with Agromate',
      cta: 'Go to the documentation',
    },
  },
  footer: {
    tagline:
      'An open source smart greenhouse based on ESP32 to grow your plants with the right parameters, always.',
    project: 'Project',
    source: 'Source code',
    firmware: 'Agrosmart firmware',
    app: 'Mobile app',
    org: 'agromate-devs on GitHub',
    copyright: '© {year} Agromate · Open source project',
  },
  docs: {
    index: 'Documentation index',
    navLabel: 'Documentation',
    draft: 'Draft',
    draftBadge: 'Draft — work in progress',
    draftWarning: 'This page is a draft: its content may be incomplete or inaccurate.',
    untranslated: 'This page is not available in English yet.',
    adjacent: 'Adjacent pages',
    previous: 'Previous',
    next: 'Next',
    onThisPage: 'On this page',
    notFoundTitle: 'Page not written yet',
    notFoundText: 'There is no documentation page for {path}.',
    backToIndex: 'Back to the index',
    callouts: {
      NOTE: 'Note',
      TIP: 'Tip',
      IMPORTANT: 'Important',
      WARNING: 'Warning',
      CAUTION: 'Caution',
    },
  },
  notFound: {
    title: 'This plant hasn’t sprouted yet',
    text: 'The page you are looking for doesn’t exist or has been moved.',
    back: 'Back to home',
  },
} satisfies typeof it;
