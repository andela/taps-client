import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { createTeam } from '../../../../redux/actions/teams';
import { SHOW_RESPONSE } from '../../../../redux/actions/types';
import createTeamMock from '../../../__mocks__/__mockData__/createTeamMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Create Team actions', () => {
  beforeAll(() => {
    localStorage.setItem('aTeamsToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9sdXdhZmVtaS5hZGVrdW5sZUBhbmRlbGEuY29tIiwiaWF0IjoxNTM5MTgzNDQ0fQ.y40N5vI3d6BvOjPSl98vSK8l7D7sSD42Ta9daEdRtC0');
  });
  beforeEach(() => {
    mock.reset();
  });

  it('creates a new team with valid form inputs', async () => {
    const { createTeamResponse, teamInfoData, createTeamData } = createTeamMock;
    const expectedActions = [{ "name": "OLUWAFEMI", "payload": true, "type": "[auth]: check if user is logged in" },
      { "payload": true, "type": "[ui]: show preloader" }, { "payload": false, "type": "[ui]: show preloader" },
      { "payload": { "data": { "team": { "containsYou": true, "id": 2 } } }, "type": "[teams]: create teams" }];
    const store = mockStore({});
    await mock
      .onPost('teams', createTeamData)
      .reply(201, createTeamResponse);
    await store.dispatch(createTeam(teamInfoData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates a github project', async () => {
    const {
      githubResponse, createGithubData, createTeamData,
      createTeamResponse, githubData
    } = createTeamMock;
    const expectedActions = [{ "name": "OLUWAFEMI", "payload": true, "type": "[auth]: check if user is logged in" },
      { "payload": true, "type": "[ui]: show preloader" }, { "payload": false, "type": "[ui]: show preloader" },
      {
        "payload": { "github": [{ "created": true, "name": "ah-ghoulie" }], "team": [{ "created": true, "name": "ghoulie" }] },
        "type": SHOW_RESPONSE
      }];
    const store = mockStore({});
    await mock
      .onPost('teams', createTeamData)
      .reply(201, createTeamResponse);
    await mock
      .onPost('teams/2/accounts', githubData)
      .reply(201, githubResponse);
    await store.dispatch(createTeam(createGithubData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates a pivotal tracker project', async () => {
    const {
      ptResponse, createPtData, createTeamData,
      createTeamResponse, ptData
    } = createTeamMock;
    const expectedActions = [{ "name": "OLUWAFEMI", "payload": true, "type": "[auth]: check if user is logged in" },
      { "payload": true, "type": "[ui]: show preloader" }, { "payload": false, "type": "[ui]: show preloader" },
      {
        "payload": { "pt": [{ "created": true, "name": "ah-ghoulie" }], "team": [{ "created": true, "name": "ghoulie" }] },
        "type": SHOW_RESPONSE
      }];
    const store = mockStore({});
    await mock
      .onPost('teams', createTeamData)
      .reply(201, createTeamResponse);
    await mock
      .onPost('teams/2/accounts', ptData)
      .reply(201, ptResponse);
    await store.dispatch(createTeam(createPtData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates a slack channel', async () => {
    const {
      slackResponse, createSlackData, createTeamData,
      createTeamResponse, slackData
    } = createTeamMock;
    const expectedActions = [{ "name": "OLUWAFEMI", "payload": true, "type": "[auth]: check if user is logged in" },
      { "payload": true, "type": "[ui]: show preloader" }, { "payload": false, "type": "[ui]: show preloader" },
      {
        "payload": { "slack": [{ "created": true, "name": "ghoulie-general" }], "team": [{ "created": true, "name": "ghoulie" }] },
        "type": SHOW_RESPONSE
      }];
    const store = mockStore({});
    await mock
      .onPost('teams', createTeamData)
      .reply(201, createTeamResponse);
    await mock
      .onPost('teams/2/accounts', slackData)
      .reply(201, slackResponse);
    await store.dispatch(createTeam(createSlackData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('fails to create a team with empty name input', async () => {
    const { createTeamErrResponse, emptyTeamName } = createTeamMock;
    const expectedActions = [{ "name": "OLUWAFEMI", "payload": true, "type": "[auth]: check if user is logged in" },
      { "payload": true, "type": "[ui]: show preloader" }, { "payload": false, "type": "[ui]: show preloader" }];

    const store = mockStore({});
    await mock
      .onPost('teams', emptyTeamName)
      .reply(201, createTeamErrResponse);
    await store.dispatch(createTeam(emptyTeamName));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it(`fails to create github, slack and pivotal tracker projects
   when there is no team ID`, async () => {
    const { teamResposne, createTeamData, integrationData } = createTeamMock;
    const expectedActions = [{ "name": "OLUWAFEMI", "payload": true, "type": "[auth]: check if user is logged in" },
      { "payload": true, "type": "[ui]: show preloader" }, { "payload": false, "type": "[ui]: show preloader" },
      {
        "payload": {
          "github": [{ "created": false, "name": "ah-ghoulie" }],
          "pt": [{ "created": false, "name": "ah-ghoulie" }],
          "slack": [{ "created": false, "name": "ghoulie-general" }],
          "team": [{ "created": true, "name": "ghoulie" }]
        },
        "type": SHOW_RESPONSE
      }];
    const store = mockStore({});
    await mock
      .onPost('teams', createTeamData)
      .reply(201, teamResposne);
    await store.dispatch(createTeam(integrationData));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
