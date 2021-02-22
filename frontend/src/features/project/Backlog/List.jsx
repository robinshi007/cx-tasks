import { Droppable, Draggable } from 'react-beautiful-dnd';
import { isEmpty } from 'lodash';

import { StyledList } from './List.styles';
import Row from './Row';

const List = ({ title, cards, id, count, filteredCount, columns, placeholderProps, dhProps }) => {
  return (
    <div className="bg-white flex flex-col items-center mr-2 py-1 w-full rounded">
      <div className="relative header flex flex-shrink-0 items-center w-full h-8 truncate text-gray-700 text-xs select-none">
        <div className="font-semibold mr-2 uppercase cursor-pointer" {...dhProps}>
          {title}
        </div>
        <span className="font-medium tracking-tighter">
          {count !== filteredCount ? `${filteredCount} of ${count}` : count}
        </span>
      </div>
      <Droppable droppableId={id.toString()} className="">
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
                    title={obj.title}
                    label={obj.label}
                    kind={obj.kind}
                    taskKindTitle={obj.taskKindTitle}
                    status={obj.status}
                    statusText={obj.statusText}
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
