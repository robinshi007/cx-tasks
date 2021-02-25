import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Avatar, Modal, SearchIcon, ClearIcon } from '@/shared/components/Element';
import { debounce } from 'lodash';

import { setFilterTerm, selectFilterTermProjects } from './homeSlice';
import { timeAgo, RouteLink, Button, Tab } from '@/features/shared';
import { SettingsPage as ProjectDetail } from '../project/Settings';

const Row = ({ id, title, dueDate, owner }) => {
  return (
    <li className="flex items-center justify-between font-sm text-gray-600 py-1">
      <div className="flex items-center justify-start w-full">
        <RouteLink className="text-sm font-normal truncate flex-shrink" to={`/projects/${id}`}>
          {title}
        </RouteLink>
        <div className="flex flex-1"></div>
        <div className="mr-2 text-right text-gray-400 text-sm truncate flex-shrink-0">
          {dueDate !== '' && timeAgo(dueDate)}
        </div>
        <Avatar initials={owner} bg="purple" color="white" size={28} />
      </div>
    </li>
  );
};

const ProjectList = ({ projects }) => {
  return (
    <ul>
      {Object.values(projects).map(({ id, title, due_date, owner }) => (
        <Row id={id} title={title} dueDate={due_date} key={id} owner={owner} />
      ))}
    </ul>
  );
};

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
        <div className="absolute left-0 pl-2 pt-1.5 flex items-center pointer-events-none">
          <span className="text-gray-500">
            <SearchIcon size={20} />
          </span>
        </div>
        <input
          id="search"
          className="w-32 rounded py-1.5 pl-8 pr-7 mr-2 px-4.5 bg-gray-100 border-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:bg-white transition ease-out duration-200"
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

const Projects = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const projects = useSelector(selectFilterTermProjects);
  return (
    <div className="px-8 py-4 relative">
      <div className="flex items-center justify-start h-11 w-full">
        <h2 className="text-gray-600 font-medium text-lg">My work</h2>
      </div>
      <div className="w-full bg-white mb-4">
        <div className="py-2 flex items-center justify-between text-sm">
          <SearchBox />
          <RouteLink to={`${path}/project_new`}>
            <Button variant="contained" color="primary">
              Create project
            </Button>
          </RouteLink>
        </div>
      </div>
      <div className="h-36 w-full">
        <div className="header relative">
          <Tab navs={[{ name: 'Projects', path: `${path}` }]} />
          <div className="absolute bg-gray-200 w-full h-0.5 bottom-0 left-0 right-0 z-0"></div>
        </div>
        <div className="content py-2 ">
          <ProjectList projects={projects} />
        </div>
      </div>

      <Route
        path={`${path}/project_new`}
        render={() => (
          <Modal
            isOpen={true}
            width={520}
            withCloseIcon={false}
            onClose={() => history.push(url)}
            renderContent={(modal) => <ProjectDetail modalClose={modal.close} fields={{}} />}
            style={{ minHeight: '300px' }}
          />
        )}
      />
    </div>
  );
};

export default Projects;
