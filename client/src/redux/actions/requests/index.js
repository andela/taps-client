import instance from '../../../config/axios';
import {
  CREATE_ADMIN_REQUEST_SUCCESS,
  CREATE_ADMIN_REQUEST_ERROR,
  CHECK_USER_REQUEST, FETCH_REQUESTS
} from '../types';
import { errorMessage } from '../../../toasts';
import { success, isErrored, isLoading } from '../index';

export const makeRequest = requestData => dispatch => instance
  .post('/requests', requestData)
  .then((response) => {
    if (response.data.errors) {
      return dispatch(isErrored(
        CREATE_ADMIN_REQUEST_ERROR,
        response.data.errors[0]
      ));
    }
    return dispatch(success(CREATE_ADMIN_REQUEST_SUCCESS, response.data));
  })
  .catch((error) => dispatch(isErrored(CREATE_ADMIN_REQUEST_ERROR, error)));

export const checkUserRequest = (userId, requestType) => async dispatch => {
  try {
    const response = await instance.get(`/requests?userId=${userId}&type=${requestType}`);
    if (response.data) {
      return dispatch(success(CHECK_USER_REQUEST, response.data.data.requests));
    }
  } catch (error) {
    errorMessage(error);
  }
};

export const loadRequests = (requestType = '', limit = '', offset = 0) => dispatch => {
  dispatch(isLoading(true));
  return instance.get(`/requests?type=${requestType}&@limit=${limit}&@offset=${offset}`)
    .then(response => response.data)
    .then(data => {
      if (data.errorrs) {
        return dispatch(isErrored(
          `${FETCH_REQUESTS}_ERROR`,
          data.errors[0]
        ));
      }
      console.log(data, 'the data response');
      const payload = {
        requests: data.data.requests,
        meta: data.meta
      };

      return dispatch(success(`${FETCH_REQUESTS}_SUCCESS`, payload));
    }).catch(errors => {
      dispatch(isErrored(`${FETCH_REQUESTS}_ERROR`, errors.response));
      dispatch(isLoading(false));
    });
};

