import { NavLink } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

const linkActiveStyles = () => css`
  &.active {
    ${tw`bg-gray-200 text-blue-600`}
  }
`;
export const LinkItem = styled.div(() => [
  tw`flex items-center justify-start rounded text-sm py-2.5 px-4 my-0.5 w-full hover:bg-gray-200 focus:bg-gray-300 cursor-pointer text-gray-600`,
  linkActiveStyles,
]);

const SidebarLink = ({ name, Icon, path }) => {
  //console.log(name, path);
  return (
    <LinkItem as={NavLink} to={path}>
      {Icon ? <Icon className="mr-4 ml-3.5" size={20} /> : ''}
      {name}
    </LinkItem>
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
        <SidebarLink name={obj.name} Icon={obj.icon} key={index} path={obj.path} />
      ))}
    </>
  );
};
const SidebarHeader = ({ name, description, Icon }) => {
  return (
    <>
      <Icon size={32} className="text-gray-600 mr-2" />
      <div className="">
        <h4 className="text-gray-600 text-sm font-medium truncate w-28">{name}</h4>
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
          name={navHeader.name}
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
