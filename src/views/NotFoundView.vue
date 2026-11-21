<script setup lang="ts">
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';

const { t } = useI18n();

watchEffect(() => (document.title = t('meta.notFoundTitle')));
</script>

<template>
  <section class="mx-auto max-w-2xl px-4 py-32 text-center sm:px-6">
    <p class="font-mono text-sm text-leaf-600">404</p>
    <h1 class="mt-3 font-display text-5xl font-semibold tracking-tight">
      {{ t('notFound.title') }}
    </h1>
    <p class="mt-5 text-lg text-leaf-900/70">{{ t('notFound.text') }}</p>
    <RouterLink
      to="/"
      class="mt-10 inline-flex items-center gap-2 rounded-full bg-leaf-900 px-6 py-3 font-medium text-leaf-50 hover:bg-leaf-800"
    >
      <ArrowLeftIcon class="size-4" /> {{ t('notFound.back') }}
    </RouterLink>
  </section>
</template>
