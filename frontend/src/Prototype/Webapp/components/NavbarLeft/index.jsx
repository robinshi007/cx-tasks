import React from 'react';
import { NavLink } from 'react-router-dom';

import { SearchIcon, AddIcon, HomeIcon, RingerIcon, HelpIcon } from '@/shared/components/Element';
import { Box, Spacer } from '@/shared/components/Layout';

import { NavLeft, LogoLink, StyledLogo, Item } from './Styles';

const propTypes = {};

const NavbarLeft = () => (
  <NavLeft>
    <LogoLink to="/prototype">
      <StyledLogo />
    </LogoLink>

    <NavLink to="/prototype/webapp" style={{ width: '100%' }}>
      <Item>
        <HomeIcon size={24} />
      </Item>
    </NavLink>
    <Item>
      <SearchIcon size={24} />
    </Item>
    <Item>
      <AddIcon size={24} />
    </Item>

    <Spacer />

    <Item>
      <RingerIcon size={24} />
    </Item>
    <Item>
      <HelpIcon size={24} />
    </Item>
    <Box height={20} />
  </NavLeft>
);

NavbarLeft.propTypes = propTypes;

export default NavbarLeft;
