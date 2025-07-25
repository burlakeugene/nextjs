export type THex = string;
export type TRbg = [number, number, number];

export const hexToRgb = (hex: THex): TRbg => {
  hex = hex.replace('#', '');

  const bigInt = parseInt(hex, 16);
  const r = (bigInt >> 16) & 255;
  const g = (bigInt >> 8) & 255;
  const b = bigInt & 255;

  return [r, g, b];
};

export const rgbToHex = (rgb: TRbg): THex => {
  const r = rgb[0].toString(16).padStart(2, '0');
  const g = rgb[1].toString(16).padStart(2, '0');
  const b = rgb[2].toString(16).padStart(2, '0');

  return `#${r}${g}${b}`;
};
