import { useRouteMatch } from 'react-router-dom';
import { Avatar, GripperDotsVerticalIcon } from '@/shared/components/Element';
import { RouteLink, Priority, timeAgo } from '../shared';

const Row = ({
  taskId,
  title,
  priority,
  taskKindTitle,
  status,
  statusText,
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
        <GripperDotsVerticalIcon className="text-gray-500 cursor-pointer" />
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
          {taskKindTitle}
        </div>
        <div className="flex items-center justify-start border-r border-gray-200 py-2 last:border-r-0 px-2 w-28 text-gray-500 text-sm truncate">
          <Status id={status} title={statusText} />
        </div>
        <div className="border-r border-gray-200 py-2 last:border-r-0 px-2 w-16 text-gray-500 truncate flex items-center justify-center ">
          <Priority value={priority} />
        </div>
        <div className="border-r border-gray-200 py-2 last:border-r-0 px-2 w-28 text-sm truncate">
          {timeAgo(dueDate)}
        </div>
        <div className="border-r border-gray-200 py-1 last:border-r-0 px-2 w-20 flex items-center justify-center">
          <Avatar initials={assigneeName} bg="purple" color="white" size={28} />
        </div>
        {/* }<div className="border-r border-gray-200 py-2 last:border-r-0 w-12 px-2"></div> */}
      </div>
    </li>
  );
};
const statusClass = (status) => {
  const lcStatus = status;
  if (lcStatus === 11 || lcStatus === 12) {
    return 'bg-gray-200 text-gray-700';
  } else if (lcStatus === 14) {
    return 'bg-green-600 text-white';
  } else {
    return 'bg-blue-600 text-white';
  }
};
const Status = ({ id, title }) => {
  return (
    <div
      className={`text-center font-semibold text-xs rounded px-2 py-0.5 uppercase select-none ${statusClass(
        id
      )}`}
    >
      {title}
    </div>
  );
};

export default Row;
