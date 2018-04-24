import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
const Home = () => <h1>Home page</h1>;

const LandingPage = () => <h1>Landing Page</h1>;

const NotFound = () => <h1>Not found</h1>;

const Routes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
