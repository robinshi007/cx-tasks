import React from 'react';
import styled from 'styled-components';
import { space, fontSize, fontWeight, width, borderRadius } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import PropTypes from 'prop-types';

import Text from './Text';
import {
  applyVariations,
  getPaletteColor,
  borders,
  transition,
  deprecatedColorValue,
} from '@/shared/utils/themeFunc';

const StyledInput = styled.input`
  appearance: none;
  display: block;
  width: 100%;
  font-family: inherit;
  color: ${getPaletteColor('text.light')};
  background-color: transparent;
  border-radius: ${themeGet('radius')};
  border-width: 1px;
  border-style: solid;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 14px;
  padding-right: 14px;
  margin: 0;
  ::placeholder {
    color: ${getPaletteColor('text.lighter')};
  }
  ::-ms-clear {
    display: none;
  }
  ${borders} ${space} ${fontSize};
  ${borderRadius} ${width}
  ${applyVariations('Input')}
  ${transition}
`;

const INPUT_ERROR_TEXT = 'InputHelperText';

export const Input = (props) => {
  const { helperText, color, ...restProps } = props;

  return (
    <>
      <StyledInput {...restProps} color={color} />
      {helperText &&
        React.cloneElement(helperText, {
          color: helperText?.props?.color || color,
        })}
    </>
  );
};

const HelperText = styled(Text).attrs(() => ({
  mt: 1,
  fontSize: 1,
}))``;

Input.HelperText = (props) => <HelperText {...props}>{props.children}</HelperText>;

Input.HelperText.displayName = INPUT_ERROR_TEXT;

Input.displayName = 'Input';
Input.isField = true;
Input.defaultProps = {
  fontSize: [2, null, 1],
};
Input.propTypes = {
  id: PropTypes.string.isRequired,
  color: deprecatedColorValue(),
  /**
   * Display text below the input and set error color on input
   */
  helperText: PropTypes.node,
  ...borders.propTypes,
  ...space.propTypes,
  ...fontSize.propTypes,
};

export default Input;

//  input label
const nowrap = (props) => (props.nowrap ? { whiteSpace: 'nowrap' } : null);

const accessiblyHide = (props) =>
  props.hidden
    ? {
        position: 'absolute',
        width: '1px',
        height: '1px',
        clip: 'rect(1px, 1px, 1px, 1px)',
      }
    : null;

export const Label = styled.label`
  letter-spacing: 0.2px;
  display: block;
  width: 100%;
  margin-bottom: 2px;
  color: ${getPaletteColor('base')};
  ${(props) => (props.bg ? `background-color: ${getPaletteColor(props.bg, 'base')(props)};` : '')}
  ${space} ${fontSize} ${fontWeight} ${width};
  ${nowrap}
  ${accessiblyHide}
  ${applyVariations('Label')}
`;

Label.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  color: deprecatedColorValue(),
  ...fontWeight.propTypes,
  ...width.propTypes,
};

Label.defaultProps = {
  fontSize: '12px',
  fontWeight: 'bold',
  color: 'text.lighter',
};

Label.displayName = 'Label';
Label.isLabel = true;
