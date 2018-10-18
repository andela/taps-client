import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../../../config/axios';
import { FETCH_TEAM_ACCOUNTS } from '../../../../../src/redux/actions/types';
import { fetchAccounts } from '../../../../redux/actions/teams/accounts';
import accountsReponse from '../../../__mocks__/__mockData__/accountMock';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('Accountt Actions', () => {
  beforeEach(() => moxios.install(instance));
  afterEach(() => moxios.uninstall(instance));
  it('should dispatch FETCH_TEAM_ACCOUNTS', () => {
    const id = 'a60859d9-56d9-4c9f-bda1-6d5b2ea3043a';
    const store = mockStore({});
    moxios.stubRequest(`teams/${id}/accounts`, {
      status: 200,
      response: accountsReponse
    });
    const expectedAction = {
      type: FETCH_TEAM_ACCOUNTS,
      data: { accountsReponse }
    };
    store.dispatch(fetchAccounts())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      }, 3000);
  });
});
