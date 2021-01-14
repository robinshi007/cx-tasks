import styled from 'styled-components';

export const StyledIcon = styled.svg`
  display: inline-block;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  vertical-align: middle;
`;
