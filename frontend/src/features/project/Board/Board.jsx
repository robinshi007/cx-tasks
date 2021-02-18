import React from 'react';
import { Route, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Modal } from '@/shared/components/Element';
import { selectFilteredAllOrderedBoardLists } from '@/features/project/projectSlice';

import Lists from './Lists';
import Filters from '../Filters';
import TaskDetail from '../Task/TaskDetail';

const Board = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const lists = useSelector(selectFilteredAllOrderedBoardLists);
  return (
    <div className="px-8 pb-1">
      <div className="flex items-center justify-start h-11 w-full  mt-3 mb-2">
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

      <Route
        path={`${match.path}/tasks/:taskId`}
        render={(routeProps) => (
          <Modal
            isOpen={true}
            width={720}
            withCloseIcon={true}
            onClose={() => history.push(match.url)}
            renderContent={(modal) => (
              <TaskDetail taskId={routeProps.match.params.taskId} modalClose={modal.close} />
            )}
          />
        )}
      />
    </div>
  );
};
export default Board;
