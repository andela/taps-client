import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInContainer from '../modules/Auth/container';
// components
import Favorite from '../modules/Teams/components/FavoriteTeams';
import Home from '../modules/Home/container';
import Preloader from '../modules/common/Preloader';
import CreateTeam from '../modules/CreateTeam/container';
import Teams from '../modules/Teams/container';
import RequireAuth from './RequireAuth';
import AuthRoute from './AuthRoute';

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
            <Route path="/teams/favorites" exact component={RequireAuth(Favorite)} />
            <Route path="/teams" exact component={Home} />
            <Route path="/teams/create" component={RequireAuth(CreateTeam)} />
            <AuthRoute path="/" exact component={SignInContainer} />
            <Route path="/teams/:id" exact component={RequireAuth(Teams)} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
