import React from 'react';
import { NavLink, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Draggable from './Draggable';

import LoginPage from './Login';
import WebappPage from './Webapp';
import HomePage from './Webapp/Home';
import ProjectPage from './Webapp/Project';
import { Box } from '@/shared/components/Layout';
import { Link } from '@/shared/components/Element';

const routeData = [
  { name: 'login', path: 'login', component: LoginPage },
  { name: 'home', path: 'webapp/home', component: HomePage },
  { name: 'project', path: 'webapp/project', component: ProjectPage },
];

const PrototypePage = () => {
  let { path, url } = useRouteMatch();
  return (
    <>
      <div>
        <Draggable>
          {routeData.map((item) => (
            <Box display="block" key={item.path}>
              <Link
                as={NavLink}
                exact={true}
                to={`${url}/${item.path}`}
                px={1}
                fontSize="14px"
                ml={3}
              >
                {item.name} page
              </Link>
            </Box>
          ))}
        </Draggable>
      </div>
      <Switch>
        <Route path={`${path}/login`}>
          <LoginPage />
        </Route>
        <Route path={`${path}/webapp`}>
          <WebappPage />
        </Route>
        <Route exact path={`${path}`}>
          <Redirect to={`${path}/login`} />
        </Route>
      </Switch>
    </>
  );
};

// const findPageComponent = (pageName) => {
//   const len = routeData.length;
//   for (let i = 0; i < len; i++) {
//     let item = routeData[i];
//     if (item && item.name && item.name === pageName) {
//       if (item.component) {
//         return <item.component />;
//       }
//     }
//   }
//   return <></>;
// };
// const Page = () => {
//   let { pageName } = useParams();
//   return findPageComponent(pageName);
// };

export default PrototypePage;
