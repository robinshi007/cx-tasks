import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';
import { Avatar, Modal } from '@/shared/components/Element';
import TaskDetail from '@/features/project/Task/TaskDetail';

import {
  selectRecentProjects,
  selectMyTasksWorkedOn,
  selectMyTasksAssignedToMe,
} from './homeSlice';
import { timeAgo, RouteLink, Kind, Label, Tab } from '@/features/shared';

const Card = ({ title, count, color, url }) => {
  return (
    <div className="flex flex-none items-center h-28 w-52 bg-white rounded">
      <div className={`w-5 flex-none h-full rounded-l ${color ? color : 'bg-blue-300'}`}></div>
      <div className="p-2  h-full flex justify-between flex-col">
        <h5 className="block text-gray-500 text-sm font-medium max-h-28 overflow-y-hidden">
          {title}
        </h5>

        <div className="flex justify-between text-gray-500 text-sm mt-1">
          <div className="text-sm">My open issues:</div>
          <div className="text-gray-500 text-xs bg-gray-200 text-sm rounded-full px-1.5 min-w-4 select-none">
            {count}
          </div>
        </div>
        <div>
          <RouteLink
            to={url}
            className="text-blue-600 hover:underline text-xs font-semibold uppercase"
          >
            Quick Links
          </RouteLink>
        </div>
      </div>
    </div>
  );
};
const Row = ({ id, typeTitle, title, dueDate, assigneeName, projectTitle }) => {
  const { path } = useRouteMatch();
  return (
    <li className="flex items-center justify-between font-sm text-gray-600 py-1">
      <div className="flex items-center justify-start w-full">
        <Kind value={typeTitle} className="" />
        <RouteLink className="text-sm font-normal truncate flex-shrink" to={`${path}/tasks/${id}`}>
          {title}
        </RouteLink>
        <div className="flex flex-1"></div>
        <Label className="mr-2 flex-shrink-0" value={projectTitle} color="blue" />
        <div className="mr-2 text-right text-gray-400 text-sm truncate flex-shrink-0">
          {timeAgo(dueDate)}
        </div>
        <Avatar initials={assigneeName} bg="purple" color="white" size={28} />
      </div>
    </li>
  );
};

const TaskList = ({ tasks }) => {
  const match = useRouteMatch();
  const history = useHistory();
  return (
    <>
      <ul>
        {Object.values(tasks).map(
          ({ id, typeTitle, title, due_date, assigneeName, projectTitle, project }) => (
            <Row
              id={id}
              typeTitle={typeTitle}
              title={title}
              dueDate={due_date}
              key={id}
              assigneeName={assigneeName}
              projectTitle={projectTitle}
              project={project}
            />
          )
        )}
      </ul>
      <Route
        path={`${match.path}/tasks/:taskId`}
        render={(routeProps) => (
          <Modal
            isOpen={true}
            width={720}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={(modal) => (
              <TaskDetail id={routeProps.match.params.taskId} modalClose={modal.close} />
            )}
            style={{ minHeight: '300px' }}
          />
        )}
      />
    </>
  );
};

const MyWork = () => {
  const { path } = useRouteMatch();
  const recentProjects = useSelector(selectRecentProjects);
  const workedOnTasks = useSelector(selectMyTasksWorkedOn);
  const assignedToMeTasks = useSelector(selectMyTasksAssignedToMe);

  return (
    <div className="px-8 py-4 relative">
      <div className="flex items-center justify-start h-11 w-full">
        <h2 className="text-gray-600 font-medium text-lg">My work</h2>
      </div>
      <div className="min-h-36 w-full bg-gray-100 mb-4 px-4 pb-4">
        <div className="py-2 flex items-center justify-between text-sm">
          <p className="text-gray-500">Recent projects</p>
          <RouteLink className="text-blue-600 hover:underline" to={`/home/projects`}>
            View all projects
          </RouteLink>
        </div>
        <div className="flex items-center justify-start space-x-4 flex-nowrap overflow-x-auto">
          {Object.values(recentProjects).map((project) => {
            return (
              <Card
                title={project.title}
                count={project.my_issue_count}
                url={`/projects/${project.id}`}
                color={`bg-${project.color}-300`}
                key={project.id}
              />
            );
          })}
        </div>
      </div>
      <div className="h-36 w-full">
        <div className="header relative">
          <Tab
            navs={[
              { name: 'Worked on', path: `${path}/worked_on` },
              { name: 'Assigned to me', path: `${path}/assigned_to_me` },
            ]}
          />
          <div className="absolute bg-gray-200 w-full h-0.5 bottom-0 left-0 right-0 z-0"></div>
        </div>
        <div className="content p-2 ">
          <Switch>
            <Route path={`${path}/worked_on`}>
              <TaskList tasks={workedOnTasks} />
            </Route>
            <Route path={`${path}/assigned_to_me`}>
              <TaskList tasks={assignedToMeTasks} />
            </Route>
            <Route exact path={`${path}/`}>
              <Redirect to={`${path}/worked_on`} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default MyWork;
