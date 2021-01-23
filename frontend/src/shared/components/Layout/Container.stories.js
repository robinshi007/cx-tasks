/* eslint-disable import/no-anonymous-default-export */

import React from 'react';

import { Box, Container } from './index';

export default {
  title: 'Layout/Container',
  component: Container,
};

export const DefaultMaxWidth = () => (
  <Container>
    <Box p={3} color="white" bg="lightBlue" style={{ height: `100vh` }}>
      Container
    </Box>
  </Container>
);

export const InputMaxWidth = () => (
  <Container maxWidth={500}>
    <Box p={3} color="white" bg="lightBlue" style={{ height: `100vh` }}>
      Container
    </Box>
  </Container>
);

InputMaxWidth.story = {
  name: 'Input maxWidth',
};
