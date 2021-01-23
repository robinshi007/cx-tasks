/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
//import { action } from '@storybook/addon-actions'

import { Link, ForwardIcon } from './index';

export default {
  title: 'Element/Link',
  component: Link,
};

export const LinkComponent = () => (
  <Link href="http://www.bing.com" target="_blank">
    Bing Home
  </Link>
);

LinkComponent.story = {
  name: 'Link component',
};

export const LinkOpenSelf = () => (
  <Link href="https://www.bing.com/" target="_self">
    Open the Bing Home in the same window
  </Link>
);

LinkOpenSelf.story = {
  name: 'Link open self',
};

export const Color = () => (
  <div>
    <Link color="text.dark">I am a different color!</Link>
    <br />
    <Link color="secondary">I am a different color!</Link>
    <br />
    <Link color="error">I am a different color!</Link>
  </div>
);

export const Variatents = () => (
  <div>
    <Link variation="fill">
      I am a different color!
      <ForwardIcon size="16" ml={2} />
    </Link>
    <br />
    <Link variation="link" color="secondary">
      I am a different color!
    </Link>
    <br />
    <Link variation="outline" color="error">
      I am a different color!
    </Link>
  </div>
);
