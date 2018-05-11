// import { stringify } from 'qs';
import { FETCH_TEAMS, USERS } from '../types';
import { success, isErrored, isLoading } from '../index';
import instance from '../../config/axios';

export const fetchTeams = () => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get('http://localhost:3000/teams')
    .then(response => {
      dispatch(success(FETCH_TEAMS, response.data));
      dispatch(isLoading(false));
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
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(isErrored(USERS, error.response.data));
      dispatch(isLoading(false));
    });
};
