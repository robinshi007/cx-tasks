import {
  Avatar,
  WorkItemIcon,
  FabricFolderIcon,
  FavoriteStarIcon,
  SettingsIcon,
  SquareShapeIcon,
  SearchIcon,
  HomeIcon,
} from '@/shared/components/Element';

import { Nav, Sidebar } from '../shared';

const Row = ({ title, dueDate }) => {
  return (
    <li className="flex items-center justify-between font-sm text-gray-600 py-1">
      <div className="flex items-center">
        <SquareShapeIcon size={20} className="mr-2" />
        <div className="text-sm font-normal">{title}</div>
      </div>
      <div className="flex items-center">
        <div className="w-8 mr-4 text-right text-gray-400 text-sm">{dueDate}</div>
        <Avatar initials="WS" bg="purple" color="white" size={28} />
      </div>
    </li>
  );
};

const Content = () => (
  <div className="ml-64 min-w-96 bg-white min-h-screen overflow-y-auto">
    <div className="px-8 pb-4">
      <div className="flex items-center justify-start h-11 w-full  mt-3 mb-2">
        <h2 className="text-gray-600 font-medium text-lg">Projects</h2>
      </div>
      <div className="w-full bg-white mb-4">
        <div className="py-2 flex items-center justify-between text-sm">
          <div>
            <label for="search" className="sr-only">
              Search
            </label>
            <div class="relative rounded">
              <div class="absolute left-0 pl-2 pt-1.5 flex items-center pointer-events-none">
                <span class="text-gray-500">
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
            Create project
          </button>
        </div>
      </div>
      <div className="h-36 w-full">
        <div className="header relative">
          <div className="flex items-center w-full text-gray-500 text-sm font-normal">
            <div className="flex cursor-pointer py-2 text-blue-600 mr-4 relative" href="/">
              Projects
              <span className="absolute bottom-0 left-0 right-0 bg-blue-500 h-0.5 z-10"></span>
            </div>
          </div>
          <div className="absolute bg-gray-200 w-full h-0.5 bottom-0 left-0 right-0 z-0"></div>
        </div>
        <div className="content p-2 ">
          <ul>
            <Row title="Decide the design color" dueDate="3/8" />
            <Row title="Redesign the kanban page this week" dueDate="3/12" />
            <Row title="Test the cover of the card" dueDate="3/20" />
            <Row title="Decide the design color" dueDate="3/8" />
            <Row title="Redesign the kanban page this week" dueDate="3/12" />
            <Row title="Test the cover of the card" dueDate="3/20" />
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const navHeader = {
    title: 'Home',
    description: 'CxTasks',
    icon: HomeIcon,
  };
  const navList = [
    { name: 'My work', icon: WorkItemIcon },
    { name: 'Projects', icon: FabricFolderIcon, active: true },
    { name: 'Favorite', icon: FavoriteStarIcon },
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
export default Projects;
