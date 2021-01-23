/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, optionsKnob } from '@storybook/addon-knobs';
import { Cartesian, Catch, LiveEditor, Markdown, XRay } from '@compositor/kit';
import styled from 'styled-components';

import { Box } from '../Layout/index';
import { Button, ForwardIcon, AddIcon } from './index';

const StyledButton = styled(Button)`
  padding: 100px;
`;
const variations = { outline: 'outline', fill: 'fill', link: 'link' };
const sizes = { small: 'small', medium: 'medium', large: 'large' };
const colors = {
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'notify',
};

export default {
  title: 'Element/Button',

  decorators: [
    (story) => (
      <Box>
        <Markdown>
          {`
  Use the <code>&lt;Button /&gt;</code> component to render a primitive button. Use the *variation* prop to change the appearance of the button.
          `}
        </Markdown>
        {story()}
      </Box>
    ),
    withKnobs,
  ],

  parameters: {
    component: Button,
  },
};

export const _Button = () => {
  const variation = optionsKnob('Variation', variations, 'fill', {
    display: 'select',
  });
  const size = optionsKnob('Size', sizes, 'medium', {
    display: 'select',
  });
  const color = optionsKnob('Palette Color', colors, 'primary', {
    display: 'select',
  });
  const disabled = boolean('Disabled?', false);
  const fullWidth = boolean('Full Width?', false);

  return (
    <Catch>
      <LiveEditor
        code={`<Button
  variation='${variation}'
  size='${size}'
  color='${color}'
  disabled={${disabled}}
  width={${fullWidth ? 1 : null}}>
  BUTTON
</Button>`}
        scope={{
          Button,
        }}
      />
    </Catch>
  );
};

export const All = () => {
  return (
    <Cartesian
      component={Button}
      m={3}
      color={Object.keys(colors)}
      variation={Object.keys(variations)}
      size={Object.keys(sizes)}
      onClick={action('Clicked button in All')}
    >
      I am a Button
    </Cartesian>
  );
};

export const Geometry = () => (
  <XRay>
    <Cartesian
      component={Button}
      m={3}
      variation={Object.keys(variations)}
      size={Object.keys(sizes)}
    >
      Button Geometry
    </Cartesian>
  </XRay>
);

export const StyledButtonShouldNotLoseItsStyling = () => {
  return (
    <Box>
      <StyledButton>BUTTON</StyledButton>
    </Box>
  );
};

StyledButtonShouldNotLoseItsStyling.story = {
  name: 'Styled Button',
};

export const WithIcon = () => {
  return (
    <>
      <Button color="primary" mx={2} borderRadius={9999}>
        TRY
        <ForwardIcon size="16" ml={2} />
      </Button>
      <Button color="primary" mx={2} borderRadius={9999}>
        <AddIcon size="16" mr={2} />
        TRY
      </Button>
      <Button color="primary" variation="outline" mx={2} borderRadius={9999}>
        <AddIcon size="16" mr={2} />
        TRIT
      </Button>
    </>
  );
};

WithIcon.story = {
  name: 'With Icon',
};
