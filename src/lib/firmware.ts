import type { FirmwareManifest, FirmwarePart } from '../../env';

const base = `${import.meta.env.BASE_URL}firmware/`;

/** Load the manifest downloaded at build time, or null when no firmware is bundled. */
export async function loadManifest(): Promise<FirmwareManifest | null> {
  const res = await fetch(`${base}manifest.json`, { cache: 'no-cache' });
  if (!res.ok || !res.headers.get('content-type')?.includes('json')) return null;
  return (await res.json()) as FirmwareManifest;
}

async function sha256Hex(data: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', data as Uint8Array<ArrayBuffer>);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Download an image and check it against the manifest checksum. */
export async function loadPart(part: FirmwarePart): Promise<Uint8Array> {
  const res = await fetch(base + part.file);
  if (!res.ok) throw new Error(`${part.file}: HTTP ${res.status}`);
  const data = new Uint8Array(await res.arrayBuffer());
  if ((await sha256Hex(data)) !== part.sha256) throw new Error(`${part.file}: checksum mismatch`);
  return data;
}

/** "esp32c5" → "ESP32-C5", the format esptool-js uses for CHIP_NAME. */
export function chipLabel(chip: string): string {
  return chip.toUpperCase().replace('ESP32', 'ESP32-');
}
