import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import PokeInfo from '../pages/PokeInfo';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/info" component={PokeInfo} />
  </Switch>
);

export default Routes;
