import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import accountsReducer from '../../../redux/reducers/accountReducer';
import { FETCH_TEAM_ACCOUNTS } from '../../../redux/actions/types';
import { success } from '../../../redux/actions';
import accountsReponse from '../../__mocks__/__mockData__/accountMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const initialState = {
  accounts: []
};

describe('Test accountReducer', () => {
  it(`should update state account request is successful`, () => {
    const action = success(FETCH_TEAM_ACCOUNTS, accountsReponse);
    const newState = accountsReducer(initialState, action);
    expect(newState.accounts.data).toEqual(accountsReponse.data);
  });
});
