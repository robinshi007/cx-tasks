import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav, Sidebar } from '@/components/Layout';
import {
  BacklogListIcon,
  TaskboardIcon,
  SettingsIcon,
  FabricFolderIcon,
} from '@/shared/components/Element';

import { selectProject } from '@/features/project/projectSlice';
import { BacklogPage } from '@/features/project/Backlog';
import { BoardPage } from '@/features/project/Board';
import { SettingsPage } from '@/features/project/Settings';

const Project = () => {
  let { path } = useRouteMatch();
  const project = useSelector(selectProject);

  const navHeader = {
    name: project.name,
    description: project.description,
    icon: FabricFolderIcon,
  };
  const navList = [
    //{ name: 'Roadmap', icon: TimelineProgressIcon },
    { name: 'Backlog', icon: BacklogListIcon, path: `${path}/backlog` },
    { name: 'Board', icon: TaskboardIcon, active: true, path: `${path}/board` },
    //{ name: 'Chart', icon: ChartIcon },
    { name: 'Settings', icon: SettingsIcon, path: `${path}/settings` },
    // { name: 'Feedback', icon: FeedbackIcon },
  ];

  return (
    <>
      <Nav />
      <Sidebar navHeader={navHeader} navList={navList} />
      <div className="ml-60 min-w-96 bg-white min-h-screen overflow-y-auto">
        <Switch>
          <Route path={`${path}/board`}>
            <BoardPage />
          </Route>
          <Route path={`${path}/backlog`}>
            <BacklogPage />
          </Route>
          <Route path={`${path}/settings`}>
            <SettingsPage />
          </Route>
          <Route exact path={`${path}/`}>
            <Redirect to={`${path}/board`} />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Project;
