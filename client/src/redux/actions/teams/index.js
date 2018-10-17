import { stringify } from 'qs';
import {
  FETCH_TEAMS,
  USERS,
  SEARCH_TEAMS,
  CLEAR_TEAMS,
  CREATE_TEAM,
  SHOW_RESPONSE,
  ADD_FAVORITE_TEAM,
  FETCH_FAVORITES,
  REMOVE_FAVORITE_TEAM,
  ISMODAL_OPENED
} from '../types';
import api from '../../../utils/api';
import { success, isErrored, isLoading, apiResponse } from '../index';
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

/**
 * @description redux action to change modal state
 * @function modalState
 * @param {bool} bool modal state
 */
export const modalState = bool => dispatch => {
  dispatch({
    type: ISMODAL_OPENED,
    payload: bool
  });
};

/**
 * @description method to create team and multiple project integrations
 * @param {data} data
 * @returns {object} allrequest
 */
export const createTeam = data => async (dispatch) => {
  dispatch(isLoading(true));
  try {
    // required properties to create a team
    const teamInfo = {
      name: data.name,
      description: data.description,
      private: data.private
    };

    // all api response
    const allRequest = {
      team: []
    };

    let projects = {};
    let integrationNames = data.integrations;

    // checks if any integration is selected
    let integrationExist = Object.entries(integrationNames).some((integration) => integration[1].length > 0);

    let integrationType = {
      github: 'github_repo',
      pt: 'pt_project',
      slack: 'slack_private_channel'
    };

    // all selected integrations
    for (const name in integrationNames) {
      if (integrationNames[name].length) {
        allRequest[name] = [];
        projects[name] = integrationNames[name];
      }
    }

    // api call to create a team
    const response = await api('teams', 'post', teamInfo);
    allRequest.team = [...allRequest.team, { created: true, name: data.name }];
    if (integrationExist) {
      const allProject = Object.keys(projects);
      for (const integration of allProject) {
        for (const accountName of projects[integration]) {
          const integrationInfo = {
            name: accountName,
            type: integrationType[integration]
          };
          try {
            await api(`teams/${response.data.team.id}/accounts`, 'post', integrationInfo);
            allRequest[integration] = [...allRequest[integration], { created: true, name: accountName }];
          } catch (error) {
            allRequest[integration] = [...allRequest[integration], { created: false, name: accountName }];
          }
        }
      }
      dispatch(isLoading(false));
      return dispatch(apiResponse(SHOW_RESPONSE, allRequest));
    }

    dispatch(isLoading(false));
    successMessage(`${data.name} successfully created`);
    return dispatch(success(CREATE_TEAM, response));
  } catch (error) {
    dispatch(isLoading(false));
    errorMessage(error);
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

export const removeFavoritesTeamsAction = (id) => dispatch => instance.delete(`/favorites/${id}`)
  .then(() => {
    dispatch(removeFavoriteTeam(id));
    successMessage('Team successfully removed from favorites');
  }).catch((error) => {
    console.error(error);
  });
