<script setup lang="ts">
import {
  AdjustmentsHorizontalIcon,
  ArrowRightIcon,
  CodeBracketIcon,
  CubeIcon,
} from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';

const points = [
  { icon: CubeIcon, key: 'enclosure' },
  { icon: AdjustmentsHorizontalIcon, key: 'parts' },
  { icon: CodeBracketIcon, key: 'open' },
] as const;

const { t } = useI18n();
</script>

<template>
  <div class="mt-14 grid gap-6 lg:grid-cols-3">
    <article
      v-for="point in points"
      :key="point.key"
      class="rounded-3xl border border-leaf-900/10 bg-white p-8"
    >
      <div
        class="inline-flex size-12 items-center justify-center rounded-2xl bg-leaf-900 text-leaf-100"
      >
        <component :is="point.icon" class="size-6" />
      </div>
      <h3 class="mt-6 text-lg font-semibold">{{ t(`build.${point.key}.title`) }}</h3>
      <p class="mt-2 leading-relaxed text-leaf-900/70">{{ t(`build.${point.key}.text`) }}</p>
    </article>
  </div>

  <div class="mt-10 flex flex-wrap gap-3">
    <RouterLink
      :to="{ path: '/docs', query: { article: 'building_agrosmart' } }"
      class="inline-flex items-center gap-2 rounded-full bg-leaf-900 px-6 py-3 font-medium text-leaf-50 transition hover:bg-leaf-800"
    >
      {{ t('build.guide') }}
      <ArrowRightIcon class="size-4" />
    </RouterLink>
    <RouterLink
      :to="{ path: '/docs', query: { article: 'custom_firmware' } }"
      class="inline-flex items-center gap-2 rounded-full border border-leaf-900/15 bg-white px-6 py-3 font-medium text-leaf-900 transition hover:border-leaf-900/30"
    >
      {{ t('build.customize') }}
    </RouterLink>
  </div>
</template>
