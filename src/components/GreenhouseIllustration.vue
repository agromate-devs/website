<script setup lang="ts">
import { BeakerIcon, CloudIcon, FireIcon } from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const readings = [
  {
    icon: FireIcon,
    label: 'illustration.temperature',
    value: '22.4 °C',
    position: 'left-0 top-10 sm:-left-6',
    tone: 'text-orange-500',
  },
  {
    icon: CloudIcon,
    label: 'illustration.airHumidity',
    value: '54 %',
    position: 'right-0 top-24 sm:-right-4',
    tone: 'text-water-400',
  },
  {
    icon: BeakerIcon,
    label: 'illustration.soil',
    value: '38 %',
    position: 'left-2 bottom-16 sm:-left-2',
    tone: 'text-leaf-500',
  },
] as const;
</script>

<template>
  <div class="relative mx-auto w-full max-w-lg">
    <svg
      viewBox="0 0 400 420"
      class="w-full drop-shadow-2xl"
      role="img"
      :aria-label="t('illustration.label')"
    >
      <defs>
        <linearGradient id="glass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.55" />
          <stop offset="1" stop-color="#dcefdf" stop-opacity="0.25" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0" r="0.9">
          <stop offset="0" stop-color="#f9bf45" stop-opacity="0.55" />
          <stop offset="1" stop-color="#f9bf45" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- base / pot -->
      <rect x="60" y="330" width="280" height="60" rx="14" fill="#3b2d1f" />
      <rect x="60" y="330" width="280" height="14" rx="7" fill="#6b5236" />
      <rect x="80" y="356" width="70" height="12" rx="6" fill="#1e492c" />
      <circle cx="306" cy="362" r="6" fill="#5cab70">
        <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <text x="168" y="366" fill="#e4d7bf" font-family="JetBrains Mono, monospace" font-size="11">
        ESP32 · online
      </text>

      <!-- dome -->
      <path
        d="M72 330V170a128 128 0 0 1 256 0v160Z"
        fill="url(#glass)"
        stroke="#235b34"
        stroke-width="3"
      />
      <path d="M72 170a128 128 0 0 1 256 0" fill="url(#glow)" />
      <path
        d="M200 42v288 M72 200h256 M100 104c40 18 160 18 200 0"
        fill="none"
        stroke="#235b34"
        stroke-opacity="0.25"
        stroke-width="2"
      />

      <!-- LED strip -->
      <g>
        <circle
          v-for="i in 7"
          :key="i"
          :cx="128 + (i - 1) * 24"
          :cy="i === 1 || i === 7 ? 92 : i === 2 || i === 6 ? 80 : 74"
          r="5"
          fill="#fcd57a"
        >
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            :begin="`${i * 0.2}s`"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      <!-- soil -->
      <path d="M90 330c20-22 200-22 220 0Z" fill="#6b5236" />

      <!-- plant -->
      <g class="sway">
        <path
          d="M200 322c0-60 2-110 0-160"
          stroke="#235b34"
          stroke-width="5"
          fill="none"
          stroke-linecap="round"
        />
        <path d="M200 270c-40-6-70-30-74-70 38 2 66 26 74 70Z" fill="#3a8f50" />
        <path d="M200 238c40-4 72-26 78-66-40 0-70 24-78 66Z" fill="#5cab70" />
        <path d="M200 200c-30-8-50-32-50-62 30 4 48 28 50 62Z" fill="#8ec89c" />
        <path d="M200 170c18-14 24-38 16-60-20 12-26 36-16 60Z" fill="#5cab70" />
      </g>

      <!-- soil sensor -->
      <rect x="252" y="290" width="10" height="44" rx="3" fill="#1e492c" />
      <rect x="250" y="282" width="14" height="12" rx="3" fill="#2a723e" />

      <!-- irrigation drops -->
      <g fill="#4fb3d9">
        <path d="M140 250c0 0 6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 -20;0 50"
            dur="2.2s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" />
        </path>
        <path d="M156 250c0 0 5 6 5 9a5 5 0 0 1-10 0c0-3 5-9 5-9Z">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 -20;0 50"
            begin="0.8s"
            dur="2.2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            begin="0.8s"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>

    <div
      v-for="reading in readings"
      :key="reading.label"
      class="absolute flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-3.5 py-2.5 shadow-lg shadow-leaf-950/10 backdrop-blur"
      :class="reading.position"
    >
      <component :is="reading.icon" class="size-5" :class="reading.tone" />
      <div class="leading-tight">
        <p class="text-[11px] font-medium tracking-wide text-leaf-900/60 uppercase">
          {{ t(reading.label) }}
        </p>
        <p class="font-mono text-sm font-medium text-leaf-950">{{ reading.value }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes sway {
  0%,
  100% {
    transform: rotate(-1.5deg);
  }
  50% {
    transform: rotate(1.5deg);
  }
}

.sway {
  transform-origin: 200px 320px;
  animation: sway 6s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .sway {
    animation: none;
  }
}
</style>
