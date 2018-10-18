
import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const isLoggedIn = () => localStorage.getItem('aTeamsToken') &&
    localStorage.getItem('userId') &&
    localStorage.getItem('role');

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isLoggedIn()) {
        return <Redirect to="/teams" />;
      }
      return <Component {...props} />;
    }}
  />
);


export default AuthRoute;

