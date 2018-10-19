/* eslint max-nested-callbacks: off */
import moxios from "moxios";
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import instance from '../../../../config/axios';
import { searchUser, clearUser } from "../../../../../src/redux/actions/users";
import { IS_LOADING, IS_LOGGED_IN, SEARCH_USERS } from "../../../../../src/redux/actions/types";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('Testing usersAction', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  describe('clearUser', () => {
    it('should dispatch success action wih users object being empty', (done) => {
      const store = mockStore({});
      store.dispatch(clearUser());
      const actions = store.getActions();
      expect(actions[0].type)
        .toBe(SEARCH_USERS);
      expect(actions[0].payload)
        .toEqual({
          data: { users: [] }
        });
      done();
    });
  });
  describe('searchUser', () => {
    it('the searchUser should dispatch actions in the correct order when it succeeds', (done) => {
      const store = mockStore({});
      const mockResponse = {
        data: 'mockData'
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockResponse
        });
      });
      const mockQuery = 'mockQuery';

      return store.dispatch(searchUser(mockQuery))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type)
            .toBe(IS_LOGGED_IN);
          expect(actions[1].type)
            .toBe(IS_LOADING);
          expect(actions[2].type)
            .toBe(SEARCH_USERS);
          expect(actions[1].type)
            .toBe(IS_LOADING);
          done();
        });
    });


    it('the searchUser should dispatch actions in the correct order when it fails', (done) => {
      const store = mockStore({});
      const mockResponse = {
        error: 'error',
        status: 'failed'
      };
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 400,
          response: mockResponse
        });
      });

      return store.dispatch(searchUser())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type)
            .toBe(IS_LOGGED_IN);
          expect(actions[1].type)
            .toBe(IS_LOADING);
          expect(actions[2].type)
            .toBe(SEARCH_USERS);
          expect(actions[2].payload)
            .toBe(mockResponse);
          expect(actions[1].type)
            .toBe(IS_LOADING);
          done();
          done();
        });
    });
  });
});
