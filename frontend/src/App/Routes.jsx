import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Project from '@/Project';
import PrototypePage from '@/Prototype';
import PageError from '@/shared/components/PageError';

const Routes = () => (
  <Router history={createBrowserHistory()}>
    <Switch>
      <Redirect exact from="/" to="/prototype" />
      <Route path="/prototype" component={PrototypePage} />
      <Route path="/project" component={Project} />
      <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
