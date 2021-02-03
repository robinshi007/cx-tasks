import { formatDistance } from 'date-fns';
import {
  BacklogListIcon,
  TaskboardIcon,
  SettingsIcon,
  SearchIcon,
  FabricFolderIcon,
  Avatar,
  SquareShapeIcon,
  MoreIcon,
} from '@/shared/components/Element';

import { Nav, Sidebar } from '../shared';

const Row = ({ title, dueDate, status, selected }) => {
  return (
    <li
      className={`flex items-center justify-between font-sm text-gray-600 py-1 w-full border-b border-gray-200 ${
        selected ? 'bg-blue-100 bg-opacity-70' : ''
      }`}
    >
      <div className="flex items-center">
        <SquareShapeIcon size={20} className="mr-2" />
        <div className="text-sm font-normal truncate">{title}</div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-shrink items-center justify-start w-28 text-gray-400 text-sm truncate mr-2">
          <div
            className={`text-center font-semibold text-xs rounded px-2 py-0.5 uppercase select-none ${statusClass(
              status
            )}`}
          >
            {status}
          </div>
        </div>
        <div className="flex flex-shrink w-28 text-gray-400 text-sm mr-2">{timeAgo(dueDate)}</div>
        <div className="flex flex-shrink">
          <Avatar initials="WS" bg="purple" color="white" size={28} />
        </div>
      </div>
    </li>
  );
};
const statusClass = (status) => {
  const lcStatus = status.toLowerCase();
  if (lcStatus === 'todo') {
    return 'bg-gray-200 text-gray-700';
  } else if (lcStatus === 'done') {
    return 'bg-green-200 text-green-700';
  } else {
    return 'bg-blue-600 text-white';
  }
};

const timeAgo = (timeString) => {
  const time = Date.parse(timeString);
  return formatDistance(time, new Date());
};

const Content = () => (
  <div className="ml-64 min-w-96 bg-white min-h-screen overflow-y-auto">
    <div className="px-8 pb-4">
      <div className="flex items-center justify-start h-11 w-full  mt-3 mb-2">
        <h2 className="text-gray-600 font-medium text-lg">Backlog</h2>
      </div>
      <div className="w-full bg-white mb-4">
        <div className="py-2 flex items-center justify-between text-sm">
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
                className="w-42 rounded py-1.5 pl-8 px-4.5 bg-gray-100 border-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 focus:bg-white transition ease-out duration-200"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
          <button className="hover:bg-green-500 focus:bg-green-700 group flex items-center rounded-md bg-green-600 text-white text-sm font-medium px-3 py-1.5 cursor-pointer select-none transition ease-out duration-200">
            <svg width="16" height="20" fill="currentColor" className="group-hover:text-white">
              <path d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"></path>
            </svg>
            Create section
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="header relative">
          <div className="flex items-center justify-between w-full text-sm font-normal">
            <div className="flex items-center justify-start">
              <div
                className="flex cursor-pointer py-2 text-gray-600 font-semibold mr-4 relative"
                href="/"
              >
                [Backlog]
              </div>
              <div className="text-gray-400 text-sm pt-0.5">3 tasks</div>
            </div>
            <div className="flex items-center justify-right">
              <div className="text-gray-500 text-xs bg-gray-200 text-sm rounded-full px-1.5 min-w-4 ml-1 select-none">
                1
              </div>
              <div className="text-white text-xs bg-blue-600 text-sm rounded-full px-1.5 min-w-4 ml-1 select-none">
                2
              </div>
              <div className="text-white text-xs bg-green-600 text-sm rounded-full px-1.5 min-w-4 ml-1 select-none">
                1
              </div>
              <div className="ml-2 bg-gray-100 hover:bg-gray-200 p-1 cursor-pointer">
                <MoreIcon size="24" />
              </div>
            </div>
          </div>
          <div className="absolute bg-gray-200 w-full h-0.5 bottom-0 left-0 right-0 z-0"></div>
        </div>
        <div className="content ">
          <ul className="border-gray-200">
            <Row title="Decide the design color" dueDate="2021/1/29" status="Done" />
            <Row
              title="Redesign the kanban page this week"
              dueDate="2021/2/4"
              status="Dev"
              selected
            />
            <Row title="Test the cover of the card" dueDate="2021/2/20" status="Testing" />
            <Row title="Test the cover of the card" dueDate="2021/3/20" status="Todo" />
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Backlog = () => {
  const navHeader = {
    title: 'Demo Project',
    description: 'Project for demo use',
    icon: FabricFolderIcon,
  };
  const navList = [
    //{ name: 'Roadmap', icon: TimelineProgressIcon },
    { name: 'Backlog', icon: BacklogListIcon, active: true },
    { name: 'Board', icon: TaskboardIcon },
    //{ name: 'Chart', icon: ChartIcon },
    { name: 'Settings', icon: SettingsIcon },
    // { name: 'Feedback', icon: FeedbackIcon },
  ];
  return (
    <>
      <Nav />
      <Sidebar navHeader={navHeader} navList={navList} />
      <Content />
    </>
  );
};
export default Backlog;
