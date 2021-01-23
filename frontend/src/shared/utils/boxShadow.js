import { boxShadows as defaultBoxShadowTheme } from '@/shared/theme';

function boxShadow(props) {
  const boxShadowTheme = defaultBoxShadowTheme;
  const boxShadows = {
    sm: {
      'box-shadow': boxShadowTheme[0],
    },
    md: {
      'box-shadow': boxShadowTheme[1],
    },
    lg: {
      'box-shadow': boxShadowTheme[2],
    },
    xl: {
      'box-shadow': boxShadowTheme[3],
    },
  };
  return boxShadows[props.boxShadowSize];
}

export { boxShadow };
