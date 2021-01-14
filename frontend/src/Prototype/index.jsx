import React from 'react';
import { List } from 'antd';
import { Link, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

import Login from './Login';
import Backlog from './Backlog';
import Draggable from './Draggable';

const routeData = [
  { name: 'login', component: Login },
  { name: 'backlog', component: Backlog },
];

const PrototypePage = () => {
  let { path, url } = useRouteMatch();
  return (
    <>
      <div>
        <Draggable>
          <List
            size="small"
            dataSource={routeData}
            renderItem={(item) => (
              <List.Item>
                <Link to={`${url}/${item.name}`}>{item.name} page</Link>
              </List.Item>
            )}
          />
        </Draggable>
      </div>
      <Switch>
        <Route path={`${path}/:pageName`}>
          <Page />
        </Route>
      </Switch>
    </>
  );
};

const findPageComponent = (pageName) => {
  const len = routeData.length;
  for (let i = 0; i < len; i++) {
    let item = routeData[i];
    if (item && item.name && item.name === pageName) {
      if (item.component) {
        return <item.component />;
      }
    }
  }
  return <></>;
};
const Page = () => {
  let { pageName } = useParams();
  return findPageComponent(pageName);
};

export default PrototypePage;
