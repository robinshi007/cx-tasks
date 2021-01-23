import React from 'react';
import { StyledIcon } from './IconStyles';

//import { Box } from '@/shared/components/Layout';

export function createIcon(options) {
  let { viewBox, d, path, displayName, defaultProps } = options;
  viewBox = viewBox || '0 0 24 24';
  defaultProps = defaultProps || {};

  const Comp = React.forwardRef((props, ref) => (
    <div style={{ display: props.display ? props.display : 'inherit' }}>
      <StyledIcon ref={ref} viewBox={viewBox} {...defaultProps} {...props}>
        {path ?? <path fill="currentColor" d={d} />}
      </StyledIcon>
    </div>
  ));

  Comp.displayName = displayName;

  return Comp;
}
