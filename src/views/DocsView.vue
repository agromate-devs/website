<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Marked } from 'marked';
import markedAlert from 'marked-alert';
import { markedHighlight } from 'marked-highlight';
import i18n from '../i18n';
import hljs from 'highlight.js';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid';

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  }),
);
marked.use(markedAlert());

interface DocFrontmatter {
  title: string;
  section: string;
  section_order: number;
  order: number;
  draft: boolean;
}

interface DocPage {
  name: string;
  locale: string;
  frontmatter: DocFrontmatter;
  content: string;
}

const componentsFrontmatter = import.meta.glob('../../docs/**/*.md', { eager: true });
const markdownContents = import.meta.glob('../../docs/**/*.md', { eager: true, query: '?raw' });
const docs: DocPage[] = [];

// Parse imported markdown by Vite
Object.entries(componentsFrontmatter).forEach(([path, module]) => {
  const filename = path.split('/').slice(-1)[0];

  if (filename == null || markdownContents[path] == null) return;
  const splitFilename = filename.split('.');
  if (splitFilename.length < 2 || splitFilename[1] == null) return;

  docs.push({
    name: filename,
    locale: splitFilename[1],
    frontmatter: module as DocFrontmatter,
    // @ts-expect-error The inferred type of markdownContents is partially wrong. markdownContents[path] is an Object
    content: markdownContents[path].default,
  });
});

const route = useRoute();

const current_locale = i18n.global.locale;

// ?article=xxx is the file name without language and extension, the introduction by default
const current_article = computed(() => route.query.article || 'index');
const article_html = computed(() => {
  const find_article = (locale: string) =>
    docs.find((doc) => doc.name.split('.')[0] === current_article.value && doc.locale === locale);
  // Render the markdown of the selected article(improve first contentful paint compared to rendering all the markdown at startup)
  let doc = find_article(current_locale.value);

  if (!doc) doc = find_article('en');
  if (!doc) return;
  const html = marked.parse(doc.content.replace(/^---[\s\S]*?---\s*/, ''), { async: false }); // Remove frontmatter since marked doesn't parse it
  // Docs use root-relative links and images, which Vite can't rewrite in rendered markdown
  return html.replace(/\b(src|href)="\/(?!\/)/g, `$1="${import.meta.env.BASE_URL}`);
});

// Parse the frontmatter for every single page
const pages = computed(() => {
  return docs
    .filter((doc) => doc.locale === current_locale.value)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
    .map((doc) => {
      return {
        article: doc.name.split('.')[0],
        frontmatter: doc.frontmatter,
      };
    });
});

// Extract all the available sections
const sections = computed(() => {
  return new Set(
    docs
      .filter((doc) => doc.locale === current_locale.value)
      .sort((a, b) => a.frontmatter.section_order - b.frontmatter.section_order)
      .map((doc) => doc.frontmatter.section),
  );
});

function isPageDraft(article: string): boolean {
  const page = pages.value.filter((s) => s.article == article)[0];
  if (page == null) return false;

  return page.frontmatter.draft;
}
</script>

<template>
  <div class="mx-auto flex max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:px-8">
    <aside class="w-64 shrink-0">
      <nav class="sticky top-24 space-y-1">
        <details v-for="section in sections" :key="section" class="group" open>
          <summary
            class="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 font-semibold text-leaf-950 hover:bg-leaf-100"
          >
            {{ section }}
            <span class="text-leaf-900/50 transition-transform group-open:rotate-90">›</span>
          </summary>
          <ul class="mt-1 ml-3 space-y-1 border-l border-leaf-200 pl-3">
            <li
              v-for="page in pages.filter((p) => p.frontmatter.section === section)"
              :key="page.article"
            >
              <RouterLink
                :to="{ query: { article: page.article } }"
                class="block rounded-md px-2 py-1 text-sm hover:bg-leaf-50 hover:text-leaf-950"
                :class="
                  page.article === current_article
                    ? 'bg-leaf-100 font-medium text-leaf-950'
                    : 'text-leaf-900/70'
                "
              >
                {{ page.frontmatter.title }}
              </RouterLink>
            </li>
          </ul>
        </details>
      </nav>
    </aside>
    <div class="min-w-0 flex-1">
      <div
        v-if="isPageDraft(<string>current_article)"
        role="alert"
        class="mb-6 flex items-start gap-3 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-yellow-900"
      >
        <ExclamationTriangleIcon class="size-6" />
        <div>
          <p class="font-semibold">{{ $t('docs.draftBadge') }}</p>
          <p class="text-sm">{{ $t('docs.draftWarning') }}</p>
        </div>
      </div>
      <article class="doc-content wrap-break-word" v-html="article_html" />
    </div>
  </div>
</template>
