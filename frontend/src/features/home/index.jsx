import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import { MainFrame } from '@/components/Layout';
import { HomeIcon, WorkItemIcon, FabricFolderIcon } from '@/shared/components/Element';

//import { selectProject } from '@/features/project/projectSlice';
import MyWorkPage from '@/features/home/MyWork';
import ProjectsPage from '@/features/home/Projects';

const Home = () => {
  let { path } = useRouteMatch();

  const navHeader = {
    title: 'Home',
    description: 'The space for me',
    icon: HomeIcon,
  };
  const navList = [
    { name: 'My work', icon: WorkItemIcon, path: `${path}/mywork` },
    { name: 'Projects', icon: FabricFolderIcon, path: `${path}/projects` },
    // { name: 'Favorite', icon: FavoriteStarIcon },
    // { name: 'Settings', icon: SettingsIcon },
    // { name: 'Feedback', icon: FeedbackIcon },
  ];

  return (
    <MainFrame hasSideNav={true} sideNav={{ header: navHeader, links: navList }}>
      <Switch>
        <Route path={`${path}/mywork`}>
          <MyWorkPage />
        </Route>
        <Route path={`${path}/projects`}>
          <ProjectsPage />
        </Route>
        <Route exact path={`${path}/`}>
          <Redirect to={`${path}/mywork`} />
        </Route>
      </Switch>
    </MainFrame>
  );
};

export default Home;
