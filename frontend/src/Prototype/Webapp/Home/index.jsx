import styled from 'styled-components';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import {
  WorkItemIcon,
  FabricFolderIcon,
  FavoriteStarIcon,
  SettingsIcon,
  FeedbackIcon,
} from '@/shared/components/Element';

import MyWorkPage from './MyWork';
import ProjectsPage from './Projects';

export const HomeWrapper = styled.div``;

const HomePage = () => {
  let { path } = useRouteMatch();
  const context = {
    name: 'Home',
  };
  const routes = [
    { path: `${path}/mywork`, name: 'My Work', icon: WorkItemIcon, isImplemented: true },
    { path: `${path}/projects`, name: 'Projects', icon: FabricFolderIcon, isImplemented: true },
    { path: `${path}/favorite`, name: 'Favorite', icon: FavoriteStarIcon, isImplemented: false },
    { path: `${path}/settings`, name: 'Settings', icon: SettingsIcon, isImplemented: false },
    { path: `${path}/feedback`, name: 'Feedback', icon: FeedbackIcon, isImplemented: false },
  ];

  console.log('path', path);
  return (
    <HomeWrapper>
      <Sidebar context={context} routes={routes} />
      <Switch>
        <Route path={`${path}/mywork`}>
          <MyWorkPage />
        </Route>
        <Route path={`${path}/projects`}>
          <ProjectsPage />
        </Route>
      </Switch>
    </HomeWrapper>
  );
};

export default HomePage;
