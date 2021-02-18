import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { isEmpty } from 'lodash';
import { useWindowSize } from 'react-use';

import { updateCardDragged } from '@/features/project/projectSlice';
import Card from './Card';

const Lists = ({ lists }) => {
  const dispatch = useDispatch();

  const queryDragAttr = 'data-rbd-drag-handle-draggable-id';
  const queryDropAttr = 'data-rbd-droppable-id';
  const [placeholderProps, setPlaceholderProps] = useState({});

  const getDraggedDom = (queryAttr, draggableId) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  //https://codesandbox.io/s/react-beautiful-dnd-custom-placeholder-2lmf1?file=/src/App.js:4461-4477
  const handleDragStart = (event) => {
    const draggedDOM = getDraggedDom(queryDragAttr, event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;
    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children].slice(0, sourceIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft),
    });
  };

  const handleDragUpdate = (event) => {
    if (!event.destination) {
      return;
    }
    //console.log('update event', event);
    const draggedDOM = getDraggedDom(queryDragAttr, event.draggableId);
    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;
    const draggedListNode = getDraggedDom(queryDropAttr, event.destination.droppableId);
    if (!draggedListNode) {
      return;
    }
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...draggedListNode.children];
    // remove item first if in the same list
    if (event.source.droppableId === event.destination.droppableId) {
      childrenArray.splice(sourceIndex, 1);
    }
    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      draggedDOM,
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
        nextCardOrder = dList.cards[cIndex].bdorder;
      } else if (cIndex === dList.cards.length - 1) {
        /* dropped at the bottom */
        previousCardOrder = dList.cards[cIndex].bdorder;
        nextCardOrder = 0;
      } else if (cIndex > result.source.index) {
        /* drag up and dropped at the middle of the list */
        previousCardOrder = dList.cards[cIndex].bdorder;
        nextCardOrder = dList.cards[cIndex + 1].bdorder;
      } else {
        /* drag down and dropped at the middle of the list */
        previousCardOrder = dList.cards[cIndex - 1].bdorder;
        nextCardOrder = dList.cards[cIndex].bdorder;
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
        nextCardOrder = dList.cards[cIndex].bdorder;
      } else if (cIndex === dList.cards.length) {
        /* dropped at the end of the list */
        previousCardOrder = dList.cards[cIndex - 1].bdorder;
        nextCardOrder = 0;
      } else {
        /* dropped at the middle of the list */
        previousCardOrder = dList.cards[cIndex - 1].bdorder;
        nextCardOrder = dList.cards[cIndex].bdorder;
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
        group: 'status',
        order: 'bdorder',
      })
    );
  };
  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      onDragEnd={handleDragEnd}
    >
      {lists.map((list, idx) => (
        <List
          title={list.title}
          count={list.count}
          filteredCount={list.cards.length}
          cards={list.cards}
          id={list.id}
          key={idx}
          placeholderProps={placeholderProps}
        />
      ))}
    </DragDropContext>
  );
};

const List = ({ title, cards, id, count, filteredCount, placeholderProps }) => {
  const { height } = useWindowSize();
  return (
    <div
      className="bg-gray-100 flex flex-col items-center mr-2 px-0.5 py-1 rounded"
      style={{ minHeight: '300px', width: '260px' }}
    >
      <div className="header flex flex-shrink-0 items-center w-full h-8 truncate text-gray-500 text-xs px-1 select-none">
        <div className="font-medium mr-2 uppercase">{title}</div>
        <span className="font-medium tracking-tighter">
          {count !== filteredCount ? `${filteredCount} of ${count}` : count}
        </span>
      </div>
      <Droppable droppableId={id.toString()} className="">
        {(provided, snapshot) => (
          <div
            className="relative content w-full overflow-y-auto overflow-x-hidden px-0.5"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ height: height - 172 + 'px' }}
          >
            {cards.map((obj, idx) => (
              <Draggable draggableId={obj.id.toString()} index={idx} key={obj.id}>
                {(p, snapshot) => (
                  <Card
                    taskId={obj.id}
                    title={obj.title}
                    label={obj.label}
                    kind={obj.kind}
                    taskKindTitle={obj.taskKindTitle}
                    priority={obj.priority}
                    section={obj.section}
                    sectionTitle={obj.sectionTitle}
                    assignee={obj.assignee}
                    assigneeName={obj.assigneeName}
                    key={obj.id}
                    isDragging={snapshot.isDragging}
                    parentRef={p.innerRef}
                    {...p.draggableProps}
                    {...p.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
              <div
                className="absolute border-2 border-blue-600 border-dashed rounded"
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
