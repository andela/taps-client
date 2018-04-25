import axios from 'axios';
import { FETCH_TEAMS } from './types';
/* eslint-disable */
export const fetchTeams = () => dispatch =>
  axios.get('http://localhost:3000/teams').then(response => {
    dispatch({ type: FETCH_TEAMS, payload: response.data });
  });
