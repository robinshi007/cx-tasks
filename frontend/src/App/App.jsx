import React from 'react';
import { useSelector } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

//import theme from '@/shared/theme';

import '@/assets/styles/tailwind.css';

import PrototypePage from '@/prototype';
import { PageProduct, Page404, PageTodo } from '@/features/page';
import LoginPage from '@/features/auth/Login';
import HomePage from '@/features/home';
import ProjectPage from '@/features/project';

const RouteUnAuthed = ({ component: Component, path, ...rest }) => {
  const isAuthed = useSelector((state) => state.auth.isAuthed);
  if (isAuthed) {
    return <Redirect to="/home" />;
  } else {
    return <Route path={path} component={Component} {...rest} />;
  }
};

const RouteAuthed = ({ component: Component, path, ...rest }) => {
  const isAuthed = useSelector((state) => state.auth.isAuthed);
  if (!isAuthed) {
    return <Redirect to={{ pathname: '/login', state: { from: rest.location } }} />;
  } else {
    return <Route path={path} component={Component} {...rest} />;
  }
};

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" component={PageProduct} />
        <RouteUnAuthed path="/login" component={LoginPage} />
        <RouteAuthed path="/home" component={HomePage} />
        <RouteAuthed
          path="/projects/:projectId"
          render={(routeProps) => <ProjectPage id={routeProps.match.params.projectId} />}
        />
        <Route path="/prototype" component={PrototypePage} />
        <Route exact path="/todo_search" component={PageTodo} />
        <Route exact path="/todo_add" component={PageTodo} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;
