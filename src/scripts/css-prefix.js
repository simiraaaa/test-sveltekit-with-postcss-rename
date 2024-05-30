export const PREFIX_NAME = "prefix--";

/**
 * prefix css class name
 * @param {string} str 
 * @returns {string} prefixed string
 */
export function cssPrefix(str) {
  // if dev mode, do not prefix
  if (import.meta.env.DEV) return str;
  if (str.startsWith(PREFIX_NAME)) return str;

  if (str.startsWith('.')) {
    str = str.slice(1);
    if (str.startsWith(PREFIX_NAME)) return `.${str}`;
    return `.${PREFIX_NAME}${str.slice(1)}`;
  }
  
  return PREFIX_NAME + str;
}