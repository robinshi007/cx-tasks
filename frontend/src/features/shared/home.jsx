import { useLocation } from 'react-router-dom';
import { RouteTabLink } from './project';

export const Tab = ({ navs }) => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="flex items-center w-full text-gray-500 text-sm font-normal">
        {navs.map(({ name, path }) => (
          <RouteTabLink to={path} key={path}>
            {name}
            {pathname === path ? (
              <span className="absolute bottom-0 left-0 right-0 bg-blue-500 h-0.5 z-10"></span>
            ) : (
              ''
            )}
          </RouteTabLink>
        ))}
      </div>
      <div className="absolute bg-gray-200 w-full h-0.5 bottom-0 left-0 right-0 z-0"></div>
    </>
  );
};
