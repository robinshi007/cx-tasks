import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import { Nav, Sidebar } from '@/components/Layout';
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
    <>
      <Nav />
      <Sidebar navHeader={navHeader} navList={navList} />
      <div className="ml-60 min-w-96 bg-white min-h-screen overflow-y-auto">
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
      </div>
    </>
  );
};

export default Home;
