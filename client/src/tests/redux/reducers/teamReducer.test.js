import { CREATE_TEAM, SHOW_RESPONSE, ISMODAL_OPENED } from '../../../redux/actions/types'
import teamReducer from '../../../redux/reducers/teamsReducer'

const initialState = {
    teams: [],
    members: { data: { memberships: [] } },
    addMember: '',
    title: 'project',
    subtitle: 'see members',
    favoriteTeams: [],
    favoriteTeamObject: [],
    favoritesId: [],
    apiResponse: {},
    showModal: false
}

describe('Team initial state', () => {
    it(
        'should return Team initial state',
        () => {
            expect(teamReducer(undefined, {})).toEqual(initialState);
        },
    );

    it(
        'should change showModal state when action type is ISMODAL_OPENED',
        () => {
            const action = {
                type: ISMODAL_OPENED,
                payload: true
              };
              const newState = teamReducer(initialState, action);
              expect(newState.showModal).toBe(true);
        }
    )

    it(
        'should update apiResponse state when action type is SHOW_RESPONSE',
        () => {
            const action = {
                type: SHOW_RESPONSE,
                payload: {
                    success: ['passed'],
                    failure: ['failed']
                }
              };
              const newState = teamReducer(initialState, action);
              expect(newState.apiResponse).toEqual(action.payload);
              expect(newState.showModal).toBe(true)
        }
    )
})
