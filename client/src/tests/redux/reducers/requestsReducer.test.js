import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import requestsReducer from '../../../redux/reducers/requestsReducer';
import { CREATE_ADMIN_REQUEST_SUCCESS, CREATE_ADMIN_REQUEST_ERROR } from '../../../../src/redux/actions/types';
import { success, isErrored } from '../../../redux/actions';
import requestsReponse from '../../__mockData__/requestsMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const initialState = {
  request: null,
  success: false,
  error: ''
};

const errorResponse = {
  data: {
    errors: ['The type field is required.']
  }
};

describe('Test requestsReducer', () => {
  it(`should update state with request data when admin request is successful`, () => {
    const action = success(CREATE_ADMIN_REQUEST_SUCCESS, requestsReponse);
    const newState = requestsReducer(initialState, action);
    expect(newState.success).toEqual(true);
    expect(newState.request.data.request).toEqual(requestsReponse.data.request);
  });

  it(`should update state with error when admin request is not successful`, () => {
    const action = isErrored(CREATE_ADMIN_REQUEST_ERROR, errorResponse);
    const newState = requestsReducer(initialState, action);
    expect(newState.success).toEqual(false);
    expect(newState.error).toEqual(errorResponse);
  });
});
