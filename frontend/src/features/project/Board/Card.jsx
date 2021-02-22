import { useRouteMatch } from 'react-router-dom';
import { Avatar } from '@/shared/components/Element';
import { Priority, Kind, Label, RouteLink } from '../shared';

const Card = ({
  taskId,
  title,
  kind,
  taskKindTitle,
  priority,
  section,
  sectionTitle,
  assignee,
  assigneeName,
  parentRef,
  isDragging,
  ...props
}) => {
  const match = useRouteMatch();
  return (
    <RouteLink
      className={`card shadow-sm w-full flex flex-col items-start bg-white p-2 text-sm text-gray-700 rounded select-none mb-1 hover:shadow-md ${
        isDragging ? 'ring-2 ring-blue-500' : ''
      } transition-shadow ease-out duration-200`}
      ref={parentRef}
      {...props}
      to={`${match.url}/tasks/${taskId}`}
    >
      <div className="w-full mb-1.5">{title}</div>
      <div className="mb-1.5">{section ? <Label value={sectionTitle} color="blue" /> : ''}</div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Kind value={taskKindTitle} />
          <Priority value={priority} />
        </div>
        <div>
          <Avatar initials={assigneeName} bg="purple" color="white" size={24} />
        </div>
      </div>
    </RouteLink>
  );
};
export default Card;
