import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';

import { Avatar, SearchIcon, HomeIcon, FabricFolderIcon } from '@/shared/components/Element';
import { selectCurrentProjectId } from '@/features/entity';
import logoImage from '@/assets/logo.png';

const MyNavLink = styled(NavLink)`
  ${tw`flex items-center justify-center w-full hover:bg-blue-600 cursor-pointer py-3`}
  &.active {
    ${tw`bg-blue-700 hover:bg-blue-600`}
  }
`;
// const MyNavButton = styled.button(() => [
//   tw`flex items-center justify-center w-full hover:bg-blue-600 cursor-pointer py-3 focus:outline-none`,
//   css`
//     &.active {
//       ${tw`bg-blue-700 hover:bg-blue-600`}
//     }
//   `,
// ]);

export const Nav = () => {
  const currentProject = useSelector(selectCurrentProjectId);
  return (
    <>
      <nav className="bg-blue-700 w-12 fixed top-0 left-0 h-screen flex flex-col items-center justify-center h-full">
        <MyNavLink className="pt-3.5 pb-3" to="/">
          <img src={logoImage} alt="logo" />
        </MyNavLink>
        <div className="flex flex-col items-center justify-between h-full">
          <div className="w-12 flex-grow-0 text-white">
            <MyNavLink to={`/home`}>
              <HomeIcon size={24} />
            </MyNavLink>
            <MyNavLink to="/todo_search">
              <SearchIcon size={24} />
            </MyNavLink>
            {/* }<MyNavLink to="/todo_add">
            <AddIcon size={24} />
          </MyNavLink> */}
            {currentProject ? (
              <MyNavLink to={`/projects/${currentProject}`}>
                <FabricFolderIcon size={24} />
              </MyNavLink>
            ) : (
              ''
            )}
          </div>
          <div className="w-12 flex flex-col items-center justify-center flex-grow-0 text-white">
            {/* <MyNavLink to="/projects/1/backlog/sections/133">
            <RingerIcon size={24} />
          </MyNavLink> */}
            {/*<MyNavLink to="/projects/1/board/tasks/323">
            <HelpIcon size={24} />
          </MyNavLink> */}
            <MyNavLink to="/profile">
              <Avatar initials="WS" bg="purple" color="white" size={32} />
            </MyNavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

//<div className="w-full bg-gray-300 border-solid h-px"></div>
