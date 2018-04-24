import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Home from '../Components/Home/container';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
