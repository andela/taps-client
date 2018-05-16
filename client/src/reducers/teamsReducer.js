import { FETCH_TEAMS, SEARCH_TEAMS, CLEAR_TEAMS } from '../actions/types';

const teamReducer = (state = { teams: [] }, action) => {
  switch (action.type) {
  case FETCH_TEAMS:
  case SEARCH_TEAMS:
    return {
      ...state,
      teams: [...state.teams, ...action.payload.teams],
      meta: action.payload.meta
    };
  case CLEAR_TEAMS:
    return {
      ...state,
      teams: [],
      meta: action.payload.meta
    };
  default:
    return state;
  }
};

export default teamReducer;
