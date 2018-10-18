import instance from '../../../config/axios';
import api from '../../../utils/api';
import {
  CREATE_ADMIN_REQUEST_SUCCESS,
  CREATE_ADMIN_REQUEST_ERROR,
  CHECK_USER_REQUEST
} from '../types';
import { success, isErrored } from '../index';
import { errorMessage } from '../../../toasts';

export const createAdminRequest = requestData => dispatch => instance
  .post('/requests', requestData)
  .then((response) => {
    if (response.data.errors) {
      return dispatch(isErrored(CREATE_ADMIN_REQUEST_ERROR, response.data.errors[0]));
    }
    return dispatch(success(CREATE_ADMIN_REQUEST_SUCCESS, response.data));
  })
  .catch((error) => dispatch(isErrored(CREATE_ADMIN_REQUEST_ERROR, error)));

export const checkUserRequest = (userId, requestType) => async dispatch => {
  try {
    const response = await instance.get(`/requests?userId=${userId}&type=${requestType}`);
    if (response.data.requests) {
      return dispatch(success(CHECK_USER_REQUEST, response.data.requests));
    }
  } catch (error) {
    errorMessage(error);
  }
};
