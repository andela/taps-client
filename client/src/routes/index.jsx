import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Home from '../Components/Home/container';
import Footer from '../Components/Common/Footer';
import SignIn from '../Components/Auth/Container';

export default class Routes extends Component {
  componentDidMount() {
    M.AutoInit();
    const elem = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(elem, {
      constrainWidth: false,
      coverTrigger: false,
      inDuration: 400
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/teams" exact component={Home} />
            <Route path="/" component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
