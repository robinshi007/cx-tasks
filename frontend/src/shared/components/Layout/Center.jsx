import styled from 'styled-components';

import Box from './Box';

const Center = styled(Box).attrs(({ ...props }) => ({
  ...props,
}))`
  display: flex;
  align-items: center;
  justify-content: center;
`;

Center.displayName = 'Center';

export default Center;
