import {THex, TRbg, hexToRgb, rgbToHex} from '@/utils/color';

function interpolateColor(color1: TRbg, color2: TRbg, factor: number) {
  if (factor === undefined) {
    factor = 0.5;
  }

  const result = color1.slice();

  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }

  return result as TRbg;
}

export function getIntermediateColor(colors: THex[], percentage: number): THex {
  if (percentage <= 0) {
    return colors[0];
  }

  if (percentage >= 100) {
    return colors[colors.length - 1];
  }

  const scaledPercentage = (percentage / 100) * (colors.length - 1);
  const lowerIndex = Math.floor(scaledPercentage);
  const upperIndex = lowerIndex + 1;
  const factor = scaledPercentage - lowerIndex;

  const color1 = hexToRgb(colors[lowerIndex]);
  const color2 = hexToRgb(colors[upperIndex]);
  const interpolatedColor = interpolateColor(color1, color2, factor);

  return rgbToHex(interpolatedColor);
}
