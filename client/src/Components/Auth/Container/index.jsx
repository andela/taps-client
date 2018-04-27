import React, { Component } from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable */
export default class SignIn extends Component {
  render() {
    return (
      <div className="sign-in-wrapper">
        <div className="row center white-text">
          <h5 className="header">Welcome to Andela teams</h5>
          <p>Sign in with your Andela email address to continue</p>
        </div>
        <div className="row">
          <Link
            to={'/teams'}
            className="btn waves-effect waves-yellow white-btn"
          >
            <img
              src="/resources/images/google.svg"
              alt="google logo"
              className="logo"
            />
            <p>Sign in with Google </p>
          </Link>
        </div>
      </div>
    );
  }
}
