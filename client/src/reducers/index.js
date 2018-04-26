import { combineReducers } from 'redux';
import teams from './teamsReducer';
import users from './userReducer';

const root = combineReducers({
  teams,
  users
});

export default root;
