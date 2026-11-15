<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  CheckCircleIcon,
  CpuChipIcon,
  ExclamationTriangleIcon,
  LinkSlashIcon,
} from '@heroicons/vue/24/outline';
import { ESPLoader, type IEspLoaderTerminal, Transport } from 'esptool-js';
import { chipLabel, type FirmwareManifest, loadManifest, loadPart } from '@/lib/firmware';
import { links } from '@/site';

const { t, locale } = useI18n();

watchEffect(() => (document.title = t('meta.flasherTitle')));

type Status = 'idle' | 'connecting' | 'connected' | 'flashing' | 'done';

const supported = typeof navigator !== 'undefined' && 'serial' in navigator;
const manifest = ref<FirmwareManifest | null>(null);
const manifestLoaded = ref(false);
const status = ref<Status>('idle');
const error = ref('');
const chip = ref('');
const eraseAll = ref(false);
const progress = ref(0);
const progressLabel = ref('');
const log = ref('');
const logEl = ref<HTMLPreElement | null>(null);

let transport: Transport | null = null;
const loader = shallowRef<ESPLoader | null>(null);

const busy = computed(() => status.value === 'connecting' || status.value === 'flashing');
const expectedChip = computed(() => (manifest.value ? chipLabel(manifest.value.chip) : ''));
const wrongChip = computed(
  () => !!chip.value && !!expectedChip.value && !chip.value.startsWith(expectedChip.value),
);

const terminal: IEspLoaderTerminal = {
  clean: () => (log.value = ''),
  write: (data) => append(data),
  writeLine: (data) => append(data + '\n'),
};

function append(text: string) {
  log.value += text;
  void nextTick(() => logEl.value?.scrollTo({ top: logEl.value.scrollHeight }));
}

function fail(err: unknown) {
  error.value = err instanceof Error ? err.message : String(err);
  append(`\n${t('flasher.errorPrefix')}: ${error.value}\n`);
}

onMounted(async () => {
  try {
    manifest.value = await loadManifest();
  } catch {
    manifest.value = null;
  }
  manifestLoaded.value = true;
});

async function connect() {
  error.value = '';
  let port: SerialPort;
  try {
    port = await navigator.serial.requestPort();
  } catch {
    return; // the user closed the port picker
  }

  status.value = 'connecting';
  try {
    transport = new Transport(port);
    loader.value = new ESPLoader({
      transport: transport,
      baudrate: 460800,
      romBaudrate: 115200,
      terminal,
    });
    await loader.value.main();
    chip.value = loader.value.chip.CHIP_NAME;
    status.value = 'connected';
  } catch (err) {
    fail(err);
    await disconnect();
  }
}

async function flash() {
  if (!loader.value || !manifest.value) return;
  const { flash: settings, parts } = manifest.value;
  error.value = '';
  status.value = 'flashing';
  progress.value = 0;

  try {
    progressLabel.value = t('flasher.downloading');
    const files = [];
    for (const part of parts) {
      files.push({ data: await loadPart(part), address: part.offset });
    }

    if (eraseAll.value) {
      progressLabel.value = t('flasher.erasing');
      append(`${t('flasher.erasing')}\n`);
      await loader.value.eraseFlash();
    }

    const total = parts.reduce((sum, p) => sum + p.size, 0);
    await loader.value.writeFlash({
      fileArray: files,
      flashMode: settings.flash_mode,
      flashFreq: settings.flash_freq,
      flashSize: settings.flash_size,
      eraseAll: false,
      compress: true,
      reportProgress: (index, written, size) => {
        const done = parts.slice(0, index).reduce((sum, p) => sum + p.size, 0);
        const current = parts[index];
        progressLabel.value = t('flasher.writing', { part: current?.name ?? '' });
        progress.value = Math.round(
          ((done + (written / size) * (current?.size ?? 0)) / total) * 100,
        );
      },
    });
    progress.value = 100;
    await loader.value.after('hard_reset');
    status.value = 'done';
  } catch (err) {
    fail(err);
    status.value = 'connected';
    return;
  }
  await disconnect(true);
}

