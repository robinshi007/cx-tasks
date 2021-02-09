/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Avatar } from './index';

const elonJPG = 'https://pbs.twimg.com/media/DwSta0wUcAAQQR9.jpg';

export default {
  title: 'Element/Avatar',
  component: Avatar,
};

export const Default = () => <Avatar />;
export const Initials = () => (
  <>
    <Avatar initials="WS" />
    <Avatar initials="WS" size={32} />
    <Avatar initials="WS" size={24} />
  </>
);

export const Elon = () => (
  <Avatar title="Not Elon Musk" subtitle="totally.not.elon@musk.com" src={elonJPG} />
);
