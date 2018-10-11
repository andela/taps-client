import instance from '../../../config/axios';
import { CREATE_ADMIN_REQUEST_SUCCESS, CREATE_ADMIN_REQUEST_ERROR } from '../types';
import { success, isErrored } from '../index';

const createAdminRequest = requestData => dispatch => instance
  .post('/requests', requestData)
  .then((response) => {
    if (response.data.errors) {
      return dispatch(isErrored(CREATE_ADMIN_REQUEST_ERROR, response.data.errors[0]));
    }
    return dispatch(success(CREATE_ADMIN_REQUEST_SUCCESS, response.data));
  })
  .catch((error) => dispatch(isErrored(CREATE_ADMIN_REQUEST_ERROR, error)));

export default createAdminRequest;
