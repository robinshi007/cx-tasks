import React from 'react';
import { Switch, Route, useLocation, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Modal } from '@/shared/components/Element';
import { selectFilteredAllOrderedLists } from '@/features/project/projectSlice';
import { selectCurrentProjectId } from '@/features/entity';

import Lists from './Lists';
import Filters from '../Filters';
import TaskDetail from '../Task/TaskDetail';
import SectionDetail from '../Section/SectionDetail';

const Backlog = () => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const currentProjectId = useSelector(selectCurrentProjectId);
  const lists = useSelector(selectFilteredAllOrderedLists);
  const isBacklog = location.pathname.includes('/backlog');
  return (
    <div className="px-8 py-4 relative">
      <div className="flex items-center justify-start h-11 w-full">
        <h2 className="text-gray-600 font-medium text-lg">Backlog</h2>
      </div>
      <div className="w-full bg-white mb-4">
        <div className="py-2 flex items-center justify-between text-sm">
          <Filters isBacklog={isBacklog} />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start">
        <Lists lists={lists} />
      </div>
      <Switch>
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
        <Route
          path={`${match.path}/tasks_new`}
          render={(routeProps) => (
            <Modal
              isOpen={true}
              width={720}
              withCloseIcon={false}
              onClose={() => history.push(match.url)}
              renderContent={(modal) => (
                <TaskDetail
                  modalClose={modal.close}
                  fields={{
                    section: routeProps.location.query && routeProps.location.query.section,
                    project: currentProjectId,
                  }}
                />
              )}
              style={{ minHeight: '300px' }}
            />
          )}
        />
        <Route
          path={`${match.path}/sections/:sectionId`}
          render={(routeProps) => (
            <Modal
              isOpen={true}
              width={520}
              withCloseIcon={false}
              onClose={() => history.push(match.url)}
              renderContent={(modal) => (
                <SectionDetail id={routeProps.match.params.sectionId} modalClose={modal.close} />
              )}
              style={{ minHeight: '300px' }}
            />
          )}
        />
        <Route
          path={`${match.path}/section_new`}
          render={() => (
            <Modal
              isOpen={true}
              width={520}
              withCloseIcon={false}
              onClose={() => history.push(match.url)}
              renderContent={(modal) => (
                <SectionDetail
                  modalClose={modal.close}
                  fields={{
                    project: currentProjectId,
                  }}
                />
              )}
              style={{ minHeight: '300px' }}
            />
          )}
        />
      </Switch>
    </div>
  );
};
export default Backlog;
