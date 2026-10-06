<script setup lang="ts">
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import {marked} from 'marked';
import i18n from "../i18n";

const componentsFrontmatter = import.meta.glob('../../docs/**/*.md', {eager: true});
const markdownContents = import.meta.glob('../../docs/**/*.md', {eager: true, query: '?raw'});
const docs = [];

Object.entries(componentsFrontmatter).forEach(([path, module]) => {
  const filename = path.split('/').slice(-1)[0];

  docs.push({
    name: filename,
    locale: filename.split('.')[1],
    frontmatter: module,
    content: markdownContents[path].default
  });
});

const route = useRoute();

const current_locale = i18n.global.locale;

// ?article=xxx is the file name without language and extension, the introduction by default
const current_article = computed(() => route.query.article || 'index');
const article_html = computed(() => {
  const doc = docs.find(doc => doc.name.split('.')[0] === current_article.value && doc.locale === current_locale.value);
  if (!doc) return '';
  return marked.parse(doc.content.replace(/^---[\s\S]*?---\s*/, '')); // Remove frontmatter since marked doesn't parse it
});

const pages = computed(() => {
  return docs.filter(doc => doc.locale === current_locale.value).map(doc => {
    return {
      article: doc.name.split('.')[0],
      title: doc.frontmatter.title,
      section: doc.frontmatter.section,
      section_order: doc.frontmatter.section_order
    }
  });
});

const sections = computed(() => {
  return docs.filter(doc => doc.locale === current_locale.value)
    .sort((a, b) => a.frontmatter.section_order - b.frontmatter.section_order)
    .map(doc => doc.frontmatter.section);
});
</script>

<template>
  <div class="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
    <aside class="w-64 shrink-0">
      <nav class="sticky top-24 space-y-1">
        <details
          v-for="section in new Set(sections)"
          :key="section"
          class="group"
          open
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 font-semibold text-leaf-950 hover:bg-leaf-100"
          >
            {{ section }}
            <span class="text-leaf-900/50 transition-transform group-open:rotate-90">›</span>
          </summary>
          <ul class="mt-1 ml-3 space-y-1 border-l border-leaf-200 pl-3">
            <li v-for="page in pages.filter((p) => p.section === section)" :key="page.article">
              <RouterLink
                :to="{ query: { article: page.article, lang: current_locale } }"
                class="block rounded-md px-2 py-1 text-sm hover:bg-leaf-50 hover:text-leaf-950"
                :class="page.article === current_article ? 'bg-leaf-100 font-medium text-leaf-950' : 'text-leaf-900/70'"
              >
                {{ page.title }}
              </RouterLink>
            </li>
          </ul>
        </details>
      </nav>
    </aside>

    <article class="doc-content min-w-0 flex-1" v-html="article_html"/>
  </div>
</template>
