import React, { useState } from 'react';
import { NavLink, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import { Box } from '@/shared/components/Layout';
import { Link } from '@/shared/components/Element';
//import Draggable from './Draggable';

import LoginPage from './pages/Login';
import MyWorkPage from './pages/home/MyWork';
import ProjectsPage from './pages/home/Projects';
import FavoritePage from './pages/home/Favirate';
//import HomeSettingsPage from './pages/home/Settings';
import ProjectBacklogPage from './pages/project/Backlog';
import ProjectBoardPage from './pages/project/Board';
import ProjectNewPage from './pages/project/New';
import ProjectSettingsPage from './pages/project/Settings';
import CardPage from './twdemos/Card';
import BoardPage from './twdemos/Board';
import ThemePage from './twdemos/Theme';

const routeData = [
  { name: 'login', path: 'login' },
  { name: 'home/mywork', path: 'home/mywork' },
  { name: 'home/projects', path: 'home/projects' },
  { name: 'home/favorite', path: 'home/favorite' },
  // { name: 'home/settings', path: 'home/settings' },
  { name: 'project/new', path: 'project/new' },
  { name: 'project/backlog', path: 'project/backlog' },
  { name: 'project/board', path: 'project/board' },
  { name: 'project/settings', path: 'project/settings' },
  { name: 'tw/card', path: 'tw/card' },
  { name: 'tw/board', path: 'tw/board' },
  { name: 'tw/theme', path: 'tw/theme' },
  // { name: 'home', path: 'webapp/home', component: HomePage },
  // { name: 'project', path: 'webapp/project', component: ProjectPage },
];

const PrototypePage = () => {
  let { path, url } = useRouteMatch();
  let [showMenu, setShowMenu] = useState(false);
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-pink-300 via-fuchsia-500 to-purple-500 min-h-screen h-full overflow-y-auto">
        <Switch>
          <Route path={`${path}/login`}>
            <LoginPage />
          </Route>
          <Route path={`${path}/home/mywork`}>
            <MyWorkPage />
          </Route>
          <Route path={`${path}/home/projects`}>
            <ProjectsPage />
          </Route>
          <Route path={`${path}/home/favorite`}>
            <FavoritePage />
          </Route>
          <Route path={`${path}/project/new`}>
            <ProjectNewPage />
          </Route>
          <Route path={`${path}/project/backlog`}>
            <ProjectBacklogPage />
          </Route>
          <Route path={`${path}/project/board`}>
            <ProjectBoardPage />
          </Route>
          <Route path={`${path}/project/settings`}>
            <ProjectSettingsPage />
          </Route>
          <Route path={`${path}/tw/card`}>
            <CardPage />
          </Route>
          <Route path={`${path}/tw/board`}>
            <BoardPage />
          </Route>
          <Route path={`${path}/tw/theme`}>
            <ThemePage />
          </Route>
          <Route exact path={`${path}`}>
            <Redirect to={`${path}/login`} />
          </Route>
        </Switch>
      </div>
      <div className="absolute top-0 right-4">
        <div className="absolute top-0 right-0 shadow-lg animate-ping w-3 h-3 bg-purple-400 rounded-full opacity-75 z-10" />
        <div
          className="absolute top-0 right-0 shadow-lg w-3 h-3 bg-purple-500 rounded-full cursor-pointer z-10"
          onClick={() => setShowMenu(!showMenu)}
        />
        <div
          className={`absolute top-0 right-0 w-44 bg-white ${showMenu ? 'visible' : 'invisible'}`}
        >
          {routeData.map((item) => (
            <Box display="block" key={item.path}>
              <Link
                as={NavLink}
                exact={true}
                to={`${url}/${item.path}`}
                px={1}
                fontSize="14px"
                ml={3}
              >
                {item.name} page
              </Link>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrototypePage;
