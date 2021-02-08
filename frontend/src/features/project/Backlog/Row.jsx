import { formatDistance } from 'date-fns';
import { Avatar, SquareShapeIcon, GripperDotsVerticalIcon } from '@/shared/components/Element';

const Row = ({
  title,
  priority,
  status,
  parentRef,
  isDragging,
  dueDate,
  columns,
  dhProps,
  ...props
}) => {
  return (
    <li
      className={`flex items-center justify-between font-sm text-gray-700 w-full border-b border-gray-200 first:border-t first:border-gray-200 ${
        isDragging ? 'ring-2 ring-blue-500' : ''
      } transition-shadow ease-out duration-200 bg-white`}
      ref={parentRef}
      {...props}
    >
      <div className="flex items-center h-full" {...dhProps} style={{ width: '20px' }}>
        <GripperDotsVerticalIcon className="text-gray-500" />
      </div>
      <div className="flex items-center w-full border-r border-gray-200 py-2 last:border-r-0">
        <SquareShapeIcon size={20} className="mr-2" />
        <div className="text-sm font-normal truncate">{title}</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-start border-r border-gray-200 py-2 last:border-r-0 px-2 w-24 text-gray-400 text-sm truncate">
          <div
            className={`text-center font-semibold text-xs rounded px-2 py-0.5 uppercase select-none ${statusClass(
              status
            )}`}
          >
            {status}
          </div>
        </div>
        <div className="border-r border-gray-200 py-2 last:border-r-0 px-2 w-24 text-gray-400 text-sm truncate">
          {timeAgo(dueDate)}
        </div>
        <div className="border-r border-gray-200 py-2 last:border-r-0 px-2 w-24">
          <Avatar initials="WS" bg="purple" color="white" size={20} />
        </div>
        <div className="border-r border-gray-200 py-2 last:border-r-0 w-12 px-2"></div>
      </div>
    </li>
  );
};
const statusClass = (status) => {
  const lcStatus = status.toLowerCase();
  if (lcStatus === 'todo') {
    return 'bg-gray-200 text-gray-700';
  } else if (lcStatus === 'done') {
    return 'bg-green-200 text-green-700';
  } else {
    return 'bg-blue-600 text-white';
  }
};

const timeAgo = (timeString) => {
  const time = Date.parse(timeString);
  return formatDistance(time, new Date(), { addSuffix: true });
};
export default Row;
