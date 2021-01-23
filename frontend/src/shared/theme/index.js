import { createMediaQueries, createTextStyles, createColorStyles } from '@/shared/utils/themeFunc';

const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) =>
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return this[i];
      },
    })
  );

export const breakpoints = [32, 40, 48, 64, 80].map((n) => n + 'em');

export const mediaQueries = createMediaQueries(breakpoints);

const aliases = ['sm', 'md', 'lg', 'xl', 'xxl'];

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);

export const space = [0, 4, 8, 16, 32, 64, 128];

export const font = {
  base: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', 'Arial', sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";`,
  mono: `'SFMono-Medium', 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', 'Ubuntu Mono', Menlo, Consolas, Courier, monospace;`,
};

export const fontSizes = [12, 14, 16, 20, 24, 32, 40, 54, 72];

// styled-system's `fontWeight` function can hook into the `fontWeights` object
export const fontWeights = {
  bold: 700,
  medium: 500,
  base: 400,
  light: 300,
};

export const lineHeights = {
  base: 1.4,
  display: 1.25,
};

const letterSpacings = {
  normal: 'normal',
  caps: '0.025em',
};

// color
const black = '#000';
const white = '#fff';
const text = '#616161';
const red = '#f44336';
const pink = '#e91e63';
const purple = '#9c27b0';
const deepPurple = '#673ab7';
const indigo = '#3f51b5';
const blue = '#2196f3';
const lightBlue = '#03a9f4';
const cyan = '#00bcd4';
const teal = '#009688';
const green = '#4caf50';
const lightGreen = '#8bc34a';
const lime = '#cddc39';
const yellow = '#ffeb3b';
const amber = '#ffc107';
const orange = '#ff9800';
const deepOrange = '#ff5722';
const brown = '#795548';
const grey = '#9e9e9e';
const blueGrey = '#607d8b';

const colors = {
  black,
  white,
  text,
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
};

export { colors };

// styled-system's `borderRadius` function can hook into the `radii` object/array
export const radii = [0, 2, 6];
export const radius = '2px';

export const maxContainerWidth = '1280px';

// boxShadows
export const boxShadows = [
  `0 0 2px 0 rgba(0,0,0,.08),0 1px 4px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)`,
  `0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)`,
];

export const textShadows = {
  sm: `2px 4px 2px rgba(0,0,0,0.3)`,
  md: `0 2px 2px rgba(0,0,0,0.3)`,
};

// animation durations
export const durations = {
  fast: `100ms`,
  base: `180ms`,
  slow: `360ms`,
};

// animation easing curves
// refer: https://gist.github.com/lucasdidthis/7380cc63968554fd79a010a789d69f09
const easeInOut = 'cubic-bezier(0.4, 0, 0.2, 1)';
const easeOut = 'cubic-bezier(0, 0, 0.2, 1)';
const easeIn = 'cubic-bezier(0.4, 0, 1, 1)';

const timingFunctions = {
  easeInOut,
  easeOut,
  easeIn,
};

export const textStyles = createTextStyles({
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
});
export const colorStyles = createColorStyles({ colors });

export const palette = {
  text: {
    lightest: '#fff',
    lighter: '#9e9e9e',
    light: '#757575',
    base: text,
    dark: '#001023',
  },
  background: {
    lightest: '#f5f5f5',
    light: '#e0e0e0',
    base: grey,
    dark: '#616161',
    darkest: text,
  },
  border: {
    light: '#eee',
    base: '#bdbdbd',
    dark: '#757575',
  },
  primary: {
    light: '#1e88e5',
    base: '#1976d2',
    dark: '#1565c0',
    contrastText: '#fff',
    hover: '#42a5f5',
  },
  secondary: {
    light: '#f06292',
    base: pink,
    dark: '#ad1457',
    contrastText: '#fff',
    hover: '#ec407a',
  },
  success: {
    light: '#81c784',
    base: green,
    dark: '#2e7d32',
    hover: '#66bb6a',
  },
  info: {
    light: '#ba68c8',
    base: purple,
    dark: '#7b1fa2',
    hover: '#ab47bc',
  },
  warning: {
    light: '#ffd54f',
    base: amber,
    dark: '#ffa000',
    hover: '#ffca28',
  },
  error: {
    light: '#ff8a65',
    base: deepOrange,
    dark: '#e64a19',
    hover: '#ff7043',
  },
};
export const contrastRatio = 2.6;

const theme = {
  breakpoints,
  mediaQueries,
  space,
  font,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  textStyles,
  colors,
  colorStyles,
  palette,
  radii,
  radius,
  boxShadows,
  textShadows,
  maxContainerWidth,
  durations,
  timingFunctions,
  contrastRatio,
};

export default theme;
