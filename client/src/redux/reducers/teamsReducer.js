import {
  FETCH_TEAMS,
  SEARCH_TEAMS,
  CLEAR_TEAMS,
  CREATE_TEAM,
  ADD_MEMBER,
  FETCH_MEMBERS,
  TOGGLE_FAVORITES,
  FETCH_FAVORITES,
  RENDER_CONTENT,
  RENDER_SUB_CONTENT
} from '../actions/types';

const initialState = {
  teams: [],
  members: { data: { memberships: [] } },
  addMember: '',
  title: 'project',
  subtitle: 'invite members',
  favoriteTeams: [],
  userFavoriteId: [],
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
  case TOGGLE_FAVORITES:
    return {
      ...state,
      teams: state.teams.map(team => {
        if (team.id !== action.favoriteData.favoriteTeams.teamId) {
          return team;
        }
        return {
          ...team,
          teams: action.toggleType === 'add' ?
            [...team.teams, { userId: action.userId }] :
            team.teams.filter(favorite => favorite.userId !== action.userId)
        };
      }),
      userFavoriteId: action.favoriteData.userIDs
    };
  case FETCH_FAVORITES:
    return {
      ...state,
      favoriteTeams: action.favoriteTeams
    };
  default:
    return state;
  }
};

export default teamReducer;
