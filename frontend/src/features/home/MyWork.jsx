import {
  Avatar,
  WorkItemIcon,
  FabricFolderIcon,
  FavoriteStarIcon,
  SettingsIcon,
  SquareShapeIcon,
  HomeIcon,
} from '@/shared/components/Element';

import { Nav, Sidebar } from '@/shared/components/Custom';

const Card = ({ title, count, color, url }) => {
  return (
    <div className="flex flex-none items-center h-28 w-52 bg-white rounded">
      <div className={`w-5 flex-none h-full rounded-l ${color ? color : 'bg-blue-300'}`}></div>
      <div className="p-2  h-full flex justify-between flex-col">
        <h5 className="block text-gray-500 text-sm font-medium max-h-28 overflow-y-hidden">
          {title}
        </h5>
        <div className="flex justify-between text-gray-500 text-sm mt-1">
          <div className="text-sm">My open issues:</div>
          <div className="text-gray-500 text-xs bg-gray-200 text-sm rounded-full px-1.5 min-w-4 select-none">
            {count}
          </div>
        </div>
        <div>
          <a href={url} className="text-blue-600 hover:underline text-xs font-semibold">
            QUICK LINKS
          </a>
        </div>
      </div>
    </div>
  );
};
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
        <h2 className="text-gray-600 font-medium text-lg">My work</h2>
      </div>
      <div className="min-h-36 w-full bg-gray-100 mb-4 px-4 pb-4">
        <div className="py-2 flex items-center justify-between text-sm">
          <p className="text-gray-500">Recent projects</p>
          <a className="text-blue-600 hover:underline" href="/">
            View all projects
          </a>
        </div>
        <div className="flex items-center justify-start space-x-4 flex-nowrap overflow-x-auto">
          <Card title="Prototoye design for CxTasks" count={1} url="/" color="bg-orange-300" />
          <Card title="Frontend implementation for CxTasks project" count={2} url="/" />
          <Card
            title="Backend implementation for CxTasks project for long text testing for long text testing"
            count={12}
            url="/"
            color="bg-fuchsia-300"
          />
        </div>
      </div>
      <div className="h-36 w-full">
        <div className="header relative">
          <div className="flex items-center w-full text-gray-500 text-sm font-normal">
            <div className="flex cursor-pointer py-2 text-blue-600 mr-4 relative" href="/">
              Worked on
              <span className="absolute bottom-0 left-0 right-0 bg-blue-500 h-0.5 z-10"></span>
            </div>
            <div className="flex cursor-pointer py-2 hover:text-blue-500" href="/">
              <span>Assigned to me</span>
              <div className="text-gray-500 text-xs bg-gray-200 text-sm rounded-full px-1.5 min-w-4 ml-1 select-none">
                3
              </div>
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

const MyWork = () => {
  const navHeader = {
    title: 'Home',
    description: 'CxTasks',
    icon: HomeIcon,
  };
  const navList = [
    { name: 'My work', icon: WorkItemIcon, active: true },
    { name: 'Projects', icon: FabricFolderIcon },
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
export default MyWork;
