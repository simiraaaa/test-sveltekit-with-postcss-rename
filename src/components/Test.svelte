<script>
  import { onMount } from 'svelte';
  import { cssPrefix } from '../scripts/css-prefix.js';
  import Test2 from './Test2.svelte';
  // cssPrefix('x') → 'prefix--x'
  let className = cssPrefix('x');
  let num = 0;
  let x = true;
  let v = true;
  onMount(() => {
    console.log('mounted');
    // cssPrefix('.abc') → '.prefix--abc'
    document.querySelector(cssPrefix('.abc')).textContent = 'Hello world';
  });
</script>

<div class="abc">default1</div>
<!-- class=prefix--abc -->
<div class="abc">default2</div>
<!-- class="prefix--abc" -->
<div class="abc">default3</div>
<!-- class="prefix--abc prefix--def" -->
<div class={className}>var normal1</div>
<!-- class="{className}" -->
<div class={className}>var normal2</div>
<!-- class={className} -->
<div class="abc {className}-{num} ">var normal3</div>
<!-- class="prefix--abc {className}-{num}" -->
<div class="{className}-{num}">var normal4</div>
<!-- class={className}-{num} -->
<div class="x-{num}">var normal5</div>
<!-- class=prefix--x{num} -->
<div class="x-{num}">var normal6</div>
<!-- class=prefix--x{num} -->

<div class="x-{className ? className : cssPrefix('abc')} aiue {num} {className} a {className}">var normal6</div>

<!-- class="prefix--x{num}" -->
<div class={className ? className : cssPrefix('abc')}>var space</div>
<!-- class={ className ? className : 'prefix--abc' } -->
<div class={className ? className : cssPrefix('abc')}>あvar quote space</div>
<!-- class="{ className ? className : 'prefix--abc' }" -->
<div class:x={!!x}>directive normal</div>
<!--
<div class:x={x}>directive normal</div>
-->
<!-- class:prefix--x={!!x} -->
<div class:x={1}>directive normal 2</div>
<!-- class:prefix--x={x} -->
<div class:x>directive shorthand</div>

<!-- class:prefix--x={x} -->

<Test2 />
<div class="global-test">global-test</div>

<style>
  .abc {
    background-color: red;
  }
  .x {
    color: green;
  }
  .x-0 {
    color: blue;
  }
</style>
