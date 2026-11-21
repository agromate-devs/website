<script setup lang="ts">
import { CpuChipIcon, DevicePhoneMobileIcon, ServerStackIcon } from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';
import GithubIcon from './GithubIcon.vue';

const { t } = useI18n();

const architecture = [
  {
    icon: CpuChipIcon,
    name: 'Agrosmart',
    tag: 'ESP-IDF',
    href: 'https://github.com/agromate-devs/agrosmart',
    protocol: 'MQTT',
  },
  {
    icon: ServerStackIcon,
    name: 'Agromate Server',
    tag: 'Fastify · Prisma',
    href: 'https://github.com/agromate-devs/server',
    protocol: 'REST + MQTT',
  },
  {
    icon: DevicePhoneMobileIcon,
    name: 'App mobile',
    labelKey: 'architecture.mobileApp',
    tag: 'Flutter · MobX',
    href: 'https://github.com/agromate-devs/new_mobile_app',
    protocol: null,
  },
] as const;
</script>

<template>
  <div class="mt-16 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
    <template v-for="(block, index) in architecture" :key="block.name">
      <component
        :is="'href' in block ? 'a' : 'div'"
        v-bind="
          'href' in block ? { href: block.href, target: '_blank', rel: 'noopener noreferrer' } : {}
        "
        class="group flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 transition"
        :class="{ 'hover:border-leaf-400/50 hover:bg-white/10': 'href' in block }"
      >
        <div class="flex items-center justify-between">
          <component :is="block.icon" class="size-9 text-leaf-300" />
          <GithubIcon
            v-if="'href' in block"
            class="size-5 text-leaf-300/60 transition group-hover:text-leaf-200"
          />
        </div>
        <h3 class="mt-6 font-display text-2xl font-semibold text-white">
          {{ 'labelKey' in block ? t(block.labelKey) : block.name }}
        </h3>
        <p class="mt-1 font-mono text-xs text-leaf-300">{{ block.tag }}</p>
      </component>
      <div
        v-if="index < architecture.length - 1"
        class="flex items-center justify-center text-leaf-400"
        aria-hidden="true"
      >
        <div class="flex flex-col items-center gap-1 font-mono text-[11px] lg:flex-row">
          <span class="h-8 w-px bg-leaf-400/40 lg:h-px lg:w-6" />
          <span class="rounded-full border border-leaf-400/40 px-2 py-0.5">{{
            block.protocol
          }}</span>
          <span class="h-8 w-px bg-leaf-400/40 lg:h-px lg:w-6" />
        </div>
      </div>
    </template>
  </div>
</template>
