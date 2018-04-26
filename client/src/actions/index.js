import axios from 'axios';
import { FETCH_TEAMS, USERS } from './types';

export const isErrored = (type, data) => ({
  type,
  data
});
export const fetchTeams = () => dispatch =>
  axios
    .get('http://localhost:3000/teams')
    .then(response => {
      dispatch({ type: FETCH_TEAMS, payload: response.data });
    })
    .catch(error => {
      dispatch(isErrored(FETCH_TEAMS, error.response.data));
    });

export const fetchUsers = () => dispatch =>
  axios
    .get('http://localhost:3000/users')
    .then(response => {
      dispatch({ type: USERS, payload: response.data });
    })
    .catch(error => {
      dispatch(isErrored(USERS, error.response.data));
    });
