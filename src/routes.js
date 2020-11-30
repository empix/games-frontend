import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GameList from './pages/GameList';
import AddGame from './pages/AddGame';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={GameList} />
        <Route path="/add" component={AddGame} />
      </Switch>
    </BrowserRouter>
  );
}
