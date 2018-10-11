import { stringify } from 'qs';
import { SEARCH_USERS } from '../types';
import { success, isErrored, isLoading } from '../index';
import instance from '../../../config/axios';
// import { successMessage, errorMessage } from '../../toasts';

//eslint-disable-next-line
export const searchUser = query => dispatch => {
  const searchQuery = { search: query };
  let stringifyQuery = stringify(searchQuery);
  dispatch(isLoading(true));
  return instance
    .get(`users?@${stringifyQuery}`)
    .then(response => {
      dispatch(success(SEARCH_USERS, response.data));
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(isErrored(SEARCH_USERS, error.response));
      dispatch(isLoading(false));
    });
};

export const clearUser = () => dispatch =>
  dispatch(success(SEARCH_USERS, {
    data: { users: [] }

  }));
