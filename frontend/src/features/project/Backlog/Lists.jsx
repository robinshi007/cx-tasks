import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { isEmpty } from 'lodash';

import { updateCardDragged } from '@/features/project/projectSlice';
import Row from './Row';

const Lists = ({ lists }) => {
  const dispatch = useDispatch();

  const queryAttr = 'data-rbd-draggable-id';
  const [placeholderProps, setPlaceholderProps] = useState({});

  const getDraggedDom = (draggableId) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  //https://codesandbox.io/s/react-beautiful-dnd-custom-placeholder-2lmf1?file=/src/App.js:4461-4477
  const handleDragStart = (event) => {
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const draggedListNode = draggedDOM.parentNode;
    const sourceIndex = event.source.index;
    var clientY =
      parseFloat(window.getComputedStyle(draggedListNode).paddingTop) +
      [...draggedListNode.children].slice(0, sourceIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedListNode).paddingLeft),
    });
  };

  const handleDragUpdate = (event) => {
    if (!event.destination) {
      return;
    }
    const draggedDOM = getDraggedDom(event.draggableId);
    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;
    const draggedListNode = draggedDOM.parentNode;
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...draggedListNode.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    var clientY =
      parseFloat(window.getComputedStyle(draggedListNode).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedListNode).paddingLeft),
    });
  };

  const handleDragEnd = (result) => {
    setPlaceholderProps({});
    // dropped nowhere
    if (!result.destination || !result.source) {
      return;
    }
    // position not changed
    if (
      result.destination.draggableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }
    // caculate prev/next card order
    const droppedListIndex = lists.findIndex(
      (l) => l.id.toString() === result.destination.droppableId
    );
    const draggedListIndex = lists.findIndex((l) => l.id.toString() === result.source.droppableId);
    const draggedCardId = lists[draggedListIndex].cards[result.source.index].id;
    let previousCardOrder, nextCardOrder;
    // dropped index
    const cIndex = result.destination.index;
    // dropped list
    const dList = lists[droppedListIndex];
    // in the same list
    if (result.source.droppableId === result.destination.droppableId) {
      if (cIndex === 0) {
        /* dropped at the top */
        previousCardOrder = 0;
        nextCardOrder = dList.cards[cIndex].order;
      } else if (cIndex === dList.cards.length - 1) {
        /* dropped at the bottom */
        previousCardOrder = dList.cards[cIndex].order;
        nextCardOrder = 0;
      } else if (cIndex > result.source.index) {
        /* drag up and dropped at the middle of the list */
        previousCardOrder = dList.cards[cIndex].order;
        nextCardOrder = dList.cards[cIndex + 1].order;
      } else {
        /* drag down and dropped at the middle of the list */
        previousCardOrder = dList.cards[cIndex - 1].order;
        nextCardOrder = dList.cards[cIndex].order;
      }
    } else {
      /* not in the same list */
      if (cIndex === 0 && dList.cards.length === 0) {
        /* dropped at the empty list */
        previousCardOrder = 0;
        nextCardOrder = 0;
      } else if (cIndex === 0 && dList.cards.length !== 0) {
        /* dropped at the top of the list */
        previousCardOrder = 0;
        nextCardOrder = dList.cards[cIndex].order;
      } else if (cIndex === dList.cards.length) {
        /* dropped at the end of the list */
        previousCardOrder = dList.cards[cIndex - 1].order;
        nextCardOrder = 0;
      } else {
        /* dropped at the middle of the list */
        previousCardOrder = dList.cards[cIndex - 1].order;
        nextCardOrder = dList.cards[cIndex].order;
      }
    }

    // dispatch the dropped event
    dispatch(
      updateCardDragged({
        source: { listIndex: result.source.droppableId, cardIndex: result.source.index },
        destination: {
          listIndex: result.destination.droppableId,
          cardIndex: result.destination.index,
        },
        position: {
          cardId: draggedCardId,
          previousCardOrder,
          nextCardOrder,
        },
      })
    );
  };

  const columns = {
    tags: {
      title: 'Tags',
      width: 'w-24',
    },
    dueDate: {
      title: 'Due date',
      width: 'w-24',
    },
    assignee: {
      title: 'Assignee',
      width: 'w-24',
    },
  };
  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      onDragEnd={handleDragEnd}
    >
      <div className="header flex items-center justify-between w-full text-gray-500 border-t border-b border-gray-200 text-xs">
        <div className="border-r border-gray-200 py-2 last:border-r-0 w-full">Task name</div>
        <div className="flex items-center justify-center">
          {Object.keys(columns).map((key, index) => (
            <div
              className={`border-r border-gray-200 py-2 last:border-r-0 px-2 ${columns[key]['width']}`}
              key={index}
            >
              {columns[key]['title']}
            </div>
          ))}
          <div className="border-r border-gray-200 py-2 last:border-r-0 w-12 px-2"></div>
        </div>
      </div>
      {lists.map((list, idx) => (
        <List
          title={list.title}
          count={list.count}
          filteredCount={list.cards.length}
          cards={list.cards}
          id={list.id}
          key={idx}
          columns={columns}
          placeholderProps={placeholderProps}
        />
      ))}
    </DragDropContext>
  );
};

const List = ({ title, cards, id, count, filteredCount, columns, placeholderProps }) => {
  return (
    <div className="bg-white flex flex-col items-center mr-2 py-1 mb-2 w-full rounded">
      <div className="header flex flex-shrink-0 items-center w-full h-8 truncate text-gray-500 text-xs select-none">
        <div className="font-semibold mr-2 uppercase">{title}</div>
        <span className="font-medium tracking-tighter">
          {count !== filteredCount ? `${filteredCount} of ${count}` : count}
        </span>
      </div>
      <Droppable droppableId={id.toString()} className="">
        {(provided, snapshot) => (
          <div
            className="relative w-full overflow-y-hidden overflow-x-hidden"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '30px' }}
          >
            {cards.map((obj, idx) => (
              <Draggable draggableId={obj.id.toString()} index={idx} key={obj.id}>
                {(p, snapshot) => (
                  <Row
                    title={obj.title}
                    label={obj.label}
                    kind={obj.kind}
                    priority={obj.priority}
                    status={obj.status}
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
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Lists;
