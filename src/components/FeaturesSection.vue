<script setup lang="ts">
import {
  ArrowPathIcon,
  BeakerIcon,
  ChartBarIcon,
  CloudIcon,
  FireIcon,
  ShieldCheckIcon,
  SunIcon,
  VideoCameraIcon,
  WifiIcon,
} from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';

const features = [
  { icon: FireIcon, key: 'vitals' },
  { icon: BeakerIcon, key: 'irrigation' },
  { icon: SunIcon, key: 'light' },
  { icon: CloudIcon, key: 'humidifier' },
  { icon: ChartBarIcon, key: 'history' },
  { icon: VideoCameraIcon, key: 'webcam' },
  { icon: WifiIcon, key: 'pairing' },
  { icon: ArrowPathIcon, key: 'ota' },
  { icon: ShieldCheckIcon, key: 'security' },
] as const;

const { t } = useI18n();
</script>

<template>
  <div
    class="mt-16 grid gap-px overflow-hidden rounded-3xl border border-leaf-900/10 bg-leaf-900/10 sm:grid-cols-2 lg:grid-cols-3"
  >
    <article
      v-for="feature in features"
      :key="feature.key"
      class="group bg-white p-8 transition hover:bg-leaf-50"
    >
      <div
        class="inline-flex size-12 items-center justify-center rounded-2xl bg-leaf-100 text-leaf-700 transition group-hover:bg-leaf-900 group-hover:text-leaf-100"
      >
        <component :is="feature.icon" class="size-6" />
      </div>
      <h3 class="mt-6 text-lg font-semibold">{{ t(`features.${feature.key}.title`) }}</h3>
      <p class="mt-2 leading-relaxed text-leaf-900/70">{{ t(`features.${feature.key}.text`) }}</p>
    </article>
  </div>
</template>
