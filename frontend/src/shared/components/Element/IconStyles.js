import styled from 'styled-components';
import { space } from 'styled-system';
import { color } from '@/shared/utils/themeFunc';

export const StyledIcon = styled.svg`
  display: inline-block;
  width: ${(props) => `${props.size ? props.size : 24}px`};
  height: ${(props) => `${props.size ? props.size : 24}px`};
  vertical-align: middle;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  ${space}
  ${color}
`;
