<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import GithubIcon from './GithubIcon.vue';
import AgromateLogo from './AgromateLogo.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';
import { links } from '@/site';

const { t } = useI18n();
const route = useRoute();
const open = ref(false);

watch(
  () => route.fullPath,
  () => (open.value = false),
);

const nav = computed(() => [
  { label: t('nav.features'), to: '/#features' },
  { label: t('nav.architecture'), to: '/#architecture' },
  { label: t('nav.docs'), to: '/docs' },
]);
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-leaf-900/10 bg-soil-50/85 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-2.5" :aria-label="t('nav.home')">
        <AgromateLogo class="size-9" />
        <span class="font-display text-xl font-semibold tracking-tight">Agromate</span>
      </RouterLink>

      <nav class="hidden items-center gap-1 md:flex" :aria-label="t('nav.main')">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-3.5 py-2 text-sm font-medium text-leaf-900/75 transition hover:bg-leaf-100 hover:text-leaf-950"
          :class="{
            'bg-leaf-100 text-leaf-950': item.to === '/docs' && route.path.startsWith('/docs'),
          }"
        >
          {{ item.label }}
        </RouterLink>
        <LanguageSwitcher class="ml-2" />
        <a
          :href="links.org"
          target="_blank"
          rel="noopener noreferrer"
          class="ml-2 inline-flex items-center gap-2 rounded-full bg-leaf-900 px-4 py-2 text-sm font-medium text-leaf-50 transition hover:bg-leaf-800"
        >
          <GithubIcon class="size-4" />
          GitHub
        </a>
      </nav>

      <div class="flex items-center gap-2 md:hidden">
        <LanguageSwitcher />
        <button
          type="button"
          class="rounded-lg p-2 text-leaf-900 hover:bg-leaf-100"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="t('nav.openMenu')"
          @click="open = !open"
        >
          <component :is="open ? XMarkIcon : Bars3Icon" class="size-6" />
        </button>
      </div>
    </div>

    <nav
      v-if="open"
      id="mobile-nav"
      class="border-t border-leaf-900/10 px-4 pb-4 md:hidden"
      :aria-label="t('nav.main')"
    >
      <RouterLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="block rounded-lg px-3 py-2.5 font-medium text-leaf-900 hover:bg-leaf-100"
      >
        {{ item.label }}
      </RouterLink>
      <a
        :href="links.org"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-2 flex items-center gap-2 rounded-lg px-3 py-2.5 font-medium text-leaf-900 hover:bg-leaf-100"
      >
        <GithubIcon class="size-5" /> GitHub
      </a>
    </nav>
  </header>
</template>
