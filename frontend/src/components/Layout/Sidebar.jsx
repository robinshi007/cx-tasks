import { NavLink } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

const linkActiveStyles = () => css`
  &.active {
    ${tw`bg-gray-200 text-blue-700`}
  }
`;
export const LinkItem = styled.div(() => [
  tw`flex items-center justify-start rounded text-sm py-2.5 my-0.5 w-full hover:bg-gray-200 focus:bg-gray-300 cursor-pointer text-gray-600`,
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

const SidebarLinks = ({ navList }) => {
  return (
    <>
      {navList.map((obj, index) => (
        <SidebarLink name={obj.name} Icon={obj.icon} key={index} path={obj.path} />
      ))}
    </>
  );
};
const SidebarHeader = ({ title, description, Icon }) => {
  return (
    <>
      <Icon size={32} className="text-gray-600 flex-none mr-2" />
      <div className="w-28">
        <h4 className="text-gray-600 text-sm font-medium truncate">{title}</h4>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
    </>
  );
};

export const Sidebar = ({ navHeader, navList }) => (
  <div className="fixed top-0 left-12 w-48 bg-gray-100 h-screen flex">
    <div className="w-4 h-full"></div>
    <div className="flex flex-col pb-6 w-full">
      <div className="flex items-center justify-start h-11 w-full bg-gray-100 mt-3 mb-2 px-2">
        <SidebarHeader
          title={navHeader.title}
          description={navHeader.description}
          Icon={navHeader.icon}
        />
      </div>
      <div className="flex flex-col items-center justify-start bg-gray-100">
        <SidebarLinks navList={navList} />
      </div>
    </div>
    <div className="w-4 h-full"></div>
  </div>
);
