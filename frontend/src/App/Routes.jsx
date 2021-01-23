import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//import Project from '@/Project';
import PrototypePage from '@/Prototype';
import PageError from '@/shared/components/PageError';

const Routes = () => (
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route path="/prototype" component={PrototypePage} />
      <Route component={PageError} />
      <Redirect exact from="/" to="/prototype" />
    </Switch>
  </Router>
);

export default Routes;
