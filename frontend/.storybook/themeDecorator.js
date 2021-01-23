import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import theme from '@/shared/theme';
import CssBaseline from '@/shared/components/CssBaseline';

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {storyFn()}
  </ThemeProvider>
);

export default ThemeDecorator;
