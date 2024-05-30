# test-sveltekit-with-postcss-rename
`&lt;div class="abc">` → `&lt;div class="prefix--abc">`


## log

```
npm create svelte@latest      

```

```

┌  Welcome to SvelteKit!
│
◇  Where should we create your project?
│    (hit Enter to use current directory)
│
◇  Directory not empty. Continue?
│  Yes
│
◇  Which Svelte app template?
│  Library project
│
◇  Add type checking with TypeScript?
│  Yes, using JavaScript with JSDoc comments
│
◇  Select additional options (use arrow keys/space bar)
│  none
│
└  Your project is ready!

```

```
npm i
```

```
npm i postcss-rename
```

## setup postcss-rename

`svelte.config.js`

```diff
import adapter from '@sveltejs/adapter-auto';
+ import sveltePreprocess from 'svelte-preprocess';
+ import postcssRename from "postcss-rename";
+ 
+ const dev = process.env.NODE_ENV === 'development';
+ const PREFIX_NAME = 'prefix';
+
+ const preprocess = sveltePreprocess({
+ 	postcss: dev ? undefined : {
+ 		plugins: [
+ 			postcssRename({
+ 				strategy: 'none',
+ 				prefix: PREFIX_NAME,
+ 				outputMapCallback: (outputMap) => {
+ 					console.log(outputMap);
+ 				},
+ 			}),
+ 		],
+ 	},
+ });

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
+ 	preprocess,
};

export default config;

```

## TODO: HTML markup class name prefix

## TODO: JavaScript class name prefix


## setup umd build

`vite.config.js`

```diff
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
+ import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],

+ 	build: {
+ 		lib: {
+ 			entry: resolve(__dirname, 'src/lib/index.js'),
+ 			name: 'test',
+ 			fileName: 'test',
+ 		},
+ 		outDir: 'build',
+ 	},
});

```