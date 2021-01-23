/**
 * Converts a hex color to rgb
 * @example hexToRgb('#007aff') => 'rgb(0, 122, 255)'
 */
export const hexToRgb = (color) => {
  color = color.substring(1);

  let colors = color.match(new RegExp(`.{1,${color.length / 3}}`, 'g'));

  if (colors) {
    colors = colors.map((val) => parseInt(val.length === 1 ? val + val : val, 16)).join(', ');
  }

  return colors ? `rgb(${colors})` : '';
};

/**
 * Decomposes a color into an array of values
 * @example decomposeColor('#007aff') => [0, 122, 255]
 */
export const decomposeColor = (color) => {
  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  return color
    .substring(color.indexOf('(') + 1, color.length - 1)
    .split(',')
    .map((value) => parseFloat(value));
};

/**
 * Gets the luminance of a color
 * @example getLuminance('#007aff') => 0.211
 * @see https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 */
export const getLuminance = (color) => {
  const [r, g, b] = decomposeColor(color).map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Gets the contrast ratio between two colors
 * @example getContrastRatio('#007aff', '#fff') => 4.016975780478911
 * @see https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 */
export const getContrastRatio = (colorA, colorB) => {
  const luminA = getLuminance(colorA);
  const luminB = getLuminance(colorB);
  return (Math.max(luminA, luminB) + 0.05) / (Math.min(luminA, luminB) + 0.05);
};
