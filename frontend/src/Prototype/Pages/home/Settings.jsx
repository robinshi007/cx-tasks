import {
  WorkItemIcon,
  FabricFolderIcon,
  FavoriteStarIcon,
  SettingsIcon,
  HomeIcon,
} from '@/shared/components/Element';

import { Nav, Sidebar } from '../shared';

const Content = () => (
  <div className="ml-64 min-w-96 bg-white min-h-screen overflow-y-auto">
    <div className="px-8 pb-4">
      <div className="flex items-center justify-start h-11 w-full  mt-3 mb-2">
        <h2 className="text-gray-600 font-medium text-lg">Settings</h2>
      </div>
      <div className="w-full bg-gray-100 mb-4 h-9"></div>
      <div className="h-36 w-full"></div>
    </div>
  </div>
);

const Setting = () => {
  const navHeader = {
    title: 'Home',
    description: 'CxTasks',
    icon: HomeIcon,
  };
  const navList = [
    { name: 'My work', icon: WorkItemIcon },
    { name: 'Projects', icon: FabricFolderIcon },
    { name: 'Favorite', icon: FavoriteStarIcon },
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

export default Setting;
