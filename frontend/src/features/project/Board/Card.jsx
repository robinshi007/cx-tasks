import {
  BoxCheckmarkSolidIcon,
  UpIcon,
  DownIcon,
  SingleBookmarkIcon,
  Avatar,
} from '@/shared/components/Element';

const Card = ({ title, label, kind, priority, parentRef, isDragging, ...props }) => {
  return (
    <div
      className={`card shadow-sm w-full flex flex-col items-start bg-white p-2 text-gray-700 rounded select-none mb-1 hover:shadow-md ${
        isDragging ? 'ring-2 ring-blue-500' : ''
      } transition-shadow ease-out duration-200`}
      ref={parentRef}
      {...props}
    >
      <div className="w-full mb-1.5">{title}</div>
      <div className="mb-1.5">
        {label ? (
          <div className="text-center font-semibold text-xs rounded px-1  uppercase select-none bg-blue-600 text-white">
            {label}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {kind && kind === 'story' ? (
            <SingleBookmarkIcon size={18} className="mr-1 text-green-500" />
          ) : (
            <BoxCheckmarkSolidIcon size={18} className="mr-1 text-blue-500" />
          )}
          {priority && priority === 'high' ? (
            <UpIcon size={18} className="text-red-500" />
          ) : priority === 'low' ? (
            <DownIcon size={18} className="text-blue-500" />
          ) : (
            ''
          )}
        </div>
        <div>
          <Avatar initials="WS" bg="purple" color="white" size={24} />
        </div>
      </div>
    </div>
  );
};
export default Card;
