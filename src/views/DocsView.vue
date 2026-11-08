<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Marked } from 'marked';
import markedAlert from 'marked-alert';
import { markedHighlight } from 'marked-highlight';
import { useI18n } from 'vue-i18n';
import i18n from '../i18n';
import hljs from 'highlight.js';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
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
const { t } = useI18n();

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
  // Wrap every code block with a copy button (handled by onArticleClick)
  const copy_button = `<button type="button" class="copy-code" aria-label="${t('docs.copyCodeLabel')}">${t('docs.copyCode')}</button>`;
  return (
    html
      .replace(/<pre>/g, `<div class="code-block">${copy_button}<pre>`)
      .replace(/<\/pre>/g, '</pre></div>')
      // Docs use root-relative links and images, which Vite can't rewrite in rendered markdown
      .replace(/\b(src|href)="\/(?!\/)/g, `$1="${import.meta.env.BASE_URL}`)
  );
});

const copy_timers = new WeakMap<HTMLElement, number>();

async function onArticleClick(event: MouseEvent) {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.copy-code');
  const code = button?.parentElement?.querySelector('pre code');
  if (!button || !code) return;

  try {
    await navigator.clipboard.writeText(code.textContent ?? '');
  } catch {
    return; // Clipboard unavailable (e.g. insecure context): leave the button unchanged
  }

  button.textContent = t('docs.copiedCode');
  button.dataset.copied = '';
  window.clearTimeout(copy_timers.get(button));
  copy_timers.set(
    button,
    window.setTimeout(() => {
      button.textContent = t('docs.copyCode');
      delete button.dataset.copied;
    }, 2000),
  );
}

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

// Below the lg breakpoint the sidebar is a drawer opened from the toolbar
const nav_open = ref(false);
const desktop_query = window.matchMedia('(min-width: 64rem)');

const current_title = computed(
  () => pages.value.find((p) => p.article === current_article.value)?.frontmatter.title,
);

function closeNav() {
  nav_open.value = false;
}

onMounted(() => {
  desktop_query.addEventListener('change', closeNav); // The drawer doesn't exist on desktop: release the scroll lock
});

onBeforeUnmount(() => {
  desktop_query.removeEventListener('change', closeNav);
});
</script>

<template>
  <div>
    <div
      class="sticky top-16 z-30 border-b border-leaf-900/10 bg-soil-50/85 px-4 py-1.5 backdrop-blur-md sm:px-6 lg:hidden"
    >
      <button
        ref="nav_toggle"
        type="button"
        class="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-leaf-900 hover:bg-leaf-100"
        :aria-expanded="nav_open"
        aria-controls="docs-nav"
        :aria-label="$t('docs.index')"
        @click="nav_open = true"
      >
        <Bars3Icon class="size-5 shrink-0" />
        <span class="truncate">{{ current_title ?? $t('docs.navLabel') }}</span>
      </button>
    </div>

    <div class="fixed inset-0 z-40 bg-leaf-950/40 lg:hidden" v-if="nav_open" @click="closeNav" />

    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:flex lg:gap-10 lg:px-8 lg:py-10">
      <aside
        id="docs-nav"
        class="w-64 shrink-0 max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:w-72 max-lg:max-w-[85vw] max-lg:overflow-y-auto max-lg:overscroll-contain max-lg:bg-soil-50 max-lg:p-4 max-lg:shadow-xl"
        :class="
          nav_open
            ? 'max-lg:[transition:translate_200ms]'
            : 'max-lg:invisible max-lg:-translate-x-full max-lg:[transition:translate_200ms,visibility_0s_200ms]'
        "
      >
        <div class="mb-2 flex items-center justify-between lg:hidden">
          <span class="px-3 font-display font-semibold text-leaf-950">{{
            $t('docs.navLabel')
          }}</span>
          <button
            ref="nav_close"
            type="button"
            class="rounded-lg p-2 text-leaf-900 hover:bg-leaf-100"
            :aria-label="$t('nav.closeMenu')"
            @click="closeNav"
          >
            <XMarkIcon class="size-6" />
          </button>
        </div>
        <nav class="space-y-1 lg:sticky lg:top-24" :aria-label="$t('docs.index')">
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
                  @click="closeNav"
                >
                  {{ page.frontmatter.title }}
                </RouterLink>
              </li>
            </ul>
          </details>
        </nav>
      </aside>
      <div class="lg:min-w-0 lg:flex-1">
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
        <article
          class="doc-content wrap-break-word"
          v-html="article_html"
          @click="onArticleClick"
        />
      </div>
    </div>
  </div>
</template>
