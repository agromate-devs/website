<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { locales, setLocale } from '@/i18n';

const { t, locale } = useI18n();
</script>

<template>
  <div
    role="group"
    :aria-label="t('language.label')"
    class="inline-flex rounded-full border border-leaf-900/15 bg-white/70 p-0.5 text-xs font-semibold"
  >
    <button
      v-for="code in locales"
      :key="code"
      type="button"
      :lang="code"
      :title="t(`language.${code}`)"
      :aria-pressed="locale === code"
      class="rounded-full px-2.5 py-1 uppercase transition"
      :class="locale === code ? 'bg-leaf-900 text-leaf-50' : 'text-leaf-900/70 hover:text-leaf-950'"
      @click="setLocale(code)"
    >
      {{ code }}
    </button>
  </div>
</template>
