import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { ProjectCategoryCopy } from '@/shared/constants/projects';
import { ProjectLogo32Icon, Text } from '@/shared/components/Element';
import { Divider } from '@/shared/components/Layout';

import {
  SidebarStyles,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  LinkItem,
  NotImplemented,
} from './Styles';

const propTypes = {
  context: PropTypes.object.isRequired,
};

const Sidebar = ({ context, routes }) => {
  return (
    <SidebarStyles>
      <ProjectInfo>
        {context.name === 'Home' ? '' : <ProjectLogo32Icon color="blue" size={28} mt={1} mr={1} />}
        <ProjectTexts>
          {context.name === 'Home' ? (
            <Text.H5 height="33px">CxTasks</Text.H5>
          ) : (
            <>
              <ProjectName>{context.name}</ProjectName>
              <ProjectCategory>{ProjectCategoryCopy[context.category]} project</ProjectCategory>
            </>
          )}
        </ProjectTexts>
      </ProjectInfo>
      {renderLinkItems(routes)}
    </SidebarStyles>
  );
};

const renderLinkItem = (path, text, IconComponent, isImplemented) => {
  const linkItemProps = isImplemented ? { as: NavLink, exact: true, to: `${path}` } : { as: 'div' };

  return (
    <>
      {text === 'Settings' ? <Divider my="4px" /> : ''}
      <LinkItem variation="fill" color="text.light" {...linkItemProps} key={path}>
        <IconComponent size={18} mr={14} />
        {text}
        {isImplemented ? '' : <NotImplemented>NOT IMPLEMENTED</NotImplemented>}
      </LinkItem>
    </>
  );
};

const renderLinkItems = (routes) => {
  if (routes.length && routes.length > 0) {
    return routes.map((item) =>
      renderLinkItem(item.path, item.name, item.icon, item.isImplemented)
    );
  }
};

Sidebar.propTypes = propTypes;

export default Sidebar;
