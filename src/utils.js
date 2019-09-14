import Autolinker from 'autolinker';


export function isArraysEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


const autolinker = new Autolinker({
  stripPrefix: false,
  stripTrailingSlash: false,
});

export function linkify(textOrHTML) {
  return autolinker.link(textOrHTML);
}


export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const x = array[i];
        array[i] = array[j];
        array[j] = x;
    }

    return array;
}
