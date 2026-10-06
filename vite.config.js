import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The Web Components polyfill is loaded as a classic (non-module) script from
// /node_modules/..., which Vite serves in dev but does not bundle. Emit it at the
// same path in the build output so production matches dev.
const polyfillPath = 'node_modules/@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js';
const copyPolyfill = {
  name: 'copy-webcomponents-polyfill',
  apply: 'build',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: polyfillPath,
      source: readFileSync(fileURLToPath(new URL(polyfillPath, import.meta.url))),
    });
  },
};

export default defineConfig({
  plugins: [copyPolyfill],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('index.html', import.meta.url)),
        demo: fileURLToPath(new URL('demo/index.html', import.meta.url)),
      },
    },
  },
});
