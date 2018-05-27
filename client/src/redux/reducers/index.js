import { combineReducers } from 'redux';
import teams from './teamsReducer';
import users from './userReducer';
import auth from './authReducer';
import isLoading from './networkRequestReducer';

const root = combineReducers({
  teams,
  users,
  auth,
  isLoading
});

export default root;
