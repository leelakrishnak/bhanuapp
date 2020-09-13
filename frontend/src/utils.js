export function sliceBigString(s) {
  return s && s.length > 50 ? `${s.slice(0, 50)} ...` : s;
}
