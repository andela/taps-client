// import { stringify } from 'qs';
import { FETCH_MEMBERS } from '../types';
import { success, isErrored, isLoading } from '../index';
import instance from '../../../config/axios';
// import { successMessage, errorMessage } from '../../toasts';

//eslint-disable-next-line
export const fetchMembers = id => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`teams/${id}/members`)
    .then(response => {
      dispatch(success(FETCH_MEMBERS, response.data));
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(isErrored(FETCH_MEMBERS, error.response.data));
      dispatch(isLoading(false));
    });
};
