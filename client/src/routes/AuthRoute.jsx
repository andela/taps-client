
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SignInContainer from '../modules/Auth/container';

const isLoggedIn = () => localStorage.getItem('aTeamsToken') &&
    localStorage.getItem('userId') &&
    localStorage.getItem('role');

const AuthRoute = (props) => (
  <Route
    {...props}
    render={(renderProps) => (isLoggedIn() ?
      <Redirect to="/teams" /> :
      <SignInContainer {...renderProps} />)}
  />
);


export default AuthRoute;

