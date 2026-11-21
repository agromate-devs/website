<script setup lang="ts">
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';

const { locale } = useI18n();

watchEffect(() => document.documentElement.setAttribute('lang', locale.value));
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <SiteHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
