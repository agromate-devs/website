<script setup lang="ts">
import type { Component } from 'vue';
import { ArrowRightIcon } from '@heroicons/vue/24/outline';
import GithubIcon from './GithubIcon.vue';

const props = defineProps<{
  href: string;
  icon: Component;
  title: string;
  description: string;
  repo: string;
  tone: keyof typeof tones;
}>();

const tones = {
  leaf: {
    card: 'bg-leaf-900 text-leaf-50 hover:bg-leaf-800',
    icon: 'text-leaf-300',
    description: 'text-leaf-200/80',
    repo: 'text-leaf-200',
  },
  soil: {
    card: 'bg-soil-900 text-soil-50 hover:bg-soil-700',
    icon: 'text-sun-300',
    description: 'text-soil-200/80',
    repo: 'text-soil-200',
  },
};

const tone = tones[props.tone];
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="group relative overflow-hidden rounded-3xl p-10 transition"
    :class="tone.card"
  >
    <component :is="icon" class="size-10" :class="tone.icon" />
    <h3 class="mt-8 font-display text-3xl font-semibold">{{ title }}</h3>
    <p class="mt-3 max-w-md" :class="tone.description">{{ description }}</p>
    <p class="mt-8 inline-flex items-center gap-2 font-mono text-sm" :class="tone.repo">
      <GithubIcon class="size-4" />
      {{ repo }}
      <ArrowRightIcon class="size-4 transition group-hover:translate-x-1" />
    </p>
  </a>
</template>
