import {
  SettingsIcon,
  TaskboardIcon,
  BacklogListIcon,
  FabricFolderIcon,
} from '@/shared/components/Element';

import { Nav, Sidebar } from '../shared';

const Content = () => (
  <div className="ml-64 min-w-96 bg-white min-h-screen overflow-y-auto">
    <div className="px-8 pb-4">
      <div className="flex items-center justify-start h-11 w-full  mt-3 mb-2">
        <h2 className="text-gray-600 font-medium text-lg">New Project</h2>
      </div>
      <div className="w-full bg-gray-100 mb-4 h-9"></div>
      <div className="h-36 w-full"></div>
    </div>
  </div>
);

const ProjectNew = () => {
  const navHeader = {
    title: 'Demo Project',
    description: 'Project for demo use',
    icon: FabricFolderIcon,
  };
  const navList = [
    //{ name: 'Roadmap', icon: TimelineProgressIcon },
    { name: 'Backlog', icon: BacklogListIcon },
    { name: 'Board', icon: TaskboardIcon },
    //{ name: 'Chart', icon: ChartIcon },
    { name: 'Settings', icon: SettingsIcon, active: true },
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
export default ProjectNew;
