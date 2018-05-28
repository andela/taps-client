import {
  FETCH_TEAMS,
  SEARCH_TEAMS,
  CLEAR_TEAMS,
  CREATE_TEAM,
  ADD_MEMBER,
  FETCH_MEMBERS
} from '../actions/types';

const initialState = {
  teams: [],
  members: { data: { memberships: [] } },
  addMember: ''
};

const teamReducer = (state = initialState, action) => {
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
      meta: action.payload.meta,
      data: []
    };
  case CREATE_TEAM:
    return {
      ...state,
      data: action.payload
    };
  case FETCH_MEMBERS:
    return {
      ...state,
      members: action.payload
    };
  case ADD_MEMBER:
    return {
      ...state,
      addMember: action.payload
    };
  default:
    return state;
  }
};

export default teamReducer;
