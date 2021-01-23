/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Box, Divider } from '../Layout/index';
import { Input, Label } from './index';

export default {
  title: 'Element/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'Simple styled input component that accepts a color and whether or not to show an error container.',
      },
    },
  },
};

export const Default = () => <Input my={3} placeholder="Input something" />;
export const Rounded = () => (
  <Input my={3} placeholder="Input something" borderRadius={9999} width={300} />
);

export const Colors = () => (
  <Box width={400}>
    <Input mb={3} id="input-colors-1" placeholder="No color" />
    <Input mb={3} id="input-colors-2" color="primary" placeholder="Primary" />
    <Input mb={3} id="input-colors-3" color="secondary" placeholder="Secondary" />
    <Input mb={3} id="input-colors-4" color="warning" placeholder="Warning" />
    <Input mb={3} id="input-colors-5" color="info" placeholder="Info" />
    <Input mb={3} id="input-colors-6" color="success" placeholder="Success" />
  </Box>
);

export const WithExternalLabel = () => (
  <Box width={400}>
    <Label htmlFor="sample-input">Label</Label>
    <Input id="sample-input-1" placeholder="Click the label" />
  </Box>
);

export const WithHelperText = () => (
  <Box width={400}>
    <Box>
      <Label htmlFor="sample-input">Same color as Input</Label>
      <Input
        id="sample-input-2"
        placeholder="Click the label"
        color="error.base"
        helperText={<Input.HelperText>No soup for you!</Input.HelperText>}
      />
    </Box>
    <Divider />
    <Box>
      <Label htmlFor="sample-input">Override color for helper text</Label>
      <Input
        id="sample-input-3"
        placeholder="Click the label"
        color="error.base"
        helperText={<Input.HelperText color="secondary.base">No soup for you!</Input.HelperText>}
      />
    </Box>
  </Box>
);

WithExternalLabel.story = {
  name: 'With external label',
};
