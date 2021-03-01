import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

import { Select, FabricFolderIcon, ChevronDownIcon } from '@/shared/components/Element';
import { selectCurrentProject } from '@/features/entity';
import { setCurrentProject } from '@/features/project/projectSlice';
import { selectRecentProjects } from '@/features/home/homeSlice';
import { map } from 'lodash';

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

const SidebarLinks = ({ links }) => {
  return (
    <>
      {links.map((obj, index) => (
        <SidebarLink name={obj.name} Icon={obj.icon} key={index} path={obj.path} />
      ))}
    </>
  );
};
const SidebarHeader = ({ title, description }) => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const project = useSelector(selectCurrentProject);
  const projects = useSelector(selectRecentProjects);
  const isProject = url.startsWith('/projects');
  return (
    <>
      {isProject ? (
        <Select
          variant="empty"
          dropdownWidth={164}
          withClearValue={false}
          withSearch={false}
          name="projects"
          value={project && project.id}
          options={map(projects, (val, key) => ({
            value: key,
            label: val.title,
          }))}
          onChange={(val) => {
            dispatch(setCurrentProject(val));
            const pathname = history.location.pathname;
            const newPaths = pathname.split('/');
            newPaths[2] = val;
            const newPath = newPaths.join('/');
            history.push(newPath);
          }}
          renderValue={({ value: projectId }) => RenderSelectedProjectOption(projects[projectId])}
          renderOption={({ value: projectId }) => RenderProjectOption(projects[projectId])}
        />
      ) : (
        <>
          <FabricFolderIcon size={32} className="ml-2 text-gray-600 flex-none mr-2" />
          <div className="w-28">
            <h4 className="text-gray-600 text-sm font-medium truncate">{title}</h4>
            <p className="text-xs text-gray-500 truncate">{description}</p>
          </div>
        </>
      )}
    </>
  );
};

const RenderSelectedProjectOption = (project) => {
  if (project) {
    return (
      <>
        <FabricFolderIcon size={28} className="text-gray-600 flex-none mr-2 -ml-1" />
        <div className="w-22 h-11" style={{ width: '104px' }}>
          <h4 className="text-gray-600 text-sm font-medium truncate">{project.title}</h4>
          <p className="text-xs text-gray-500 truncate">{project.description}</p>
        </div>
        <ChevronDownIcon size={12} color="gray" className="-mr-2" />
      </>
    );
  }
};
const RenderProjectOption = (project) => {
  if (project) {
    return <div className="truncate">{project.title}</div>;
  }
};

export const Sidebar = ({ header, links }) => (
  <div className="fixed top-0 left-12 w-48 bg-gray-100 h-screen flex">
    <div className="w-4 h-full"></div>
    <div className="flex flex-col pb-6 w-full">
      <div className="flex items-center justify-start h-11 w-full bg-gray-100 mt-3 mb-2">
        <SidebarHeader title={header.title} description={header.description} Icon={header.icon} />
      </div>
      <div className="flex flex-col items-center justify-start bg-gray-100">
        <SidebarLinks links={links} />
      </div>
    </div>
    <div className="w-4 h-full"></div>
  </div>
);
