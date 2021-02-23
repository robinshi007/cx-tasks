import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { debounce, map } from 'lodash';

import {
  SearchIcon,
  ClearIcon,
  SortIcon,
  GroupListIcon,
  Select,
} from '@/shared/components/Element';
import {
  setFilterTerm,
  setFilterRecent,
  setFilterDueThisWeek,
  setFilterReset,
  setSortBy,
  setGroupBy,
  selectFilterTerm,
  selectFilterRecent,
  selectFilterDueThisWeek,
} from '@/features/project/projectSlice';

import { Button, RouteLink } from '@/features/shared';

const SearchBox = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(setFilterTerm(searchText));
    }
  };
  const delayedHandleFilterTerm = useRef(debounce((term) => dispatch(setFilterTerm(term)), 300));
  useEffect(() => delayedHandleFilterTerm.current(searchText), [searchText]);
  return (
    <div>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative rounded">
        <div className="absolute left-0 top-0 pl-2 pt-1.5 flex items-center pointer-events-none">
          <span className="text-gray-500">
            <SearchIcon size={20} />
          </span>
        </div>
        <input
          id="search"
          className="w-32 rounded py-1.5 pl-8 mr-2 px-4.5 bg-gray-100 border-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:bg-white transition ease-out duration-200"
          type="text"
          placeholder="Search"
          value={searchText}
          onKeyDown={handleKeyDown}
          onChange={handleSearchChange}
        />
        <div
          className="absolute right-4 top-1.5 flex items-center cursor-pointer z-10"
          style={{ display: `${searchText === '' ? 'none' : 'block'}` }}
        >
          <span className="text-gray-500">
            <ClearIcon size={16} onClick={() => setSearchText('')} />
          </span>
        </div>
      </div>
    </div>
  );
};

const Filters = ({ isBacklog }) => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const filterTerm = useSelector(selectFilterTerm);
  const filterRecent = useSelector(selectFilterRecent);
  const filterDueThisWeek = useSelector(selectFilterDueThisWeek);

  const [sort, setSort] = useState('none');
  const [group, setGroup] = useState('section');
  const sortValues = { none: 'None', due_date: 'Due Date', priority: 'Priority', title: 'Name' };
  const groupValues = { section: 'Section', assignee: 'Assignee' };
  const clearFilter = useMemo(() => filterTerm || filterRecent || filterDueThisWeek, [
    filterTerm,
    filterRecent,
    filterDueThisWeek,
  ]);

  const handleFilterRecent = (e) => {
    dispatch(setFilterRecent(!filterRecent));
  };
  const handleFilterDueThisWeek = (e) => {
    dispatch(setFilterDueThisWeek(!filterDueThisWeek));
  };
  const handleClearFilter = () => {
    setFilterRecent(false);
    setFilterDueThisWeek(false);
    //handleFilterReset();
    dispatch(setFilterReset());
  };

  return (
    <>
      <div className="flex items-center">
        <div>
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <SearchBox />
        </div>
        <Button
          variant="text"
          color="light"
          selected={filterRecent}
          onClick={handleFilterRecent}
          className="mr-2"
        >
          Recently updated
        </Button>
        <Button
          variant="text"
          color="light"
          selected={filterDueThisWeek}
          onClick={handleFilterDueThisWeek}
          className="mr-2"
        >
          Due this week
        </Button>
        <div className={`flex items-center ${clearFilter ? '' : 'invisible'}`}>
          <div className={`h-6 bg-gray-300 border-solid w-px mr-2}`}></div>
          <Button
            variant="text"
            color="light"
            hidden={!clearFilter}
            onClick={handleClearFilter}
            className="mr-2"
          >
            Clear filters
          </Button>
        </div>
        {isBacklog ? (
          <>
            <div className={`flex items-center justify-start`}>
              <SortIcon size={16} style={{ marginLeft: '12px', marginRight: '8px' }} />
              <Select
                variant="empty"
                placeholder="None"
                dropdownWidth={120}
                withClearValue={false}
                withSearch={false}
                name="status"
                value={sort}
                options={map(sortValues, (val, key) => ({
                  value: key,
                  label: val,
                }))}
                onChange={(val) => {
                  setSort(val);
                  dispatch(setSortBy(val));
                }}
              />
            </div>
            <div className={`flex items-center justify-start`}>
              <GroupListIcon size={16} style={{ marginLeft: '12px', marginRight: '8px' }} />
              <Select
                variant="empty"
                placeholder="None"
                dropdownWidth={120}
                withClearValue={false}
                withSearch={false}
                name="status"
                value={group}
                options={map(groupValues, (val, key) => ({
                  value: key,
                  label: val,
                }))}
                onChange={(val) => {
                  setGroup(val);
                  dispatch(setGroupBy(val));
                }}
              />
            </div>
          </>
        ) : (
          ''
        )}
      </div>
      {isBacklog ? (
        <RouteLink to={`${match.url}/section_new`}>
          <Button variant="contained" color="primary">
            Create section
          </Button>
        </RouteLink>
      ) : (
        ''
      )}
    </>
  );
};
export default Filters;
