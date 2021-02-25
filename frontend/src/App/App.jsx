import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//import theme from '@/shared/theme';

import '@/assets/styles/tailwind.css';

//import CssBaseline from '@/shared/components/CssBaseline';
import PrototypePage from '@/prototype';
import LoginPage from '@/features/auth/Login';
import HomePage from '@/features/home';
import ProjectPage from '@/features/project';
import PageError from '@/components/PageError';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route
          path="/projects/:projectId"
          render={(routeProps) => <ProjectPage id={routeProps.match.params.projectId} />}
        />
        <Route path="/prototype" component={PrototypePage} />
        <Redirect exact from="/" to="/login" />
        <Route component={PageError} />
      </Switch>
    </Router>
  );
}

export default App;
