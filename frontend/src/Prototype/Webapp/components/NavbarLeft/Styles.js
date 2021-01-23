import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { Image } from '@/shared/components/Element';
import { Flex, Center } from '@/shared/components/Layout';
import logoImage from '@/assets/logo.png';

export const NavLeft = styled(Flex)`
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100vh;
  background: ${(props) => props.theme.palette.primary.base};
  width: 48px;
`;

export const LogoLink = styled(NavLink)`
  display: block;
  position: relative;
  left: 0;
  margin: 16px 0 12px;
  transition: left 0.1s;
  height: 32px;
  width: 32px;
`;

const LogoImage = () => {
  return <Image src={logoImage} />;
};

export const StyledLogo = styled(LogoImage)`
  display: inline-flex;
  margin-left: 8px;
  padding: 10px;
`;

export const Item = styled(Center)`
  color: ${(props) => props.theme.colors.white};
  height: 40px;
  min-height: 40px;
  min-width: 40px;
  width: 100%;
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.palette.primary.light};
  }
`;
