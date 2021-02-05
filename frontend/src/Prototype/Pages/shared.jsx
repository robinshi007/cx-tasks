import logoImage from '@/assets/logo.png';
import {
  Avatar,
  SearchIcon,
  AddIcon,
  FabricFolderIcon,
  RingerIcon,
  HelpIcon,
} from '@/shared/components/Element';

export const Nav = () => (
  <nav className="bg-blue-700 w-12 fixed top-0 left-0 h-screen flex flex-col items-center justify-center h-full">
    <div className="my-3 cursor-pointer">
      <a
        className="flex items-center justify-center w-full hover:bg-blue-600 cursor-pointer"
        href="/"
      >
        <img src={logoImage} alt="logo" />
      </a>
    </div>
    <div className="flex flex-col items-center justify-between h-full">
      <div className="w-12 flex-grow-0 text-white">
        <a
          className="flex items-center justify-center w-full hover:bg-blue-600 cursor-pointer py-3"
          href="/"
        >
          <FabricFolderIcon size={24} />
        </a>
        <a
          className="flex items-center justify-center w-full hover:bg-blue-600 cursor-pointer py-3"
          href="/"
        >
          <SearchIcon size={24} />
        </a>
        <a
          className="flex items-center justify-center w-full hover:bg-blue-600 cursor-pointer py-3"
          href="/"
        >
          <AddIcon size={24} />
        </a>
      </div>
      <div className="w-12 flex flex-col items-center justify-center flex-grow-0 text-white">
        <a
          className="flex items-center justify-center w-full hover:bg-blue-600 cursor-pointer py-3"
          href="/"
        >
          <RingerIcon size={24} />
        </a>
        <a
          className="flex items-center justify-center w-full hover:bg-blue-600 cursor-pointer py-3"
          href="/"
        >
          <HelpIcon size={24} />
        </a>
        <a
          className="flex items-center justify-center w-full hover:bg-blue-600 cursor-pointer py-2"
          href="/"
        >
          <Avatar initials="WS" bg="purple" color="white" size={32} />
        </a>
      </div>
    </div>
  </nav>
);

const SidebarLink = ({ title, Icon, active }) => {
  return (
    <a
      className={`flex items-center justify-start rounded text-sm py-2.5 px-4 my-0.5 w-full hover:bg-gray-200 focus:bg-gray-300 cursor-pointer ${
        active ? 'bg-gray-200 text-blue-600' : 'text-gray-600'
      }`}
      href="/"
    >
      {Icon ? <Icon className="mr-4 ml-3.5" size={20} /> : ''}
      {title}
    </a>
  );
};

// <>
//   {obj.name === 'Settings' ? (
//     <div className="w-full bg-gray-300 border-solid h-px"></div>
//   ) : (
//     ''
//   )}
const SidebarLinks = ({ navList }) => {
  return (
    <>
      {navList.map((obj, index) => (
        <SidebarLink title={obj.name} Icon={obj.icon} active={obj.active} key={index} />
      ))}
    </>
  );
};
const SidebarHeader = ({ title, description, Icon }) => {
  return (
    <>
      <Icon size={32} className="text-gray-600 mr-2 flex-none" />
      <div className="">
        <h4 className="text-gray-600 text-sm font-medium truncate w-28">{title}</h4>
        <p className="text-xs text-gray-500 truncate w-28">{description}</p>
      </div>
    </>
  );
};

export const Sidebar = ({ navHeader, navList }) => (
  <div className="fixed top-0 left-12 w-52 bg-gray-100 h-screen flex flex-col">
    <div className="px-4 pb-6">
      <div className="flex items-center justify-start h-11 w-full bg-gray-100 mt-3 mb-2 px-6">
        <SidebarHeader
          title={navHeader.title}
          description={navHeader.description}
          Icon={navHeader.icon}
        />
      </div>
      <div className="flex flex-col items-center justify-start h-72 w-full bg-gray-100">
        <SidebarLinks navList={navList} />
      </div>
    </div>
  </div>
);
//<div className="w-full bg-gray-300 border-solid h-px"></div>
