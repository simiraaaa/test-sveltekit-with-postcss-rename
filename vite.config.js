import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],

	build: {
		lib: {
			entry: resolve(__dirname, 'src/lib/index.js'),
			name: 'test',
			fileName: 'test',
		},
		outDir: 'build',
	},
});
