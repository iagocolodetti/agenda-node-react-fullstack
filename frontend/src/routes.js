import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import NewUser from './pages/newUser';
import Main from './pages/main';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/new" component={NewUser} />
        <Route path="/contacts" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}
