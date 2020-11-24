import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GameList from './pages/GameList';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={GameList} />
      </Switch>
    </BrowserRouter>
  );
}
