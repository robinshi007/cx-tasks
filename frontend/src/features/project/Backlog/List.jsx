import { useRouteMatch } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { isEmpty } from 'lodash';

import { AddIcon, GripperDotsVerticalIcon } from '@/shared/components/Element';
import { StyledList } from './List.styles';
import Row from './Row';
import { RouteLink } from '@/features/shared';

const List = ({ title, cards, id, count, filteredCount, columns, placeholderProps, dhProps }) => {
  const match = useRouteMatch();
  return (
    <div className="bg-white flex flex-col items-center ml-8 -mr-8 py-1 w-full rounded">
      <div className="relative header flex flex-shrink-0 items-center justify-between w-full h-8 truncate text-gray-700 text-xs select-none -ml-8">
        <div className="flex items-center">
          <div className="flex items-center h-full" {...dhProps} style={{ width: '20px' }}>
            <GripperDotsVerticalIcon className="text-gray-500 cursor-move" />
          </div>
          <RouteLink className="font-semibold mr-2 uppercase" to={`${match.url}/sections/${id}`}>
            {title}
          </RouteLink>
          <span className="font-medium tracking-tighter">
            {count !== filteredCount ? `${filteredCount} of ${count}` : count}
          </span>
        </div>
        <div>
          <RouteLink
            to={{
              pathname: `${match.url}/tasks_new`,
              query: { section: id.toString() },
            }}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            <AddIcon size={18} className="" onclick={() => {}} />
          </RouteLink>
        </div>
      </div>
      <Droppable droppableId={id.toString()} style={{ marginLeft: '-34px' }}>
        {(provided, snapshot) => (
          <StyledList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            style={{ minHeight: '38px' }}
          >
            {cards.map((obj, idx) => (
              <Draggable draggableId={obj.id.toString()} index={idx} key={obj.id}>
                {(p, snapshot) => (
                  <Row
                    taskId={obj.id}
                    title={obj.title}
                    type={obj.type}
                    typeTitle={obj.typeTitle}
                    status={obj.status}
                    statusTitle={obj.statusTitle}
                    assignee={obj.assignee}
                    assigneeName={obj.assigneeName}
                    priority={obj.priority}
                    priorityTitle={obj.priorityTitle}
                    key={obj.id}
                    dueDate={obj.due_date}
                    isDragging={snapshot.isDragging}
                    parentRef={p.innerRef}
                    dhProps={p.dragHandleProps}
                    {...p.draggableProps}
                    columns={columns}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
              <div
                className="absolute border-2 border-blue-600 border-dashed"
                style={{
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  width: placeholderProps.clientWidth,
                }}
              />
            )}
          </StyledList>
        )}
      </Droppable>
    </div>
  );
};
export default List;
