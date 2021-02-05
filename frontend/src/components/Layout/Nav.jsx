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

//<div className="w-full bg-gray-300 border-solid h-px"></div>
