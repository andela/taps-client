// import { stringify } from 'qs';
import { FETCH_TEAM_ACCOUNTS } from '../types';
import { success, isErrored, isLoading } from '../index';
import instance from '../../../config/axios';

//eslint-disable-next-line
export const fetchAccounts = id => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`teams/${id}/accounts`)
    .then(response => {
      dispatch(success(FETCH_TEAM_ACCOUNTS, response.data));
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(isErrored(FETCH_TEAM_ACCOUNTS, error.response.data));
      dispatch(isLoading(false));
    });
};

