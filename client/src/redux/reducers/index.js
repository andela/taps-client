import { combineReducers } from 'redux';
import teams from './teamsReducer';
import users from './userReducer';
import auth from './authReducer';
import isLoading from './networkRequestReducer';
import requestsReducer from './requestsReducer';

const root = combineReducers({
  teams,
  users,
  auth,
  isLoading,
  requestsReducer
});

export default root;
