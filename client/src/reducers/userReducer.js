import { USERS } from '../actions/types';

const userReducer = (state = { users: {} }, action) => {
  switch (action.type) {
  case USERS:
    return {
      ...state,
      users: action.payload
    };
  default:
    return state;
  }
};

export default userReducer;
