import { Route } from 'react-router-dom';

import { Nav } from './Nav';
import { Sidebar } from './Sidebar';

export const MainFrame = ({ hasSideNav, sideNav, children }) => {
  return (
    <>
      <Nav />
      {hasSideNav ? <Sidebar header={sideNav.header} links={sideNav.links} /> : ''}
      <div
        className={`${
          hasSideNav ? 'ml-60' : 'ml-12'
        } min-w-96 bg-white min-h-screen overflow-y-auto`}
      >
        {children}
      </div>
    </>
  );
};

export const WithMainFrameRoutes = ({ component: Component, hasSideNav, sideNav, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <MainFrame hasSideNav={hasSideNav} sideNav={sideNav}>
          <Component {...routeProps} />
        </MainFrame>
      )}
    />
  );
};
