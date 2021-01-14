import React from 'react';
import { StyledIcon } from './Styles';

export function createIcon(options) {
  let { viewBox, d, path, displayName, defaultProps } = options;
  viewBox = viewBox || '0 0 24 24';
  defaultProps = defaultProps || {};

  const Comp = React.forwardRef((props, ref) => (
    <StyledIcon ref={ref} viewBox={viewBox} {...defaultProps} {...props}>
      {path ?? <path fill="currentColor" d={d} />}
    </StyledIcon>
  ));

  Comp.displayName = displayName;

  return Comp;
}
