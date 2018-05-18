export function ucwords (str) {
  return str
    .split(' ')
    .map(s => s.substr(0, 1).toUpperCase() + s.substr(1))
    .join(' ');
}