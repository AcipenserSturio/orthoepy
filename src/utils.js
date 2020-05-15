export function isArraysEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


export function shuffle(array) {
  const theArray = array;

  for (let i = theArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = theArray[i];
    theArray[i] = theArray[j];
    theArray[j] = x;
  }

  return theArray;
}
