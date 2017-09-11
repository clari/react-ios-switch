import colors from 'color-name';

// support named colors for backwards compatibility
export default function normalizeColor(color) {
  return colors[color] ? 
    `rgb(${colors[color].join(',')})` :
    color;
}