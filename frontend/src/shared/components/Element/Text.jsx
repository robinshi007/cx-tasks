import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  display,
  fontSize,
  fontWeight,
  height,
  lineHeight,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  overflow,
  space,
  textAlign,
  fontStyle,
  width,
  zIndex,
} from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

import {
  deprecatedPropType,
  deprecatedColorValue,
  applyVariations,
  getPaletteColor,
} from '@/shared/utils/themeFunc';

export const caps = (props) =>
  props.caps
    ? {
        textTransform: 'uppercase',
        letterSpacing: themeGet('letterSpacings.caps')(props),
      }
    : null;

export const regular = (props) =>
  props.regular ? { fontWeight: props.theme.fontWeights.base } : null;
export const bold = (props) => (props.bold ? { fontWeight: props.theme.fontWeights.bold } : null);

export const textShadow = (props) => {
  const textShadowSize = props.textShadowSize || 'md';
  return props.enableTextShadow ? { textShadow: props.theme.textShadows[textShadowSize] } : null;
};

const Text = styled.div.attrs(({ align, ...props }) => ({
  textAlign: align,
  ...props,
}))`
  ${applyVariations('Text')}
  color: ${getPaletteColor('base')};
  ${(props) => (props.bg ? `background-color: ${getPaletteColor(props.bg, 'base')(props)};` : '')}
  ${display}
  ${height}
  ${maxHeight}
  ${maxWidth}
  ${minHeight}
  ${minWidth}
  ${overflow}
  ${space}
  ${width}
  ${caps}
  ${regular}
  ${bold}
  ${fontStyle}
  ${fontSize}
  ${fontWeight}
  ${textAlign}
  ${lineHeight}
  ${textShadow}
  ${zIndex}
`;

Text.displayName = 'Text';

Text.propTypes = {
  ...display.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...height.propTypes,
  ...lineHeight.propTypes,
  ...maxHeight.propTypes,
  ...maxWidth.propTypes,
  ...minHeight.propTypes,
  ...minWidth.propTypes,
  ...overflow.propTypes,
  ...space.propTypes,
  ...textAlign.propTypes,
  ...fontStyle.propTypes,
  ...width.propTypes,
  ...zIndex.propTypes,
  align: deprecatedPropType('textAlign'),
  bold: PropTypes.bool,
  caps: PropTypes.bool,
  color: deprecatedColorValue(),
  enableTextShadow: PropTypes.bool,
  regular: PropTypes.bool,
  textShadowSize: PropTypes.oneOf(['sm', 'md']),
};

/* add text types according to material design */
/* https://material-ui.com/components/typography/ */
Text.H1 = styled(Text).attrs(() => ({ as: 'h1' }))`
  font-size: ${(props) => props.theme.fontSizes[8]}px;
  font-weight: 300;
`;
Text.H1.displayName = 'Text.H1';

Text.H2 = styled(Text).attrs(() => ({ as: 'h2' }))`
  font-size: ${(props) => props.theme.fontSizes[7]}px;
  font-weight: 300;
`;
Text.H2.displayName = 'Text.H2';

Text.H3 = styled(Text).attrs(() => ({ as: 'h3' }))`
  font-size: ${(props) => props.theme.fontSizes[6]}px;
  font-weight: 400;
`;
Text.H3.displayName = 'Text.H3';

Text.H4 = styled(Text).attrs(() => ({ as: 'h4' }))`
  font-size: ${(props) => props.theme.fontSizes[5]}px;
  font-weight: 400;
`;
Text.H4.displayName = 'Text.H4';

Text.H5 = styled(Text).attrs(() => ({ as: 'h5' }))`
  font-size: ${(props) => props.theme.fontSizes[4]}px;
  font-weight: 400;
`;
Text.H5.displayName = 'Text.H5';

Text.H6 = styled(Text).attrs(() => ({ as: 'h6' }))`
  font-size: ${(props) => props.theme.fontSizes[3]}px;
  font-weight: 500;
`;
Text.H6.displayName = 'Text.H6';

Text.Subtitle1 = styled(Text).attrs(() => ({ as: 'h6' }))`
  font-size: ${(props) => props.theme.fontSizes[2]}px;
  font-weight: 400;
  line-height: 1.75;
`;
Text.Subtitle1.displayName = 'Text.Subtitle1';

Text.Subtitle2 = styled(Text).attrs(() => ({ as: 'h6' }))`
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  font-weight: 500;
  line-height: 1.57;
`;
Text.Subtitle2.displayName = 'Text.Subtitle2';

Text.Body1 = styled(Text).attrs(() => ({ as: 'p' }))`
  font-size: ${(props) => props.theme.fontSizes[2]}px;
  font-weight: ${(props) => props.theme.fontWeights.base};
  margin-bottom: 0.3rem;
`;
Text.Body1.displayName = 'Text.Body1';

Text.Body2 = styled(Text).attrs(() => ({ as: 'p' }))`
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  font-weight: ${(props) => props.theme.fontWeights.base};
  margin-bottom: 0.3rem;
`;
Text.Body2.displayName = 'Text.Body2';

Text.Button = styled(Text).attrs(() => ({ as: 'span' }))`
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  font-weight: ${(props) => props.theme.fontWeights.medium};
  line-height: 1.75;
  text-transform: uppercase;
`;
Text.Button.displayName = 'Text.Button';

Text.Caption = styled(Text).attrs(() => ({ as: 'span' }))`
  font-size: ${(props) => props.theme.fontSizes[0]}px;
  font-weight: ${(props) => props.theme.fontWeights.base};
  line-height: 1.66;
`;
Text.Caption.displayName = 'Text.Caption';

Text.Overline = styled(Text).attrs(() => ({ as: 'span' }))`
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  font-weight: ${(props) => props.theme.fontWeights.base};
  line-height: 1.66;
  text-transform: uppercase;
`;
Text.Overline.displayName = 'Text.Overline';

export default Text;
