/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Image } from './index';
import { Box } from '../Layout/index';
import logoImage from '@/assets/logo.png';
import logoTextImage from '@/assets/logo_text.png';

const description = 'A low-level layout component that renders an image';
export default {
  title: 'Element/Image',
  component: Image,
  parameters: {
    docs: {
      description: {
        component: description,
      },
    },
  },
};

export const Default = () => (
  <>
    <Image src={logoImage} />
    <Box bg="primary.dark">
      <Image src={logoTextImage} />
    </Box>
  </>
);

export const ResponsiveWidth = () => (
  <Box bg="primary.dark">
    <Image width={1 / 2} src={logoTextImage} />
  </Box>
);
