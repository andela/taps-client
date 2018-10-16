import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
import ErrorPage from '../modules/common/404';
import AdminRequests from '../modules/Admin/components/AdminRequest';

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
            <Route path="/requests/admin" exact component={RequireAuth(AdminRequests)} />
            <Route path="/404" exact component={ErrorPage} />
            <Redirect from="*" to="/404" />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
