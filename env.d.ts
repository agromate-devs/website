/// <reference types="vite/client" />
import type { FlashFreqValues, FlashModeValues, FlashSizeValues } from 'esptool-js';

/** One image to write, as listed in the release manifest.json (tools/package_release.py). */
export interface FirmwarePart {
  name: string;
  file: string;
  offset: number;
  size: number;
  sha256: string;
}

export interface FirmwareManifest {
  name: string;
  version: string;
  chip: string;
  idf_version: string;
  flash: {
    flash_mode: FlashModeValues;
    flash_size: FlashSizeValues;
    flash_freq: FlashFreqValues;
  };
  parts: FirmwarePart[];
  release: { tag: string; url: string; published_at: string };
}
