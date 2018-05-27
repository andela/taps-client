import { SEARCH_USERS } from '../actions/types';

const userReducer = (state = { users: { data: { users: [] } } }, action) => {
  switch (action.type) {
  case SEARCH_USERS:
    return {
      ...state,
      users: action.payload
    };
  default:
    return state;
  }
};

export default userReducer;
