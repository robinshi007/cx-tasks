/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import Text from './Text';

export default {
  title: 'Element/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component:
          'A low-level component for setting font-size, typographic styles, margin, and color',
      },
    },
  },
};

export const Typography = () => (
  <>
    <Text.H1>Heading 1 H1</Text.H1>
    <Text.H2>Heading 2 H2</Text.H2>
    <Text.H3>Heading 3 H3</Text.H3>
    <Text.H4>Heading 4 H4</Text.H4>
    <Text.H5>Heading 5 H5</Text.H5>
    <Text.H6>Heading 6 H6</Text.H6>
    <Text.Subtitle1>Subtitle1 testing</Text.Subtitle1>
    <Text.Subtitle2>Subtitle2 testing</Text.Subtitle2>
    <Text.Body1>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text.Body1>
    <Text.Body2>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text.Body2>
    <Text.Button display="block">Button Text</Text.Button>
    <Text.Caption display="block">Caption Text</Text.Caption>
    <Text.Overline display="block">Overline Text</Text.Overline>
  </>
);
Typography.story = {
  name: 'typography',
};

export const TextAlign = () => (
  <div>
    <Text textAlign="left">Hello Left</Text>
    <Text textAlign="center">Hello Center</Text>
    <Text textAlign="right">Hello Right</Text>
  </div>
);

TextAlign.story = {
  name: 'textAlign',
};

export const FontWeight = () => (
  <>
    <Text regular>Hello Regular</Text>
    <Text bold>Hello Bold</Text>
  </>
);

export const FontStyle = () => (
  <>
    <Text caps>Hello Caps</Text>
    <Text fontStyle="italic">Hello italic</Text>
    <Text as="s">Hello Strikethrough</Text>
  </>
);
FontStyle.story = {
  name: 'fontStyle',
};

export const Color = () => (
  <div>
    <Text color="primary">Hello Primary Text</Text>
    <Text color="secondary">Hello Secondary Text</Text>
    <Text color="success">Hello Success Text</Text>
    <Text color="info">Hello Info Text</Text>
    <Text color="warning">Hello Warning Text</Text>
    <Text color="error">Hello Error Text</Text>
  </div>
);

Color.story = {
  name: 'color',
};

export const Margin = () => (
  <Text mt={4} mb={2}>
    Hello Margin
  </Text>
);

Margin.story = {
  name: 'margin',
};

export const MinMaxHeight = () => (
  <div>
    <Text color="blue" minHeight={200} minWidth={300} width={1}>
      Hello Blue
    </Text>
    <Text color="green" maxHeight={200} maxWidth={300}>
      Hello Green
    </Text>
  </div>
);

MinMaxHeight.story = {
  name: 'min/maxHeight',
};

export const HideOnLgBreakpoints = () => (
  <div>
    <Text color="primary" display={[null, null, null, 'none']} fontSize={4} width={1}>
      Hidden text on larger screens
    </Text>
    <Text color="secondary" fontSize={4} width={1}>
      I am always show. But the text above, hides on larger screens.
    </Text>
  </div>
);

HideOnLgBreakpoints.story = {
  name: 'withBreakpoints',
};
