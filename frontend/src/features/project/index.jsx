import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { MainFrame } from '@/components/Layout';
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
    title: project && project.title,
    description: project && project.description,
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
    //console.log('currentProject', id);
    if (!!project) {
      dispatch(setCurrentProject(project.id));
    }
  }, [project, dispatch]);

  return (
    <>
      {project ? (
        <MainFrame hasSideNav={true} sideNav={{ header: navHeader, links: navList }}>
          <Switch>
            <Route path={`${url}/board`}>
              <BoardPage />
            </Route>
            <Route path={`${url}/backlog`}>
              <BacklogPage />
            </Route>
            <Route path={`${url}/settings`}>
              <SettingsPage />
            </Route>
            <Route exact path={`${url}/`}>
              <Redirect to={`${url}/board`} />
            </Route>
          </Switch>
        </MainFrame>
      ) : (
        <Redirect to={{ pathname: '/not_found', state: { path: url } }} />
      )}
    </>
  );
};

export default Project;
