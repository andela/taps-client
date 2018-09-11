// import { stringify } from 'qs';
import { FETCH_MEMBERS, ADD_MEMBER } from '../types';
import { success, isErrored, isLoading } from '../index';
import instance from '../../../config/axios';
import { successMessage, errorMessage } from '../../../toasts';

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

export const addMember = (teamId, userId) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .post(`teams/${teamId}/members/${userId}`, null)
    .then(response => {
      if (response.data.errors) {
        errorMessage(response.data.errors[0]);
        dispatch(isLoading(false));
        return;
      }
      // dispatch(success(ADD_MEMBER, response.data));
      successMessage('user successfully added to this team');
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(isErrored(ADD_MEMBER, error.response.data));
      dispatch(isLoading(false));
    });
};
