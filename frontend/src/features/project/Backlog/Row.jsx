import { useRouteMatch } from 'react-router-dom';
import { Avatar, GripperDotsVerticalIcon } from '@/shared/components/Element';

import { RouteLink, Priority, Status, timeAgo } from '@/features/shared';

export const UndragableList = ({ lists: tasks }) => {
  return (
    <div
      className={`bg-white flex flex-col items-center mt-4 -mr-8 py-1 w-full rounded-sm ring-2 ring-blue-600 ring-offset-4 ${
        tasks.length === 0 ? 'hidden' : ''
      }`}
    >
      <div className="relative header flex flex-shrink-0 items-center justify-between w-full h-8 truncate text-gray-700 text-xs select-none -ml-8">
        <div className="flex items-center">
          <div className="flex items-center h-full" style={{ width: '20px' }}></div>
          <div className="font-semibold mr-2 uppercase">[Ungrouped]</div>
          <span className="font-medium tracking-tighter">{tasks.length}</span>
        </div>
      </div>
      <div className="w-full">
        {tasks &&
          tasks.map((task) => (
            <UndragableRow
              taskId={task.id}
              title={task.title}
              typeTitle={task.typeTitle}
              statusTitle={task.statusTitle}
              priorityTitle={task.priorityTitle}
              dueDate={task.due_date}
              assigneeName={task.assigneeName}
              key={task.id}
            />
          ))}
      </div>
    </div>
  );
};
export const UndragableRow = ({
  taskId,
  title,
  typeTitle,
  statusTitle,
  priorityTitle,
  dueDate,
  assigneeName,
  ...props
}) => {
  const match = useRouteMatch();
  return (
    <li
      className={`flex items-center justify-between text-sm font-normal text-gray-700 w-full border-b border-gray-200 first:border-t first:border-gray-200 transition-shadow ease-out duration-200 bg-white`}
      {...props}
    >
      <div className="flex items-center w-full border-r border-gray-200 py-2 last:border-r-0 min-w-1/3">
        <RouteLink className="truncate" to={`${match.url}/tasks/${taskId}`}>
          {title}
        </RouteLink>
      </div>
      <div className="flex items-center">
        <div className="border-r border-gray-200 py-2 last:border-r-0 px-2 w-24 text-gray-500 truncate">
          {typeTitle}
        </div>
        <div className="flex items-center justify-start border-r border-gray-200 py-2 last:border-r-0 px-2 w-28 text-gray-500 text-sm truncate">
          <Status title={statusTitle} />
        </div>
        <div className="border-r border-gray-200 py-2 last:border-r-0 px-2 w-16 text-gray-500 truncate flex items-center justify-center ">
          <Priority value={priorityTitle} />
        </div>
        <div className="border-r border-gray-200 py-2 last:border-r-0 px-2 w-28 text-sm truncate h-full">
          {dueDate ? timeAgo(dueDate) : ''}
        </div>
        <div className="border-r border-gray-200 py-1 last:border-r-0 px-2 w-20 flex items-center justify-center">
          <Avatar initials={assigneeName} bg="purple" color="white" size={28} />
        </div>
        <div className="border-r border-gray-200 py-1 last:border-r-0 px-2 w-12 flex items-center justify-center"></div>
      </div>
    </li>
  );
};

const Row = ({
  taskId,
  title,
  priority,
  typeTitle,
  status,
  statusTitle,
  assignee,
  assigneeName,
  priorityTitle,
  parentRef,
  isDragging,
  dueDate,
  columns,
  dhProps,
  ...props
}) => {
  const match = useRouteMatch();
  return (
    <li
      className={`flex items-center justify-between text-sm font-normal text-gray-700 w-full border-b border-gray-200 first:border-t first:border-gray-200 ${
        isDragging ? 'ring-2 ring-blue-500' : ''
      } transition-shadow ease-out duration-200 bg-white`}
      ref={parentRef}
      {...props}
    >
      <div className="flex items-center h-full" {...dhProps} style={{ width: '20px' }}>
        <GripperDotsVerticalIcon className="text-gray-500 cursor-move" />
      </div>
      {/*div className="flex items-center h-full" style={{ width: '20px' }}>
        <Kind value={taskKindTitle} />
      </div> */}
      <div className="flex items-center w-full border-r border-gray-200 py-2 last:border-r-0 min-w-1/3">
        <RouteLink className="truncate" to={`${match.url}/tasks/${taskId}`}>
          {title}
        </RouteLink>
      </div>
      <div className="flex items-center">
        <div className="border-r border-gray-200 py-2 last:border-r-0 px-2 w-24 text-gray-500 truncate">
          {typeTitle}
        </div>
        <div className="flex items-center justify-start border-r border-gray-200 py-2 last:border-r-0 px-2 w-28 text-gray-500 text-sm truncate">
          <Status title={statusTitle} />
        </div>
        <div className="border-r border-gray-200 py-2 last:border-r-0 px-2 w-16 text-gray-500 truncate flex items-center justify-center ">
          <Priority value={priorityTitle} />
        </div>
        <div className="border-r border-gray-200 py-2 last:border-r-0 px-2 w-28 text-sm truncate">
          {dueDate ? timeAgo(dueDate) : ''}
        </div>
        <div className="border-r border-gray-200 py-1 last:border-r-0 px-2 w-20 flex items-center justify-center">
          <Avatar initials={assigneeName} bg="purple" color="white" size={28} />
        </div>
        <div className="border-r border-gray-200 py-1 last:border-r-0 px-2 w-12 flex items-center justify-center"></div>
        {/* }<div className="border-r border-gray-200 py-2 last:border-r-0 w-12 px-2"></div> */}
      </div>
    </li>
  );
};
export default Row;
