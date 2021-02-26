import React from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Modal } from '@/shared/components/Element';
import { selectFilteredAllOrderedBoardLists } from '@/features/project/projectSlice';
import { selectCurrentProjectId } from '@/features/entity';

import Lists from './Lists';
import Filters from '../Filters';
import TaskDetail from '../Task/TaskDetail';

const Board = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const currentProjectId = useSelector(selectCurrentProjectId);
  const lists = useSelector(selectFilteredAllOrderedBoardLists);
  return (
    <div className="px-8 py-4">
      <div className="flex items-center justify-start h-11 w-full">
        <h2 className="text-gray-600 font-medium text-lg">Board</h2>
      </div>
      <div className="w-full bg-white mb-4">
        <div className="py-2 flex items-center justify-between text-sm">
          <Filters />
        </div>
      </div>
      <div className="flex items-start justify-start">
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
                    status: routeProps.location.query && routeProps.location.query.status,
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
export default Board;
