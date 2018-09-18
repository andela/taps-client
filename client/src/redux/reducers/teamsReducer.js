import {
  FETCH_TEAMS,
  SEARCH_TEAMS,
  CLEAR_TEAMS,
  CREATE_TEAM,
  ADD_MEMBER,
  FETCH_MEMBERS,
  ADD_FAVORITE_TEAM,
  FETCH_FAVORITES,
  RENDER_CONTENT,
  RENDER_SUB_CONTENT,
  REMOVE_FAVORITE_TEAM
} from '../actions/types';

const initialState = {
  teams: [],
  members: { data: { memberships: [] } },
  addMember: '',
  title: 'project',
  subtitle: 'invite members',
  favoriteTeams: [],
  favoriteTeamObject: [],
  favoritesId: []
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
      favoriteTeamObject: [],
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
  case RENDER_CONTENT:
    return {
      ...state,
      title: action.title
    };
  case RENDER_SUB_CONTENT:
    return {
      ...state,
      subtitle: action.title
    };
  case ADD_FAVORITE_TEAM:
    console.log('the supposed action', action)
    return {
      ...state,
      teams: state.teams.map(team => {
        if (team.id !== action.favoriteData.teamId) {
          return team;
        }

        return {
          ...team,
          favoritedByYou: !team.favoritedByYou
        };
      })
    };
  case FETCH_FAVORITES:
    return {
      ...state,
      favoriteTeams: action.favoriteTeams
    };
  case REMOVE_FAVORITE_TEAM:
    return {
      ...state,
      favoriteTeams: {
        ...state.favoriteTeams,
        teams: state.favoriteTeams
          .teams.filter(team => team.teamId !== action.teamId)
      }
    };
  default:
    return state;
  }
};

export default teamReducer;
