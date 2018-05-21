import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import Home from '../modules/Home/container';
import Preloader from '../modules/common/Preloader';
import SignIn from '../modules/Auth/container';
import CreateTeam from '../modules/CreateTeam/container';
import Teams from '../modules/Teams/container';

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
        <React.Fragment>
          <Preloader />
          <ToastContainer />
          <Switch>
            <Route path="/teams" exact component={Home} />
            <Route path="/" exact component={SignIn} />
            <Route path="/teams/create" component={CreateTeam} />
            <Route path="/teams/:id" exact component={Teams} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
