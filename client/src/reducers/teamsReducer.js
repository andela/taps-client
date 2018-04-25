import { FETCH_TEAMS } from '../actions/types';

const teamReducer = (state = { teams: [] }, action) => {
  switch (action.type) {
  case FETCH_TEAMS:
    return {
      ...state,
      teams: action.payload
    };
  default:
    return state;
  }
};

export default teamReducer;
