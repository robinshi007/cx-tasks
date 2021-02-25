import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';

import {
  Avatar,
  SearchIcon,
  HomeIcon,
  AddIcon,
  FabricFolderIcon,
  RingerIcon,
  HelpIcon,
} from '@/shared/components/Element';
import { selectCurrrentProjectId } from '@/features/entity';
import logoImage from '@/assets/logo.png';

const NavLink = styled(Link)`
  ${tw`flex items-center justify-center w-full hover:bg-blue-600 cursor-pointer py-3`}
`;

export const Nav = () => {
  const currentProject = useSelector(selectCurrrentProjectId);
  return (
    <nav className="bg-blue-700 w-12 fixed top-0 left-0 h-screen flex flex-col items-center justify-center h-full">
      <NavLink className="pt-3.5 pb-3" to="/">
        <img src={logoImage} alt="logo" />
      </NavLink>
      <div className="flex flex-col items-center justify-between h-full">
        <div className="w-12 flex-grow-0 text-white">
          <NavLink to={`/home`}>
            <HomeIcon size={24} />
          </NavLink>
          <NavLink to="/todo">
            <SearchIcon size={24} />
          </NavLink>
          <NavLink to="/todo">
            <AddIcon size={24} />
          </NavLink>
          {currentProject ? (
            <NavLink to={`/projects/${currentProject}`}>
              <FabricFolderIcon size={24} />
            </NavLink>
          ) : (
            ''
          )}
        </div>
        <div className="w-12 flex flex-col items-center justify-center flex-grow-0 text-white">
          <NavLink to="/projects/1/backlog/sections/133">
            <RingerIcon size={24} />
          </NavLink>
          <NavLink to="/projects/1/board/tasks/323">
            <HelpIcon size={24} />
          </NavLink>
          <NavLink to="/projects/404">
            <Avatar initials="WS" bg="purple" color="white" size={32} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

//<div className="w-full bg-gray-300 border-solid h-px"></div>
