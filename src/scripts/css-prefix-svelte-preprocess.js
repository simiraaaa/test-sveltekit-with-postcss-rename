import { parse as parseSvelte, walk } from 'svelte/compiler';

/** @type {() => import('svelte/compiler').PreprocessorGroup} */
export function preprocessClassNamePrefix({ prefix = 'prefix--' }) {
  /**
   * @typedef {{start: number, end: number, to: string}[]} Replacements
   */


  /**
   * 
   * @param {import('svelte/types/compiler/interfaces').Attribute} node 
   * @param {Replacements} replacements
   * @param {string} content
   */
  function processAttribute(node, replacements, content) {
    if (node.name === 'class') {
      let s = 'class="';
      // 最初のクラス名は prefix を付与する
      let prefix_flag = true;
      for (const { type, start, end, raw } of node.value) {
        if (type === 'Text') {
          // 空白区切りにする
          const names = raw.split(/ +/);
          const prefixed_names = [];
          for (let i = 0; i < names.length; i++) {
            const original_name = names[i];
            let name = original_name;
            // original_name が空文字じゃない場合は、prefix を付与する
            if (prefix_flag && original_name) {
              name = prefix + name;
            }

            prefixed_names.push(name);

            // 空文字の場合は、次の文字に prefix を付与する
            if (original_name) {
              prefix_flag = true;
            }
            else {
              // 最後の文字でない場合は、次の文字に prefix を付与する
              prefix_flag = i !== names.length - 1;
            }
          }
          s += prefixed_names.join(' ');
        }
        else if (type === 'MustacheTag') {
          // 一度 {} が来たら 次は space が来るまで prefix を付与しない
          prefix_flag = false;
          // そのまま連結
          s += content.slice(start, end);
        }
      }
      s += '"';
      console.log('🚨', content.slice(node.start, node.end), '→', s);
      replacements.push({ start: node.start, end: node.end, to: s });
    }
    else {
      console.warn('🚨', node.name, 'NO_CLASS');
    }
  }

  /**
   * 
   * @param {import('svelte/types/compiler/interfaces').BaseExpressionDirective} node 
   * @param {Replacements} replacements
   * @param {string} content
   */
  function processClass(node, replacements, content) {
    let to = 'class:';
    let base_str = content.slice(node.start, node.end);
    let eq_index = base_str.indexOf('=');
    const class_name = base_str.slice(to.length, eq_index < 0 ? base_str.length : eq_index);

    // =が含まれない場合は、含まれる形に変更する
    if (eq_index === -1) {
      eq_index = base_str.length;
      base_str += `={${class_name}}`;
    }

    to += prefix + class_name + base_str.slice(eq_index);
    console.log(content.slice(node.start, node.end), '→', to);
    replacements.push({ start: node.start, end: node.end, to });
  }

  return {
    markup({ content, filename }) {
      /** @type {Replacements} */
      const replacements = [];
      const ast = parseSvelte(content, { css: 'none', filename });

      walk(ast.html, {
        enter(node, parent, prop, index) {
          const type = node.type;
          switch (type) {
            case "Attribute":
              processAttribute(node, replacements, content);
              break;
            case "Class":
              processClass(node, replacements, content);
              break;
          }
        },
        leave(node) {
        },
      });

      // start が小さい順に並び替える
      replacements.sort((a, b) => a.start - b.start);

      let code = '';
      let last = replacements.length - 1;
      for (let i = 0; i < replacements.length; i++) {
        const { start, to } = replacements[i];
        const a = content.slice(replacements[i - 1]?.end || 0, start);
        const b = to;
        code += a + b;
      }
      code += content.slice(replacements[last]?.end || 0);
      console.log('🚨', filename, `【filename】`);
      console.log(code);
      return {
        code,
      };
    },
  };
}
