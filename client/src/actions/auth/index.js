import { stringify } from 'qs';
import { SIGN_IN, SIGN_UP } from '../types';
import { success, isErrored, isLoading, isAuthenticated } from '../index';

// axios instance
import instance from '../../config/axios';

// toast
import { successMessage } from '../../toasts';

export const signIn = data => dispatch => {
  dispatch(isLoading(true));
  const postData = stringify(data);
  return instance
    .post('http://andela-teams-core.herokuapp.com/v1/auth/signin', postData)
    .then(response => {
      const {
        data: {
          data: { userToken }
        }
      } = response;
      dispatch(success(SIGN_IN, response.data));
      localStorage.setItem('aTeamsToken', userToken);
      dispatch(isLoading(false));
      dispatch(isAuthenticated());
      successMessage('Login successful');
    })
    .catch(error => {
      dispatch(isErrored(SIGN_IN, error));
      dispatch(isLoading(false));
    });
};

export const signUp = data => dispatch => {
  dispatch(isLoading(true));
  const postData = stringify(data);
  return instance
    .post('http://andela-teams-core.herokuapp.com/v1/auth/signup', postData)
    .then(response => {
      const {
        data: {
          data: { userToken }
        }
      } = response;
      dispatch(success(SIGN_UP, response.data));
      localStorage.setItem('aTeamsToken', userToken);
      dispatch(isLoading(false));
      dispatch(isAuthenticated());
      successMessage('Registration successful');
    })
    .catch(error => {
      dispatch(isErrored(SIGN_UP, error));
      dispatch(isLoading(false));
    });
};

export const signOut = data => dispatch => {
  dispatch(isLoading(true));
  localStorage.removeItem('aTeamsToken');
  dispatch(isLoading(false));
  dispatch(isAuthenticated());
  successMessage('Signed out successfully');
};
