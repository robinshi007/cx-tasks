import styled from 'styled-components';

import { Link } from '@/shared/components/Element';

export const SidebarStyles = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 48px;
  height: 100vh;
  width: 220px;
  padding: 0 16px 24px;
  background: ${(props) => props.theme.palette.background.lightest};
  border-right: 1px solid ${(props) => props.theme.palette.background.lightest};
`;

export const ProjectInfo = styled.div`
  display: flex;
  padding: 16px 4px 10px 12px;
`;

export const ProjectTexts = styled.div`
  padding: 3px 0 0 4px;
`;

export const ProjectName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.palette.text.light};
`;

export const ProjectCategory = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.palette.text.light};
`;

export const LinkItem = styled(Link)`
  width: 100%;
  color: ${(props) => props.theme.palette.text.base};
  background: inherit;
  justify-content: flex-start;
  position: relative;
  height: 39px;
  &:hover {
    color: ${(props) => props.theme.palette.text.base};
    background: #ececec;
  }
  &.active {
    color: ${(props) => props.theme.palette.primary.base};
    background: #e6e6e6;
  }
`;

export const NotImplemented = styled.div`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 42px;
  width: 140px;
  height: 100%;
  padding: 11px 8px;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  text-align: left;
  vertical-align: middle;
  color: inherit;
  background: #ececec;
  opacity: 0;
  ${LinkItem}:hover & {
    opacity: 1;
  }
`;
