import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

//config
import config from '../../../config';

const GoogleButton = ({ handleFailure, handleSuccess }) => (
  <GoogleLogin
    clientId={config.clientId}
    onSuccess={handleSuccess}
    onFailure={handleFailure}
    className="btn waves-effect waves-yellow white-btn"
  >
    <img
      src="/resources/images/google.svg"
      alt="google logo"
      className="logo"
    />
    <span className="btn-divider" />
    <span> Login with Google</span>
  </GoogleLogin>
);

GoogleButton.propTypes = {
  handleFailure: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired
};

export default GoogleButton;
