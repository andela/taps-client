import { stringify } from 'qs';
import { SIGN_IN, SIGN_UP } from '../types';
import { success, isErrored, isLoading, isAuthenticated } from '../index';

// axios instance
import instance from '../../../config/axios';

// toast
import { successMessage, errorMessage } from '../../../toasts';

export const signIn = data => dispatch => {
  dispatch(isLoading(true));
  const postData = stringify(data);
  return instance
    .post('auth/signin', postData)
    .then(response => {
      if (!response.data.errors) {
        const {
          data: {
            data: { userToken }
          }
        } = response;
        localStorage.setItem('aTeamsToken', userToken);
        successMessage('Login successful');
      }

      dispatch(success(SIGN_IN, response.data));
      dispatch(isLoading(false));
      dispatch(isAuthenticated());
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
    .post('auth/signup', postData)
    .then(response => {
      if (!response.data.errors) {
        const {
          data: {
            data: { userToken }
          }
        } = response;
        localStorage.setItem('aTeamsToken', userToken);
        successMessage('Registration successful');
        dispatch(success(SIGN_UP, response.data));
        return;
      }

      dispatch(isErrored(SIGN_UP, { message: 'login with an andela email' }));
      errorMessage('Login with an andela email');
      dispatch(isLoading(false));
      dispatch(isAuthenticated());
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
