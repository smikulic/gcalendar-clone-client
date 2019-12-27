export const getRangeValues = (lowEnd, highEnd) => {
  if (highEnd <= lowEnd) return false
  var arr = [],
  c = highEnd - lowEnd + 1;
  while ( c-- ) {
    arr[c] = highEnd--
  }

  return arr
}
