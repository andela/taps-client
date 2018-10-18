import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addMember } from '../../../../redux/actions/teams/members';
import { ADD_MEMBER } from '../../../../redux/actions/types';
import { addMemberRequest, addMemberResponse } from '../../../__mocks__/__mockData__/memberMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Add a new user to team accounts', () => {
  beforeAll(() => {
    localStorage.setItem('aTeamsToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9sdXdhZmVtaS5hZGVrdW5sZUBhbmRlbGEuY29tIiwiaWF0IjoxNTM5MTgzNDQ0fQ.y40N5vI3d6BvOjPSl98vSK8l7D7sSD42Ta9daEdRtC0');
  });
  beforeEach(() => {
    mock.reset();
  });

  it('creates a new team with valid form inputs', async () => {
    const expectedActions = [{ "name": "OLUWAFEMI", "payload": true, "type": "[auth]: check if user is logged in" },
      { "payload": true, "type": "[ui]: show preloader" }, { "payload": false, "type": "[ui]: show preloader" },
      {
        "payload": { "github": [{ "created": true, "name": "ah-ghoulie" }], "team": [{ "created": true, "name": "ghoulie" }] },
        "type": ADD_MEMBER
      }];
    const store = mockStore({});
    await mock
      .onPost('teams/3/members/2', { role: 'developer' })
      .reply(201);
    await mock
      .onPost('teams/3/accounts/4/members/2', null)
      .reply(201, addMemberResponse);
    await store.dispatch(addMember(addMemberRequest));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
