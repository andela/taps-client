import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import requestsReducer from '../../../redux/reducers/requestsReducer';
import {
  CREATE_ADMIN_REQUEST_SUCCESS,
  CREATE_ADMIN_REQUEST_ERROR,
  CHECK_USER_REQUEST,
  CLEAR_REQUEST_STATE
} from '../../../../src/redux/actions/types';
import { success, isErrored } from '../../../redux/actions';
import { requestsResponse, checkUserRequestResponse } from '../../__mocks__/__mockData__/requestsMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const initialState = {
  request: null,
  success: false,
  error: '',
  hasRequest: null
};

const errorResponse = {
  data: {
    errors: ['The type field is required.']
  }
};

describe('Test requestsReducer', () => {
  it(`should update state with request data when admin request is successful`, () => {
    const action = success(CREATE_ADMIN_REQUEST_SUCCESS, requestsResponse);
    const newState = requestsReducer(initialState, action);
    expect(newState.success).toEqual(true);
    expect(newState.request.data.request).toEqual(requestsResponse.data.request);
  });

  it(`should update state with error when admin request is not successful`, () => {
    const action = isErrored(CREATE_ADMIN_REQUEST_ERROR, errorResponse);
    const newState = requestsReducer(initialState, action);
    expect(newState.success).toEqual(false);
    expect(newState.error).toEqual(errorResponse);
  });

  it(`should update state with hasCheck to be true if response has value`, () => {
    const action = success(CHECK_USER_REQUEST, checkUserRequestResponse.requests);
    const newState = requestsReducer(initialState, action);
    expect(newState.hasRequest).toEqual(true);
  });

  it(`should clear request state`, () => {
    const action = success(CLEAR_REQUEST_STATE);
    const newState = requestsReducer(initialState, action);
    expect(newState.request).toEqual(null);
    expect(newState.success).toEqual(false);
  });
});
