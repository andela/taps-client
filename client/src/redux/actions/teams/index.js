import { stringify } from 'qs';
import {
  FETCH_TEAMS,
  USERS,
  SEARCH_TEAMS,
  CLEAR_TEAMS,
  CREATE_TEAM,
  ADD_FAVORITE_TEAM,
  FETCH_FAVORITES,
  REMOVE_FAVORITE_TEAM
} from '../types';
import { success, isErrored, isLoading } from '../index';
import instance from '../../../config/axios';
import { successMessage, errorMessage, warningMessage } from '../../../toasts';

export const fetchTeams = (limit, offset, query = '') => dispatch => {
  let stringifyQuery = 'search=';
  let type = FETCH_TEAMS;
  if (query !== '') {
    type = SEARCH_TEAMS;
    const searchQuery = { search: query };
    stringifyQuery = stringify(searchQuery);
  }
  dispatch(isLoading(true));
  return instance
    .get(`teams?@limit=${limit}&@offset=${offset}&@${stringifyQuery}`)
    .then(response => {
      const payload = {};
      payload.teams = response.data.data.teams;
      payload.meta = response.data.meta;
      dispatch(success(type, payload));
      if (response.data.meta) {
        dispatch(isLoading(false));
      }
    })
    .catch(error => {
      dispatch(isErrored(type, error.response));
      dispatch(isLoading(false));
    });
};

export const createTeam = data => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    const teamInfo = {
      name: data.name,
      description: data.description,
      private: data.private,
    }
    const githubRepos = data.integrations.github;
    
    const response = await instance.post('teams', teamInfo)
    if (response.data.errors) {
      errorMessage(response.data.errors[0]);
      return;
    }
    successMessage(`${data.name} successfully created`);
    
    githubRepos.length && githubRepos.map( async (repoName) => {
      let githubInfo = {
        name: repoName,
        type: 'github_repo'
      }
      try {
        let gitRepo = await instance.post(`teams/${response.data.data.team.id}/accounts`, githubInfo)
        if (gitRepo.data.errors) {
        errorMessage(gitRepo.data.errors[0]);
        return
      }
      successMessage(`${repoName} successfully created`);
      } catch(error) {
        errorMessage(`failed to create ${repoName}`);
      }
    })

    dispatch(success(CREATE_TEAM, response.data));

  } catch(error) {
    dispatch(isLoading(false));
  }
};

export const clearTeams = () => dispatch => {
  const payload = {};
  payload.teams = [];
  payload.meta = '';
  dispatch(success(CLEAR_TEAMS, payload));
};

export const fetchUsers = () => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get('http://localhost:3000/users')
    .then(response => {
      dispatch(success(USERS, response.data));
      // dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(isErrored(USERS, error.response.data));
      dispatch(isLoading(false));
    });
};

const addFavoriteTeam = (favoriteData) => ({
  type: ADD_FAVORITE_TEAM,
  favoriteData
});

const removeFavoriteTeam = (teamId) => ({
  type: REMOVE_FAVORITE_TEAM,
  teamId
});

export const toggleFavoritesAction = id => (dispatch, getState) => instance.post(`/favorites/${id}`)
  .then(response => {
    if (response.data.data) {
      successMessage('Successfully added team to favorites');
      dispatch(addFavoriteTeam(response.data.data.favorite));
    } else if (response.data.errors) {
      dispatch(warningMessage('You already favorited this team.'));
    }
  }).catch(error => {
    console.error(error);
  });

const fetchFavoriteTeams = (favoriteTeams) => ({
  type: FETCH_FAVORITES,
  favoriteTeams
});

export const fetchFavoriteTeamsAction = () => dispatch => {
  dispatch(isLoading(true));
  return instance.get(`/favorites`)
    .then((response) => {
      const payload = {};
      payload.teams = response.data.data.favorites;
      dispatch(fetchFavoriteTeams(payload));
      dispatch(isLoading(false));
    }).catch((error) => {
      console.error(error);
    });
};

export const removeFavoritesTeamsAction = (id) => dispatch => {
  return instance.delete(`/favorites/${id}`)
    .then(() => {
      dispatch(removeFavoriteTeam(id));
      successMessage('Team successfully removed from favorites');
    }).catch((error) => {
      console.error(error);
    });
};
