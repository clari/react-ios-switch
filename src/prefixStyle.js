import Prefixer from 'inline-style-prefixer';

const prefixer = new Prefixer();

export default function prefixStyle(style) {
  return prefixer.prefix(style);
}
