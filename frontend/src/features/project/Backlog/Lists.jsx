import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { selectGroupBy } from '@/features/project/projectSlice';
import {
  updateCardDragged,
  updateSectionListDragged,
  updateUserListDragged,
} from '@/features/entity';
import List from './List';

const Lists = ({ lists }) => {
  const dispatch = useDispatch();

  const queryAttr = 'data-rbd-draggable-id';
  const [placeholderProps, setPlaceholderProps] = useState({});
  const groupBy = useSelector(selectGroupBy);

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
    //const draggedDOM = getDraggedDom(event.draggableId);
    const draggedDOM = getDraggedDom(event.draggableId);
    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;
    const draggedListNode = draggedDOM.parentNode;
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...draggedListNode.children];

    // remove item first if in the same list
    //if (event.source.droppableId === event.destination.droppableId) {
    childrenArray.splice(sourceIndex, 1);
    //}

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
    if (result.type === 'list') {
      //console.log('list', result);
      let sIndex = result.source.index;
      let dIndex = result.destination.index;
      const draggedListId = lists[sIndex].id;
      let previousOrder, nextOrder;
      if (dIndex === 0) {
        /* dropped at the top */
        previousOrder = 0;
        nextOrder = lists[dIndex].order;
      } else if (dIndex === lists.length - 1) {
        /* dropped at the bottom */
        previousOrder = lists[dIndex].order;
        nextOrder = 0;
      } else if (dIndex > sIndex) {
        /* drag up and dropped at the middle of the list */
        previousOrder = lists[dIndex].order;
        nextOrder = lists[dIndex + 1].order;
      } else {
        /* drag down and dropped at the middle of the list */
        previousOrder = lists[dIndex - 1].order;
        nextOrder = lists[dIndex].order;
      }
      const payload = {
        source: { listIndex: result.source.index },
        destination: {
          listIndex: result.destination.index,
        },
        position: {
          listId: draggedListId,
          previousOrder,
          nextOrder,
        },
        order: 'order',
      };
      if (groupBy === 'assignee') {
        dispatch(updateUserListDragged(payload));
      } else {
        dispatch(updateSectionListDragged(payload));
      }
    } else {
      // caculate prev/next card order
      const droppedListIndex = lists.findIndex(
        (l) => `list${l.id}` === result.destination.droppableId
      );
      const draggedListIndex = lists.findIndex((l) => `list${l.id}` === result.source.droppableId);
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
          source: {
            listIndex: result.source.droppableId.substring(4),
            cardIndex: result.source.index,
          },
          destination: {
            listIndex: result.destination.droppableId.substring(4),
            cardIndex: result.destination.index,
          },
          position: {
            cardId: draggedCardId,
            previousCardOrder,
            nextCardOrder,
          },
          group: groupBy,
          order: 'order',
        })
      );
    }
  };

  const columns = {
    taskKind: {
      title: 'Type',
      width: 'w-24',
    },
    status: {
      title: 'Status',
      width: 'w-28',
    },
    priority: {
      title: 'Priority',
      width: 'w-16 flex items-center justify-center',
    },
    dueDate: {
      title: 'Due date',
      width: 'w-28',
    },
    assignee: {
      title: 'Assignee',
      width: 'w-20 flex items-center justify-center',
    },
    action: {
      title: '',
      width: 'w-12 flex items-center justify-center',
    },
  };
  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      onDragEnd={handleDragEnd}
    >
      <div className="header flex items-center justify-between w-full text-gray-500 border-t border-b border-gray-200 text-xs">
        <div className="border-r border-gray-200 py-2 last:border-r-0 w-full min-w-1/3 ">
          Task name
        </div>
        <div className="flex items-center justify-center">
          {Object.keys(columns).map((key, index) => (
            <div
              className={`border-r border-gray-200 py-2 last:border-r-0 px-2 ${columns[key]['width']}`}
              key={index}
            >
              {columns[key]['title']}
            </div>
          ))}
          {/* <div className="border-r border-gray-200 py-2 last:border-r-0 w-12 px-2"></div> */}
        </div>
      </div>
      <Droppable droppableId="board" type="list">
        {(provided) => (
          <div
            className="container relative w-full"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ marginLeft: '-32px' }}
          >
            {lists.map((list, idx) => (
              <Draggable draggableId={`l${list.id}`} index={idx} key={`l${list.id}`}>
                {(p) => (
                  <div ref={p.innerRef} {...p.draggableProps}>
                    <List
                      title={list.title}
                      count={list.count}
                      filteredCount={list.cards.length}
                      cards={list.cards}
                      id={list.id}
                      key={idx}
                      columns={columns}
                      groupBy={groupBy}
                      placeholderProps={placeholderProps}
                      dhProps={p.dragHandleProps}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Lists;
