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
