import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const dev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [dev ? sveltekit() : svelte()],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.js'),
      name: 'test',
      fileName: 'test',
    },
    outDir: 'build',
  },
});
