/* eslint-disable import/no-anonymous-default-export */

import React from 'react';

import { Box } from './index';

export default {
  title: 'Layout/Box',
  component: Box,
};

const Template = (args) => (
  <Box p={2} m={1} width={1 / 2} color="white" bg="primary" {...args}>
    Box Text
  </Box>
);

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const Colors = () => (
  <div>
    {['primary', 'secondary', 'success', 'info', 'error', 'warning'].map((color) => (
      <Box p={2} m={1} color="white" width={1 / 2} bg={color}>
        {capitalize(color)} Box
      </Box>
    ))}
  </div>
);

const TemplateDisplay = (args) => (
  <div>
    <Box
      p={2}
      m={1}
      width="100px"
      color="white"
      bg="primary"
      style={{ whiteSpace: 'nowrap', textOverflow: 'clip' }}
      {...args}
    >
      {args.text}
    </Box>
    <Box
      p={2}
      m={1}
      width="100px"
      color="white"
      bg="primary"
      style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
      {...args}
    >
      {args.text}
    </Box>
  </div>
);

export const Display = TemplateDisplay.bind({});
Display.args = {
  display: 'block',
  overflow: 'auto',
  text: 'display testing',
};

export const Position = () => (
  <div>
    <Box
      p={2}
      m={1}
      width="100px"
      height="100px"
      color="white"
      bg="primary"
      position="absolute"
      top={0}
      right={0}
      zIndex={1}
    >
      Box1
    </Box>
    <Box
      p={2}
      m={1}
      width="100px"
      height="100px"
      color="white"
      bg="secondary"
      position="absolute"
      top={4}
      right={4}
      zIndex={2}
    >
      Box2
    </Box>
  </div>
);

const TemplateFlexbox = (args) => (
  <Box height={200} {...args}>
    <Box p={2} m={1} width={1 / 4} height={100} color="white" bg="primary">
      Blue Box
    </Box>
    <Box p={2} m={1} width={1 / 4} height={50} color="white" bg="orange">
      Orange Box
    </Box>
    <Box p={2} m={1} width={1 / 4} height={150} color="white" bg="green">
      Green Box
    </Box>
    <Box p={2} m={1} width={1 / 4} height={50} color="white" bg="purple">
      Purple Box
    </Box>
  </Box>
);
export const Flexbox = TemplateFlexbox.bind({});
Flexbox.args = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  alignContent: 'space-between',
};

export const Spacing = Template.bind({});
Spacing.args = {
  mx: 'auto',
  p: 3,
};
export const Sizing = Template.bind({});
Sizing.args = {
  size: 100,
};
export const WidthAndHeight = Template.bind({});
WidthAndHeight.args = {
  height: '256px',
  width: 1 / 2,
};

export const Typography = Template.bind({});
Typography.args = {
  textAlign: 'right',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '32px',
  fontStyle: 'italic',
  fontFamily: 'monospace',
  letterSpacing: '3px',
};
export const Border = Template.bind({});
Border.args = {
  borderWidth: 2,
  borderStyle: 'dotted',
  borderColor: 'purple',
  borderRadius: 4,
  borderTop: '0px solid',
};
export const BoxShadow = Template.bind({});
BoxShadow.args = {
  boxShadowSize: 'xl',
};
export const AsButton = () => {
  return (
    <div>
      <Box
        as="button"
        borderRadius={4}
        borderStyle="solid"
        borderColor="purple"
        bg="primary"
        color="white"
        p={2}
        m={2}
        minWidth={300}
      >
        As Button
      </Box>
      <Box
        as="button"
        borderRadius={4}
        borderWidth={2}
        borderStyle="solid"
        borderColor="primary.dark"
        color="primary.dark"
        bg="white"
        p={2}
        m={2}
        minWidth={300}
      >
        As Outline Button
      </Box>
    </div>
  );
};
