import React from 'react';
import { useSelector } from 'react-redux';

import { selectFilteredAllOrderedLists } from '@/features/project/projectSlice';

import Lists from './Lists';
import Filters from '../Filters';

const Backlog = () => {
  const lists = useSelector(selectFilteredAllOrderedLists);
  return (
    <div className="px-8 pb-4">
      <div className="flex items-center justify-start h-11 w-full  mt-3 mb-2">
        <h2 className="text-gray-600 font-medium text-lg">Board</h2>
      </div>
      <div className="w-full bg-white mb-4">
        <div className="py-2 flex items-center justify-between text-sm">
          <Filters isBoard={false} />
        </div>
      </div>
      <div className="">
        <div className="flex flex-col items-start justify-start">
          <Lists lists={lists} />
        </div>
      </div>
    </div>
  );
};
export default Backlog;
