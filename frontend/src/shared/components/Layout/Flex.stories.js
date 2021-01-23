/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import { Box, Flex, Spacer } from './index';

export default {
  title: 'Layout/Flex',
  component: Flex,
};

const Template = (args) => (
  <Flex {...args}>
    <Box width={[1, 1 / 3]} p={2} color="white" bg="blue">
      Flex
    </Box>
    <Box width={[1, 1 / 3]} p={1} color="white" bg="green">
      Box
    </Box>
  </Flex>
);

export const AlignItems = Template.bind({});
AlignItems.args = {
  alignItems: 'center',
};

export const FlexWrap = Template.bind({});
FlexWrap.args = {
  flexWrap: 'wrap',
};
export const JustifyContent = Template.bind({});
JustifyContent.args = {
  justifyContent: 'space-around',
};

export const WithSpacer = () => (
  <Flex>
    <Box p={2} height={50} width={100} color="white" bg="blue">
      Flex1
    </Box>
    <Box p={2} height={50} width={100} color="white" bg="blue">
      Flex2
    </Box>
    <Spacer />
    <Box p={1} height={50} width={100} color="white" bg="green">
      Box
    </Box>
  </Flex>
);
