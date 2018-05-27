import { SIGN_UP, SIGN_IN, IS_LOGGED_IN } from '../actions/types';

const authReducer = (state = { auth: {} }, action) => {
  switch (action.type) {
  case SIGN_IN:
  case SIGN_UP:
    return {
      ...state,
      auth: action.payload
    };
  case IS_LOGGED_IN:
    return {
      ...state,
      loggedIn: action.payload,
      name: action.name
    };
  default:
    return state;
  }
};

export default authReducer;
