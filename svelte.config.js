import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import postcssRename from "postcss-rename";
import { PREFIX_NAME } from './src/scripts/css-prefix.js';
// import { parse as parseSvelte, compile } from 'svelte/compiler';

// const res = parseSvelte("", { css: 'none', filename: 'test.svelte', });


const dev = process.env.NODE_ENV === 'development';

const preprocess = sveltePreprocess({
	postcss: dev ? undefined : {
		plugins: [
			postcssRename({
				strategy: 'none',
				prefix: PREFIX_NAME,
				outputMapCallback: (outputMap) => {
					console.log(outputMap);
				},
			}),
		],
	},
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
	preprocess,
};

export default config;
