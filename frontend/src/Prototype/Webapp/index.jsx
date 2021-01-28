import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

//import { sizes } from '@/shared/utils/styles';
import NavbarLeft from './components/NavbarLeft';
import HomePage from './Home';
import ProjectPage from './Project';

//const paddingLeft = sizes.appNavBarLeftWidth + sizes.secondarySideBarWidth + 40;

export const WebappWrapper = styled.div`
  padding: 24px 42px 42px 42px;
`;
export const MainWrapper = styled.div`
  padding-left: 265px;
`;

const WebappPage = () => {
  // const match = useRouteMatch();
  // const history = useHistory();
  let { path } = useRouteMatch();
  console.log('path', path);

  return (
    <WebappWrapper>
      <NavbarLeft />
      <MainWrapper>
        <Switch>
          <Route path={`${path}/home`}>
            <HomePage />
          </Route>
          <Route path={`${path}/project`}>
            <ProjectPage />
          </Route>
          <Route exact path={`${path}`}>
            <Redirect to={`${path}/home`} />
          </Route>
        </Switch>
      </MainWrapper>
    </WebappWrapper>
  );
};

export default WebappPage;
