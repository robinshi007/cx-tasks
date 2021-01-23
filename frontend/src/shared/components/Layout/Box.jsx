import styled from 'styled-components';
import PropTypes from 'prop-types';
import { space, layout, position, typography, border, flexbox } from 'styled-system';

import {
  applyVariations,
  color,
  borderColor,
  deprecatedPropType,
  deprecatedColorValue,
} from '@/shared/utils/themeFunc';
import { boxShadow } from '@/shared/utils/boxShadow';

const Box = styled.div`
  ${layout} ${position} ${flexbox}
  ${space}
  ${typography}
  ${border} ${boxShadow}
  ${applyVariations('Box')}
  ${color}
  ${borderColor}
`;

Box.displayName = 'Box';

Box.propTypes = {
  ...layout.propTypes,
  ...space.propTypes,
  ...position.propTypes,
  ...typography.propTypes,
  ...border.propTypes,
  bg: deprecatedPropType('color'),
  boxShadowSize: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: deprecatedColorValue(),
};

export default Box;
