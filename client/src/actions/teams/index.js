import { stringify } from 'qs';
import {
  FETCH_TEAMS,
  USERS,
  SEARCH_TEAMS,
  CLEAR_TEAMS,
  CREATE_TEAM
} from '../types';
import { success, isErrored, isLoading } from '../index';
import instance from '../../config/axios';
import { successMessage, errorMessage } from '../../toasts';

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
    .get(`https://andela-teams-core.herokuapp.com/v1/teams?@limit=${limit}&@offset=${offset}&@${stringifyQuery}`)
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

export const createTeam = data => dispatch => {
  dispatch(isLoading(true));
  return instance
    .post('https://andela-teams-core.herokuapp.com/v1/teams', data)
    .then(response => {
      dispatch(success(CREATE_TEAM, response.data));
      dispatch(isLoading(false));
      if (response.data.errors) {
        errorMessage(response.data.errors[0]);
        return;
      }
      successMessage(`${data.name} successfully created`);
    })
    .catch(error => {
      dispatch(isLoading(false));
    });
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
