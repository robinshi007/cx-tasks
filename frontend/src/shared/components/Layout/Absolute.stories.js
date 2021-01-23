/* eslint-disable import/no-anonymous-default-export */

import React from 'react';

import { Relative, Absolute } from './index';
import { Text } from '@/shared/components/Element';

export default {
  title: 'Layout/Absolute',
  component: Absolute,
};

export const AbsolutelyText = () => (
  <Relative p={5} height={1 / 2} width={1 / 2} bg="lightBlue" zIndex={-1}>
    <Absolute p={2} m={2} top={0} right={0} color="white" bg="secondary">
      <Text>Hello Text</Text>
    </Absolute>
  </Relative>
);
