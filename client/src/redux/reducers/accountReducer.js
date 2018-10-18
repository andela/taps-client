import { FETCH_TEAM_ACCOUNTS } from '../actions/types';

const initialState = {
  accounts: []
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_TEAM_ACCOUNTS:
    return {
      ...state,
      accounts: action.payload
    };
  default:
    return state;
  }
};

export default accountReducer;
