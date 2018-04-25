import { combineReducers } from 'redux';
import teams from './teamsReducer';

const root = combineReducers({
  teams
});

export default root;
