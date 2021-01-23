/* eslint-disable import/no-anonymous-default-export */

import React from 'react';

import { Header, Spacer } from './index';
import { HomeIcon, Text } from '@/shared/components/Element';

export default {
  title: 'Layout/Header',
  component: Header,
};

export const Default = () => (
  <Header as="header" bg="primary" color="white" p={2} width={1 / 3}>
    <HomeIcon mx={1} />
    <HomeIcon mx={1} />
    <HomeIcon mx={1} />
    <Spacer />
    <Text px={1}>Login</Text>
    <Text px={1}>Help</Text>
  </Header>
);
