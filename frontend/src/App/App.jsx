import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//import theme from '@/shared/theme';

import '@/assets/styles/tailwind.css';

//import CssBaseline from '@/shared/components/CssBaseline';
import PrototypePage from '@/prototype';
import LoginPage from '@/features/auth/Login';
import ProjectPage from '@/features/project';
import PageError from '@/components/PageError';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/project" component={ProjectPage} />
        <Route path="/prototype" component={PrototypePage} />
        <Redirect exact from="/" to="/login" />
        <Route component={PageError} />
      </Switch>
    </Router>
  );
}

export default App;