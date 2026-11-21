<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  ArrowRightIcon,
  BookOpenIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/vue/24/outline';
import ArchitectureSection from '@/components/ArchitectureSection.vue';
import FeaturesSection from '@/components/FeaturesSection.vue';
import GreenhouseIllustration from '@/components/GreenhouseIllustration.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import { links } from '@/site';

const { t } = useI18n();

watchEffect(() => (document.title = t('meta.homeTitle')));

const projects = computed(() => [
  {
    href: links.firmware,
    icon: CpuChipIcon,
    title: t('projects.firmware.title'),
    description: t('projects.firmware.description'),
    repo: 'agromate-devs/agrosmart',
    tone: 'leaf' as const,
  },
  {
    href: links.app,
    icon: DevicePhoneMobileIcon,
    title: t('projects.app.title'),
    description: t('projects.app.description'),
    repo: 'agromate-devs/new_mobile_app',
    tone: 'soil' as const,
  },
]);
</script>

<template>
  <!-- HERO -->
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute -top-40 right-[-10%] size-[38rem] rounded-full bg-leaf-200/60 blur-3xl"
      />
      <div
        class="absolute bottom-[-20%] left-[-10%] size-[30rem] rounded-full bg-sun-300/30 blur-3xl"
      />
    </div>

    <div
      class="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pt-20 lg:pb-28"
    >
      <div>
        <h1
          class="mt-6 font-display text-5xl leading-[1.05] font-semibold tracking-tight text-balance text-leaf-950 sm:text-6xl lg:text-7xl"
        >
          <i18n-t keypath="hero.title" scope="global">
            <template #highlight>
              <em class="text-leaf-600 not-italic">{{ t('hero.highlight') }}</em>
            </template>
          </i18n-t>
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-relaxed text-leaf-900/75">
          {{ t('hero.text') }}
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <a
            href="#features"
            class="inline-flex items-center gap-2 rounded-full bg-leaf-900 px-6 py-3 font-medium text-leaf-50 shadow-lg shadow-leaf-900/20 transition hover:bg-leaf-800"
          >
            {{ t('hero.discover') }}
            <ArrowRightIcon class="size-4" />
          </a>
          <RouterLink
            to="/docs"
            class="inline-flex items-center gap-2 rounded-full border border-leaf-900/15 bg-white px-6 py-3 font-medium text-leaf-900 transition hover:border-leaf-900/30"
          >
            <BookOpenIcon class="size-4" />
            {{ t('hero.docs') }}
          </RouterLink>
        </div>
      </div>

      <GreenhouseIllustration />
    </div>
  </section>

  <!-- FEATURES -->
  <section id="features" class="scroll-mt-16 bg-white py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-sm font-semibold tracking-widest text-leaf-600 uppercase">
          {{ t('features.eyebrow') }}
        </p>
        <h2
          class="mt-3 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
        >
          {{ t('features.title') }}
        </h2>
        <p class="mt-5 text-lg text-leaf-900/70">
          {{ t('features.text') }}
        </p>
      </div>
      <FeaturesSection />
    </div>
  </section>

  <section id="architecture" class="scroll-mt-16 bg-leaf-950 py-24 text-leaf-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-sm font-semibold tracking-widest text-leaf-300 uppercase">
          {{ t('architecture.eyebrow') }}
        </p>
        <h2
          class="mt-3 font-display text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl"
        >
          {{ t('architecture.title') }}
        </h2>
        <p class="mt-5 text-lg text-leaf-200/80">
          {{ t('architecture.text') }}
        </p>
      </div>

      <ArchitectureSection />
    </div>
  </section>

  <section id="progetto" class="scroll-mt-16 py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-6 lg:grid-cols-2">
        <ProjectCard v-for="project in projects" :key="project.repo" v-bind="project" />
      </div>

      <div class="mt-6 rounded-3xl border border-leaf-900/10 bg-white p-10">
        <div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div class="max-w-xl">
            <BookOpenIcon class="size-10 text-leaf-600" />
            <h3 class="mt-6 font-display text-3xl font-semibold">
              {{ t('projects.docs.title') }}
            </h3>
            <p class="mt-3 text-leaf-900/70">{{ t('projects.docs.text') }}</p>
          </div>
          <RouterLink
            to="/docs"
            class="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-leaf-900 px-6 py-3 font-medium text-leaf-50 transition hover:bg-leaf-800 lg:self-auto"
          >
            {{ t('projects.docs.cta') }}
            <ArrowRightIcon class="size-4" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
