// Download the latest Agrosmart firmware release into public/firmware/ so the web flasher can
// load it from the same origin (GitHub release assets are not served with CORS headers).
//
// Usage: node scripts/fetch-firmware.ts [tag]   (default: latest release)
//
// Assets are fetched from the public release download URLs, not the GitHub API: the release info
// (tag, page URL, publication date) is already in manifest.json, written by the firmware's
// tools/package_release.py.
//
// A missing release is not an error: the flasher page then says no firmware is available.
//
// Runs with Node's native type stripping: keep to erasable TypeScript syntax (no enums etc.).

import { createHash } from 'node:crypto';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { FirmwareManifest } from '../env';

const REPO = 'agromate-devs/agrosmart';
const outDir = fileURLToPath(new URL('../public/firmware/', import.meta.url));
const tag = process.argv[2];
const manifestUrl = `https://github.com/${REPO}/releases/${tag ? `download/${tag}` : 'latest/download'}/manifest.json`;

async function download(url: string): Promise<Buffer> {
  const res = await fetch(url, { headers: { 'User-Agent': 'agromate-website' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

let manifest: FirmwareManifest;
try {
  manifest = JSON.parse((await download(manifestUrl)).toString('utf8')) as FirmwareManifest;
} catch (err) {
  console.warn(
    `[fetch-firmware] no release found, skipping (${err instanceof Error ? err.message : err})`,
  );
  process.exit(0);
}

// Images come from the release the manifest describes (its page URL is .../releases/tag/<tag>),
// so a "latest" that moves mid-download can't mix files from two releases.
const baseUrl = manifest.release.url.replace('/releases/tag/', '/releases/download/') + '/';

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const part of manifest.parts) {
  const data = await download(baseUrl + part.file);
  const hash = createHash('sha256').update(data).digest('hex');
  if (hash !== part.sha256) throw new Error(`checksum mismatch for ${part.file}`);
  await writeFile(outDir + part.file, data);
}

await writeFile(outDir + 'manifest.json', JSON.stringify(manifest, null, 2) + '\n');

console.log(
  `[fetch-firmware] ${manifest.release.tag ?? manifest.version}: ${manifest.parts.length} images for ${manifest.chip}`,
);
