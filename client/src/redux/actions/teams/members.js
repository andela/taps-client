
import { FETCH_MEMBERS, ADD_MEMBER } from '../types';
import api from '../../../utils/api';
import { success, isErrored, isLoading } from '../index';
import instance from '../../../config/axios';
import { successMessage, errorMessage } from '../../../toasts';

//eslint-disable-next-line
export const fetchMembers = id => dispatch => {
  dispatch(isLoading(true));
  return instance
    .get(`teams/${id}/members`)
    .then(response => {
      dispatch(success(FETCH_MEMBERS, response.data));
      dispatch(isLoading(false));
    })
    .catch(error => {
      dispatch(isErrored(FETCH_MEMBERS, error.response.data));
      dispatch(isLoading(false));
    });
};

export const addMember = data => async dispatch => {
  dispatch(isLoading(true));

  try {
    let request;
    await api(`teams/${data.teamId}/members/${data.userId}`, 'post', { role: data.role });

    const member = { type: 'team', name: data.teamName, invited: true };

    if (data.accounts.length) {
      request = data.accounts.map(async (account) => {
        try {
          const response = await api(`teams/${data.teamId}/accounts/${account.accountId}/members/${data.userId}`, 'post', null);
          return {
            type: account.type,
            name: account.name,
            invited: response.data.response.invitedUser.ok
          };
        } catch (error) {
          return {
            type: account.type,
            name: account.name,
            invited: false,
            error
          };
        }
      });
    }

    const allResponse = await Promise.all(request);
    allResponse.push(member);
    dispatch(success(ADD_MEMBER, allResponse));
    successMessage('user successfully added to this team');
    dispatch(isLoading(false));
  } catch (error) {
    dispatch(isLoading(false));
    errorMessage(error);
  }
};
