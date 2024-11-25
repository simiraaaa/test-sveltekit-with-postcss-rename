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

## HTML markup class name prefix

`svelte.config.js`

```js
preprocess: dev ? undefined : [preprocessClassNamePrefix({ prefix: PREFIX_NAME }), preprocess],
```

see `src/scripts/css-prefix-svelte-preprocess.js`


## JavaScript class name prefix

```js
// cssPrefix('x') → 'prefix--x'
let className = cssPrefix('x');
onMount(() => {
  // cssPrefix('.abc') → '.prefix--abc'
  document.querySelector(cssPrefix('.abc')).textContent = 'Hello world';
});

```

see `src/scripts/css-prefix.js`

## setup umd build

`vite.config.js`

```diff
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
+ import { resolve } from 'path';

+ const dev = process.env.NODE_ENV === 'development';

export default defineConfig({
+ 	plugins: [dev ? sveltekit() : svelte()],

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