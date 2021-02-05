import React from 'react';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { updateCardDragged } from '@/features/project/projectSlice';
import Card from './Card';

const Lists = ({ lists }) => {
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
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
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {lists.map((list, idx) => (
        <List
          title={list.title}
          count={list.count}
          filteredCount={list.cards.length}
          cards={list.cards}
          id={list.id}
          key={idx}
        />
      ))}
    </DragDropContext>
  );
};

const List = ({ title, cards, id, count, filteredCount }) => {
  return (
    <div
      className="bg-gray-100 flex flex-col items-center mr-2 px-1 py-1 rounded"
      style={{ minHeight: '450px', width: '230px', minWidth: '230px' }}
    >
      <div className="header flex flex-shrink-0 items-center w-full h-8 truncate text-gray-500 text-xs px-1 select-none">
        <div className="font-medium mr-2 uppercase">{title}</div>
        <span className="font-medium tracking-tighter">
          {count !== filteredCount ? `${filteredCount} of ${count}` : count}
        </span>
      </div>
      <Droppable droppableId={id.toString()} className="">
        {(provided) => (
          <div
            className="content w-full overflow-y-hidden overflow-x-hidden"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: '250px' }}
          >
            {cards.map((obj, idx) => (
              <Draggable draggableId={obj.id.toString()} index={idx} key={obj.id}>
                {(p, snapshot) => (
                  <Card
                    title={obj.title}
                    label={obj.label}
                    kind={obj.kind}
                    priority={obj.priority}
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
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Lists;
