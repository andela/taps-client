import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import Home from '../components/Home/container';
import Preloader from '../components/common/Preloader';
import SignIn from '../components/Auth/container';

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
          <Preloader />
          <ToastContainer />
          <Switch>
            <Route path="/teams" exact component={Home} />
            <Route path="/" component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
