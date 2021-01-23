/* eslint-disable import/no-anonymous-default-export */

import React from 'react';
import { Hide, Box, Flex } from './index';

export default {
  title: 'Layout/Hide',
  component: Hide,
};

export const HideStory = () => (
  <Flex justifyContent="space-between">
    <Hide xs sm md lg xl xxl>
      <Box p={2} bg="warning">
        Hide xs
      </Box>
    </Hide>
    <Hide sm md lg xl xxl>
      <Box p={2} bg="info">
        Hide sm
      </Box>
    </Hide>
    <Hide md lg xl xxl>
      <Box p={2} bg="success">
        Hide md
      </Box>
    </Hide>
    <Hide lg xl xxl>
      <Box p={2} bg="primary">
        Hide lg
      </Box>
    </Hide>
    <Hide xl xxl>
      <Box p={2} bg="purple">
        Hide xl
      </Box>
    </Hide>
    <Hide xxl>
      <Box p={2} bg="orange">
        Hide xxl
      </Box>
    </Hide>
    <Hide print>
      <Box p={2} bg="pink">
        Hide print
      </Box>
    </Hide>
    <Hide.Text sm>Hide.text</Hide.Text>
  </Flex>
);
