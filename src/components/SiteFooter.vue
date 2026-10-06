<script setup lang="ts">
import AgromateLogo from './AgromateLogo.vue';
import { useI18n } from 'vue-i18n';
import { links } from '@/site';

const { t } = useI18n();

const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-leaf-900/10 bg-leaf-950 text-leaf-100">
    <div
      class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr] lg:px-8"
    >
      <div>
        <div class="flex items-center gap-2.5">
          <AgromateLogo class="size-9" />
          <span class="font-display text-xl font-semibold text-white">Agromate</span>
        </div>
        <p class="mt-4 max-w-sm text-sm leading-relaxed text-leaf-200/80">
          {{ t('footer.tagline') }}
        </p>
      </div>
      <div>
        <h2 class="text-sm font-semibold text-white">{{ t('footer.project') }}</h2>
        <ul class="mt-4 space-y-2.5 text-sm text-leaf-200/80">
          <li>
            <RouterLink to="/#features" class="hover:text-white">{{
              t('nav.features')
            }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/#architecture" class="hover:text-white">{{
              t('nav.architecture')
            }}</RouterLink>
          </li>
          <li>
            <RouterLink to="/docs" class="hover:text-white">{{ t('nav.docs') }}</RouterLink>
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-sm font-semibold text-white">{{ t('footer.source') }}</h2>
        <ul class="mt-4 space-y-2.5 text-sm text-leaf-200/80">
          <li>
            <a
              :href="links.firmware"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white"
              >{{ t('footer.firmware') }}</a
            >
          </li>
          <li>
            <a
              :href="links.app"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white"
              >{{ t('footer.app') }}</a
            >
          </li>
          <li>
            <a
              :href="links.org"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white"
              >{{ t('footer.org') }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10">
      <p class="mx-auto max-w-7xl px-4 py-6 text-xs text-leaf-200/60 sm:px-6 lg:px-8">
        {{ t('footer.copyright', { year }) }}
      </p>
    </div>
  </footer>
</template>
