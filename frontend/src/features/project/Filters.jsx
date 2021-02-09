import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { SearchIcon } from '@/shared/components/Element';
import {
  setFilterTerm,
  setFilterRecent,
  setFilterReset,
  selectFilterTerm,
  selectFilterRecent,
} from '@/features/project/projectSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const filterTerm = useSelector(selectFilterTerm);
  const filterRecent = useSelector(selectFilterRecent);

  const [searchText, setSearchText] = useState('');
  const clearFilter = useMemo(() => filterTerm || filterRecent, [filterTerm, filterRecent]);

  const delayedHandleFilterTerm = useRef(debounce((term) => dispatch(setFilterTerm(term)), 300));
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(setFilterTerm(searchText));
    }
  };
  const handleFilterRecent = (e) => {
    dispatch(setFilterRecent(!filterRecent));
  };
  const handleClearFilter = () => {
    setSearchText('');
    setFilterRecent(false);
    //handleFilterReset();
    dispatch(setFilterReset());
  };

  useEffect(
    () => {
      delayedHandleFilterTerm.current(searchText);
    },
    [searchText] // Only call effect if debounced search term changes
  );
  return (
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
        className={`flex items-center justify-start mr-2 rounded text-sm py-1.5 px-4 hover:bg-gray-200 focus:bg-gray-300 cursor-pointer text-gray-600 select-none truncate ${
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
        className={`flex items-center justify-start rounded text-sm py-1.5 mr-2 px-4 hover:bg-gray-200 focus:bg-gray-300 cursor-pointer text-gray-600 select-none truncate ${
          clearFilter ? '' : 'hidden'
        }`}
        onClick={handleClearFilter}
      >
        Clear filters
      </div>
    </div>
  );
};
export default Filters;
