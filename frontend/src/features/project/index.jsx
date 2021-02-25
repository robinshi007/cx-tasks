import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Nav, Sidebar } from '@/components/Layout';
import {
  BacklogListIcon,
  TaskboardIcon,
  SettingsIcon,
  FabricFolderIcon,
} from '@/shared/components/Element';

import { setCurrentProject, selectProjectById } from '@/features/project/projectSlice';
import { BacklogPage } from '@/features/project/Backlog';
import { BoardPage } from '@/features/project/Board';
import { SettingsPage } from '@/features/project/Settings';

const Project = ({ id }) => {
  let { url } = useRouteMatch();
  const dispatch = useDispatch();
  const project = useSelector(selectProjectById(id));

  const navHeader = {
    title: project.title,
    description: project.description,
    icon: FabricFolderIcon,
  };
  const navList = [
    //{ name: 'Roadmap', icon: TimelineProgressIcon },
    { name: 'Backlog', icon: BacklogListIcon, path: `${url}/backlog` },
    { name: 'Board', icon: TaskboardIcon, active: true, path: `${url}/board` },
    //{ name: 'Chart', icon: ChartIcon },
    { name: 'Settings', icon: SettingsIcon, path: `${url}/settings` },
    // { name: 'Feedback', icon: FeedbackIcon },
  ];
  useEffect(() => {
    console.log('currentProject', id);
    dispatch(setCurrentProject(id));
  }, [id, dispatch]);

  return (
    <>
      <Nav />
      <Sidebar navHeader={navHeader} navList={navList} />
      <div className="ml-60 min-w-96 bg-white min-h-screen overflow-y-auto">
        <Switch>
          <Route path={`${url}/board`}>
            <BoardPage />
          </Route>
          <Route path={`${url}/backlog`}>
            <BacklogPage />
          </Route>
          <Route path={`${url}/settings`}>
            <SettingsPage id={id} />
          </Route>
          <Route exact path={`${url}/`}>
            <Redirect to={`${url}/board`} />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Project;
