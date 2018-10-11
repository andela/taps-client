import jwtDecode from 'jwt-decode';
import { IS_LOGGED_IN, IS_LOADING } from './types';

export const isErrored = (type, payload) => ({
  type,
  payload
});

export const toggleLoader = (type, payload) => ({
  type,
  payload
});

export const success = (type, payload) => ({
  type,
  payload
});

export const authenticated = (name) => ({
  type: IS_LOGGED_IN,
  payload: true,
  name
});

export const notAuthenticated = () => ({
  type: IS_LOGGED_IN,
  payload: false
});
export const isAuthenticated = () => dispatch => {
  const jwtToken = window.localStorage.getItem('aTeamsToken');
  if (!jwtToken || !jwtToken.length > 9) {
    dispatch(notAuthenticated());
  } else {
    // check if token has expired
    const decoded = jwtDecode(jwtToken);
    const { email } = decoded;
    const name = email.split('.');
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('aTeamsToken');
      dispatch(notAuthenticated());
    }
    dispatch(authenticated(name[0].toUpperCase()));
  }
};

export const isLoading = payload => dispatch => {
  if (payload === true) {
    dispatch(isAuthenticated());
    dispatch(toggleLoader(IS_LOADING, payload));
    return;
  }
  dispatch(toggleLoader(IS_LOADING, payload));
};

export const apiResponse = (type, payload) => ({
  type,
  payload
});
