import styled from 'styled-components';
import { space, width, borderColor } from 'styled-system';

import { applyVariations, getPaletteColor, deprecatedColorValue } from '@/shared/utils/themeFunc';

const Divider = styled.hr`
  border: 0;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: ${(props) => getPaletteColor(props.borderColor || props.color, 'base')(props)};
  background-color: ${(props) => getPaletteColor(props.borderColor || props.color, 'base')(props)};
  ${space} ${width};
  ${applyVariations('Divider')}
`;

Divider.displayName = 'Divider';

Divider.defaultProps = {
  color: 'border',
  ml: 0,
  mr: 0,
};

Divider.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...borderColor.propTypes,
  color: deprecatedColorValue(),
};

export default Divider;
