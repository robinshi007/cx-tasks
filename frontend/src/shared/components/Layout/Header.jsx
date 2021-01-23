import styled from 'styled-components';

import Box from './Box';

const Header = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

Header.displayName = 'Header';

export default Header;
