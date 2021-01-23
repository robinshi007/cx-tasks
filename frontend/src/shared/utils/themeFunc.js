import { css } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { getContrastRatio } from '@/shared/utils/colorFunc';

// Use this to mark props as deprecated
export const deprecatedPropType = (replacement) => (props, propName) => {
  if (props[propName]) {
    return new Error(
      `The \`${propName}\` prop is deprecated and will be removed in a future release. Please use \`${replacement}\` instead.`
    );
  }
};

export const deprecatedColorValue = () => (props, propName, componentName) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    props.theme &&
    props[propName] &&
    !hasPaletteColor({ color: props[propName], ...props })
  ) {
    return new Error(
      `The color value of \`${props[propName]}\` for \`${componentName}\` is deprecated and will be removed in a future release. Please use a palette color instead.`
    );
  }
};
const createMediaQueries = (breakpoints) =>
  breakpoints.map((n) => `@media screen and (min-width:${n})`);

const createTextStyles = (theme = {}) => {
  const { fontSizes, fontWeights, lineHeights, letterSpacings } = theme;

  return {
    display8: {
      fontSize: fontSizes[8] + 'px',
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display,
    },
    display7: {
      fontSize: fontSizes[7] + 'px',
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display,
    },
    display6: {
      fontSize: fontSizes[6] + 'px',
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display,
    },
    display5: {
      fontSize: fontSizes[5] + 'px',
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display,
    },
    display4: {
      fontSize: fontSizes[4] + 'px',
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display,
    },
    display3: {
      fontSize: fontSizes[3] + 'px',
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display,
    },
    display2: {
      fontSize: fontSizes[2] + 'px',
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display,
    },
    display1: {
      fontSize: fontSizes[1] + 'px',
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display,
    },
    display0: {
      fontSize: fontSizes[0] + 'px',
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display,
      letterSpacing: letterSpacings.caps,
      textTransform: 'uppercase',
    },
    body2: {
      fontSize: fontSizes[2] + 'px',
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.standard,
    },
    body1: {
      fontSize: fontSizes[1] + 'px',
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.standard,
    },
    body0: {
      fontSize: fontSizes[0] + 'px',
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.standard,
    },
    small: {
      fontSize: '10px',
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.standard,
    },
  };
};

const createColorStyles = (theme = {}) => {
  const {
    white,
    text,
    gray,
    lightGray,
    blue,
    lightBlue,
    green,
    lightGreen,
    red,
    lightRed,
    orange,
    purple,
    lightPurple,
    darkOrange,
  } = theme.colors;

  return {
    whiteOnText: {
      color: white,
      backgroundColor: text,
    },
    whiteOnGray: {
      color: white,
      backgroundColor: gray,
    },
    textOnLightGray: {
      color: text,
      backgroundColor: lightGray,
    },
    whiteOnBlue: {
      color: white,
      backgroundColor: blue,
    },
    blueOnLightBlue: {
      color: blue,
      backgroundColor: lightBlue,
    },
    whiteOnGreen: {
      color: white,
      backgroundColor: green,
    },
    greenOnLightGreen: {
      color: green,
      backgroundColor: lightGreen,
    },
    whiteOnRed: {
      color: white,
      backgroundColor: red,
    },
    redOnLightRed: {
      color: red,
      backgroundColor: lightRed,
    },
    textOnOrange: {
      color: text,
      backgroundColor: orange,
    },
    whiteOnPurple: {
      color: white,
      backgroundColor: purple,
    },
    purpleOnLightPurple: {
      color: purple,
      backgroundColor: lightPurple,
    },
    textOnWhite: {
      color: text,
      backgroundColor: white,
    },
    grayOnWhite: {
      color: gray,
      backgroundColor: white,
    },
    blueOnWhite: {
      color: blue,
      backgroundColor: white,
    },
    greenOnWhite: {
      color: green,
      backgroundColor: white,
    },
    redOnWhite: {
      color: red,
      backgroundColor: white,
    },
    purpleOnWhite: {
      color: purple,
      backgroundColor: white,
    },
    whiteOnDarkOrange: {
      color: white,
      backgroundColor: darkOrange,
    },
    info: {
      color: text,
      backgroundColor: lightGray,
    },
    success: {
      color: white,
      backgroundColor: green,
    },
    warning: {
      color: text,
      backgroundColor: orange,
    },
    danger: {
      color: white,
      backgroundColor: red,
    },
  };
};

