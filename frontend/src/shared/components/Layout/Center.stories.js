/* eslint-disable import/no-anonymous-default-export */

import React from 'react';

import { Center } from './index';

export default {
  title: 'Layout/Center',
  component: Center,
};

export const Default = () => (
  <div>
    <Center height={200} width={500} color="white" bg="primary">
      Center
    </Center>
  </div>
);

export const Square = () => (
  <div>
    <Center size={200} color="white" bg="primary">
      Square
    </Center>
  </div>
);
export const Circle = () => (
  <div>
    <Center size={100} color="white" bg="primary" borderRadius={9999}>
      Circle
    </Center>
    <Center size={100} color="white" bg="secondary">
      Square
    </Center>
  </div>
);
