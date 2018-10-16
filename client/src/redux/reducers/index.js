import { combineReducers } from 'redux';
import teams from './teamsReducer';
import users from './userReducer';
import auth from './authReducer';
import isLoading from './networkRequestReducer';
import requestsReducer from './requestsReducer';
import accounts from './accountReducer';

const root = combineReducers({
  teams,
  users,
  auth,
  isLoading,
  requestsReducer,
  accounts
});

export default root;
