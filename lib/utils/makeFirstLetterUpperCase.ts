/**
 * Given a word, returns it with the first letter Upper Cased.
 */
export default function makeFirstLetterUpperCase(word: string) {
  return word
    .split('')
    .map((c, i) => i === 0 ? c.toUpperCase() : c)
    .join('');
}