import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addMember } from '../../../../redux/actions/teams/members';

import { addMemberRequest, addMemberResponse, response, expectedActions } from '../../../__mocks__/__mockData__/memberMock';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Add a new user to team accounts', () => {
  beforeAll(() => {
    localStorage.setItem('aTeamsToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV6ZS5rZXZpbkBhbmRlbGEuY29tIiwiaWF0IjoxNTM5ODYxNDU2fQ._FOXQtpzUnwtbaP2-Fn6HOhFDZpsWmS3GPxmOVSAWdE');
  });
  beforeEach(() => {
    mock.reset();
  });

  it('Adds a user to a team accounts', async () => {
    const store = mockStore({});

    await mock
      .onPost('teams/3/members/2', { role: 'developer' })
      .reply(201, addMemberResponse);

    await mock
      .onPost('teams/3/accounts/4/members/2')
      .reply(201, response);

    await store.dispatch(addMember(addMemberRequest));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
