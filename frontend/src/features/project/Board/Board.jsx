import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  SearchIcon,
  BoxCheckmarkSolidIcon,
  UpIcon,
  DownIcon,
  SingleBookmarkIcon,
  Avatar,
} from '@/shared/components/Element';

import {
  setFilterTerm,
  setFilterRecent,
  setFilterReset,
  selectFilteredRecentAndTermLists,
  selectFilterTerm,
  selectFilterRecent,
} from '@/features/project/projectSlice';

const Lists = ({ data }) => {
  return (
    <>
      {data.map((list, idx) => (
        <List
          title={list.title}
          count={list.cards.length}
          cards={list.cards}
          id={list.id}
          key={idx}
        />
      ))}
    </>
  );
};
const List = ({ title, cards, id }) => {
  return (
    <div
      className="bg-gray-100 flex flex-col items-center mr-2 px-1 py-1 rounded"
      style={{ minHeight: '450px', width: '230px' }}
    >
      <div className="header flex flex-shrink-0 items-center w-full h-8 uppercase truncate text-gray-500 text-xs font-medium px-1 select-none">
        <div className="mr-2">{title}</div>
        <span className="">{cards.length}</span>
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
//const FancyCard = React.forwardRef((props, ref) => <Card parentRef={ref} {...props} />);

const Card = ({ title, label, kind, priority, parentRef, isDragging, ...props }) => {
  return (
    <div
      className={`card shadow-sm w-full flex flex-col items-start bg-white p-2 text-gray-700 rounded select-none mb-1 hover:bg-opacity-40 ${
        isDragging ? 'ring-2 ring-blue-500' : ''
      }`}
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
            <SingleBookmarkIcon size={18} color="green" className="mr-1" />
          ) : (
            <BoxCheckmarkSolidIcon size={18} color="blue" className="mr-1" />
          )}
          {priority && priority === 'high' ? (
            <UpIcon size={18} color="red" />
          ) : priority === 'low' ? (
            <DownIcon size={18} color="green" />
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

const Content = () => {
  const dispatch = useDispatch();
  const lists = useSelector(selectFilteredRecentAndTermLists);
  //const lists = useSelector(selectFilteredRecentLists);
  const filterTerm = useSelector(selectFilterTerm);
  const filterRecent = useSelector(selectFilterRecent);

  const [data, setData] = useState(lists);

  //const [isFilterRecent, setIsFilterRecent] = useState(false);
  const [searchText, setSearchText] = useState('');
  const clearFilter = useMemo(() => filterTerm || filterRecent, [filterTerm, filterRecent]);

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
    const shadowData = [...data];
    const sourceListIndex = shadowData.findIndex(
      (o) => o.id.toString() === result.source.droppableId
    );
    const destListIndex = shadowData.findIndex(
      (o) => o.id.toString() === result.destination.droppableId
    );
    const [newCard] = shadowData[sourceListIndex].cards.splice(result.source.index, 1);
    shadowData[destListIndex].cards.splice(result.destination.index, 0, newCard);
    setData(shadowData);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(setFilterTerm(searchText));
    }
  };
  const handleFilterRecent = (e) => {
    dispatch(setFilterRecent(!filterTerm));
  };
  const handleClearFilter = () => {
    setSearchText('');
    setFilterRecent(false);
    //handleFilterReset();
    dispatch(setFilterReset());
  };
  return (
    <div className="ml-64 min-w-96 bg-white min-h-screen overflow-y-auto">
      <div className="px-8 pb-4">
        <div className="flex items-center justify-start h-11 w-full  mt-3 mb-2">
          <h2 className="text-gray-600 font-medium text-lg">Board</h2>
        </div>
        <div className="w-full bg-white mb-4">
          <div className="py-2 flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div>
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative rounded">
                  <div className="absolute left-0 pl-2 pt-1.5 flex items-center pointer-events-none">
                    <span className="text-gray-500">
                      <SearchIcon size={20} />
                    </span>
                  </div>
                  <input
                    id="search"
                    className="w-42 rounded py-1.5 pl-8 mr-2 px-4.5 bg-gray-100 border-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:bg-white transition ease-out duration-200"
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onKeyDown={handleKeyDown}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <div
                className={`flex items-center justify-start mr-2 rounded text-sm py-1.5 px-4 my-0.5 hover:bg-gray-200 focus:bg-gray-300 cursor-pointer text-gray-600 ${
                  filterRecent ? 'bg-gray-300' : ''
                }`}
                onClick={handleFilterRecent}
              >
                Recently updated
              </div>

              <div
                className={`h-6 bg-gray-300 border-solid w-px mr-2 ${clearFilter ? '' : 'hidden'}`}
              ></div>
              <div
                className={`flex items-center justify-start rounded text-sm py-1.5 mr-2 px-4 my-0.5 hover:bg-gray-200 focus:bg-gray-300 cursor-pointer text-gray-600 ${
                  clearFilter ? '' : 'hidden'
                }`}
                onClick={handleClearFilter}
              >
                Clear filters
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flex items-start justify-start">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Lists data={lists} />
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

const Board = ({ lists, filters }) => {
  return <Content lists={lists} filters={filters} />;
};
export default Board;
