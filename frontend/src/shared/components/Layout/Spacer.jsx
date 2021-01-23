import styled from 'styled-components';

import Box from './Box';

const Spacer = styled(Box).attrs(({ ...props }) => ({
  ...props,
}))`
  flex: 1;
  justify-self: stretch;
  align-self: stretch;
`;

Spacer.displayName = 'Spacer';

export default Spacer;