async function disconnect(keepStatus = false) {
  try {
    await transport?.disconnect();
  } catch {
    // the port may already be gone (board unplugged)
  }
  transport = null;
  loader.value = null;
  chip.value = '';
  if (!keepStatus) status.value = 'idle';
}

onBeforeUnmount(() => void disconnect());
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
    <h1 class="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
      {{ t('flasher.title') }}
    </h1>
    <p class="mt-5 max-w-2xl text-lg text-leaf-900/70">{{ t('flasher.intro') }}</p>

    <!-- Browser without Web Serial -->
    <div
      v-if="!supported"
      class="mt-10 flex gap-3 rounded-2xl border border-sun-400/60 bg-sun-300/20 p-5 text-soil-900"
    >
      <ExclamationTriangleIcon class="size-6 shrink-0 text-soil-700" />
      <p>{{ t('flasher.unsupported') }}</p>
    </div>

    <!-- Firmware info -->
    <div class="mt-10 rounded-3xl border border-leaf-900/10 bg-white/70 p-6 sm:p-8">
      <div class="flex items-start gap-4">
        <CpuChipIcon class="size-10 shrink-0 text-leaf-600" />
        <div class="min-w-0 flex-1">
          <h2 class="font-display text-2xl font-semibold">{{ t('flasher.firmwareTitle') }}</h2>
          <p v-if="!manifestLoaded" class="mt-2 text-leaf-900/60">{{ t('flasher.loading') }}</p>
          <template v-else-if="manifest">
            <p class="mt-2 text-leaf-900/70">{{ t('flasher.firmwareText') }}</p>
            <dl class="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
              <div>
                <dt class="text-leaf-900/60">{{ t('flasher.version') }}</dt>
                <dd class="font-mono font-medium">{{ manifest.version }}</dd>
              </div>
              <div>
                <dt class="text-leaf-900/60">{{ t('flasher.chip') }}</dt>
                <dd class="font-mono font-medium">{{ expectedChip }}</dd>
              </div>
              <div>
                <dt class="text-leaf-900/60">{{ t('flasher.flash') }}</dt>
                <dd class="font-mono font-medium">{{ manifest.flash.flash_size }}</dd>
              </div>
              <div v-if="manifest.release.published_at">
                <dt class="text-leaf-900/60">{{ t('flasher.published') }}</dt>
                <dd class="font-medium">
                  {{ new Date(manifest.release.published_at).toLocaleDateString(locale) }}
                </dd>
              </div>
            </dl>
            <p class="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a
                v-if="manifest.release"
                :href="manifest.release.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 font-medium text-leaf-700 hover:text-leaf-900"
              >
                {{ t('flasher.releaseNotes') }} <ArrowTopRightOnSquareIcon class="size-4" />
              </a>
              <RouterLink
                :to="{ path: '/docs', query: { article: 'custom_firmware' } }"
                class="font-medium text-leaf-700 hover:text-leaf-900"
              >
                {{ t('flasher.customFirmware') }}
              </RouterLink>
            </p>
          </template>
          <p v-else class="mt-2 text-leaf-900/70">
            {{ t('flasher.noFirmware') }}
            <a
              :href="`${links.firmware}/releases`"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-leaf-700 underline underline-offset-4"
              >{{ t('flasher.releases') }}</a
            >
          </p>
        </div>
      </div>
    </div>

    <!-- Steps -->
    <ol v-if="supported && manifest" class="mt-8 space-y-6">
      <li class="rounded-3xl border border-leaf-900/10 bg-white/70 p-6 sm:p-8">
        <h2 class="font-display text-xl font-semibold">1. {{ t('flasher.connectTitle') }}</h2>
        <p class="mt-2 text-leaf-900/70">{{ t('flasher.connectText') }}</p>
        <div class="mt-5 flex flex-wrap items-center gap-3">
          <button
            v-if="!loader"
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-leaf-900 px-6 py-3 font-medium text-leaf-50 transition hover:bg-leaf-800 disabled:opacity-50"
            :disabled="busy"
            @click="connect"
          >
            <BoltIcon class="size-5" />
            {{ status === 'connecting' ? t('flasher.connecting') : t('flasher.connect') }}
          </button>
          <template v-else>
            <span
              class="inline-flex items-center gap-2 rounded-full bg-leaf-100 px-4 py-2 font-mono text-sm text-leaf-900"
            >
              <CheckCircleIcon class="size-5 text-leaf-600" /> {{ chip }}
            </span>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-leaf-900/75 hover:bg-leaf-100 disabled:opacity-50"
              :disabled="busy"
              @click="disconnect()"
            >
              <LinkSlashIcon class="size-4" /> {{ t('flasher.disconnect') }}
            </button>
          </template>
        </div>
        <p
          v-if="wrongChip"
          class="mt-4 flex gap-2 rounded-xl bg-sun-300/25 p-3 text-sm text-soil-900"
        >
          <ExclamationTriangleIcon class="size-5 shrink-0 text-soil-700" />
          {{ t('flasher.wrongChip', { chip, expected: expectedChip }) }}
        </p>
      </li>

      <li class="rounded-3xl border border-leaf-900/10 bg-white/70 p-6 sm:p-8">
        <h2 class="font-display text-xl font-semibold">2. {{ t('flasher.flashTitle') }}</h2>
        <label class="mt-4 flex cursor-pointer items-start gap-3">
          <input
            v-model="eraseAll"
            type="checkbox"
            class="mt-1 size-4 accent-leaf-600"
            :disabled="busy"
          />
          <span>
            <span class="font-medium">{{ t('flasher.erase') }}</span>
            <span class="block text-sm text-leaf-900/60">{{ t('flasher.eraseHint') }}</span>
          </span>
        </label>
        <button
          type="button"
          class="mt-6 inline-flex items-center gap-2 rounded-full bg-leaf-600 px-6 py-3 font-medium text-white transition hover:bg-leaf-700 disabled:opacity-50"
          :disabled="!loader || busy || wrongChip"
          @click="flash"
        >
          {{ status === 'flashing' ? t('flasher.flashing') : t('flasher.flashButton') }}
        </button>

        <div v-if="status === 'flashing' || status === 'done'" class="mt-6">
          <div class="flex justify-between text-sm text-leaf-900/70">
            <span>{{ status === 'done' ? t('flasher.done') : progressLabel }}</span>
            <span class="font-mono">{{ progress }}%</span>
          </div>
          <div
            class="mt-2 h-2.5 overflow-hidden rounded-full bg-leaf-100"
            role="progressbar"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="h-full rounded-full bg-leaf-500 transition-[width]"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>

        <div
          v-if="status === 'done'"
          class="mt-6 flex gap-3 rounded-2xl bg-leaf-100 p-5 text-leaf-950"
        >
          <CheckCircleIcon class="size-6 shrink-0 text-leaf-600" />
          <p>
            {{ t('flasher.doneText') }}
            <RouterLink
              :to="{ path: '/docs', query: { article: 'pairing' } }"
              class="font-medium text-leaf-700 underline underline-offset-4"
              >{{ t('flasher.pairing') }}</RouterLink
            >
          </p>
        </div>

        <p
          v-if="error"
          class="mt-6 flex gap-2 rounded-xl border border-soil-200 bg-soil-100 p-3 text-sm text-soil-900"
          role="alert"
        >
          <ExclamationTriangleIcon class="size-5 shrink-0 text-soil-700" /> {{ error }}
        </p>
      </li>
    </ol>

    <details v-if="log" class="mt-8" open>
      <summary class="cursor-pointer text-sm font-medium text-leaf-900/70">
        {{ t('flasher.log') }}
      </summary>
      <pre
        ref="logEl"
        class="mt-3 max-h-80 overflow-auto rounded-xl bg-leaf-950 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-leaf-50"
        >{{ log }}</pre>
    </details>

    <p class="mt-10 text-sm text-leaf-900/60">
      {{ t('flasher.troubleshooting') }}
      <RouterLink
        :to="{ path: '/docs', query: { article: 'building_agrosmart' } }"
        class="font-medium text-leaf-700 underline underline-offset-4"
        >{{ t('flasher.manual') }}</RouterLink
      >
    </p>
  </section>
</template>