export { createMediaQueries };
export { createColorStyles };
export { createTextStyles };

export const applyVariations = (componentName, variations = null) => (props) => {
  const { color, variation } = props;

  if (variations && typeof variation === 'string') {
    return css`
      ${variations[variation] || ''}
      ${typeof color === 'string' &&
      themeGet(`componentStyles.${componentName}.${variation}.${color}`, '')}
    `;
  }

  return css`
    ${themeGet(`componentStyles.${componentName}.${color}`, '')}
  `;
};

/**
 * Gets the color of a palette shade, using props.color as
 * the palette color. If palette shade does not exist, falls
 * back to theme.colors
 *
 * @example getPaletteColor('dark')(props) => will return the dark
 * shade of theme.palette[props.color].dark
 * @example getPaletteColor('primary.base')(props) => theme.palette.primary.base
 * @example getPaletteColor('primary', 'base')(props) => theme.palette.primary.base
 */
export const getPaletteColor = (...args) => (props) => {
  let color = args.length === 2 ? args[0] : props.color;
  let shade = args.length === 2 ? args[1] : args[0];

  const colorShade = shade.match(/^([a-z]+)\.([a-z]+)$/i);

  if (colorShade) {
    color = colorShade[0];
    shade = colorShade[1];
  }

  return (
    themeGet(`palette.${color}.${shade}`)(props) ||
    themeGet(`palette.${color}`)(props) ||
    themeGet(`colors.${color}`)(props) ||
    color
  );
};

/**
 * Checks if the given color prop is a valid palette color
 */
export const hasPaletteColor = (props) => {
  return (
    props.theme &&
    props.theme.palette &&
    typeof props.color === 'string' &&
    Object.keys(props.theme.palette).includes(props.color.split('.')[0])
  );
};

/**
 * Gets the text color that belongs on a given background color
 */
export const getTextColorOn = (name) => (props) => {
  const { theme } = props;

  if (theme.palette) {
    const color = getPaletteColor(name)(props);
    const text = theme.palette.text;

    if (color) {
      return getContrastRatio(text.lightest, color) >= theme.contrastRatio
        ? text.lightest
        : text.base;
    }

    return text.base;
  }

  return '';
};

export const getByPalette = (props) => css`
  background-color: ${getPaletteColor(props.bg, 'base')(props)};
  color: ${getPaletteColor(props.color, 'base')(props)};
`;

/**
 * Extended color function from styled-system. First checks
 * for a palette color before falling back to styled-system
 */
export const color = (props) => {
  if (!props.theme || (!props.color && !props.bg)) {
    return '';
  } else if (props.color === 'text') {
    return props.color && props.bg
      ? getByPalette(props)
      : css`
          color: ${getPaletteColor('base')(props)};
        `;
  } else if (props.color && props.bg) {
    return getByPalette(props);
  } else if (props.color && hasPaletteColor(props)) {
    return css`
      background-color: ${getPaletteColor('base')(props)};
      color: ${getTextColorOn('base')(props)};
    `;
  } else if (props.color) {
    return css`
      color: ${getPaletteColor('base')(props)};
    `;
  } else {
    return css`
      background-color: ${getPaletteColor(props.bg, 'base')(props)};
    `;
  }
};
export const borderColor = (props) => {
  if (!props.theme || !props.borderColor) {
    return '';
  } else if (props.borderColor) {
    return css`
      border-color: ${getPaletteColor(props.borderColor, 'base')(props)};
    `;
  }
};
export const borders = (props) => {
  const borderColor = props.color
    ? getPaletteColor('base')(props)
    : getPaletteColor('border.base')(props);
  const focusColor = props.color ? borderColor : getPaletteColor('primary.base')(props);

  return {
    'border-color': borderColor,
    ':focus': {
      outline: 0,
      'border-color': focusColor,
      'box-shadow': `0 0 0 1px ${focusColor}`,
    },
  };
};
export const transition = (props) => {
  const { theme } = props;
  return {
    transition: `background-color ${theme.durations.base} ${theme.timingFunctions.easeInOut} 0ms, box-shadow ${theme.durations.base} ${theme.timingFunctions.easeInOut} 0ms, border ${theme.durations.base} ${theme.timingFunctions.easeInOut} 0ms;`,
  };
};
