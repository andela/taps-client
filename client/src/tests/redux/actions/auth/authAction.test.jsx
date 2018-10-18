import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { data, response, LocalStorage, errorResponse, expiredToken } from './authActionMockData';
import instance from '../../../../config/axios';
import * as types from '../../../../redux/actions/types';

import { signIn, signOut, signUp } from "../../../../redux/actions/auth";


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

window.localStorage = new LocalStorage();

describe('Authorization redux actions test', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('Test the signUp dispatch action', (done) => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });
    return store.dispatch(signUp(data)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.IS_LOGGED_IN,
        payload: false
      });
      expect(store.getActions()[1]).toEqual({
        type: types.IS_LOADING,
        payload: true
      });
      expect(store.getActions()[2]).toEqual({
        type: types.SIGN_UP,
        payload: response
      });
      done();
    });
  });

  it('Test for signUp errors dispatch action', (done) => {
    localStorage.removeItem('aTeamsToken');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response
      });
    });

    const store = mockStore({});
    return store.dispatch(signUp(data)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.IS_LOGGED_IN,
        payload: false
      });
      expect(store.getActions()[1]).toEqual({
        type: types.IS_LOADING,
        payload: true
      });
      expect(store.getActions()[2].type).toEqual(types.SIGN_UP);
      expect(store.getActions()[3]).toEqual({
        type: types.IS_LOADING,
        payload: false
      });
      done();
    });
  });

  it('should test dispatch action for incorrect email', (done) => {
    localStorage.removeItem('aTeamsToken');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: errorResponse
      });
    });

    const store = mockStore({});
    return store.dispatch(signUp(data)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.IS_LOGGED_IN,
        payload: false
      });
      expect(store.getActions()[1]).toEqual({
        type: types.IS_LOADING,
        payload: true
      });
      expect(store.getActions()[2].payload).toEqual({ "message": "login with an andela email" });
      expect(store.getActions()[3]).toEqual({
        type: types.IS_LOADING,
        payload: false
      });
      expect(store.getActions()[4]).toEqual({
        type: types.IS_LOGGED_IN,
        payload: false
      });
      done();
    });
  });

  it('Should test dispatch action for signIn ', (done) => {
    localStorage.removeItem('aTeamsToken');

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });

    const store = mockStore({});
    return store.dispatch(signIn(data)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.IS_LOGGED_IN,
        payload: false
      });
      expect(store.getActions()[1]).toEqual({
        type: types.IS_LOADING,
        payload: true
      });
      expect(store.getActions()[2]).toEqual({
        type: types.SIGN_IN,
        payload: response
      });
      expect(store.getActions()[3]).toEqual({
        type: types.IS_LOADING,
        payload: false
      });
      expect(store.getActions()[4]).toEqual({
        type: types.IS_LOGGED_IN,
        payload: true,
        name: 'TEST'
      });
      done();
    });
  });

  it('Should test dispatch action for signIn with expired token', (done) => {
    localStorage.removeItem('aTeamsToken');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expiredToken
      });
    });
    const store = mockStore({});
    return store.dispatch(signIn(data)).then(() => {
      const actual = localStorage.getItem('aTeamsToken');
      expect(actual).toEqual(null);
      done();
    });
  });

  it('should test dispatch action for signIn errors', (done) => {
    localStorage.removeItem('aTeamsToken');
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response
      });
    });

    const store = mockStore({});
    return store.dispatch(signIn(data)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: types.IS_LOGGED_IN,
        payload: false
      });
      expect(store.getActions()[1]).toEqual({
        type: types.IS_LOADING,
        payload: true
      });
      expect(store.getActions()[2].type).toEqual(types.SIGN_IN);
      expect(store.getActions()[3]).toEqual({
        type: types.IS_LOADING,
        payload: false
      });
      done();
    });
  });

  it('should test dispatch action for signOut', (done) => {
    const store = mockStore({});
    localStorage.setItem('aTeamsToken', response.data.userToken);
    store.dispatch(signOut());

    expect(store.getActions()[0]).toEqual({
      type: types.IS_LOGGED_IN,
      payload: true,
      name: 'TEST'
    });
    expect(store.getActions()[1]).toEqual({
      type: types.IS_LOADING,
      payload: true
    });
    expect(store.getActions()[2]).toEqual({
      type: types.IS_LOADING,
      payload: false
    });
    expect(store.getActions()[3]).toEqual({
      type: types.IS_LOGGED_IN,
      payload: false
    });
    done();
  });
});
