/**
 * Query mode types
 * @param {string[]} mtar
 */
var mtar = [
  "html",
  "spec"
];
/**
 * Query tokens
 * @param {string[]} qtar
 */
var qtar = [
  "main",
  "Book",
  "EpubCFI",
  "Locations",
  "Navigation",
  "Packaging",
  "Path",
  "Rendition",
  "Section",
  "Sections",
  "Themes",
  "Url"
];
/**
 * Grep function
 * @param {string} q query string
 * @example grep('?grep=^main') => ''
 * @example grep('?grep=^EpubCFI') => '?grep=%5EEpubCFI'
 * @return {string} query string to test entry, or string empty
 */
function grep (q) {
  let ret = "";
  const array = q.split('=%5E');
  for (let i = 1; i < qtar.length; ++i) {
    const token = qtar[i];
    if (array[array.length -1] === token) {
      ret = `?grep=%5E${token}`;
      break;
    }
  }
  return ret;
}
/**
 * Hash function
 * @param {string} input
 * @return {string} hash
 */
function hash (input) {
  let val = 0, i, chr;
  const len = input.length;
  if (len === 0) return val;
  for (i = 0; i < len; i++) {
    chr = input.charCodeAt(i);
    val = ((val << 5) - val) + chr;
    val |= 0; // convert to 32-bit integer
  }
  return Math.abs(val).toString();
}
