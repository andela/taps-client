import requestsReducer from '../../../redux/reducers/requestsReducer';
import {
  CREATE_ADMIN_REQUEST_SUCCESS, CREATE_ADMIN_REQUEST_ERROR,
  CHECK_USER_REQUEST, CLEAR_REQUEST_STATE, FETCH_REQUESTS
} from '../../../../src/redux/actions/types';
import { success, isErrored } from '../../../redux/actions';
import { requestsResponse, checkUserRequestResponse } from '../../__mocks__/__mockData__/requestsMock';


const initialState = {
  request: null,
  success: false,
  error: '',
  hasRequest: null,
  loadedRequests: {
    requests: [],
    pagination: {}
  }
};

const errorResponse = {
  data: {
    errors: ['The type field is required.']
  }
};

describe('Test requestsReducer', () => {
  describe('when unknown data is passed', () => {
    it('should return initial state when the state is not defined and action unknown', () => {
      const newState = requestsReducer(undefined, {});
      expect(newState)
        .toEqual(initialState);
    });

    it('should return state passed when state is defined and action unknown', () => {
      const mockState = {
        unknown: 'true',
        names: ['invalid']
      };
      const newState = requestsReducer(mockState, {});
      expect(newState)
        .toBe(mockState);
    });
  });
  describe('CREATE_ADMIN_REQUEST', () => {
    it(`should update state with request data when admin request is successful`, () => {
      const action = success(CREATE_ADMIN_REQUEST_SUCCESS, requestsResponse);
      const newState = requestsReducer(initialState, action);
      expect(newState.success).toEqual(true);
      expect(newState.request.data.request).toEqual(requestsResponse.data.request);
    });
    it(`should update state with request data when admin request is successful`, () => {
      const action = success(CREATE_ADMIN_REQUEST_SUCCESS, requestsResponse);
      const newState = requestsReducer(initialState, action);
      expect(newState.success).toEqual(true);
      expect(newState.request.data.request)
        .toEqual(requestsResponse.data.request);
    });

    it(`should update state with error when admin request is not successful`, () => {
      const action = isErrored(CREATE_ADMIN_REQUEST_ERROR, errorResponse);
      const newState = requestsReducer(initialState, action);
      expect(newState.success).toEqual(false);
      expect(newState.error).toEqual(errorResponse);
    });
  });


  describe('CLEAR_REQUEST_STATE', () => {
    it(`should return the correct state when CLEAR_REQUEST_STATE properly`, () => {
      const mockAction = {
        type: CLEAR_REQUEST_STATE
      };
      const newState = requestsReducer({}, mockAction);
      expect(newState.error)
        .toBe('');
      expect(newState.request)
        .toBe(null);
      expect(newState.success)
        .toBe(false);
    });
  });
  describe('FETCH_REQUESTS', () => {
    it(`should return the correct state when FETCH_REQUEST_SUCCESS properly`, () => {
      const mockRequest = 'mock-requests';
      const mockPagination = 'mock-meta';
      const mockAction = {
        type: `${FETCH_REQUESTS}_SUCCESS`,
        payload: {
          requests: mockRequest,
          meta: { pagination: mockPagination }
        }
      };
      const newState = requestsReducer({}, mockAction);
      expect(newState.loadedRequests.requests)
        .toBe(mockRequest);
      expect(newState.loadedRequests.pagination)
        .toBe(mockPagination);
    });


    it(`should return the correct state when FETCH_REQUEST_ERROR properly`, () => {
      const errors = {
        status: 400,
        message: 'invalid-route'
      };
      const mockAction = {
        type: `${FETCH_REQUESTS}_ERROR`,
        payload: errors
      };
      const newState = requestsReducer({}, mockAction);
      expect(newState.success)
        .toBe(false);
      expect(newState.error)
        .toBe(errors);
    });
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
