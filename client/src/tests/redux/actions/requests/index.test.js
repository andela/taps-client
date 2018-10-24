/* eslint  max-nested-callbacks : off */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../../../config/axios';
import {
  CREATE_ADMIN_REQUEST_SUCCESS, CREATE_ADMIN_REQUEST_ERROR,
  CHECK_USER_REQUEST, IS_LOADING, IS_LOGGED_IN, FETCH_REQUESTS
} from '../../../../../src/redux/actions/types';
import { makeRequest, checkUserRequest, loadRequests } from '../../../../redux/actions/requests';
import { requestsResponse, checkUserRequestResponse } from '../../../__mocks__/__mockData__/requestsMock';
import mockLocalStorage from "../../../__mocks__/mockLocalStorage";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userId = 'ac568e4b-fdaa-4925-9d48-50fa0c755f7f';
const type = 'admin_request';

global.localStorage = mockLocalStorage;
describe('Request Actions', () => {
  beforeEach(() => moxios.install(instance));
  beforeEach(() => {
    // localStorage.setItem('aTeamsToken', '');
    // localStorage.setItem('userId', '');
    // localStorage.setItem('role', '');
  });
  afterEach(() => moxios.uninstall(instance));


  describe('createAdminRequest', () => {
    it('should dispatch CREATE_ADMIN_REQUEST_SUCCESS after successfull admin request sent', (done) => {
      const store = mockStore({});
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: requestsResponse
        });
      });
      return store.dispatch(makeRequest({ type: 'admin_request' }))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual(CREATE_ADMIN_REQUEST_SUCCESS);
          expect(actions[0].payload).toEqual(requestsResponse);
          done();
        }, 3000);
    });

    it('should dispatch CREATE_ADMIN_REQUEST_ERROR if admin request is not successfull', (done) => {
      const store = mockStore({});
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: { errors: ['The type field is required.'] }
        });
      });
      const expectedAction = {
        type: CREATE_ADMIN_REQUEST_ERROR,
        data: { errors: ['The type field is required.'] }
      };
      store.dispatch(makeRequest())
        .then(() => {
          const actions = store.getActions();
          const actionData = actions[0].payload.response.data;
          expect(actions[0].type)
            .toEqual(CREATE_ADMIN_REQUEST_ERROR);
          expect(actionData)
            .toEqual(expectedAction.data);
          done();
        }, 3000);
    });


    it('should dispatch CREATE_ADMIN_REQUEST_ERROR if admin request is not successfull', (done) => {
      const store = mockStore({});
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: { errors: ['The type field is required.'] }
        });
      });
      const expectedAction = {
        type: CREATE_ADMIN_REQUEST_ERROR,
        data: { errors: ['The type field is required.'] }
      };
      store.dispatch(makeRequest())
        .then(() => {
          const actions = store.getActions();
          const actionData = actions[0].payload.response.data;
          expect(actions[0].type)
            .toEqual(CREATE_ADMIN_REQUEST_ERROR);
          expect(actionData)
            .toEqual(expectedAction.data);
          done();
        }, 3000);
    });
  });
  describe('loadRequests', () => {
    it('should dispatch the correct actions once called when FETCH_REQUEST_SUCCESS', (done) => {
      const store = mockStore({});
      mockLocalStorage.setItem('aTeamsToken', 'userToken');
      mockLocalStorage.setItem('userId', 'id');
      mockLocalStorage.setItem('role', 'admin');
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            data: [
              { id: 'request-id', type: 'admin' }
            ]
          }
        });
      });
      return store.dispatch(loadRequests('admin_request', 10, 10))
        .then(() => {
          const actions = store.getActions();

          expect(actions[0].type).toEqual(IS_LOGGED_IN);
          expect(actions[0].payload).toEqual(false);

          expect(actions[1].type).toEqual(IS_LOADING);
          expect(actions[1].payload).toEqual(true);

          expect(actions[2].type).toEqual(`${FETCH_REQUESTS}_SUCCESS`);
          done();
        }, 3000);
    });
  });

  it('should dispatch the correct actions once called FETCH_REQUEST_ERR0R', (done) => {
    const store = mockStore({});
    mockLocalStorage.setItem('aTeamsToken', 'userToken');
    mockLocalStorage.setItem('userId', 'id');
    mockLocalStorage.setItem('role', 'admin');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          errors: {}
        }
      });
    });
    return store.dispatch(loadRequests('admin_request', 10, 10))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0].type).toEqual(IS_LOGGED_IN);
        expect(actions[0].payload).toEqual(false);

        expect(actions[1].type).toEqual(IS_LOADING);
        expect(actions[1].payload).toEqual(true);

        expect(actions[2].type).toEqual(`${FETCH_REQUESTS}_ERROR`);
        done();
      }, 3000);
  });

  it('should dispatch CHECK_USER_REQUEST if user request is checked', () => {
    const store = mockStore({});
    moxios.stubRequest(`/requests?userId=${userId}&type=${type}`, {
      status: 200,
      response: { checkUserRequestResponse }
    });
    const expectedAction = {
      type: CHECK_USER_REQUEST,
      data: { checkUserRequestResponse }
    };
    store.dispatch(checkUserRequest())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      }, 3000);
  });
});
