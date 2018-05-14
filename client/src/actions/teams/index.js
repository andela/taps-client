// import { stringify } from 'qs';
import { FETCH_TEAMS, USERS } from '../types';
import { success, isErrored, isLoading } from '../index';
import instance from '../../config/axios';

export const fetchTeams = (limit, offset) => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`https://andela-teams-core.herokuapp.com/v1/teams?@limit=${limit}&@offset=${offset}`)
    .then(response => {
      const payload = {};
      payload.teams = response.data.data.teams;
      payload.meta = response.data.meta;
      dispatch(success(FETCH_TEAMS, payload));
      if (response.data.meta) {
        dispatch(isLoading(false));
      }
    })
    .catch(error => {
      dispatch(isErrored(FETCH_TEAMS, error.response.data));
      dispatch(isLoading(false));
    });
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
