import authReducer from '../../../redux/reducers/authReducer';
import * as types from '../../../redux/actions/types';

describe('Authorization Reducer Test', () => {
  it('should update auth object on sign up state', (done) => {
    const action = {
      type: types.SIGN_UP,
      payload: true
    };
    expect(authReducer({ auth: {} }, action)).toEqual({ "auth": true });
    done();
  });

  it('should update state if is logged in', (done) => {
    const action = {
      type: types.IS_LOGGED_IN,
      payload: true,
      name: 'TEST'
    };
    const expected = { "auth": {}, "loggedIn": true, "name": "TEST" };
    expect(authReducer({ auth: {} }, action)).toEqual(expected);
    done();
  });

  it('should return the state on default', (done) => {
    const action = {
      type: types.DEFAULT
    };
    expect(authReducer({ auth: {} }, action)).toEqual({ "auth": {} });
    done();
  });
});

