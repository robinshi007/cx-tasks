import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import {
  ChartIcon,
  SettingsIcon,
  TaskboardIcon,
  TimelineProgressIcon,
  BacklogListIcon,
} from '@/shared/components/Element';
import Sidebar from '../components/Sidebar';
import BacklogPage from './Backlog';
import BoardPage from './Board';

export const ProjectWrapper = styled.div``;

const ProjectPage = () => {
  // const match = useRouteMatch();
  // const history = useHistory();
  const context = {
    name: 'Demo',
  };
  let { path } = useRouteMatch();
  const routes = [
    { path: `${path}/roadmap`, name: 'Roadmap', icon: TimelineProgressIcon, isImplemented: false },
    { path: `${path}/backlog`, name: 'Backlog', icon: BacklogListIcon, isImplemented: false },
    { path: `${path}/board`, name: 'Board', icon: TaskboardIcon, isImplemented: true },
    { path: `${path}/report`, name: 'Report', icon: ChartIcon, isImplemented: false },
    { path: `${path}/settings`, name: 'Settings', icon: SettingsIcon, isImplemented: true },
  ];

  return (
    <ProjectWrapper>
      <Sidebar context={context} routes={routes} />
      <Switch>
        <Route path={`${path}/board`}>
          <BoardPage />
        </Route>
        <Route path={`${path}/backlog`}>
          <BacklogPage />
        </Route>
      </Switch>
    </ProjectWrapper>
  );
};

export default ProjectPage;
