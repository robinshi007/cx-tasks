import React from 'react';
import { useSelector } from 'react-redux';

import { selectFilteredAllOrderedLists } from '@/features/project/projectSlice';

import Lists from './Lists';
import Filters from './Filters';

//const FancyCard = React.forwardRef((props, ref) => <Card parentRef={ref} {...props} />);

const Content = () => {
  const lists = useSelector(selectFilteredAllOrderedLists);

  return (
    <div className="ml-64 min-w-96 bg-white min-h-screen overflow-y-auto">
      <div className="px-8 pb-4">
        <div className="flex items-center justify-start h-11 w-full  mt-3 mb-2">
          <h2 className="text-gray-600 font-medium text-lg">Board</h2>
        </div>
        <div className="w-full bg-white mb-4">
          <div className="py-2 flex items-center justify-between text-sm">
            <Filters />
          </div>
        </div>
        <div className="">
          <div className="flex items-start justify-start">
            <Lists lists={lists} />
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
