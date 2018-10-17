import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../../../config/axios';
import { CREATE_ADMIN_REQUEST_SUCCESS, CREATE_ADMIN_REQUEST_ERROR } from '../../../../../src/redux/actions/types';
import createAdminRequest from '../../../../redux/actions/requests';
import requestsReponse from '../../../__mocks__/__mockData__/requestsMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Request Actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall(instance));
  it('should dispatch CREATE_ADMIN_REQUEST_SUCCESS after successfull admin request sent', () => {
    const store = mockStore({});
    moxios.stubRequest('/requests', {
      status: 200,
      response: requestsReponse
    });
    const expectedAction = {
      type: CREATE_ADMIN_REQUEST_SUCCESS,
      data: { requestsReponse }
    };
    store.dispatch(createAdminRequest({ type: 'admin_request' }))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      }, 3000);
  });

  it('should dispatch CREATE_ADMIN_REQUEST_ERROR if admin request is not successfull', () => {
    const store = mockStore({});
    moxios.stubRequest('/requests', {
      status: 200,
      response: { errors: ['The type field is required.'] }
    });
    const expectedAction = {
      type: CREATE_ADMIN_REQUEST_ERROR,
      data: { errors: ['The type field is required.'] }
    };
    store.dispatch(createAdminRequest())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      }, 3000);
  });
});
