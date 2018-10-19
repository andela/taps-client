import userReducer from '../../../../src/redux/reducers/userReducer';
import { SEARCH_USERS } from "../../../../src/redux/actions/types";

const initialState = {
  users: { data: { users: [] } }
};
describe('Testing userReducer', () => {
  it('should return a default state when the action type does not exist', () => {
    const mockState = {
      mock: 'mock'
    };

    const newState = userReducer(mockState, { type: 'unknown-type' });
    expect(newState)
      .toBe(mockState);
  });
  it('should return the initialState when the state is undefined', () => {
    const mockAction = { type: 'mock-action-type' };

    const newState = userReducer(undefined, mockAction);
    expect(newState)
      .toEqual(initialState);
  });

  it(`should set the users with action.payload when the action.type === ${SEARCH_USERS}`, () => {
    const expected = 'expected-users';
    const mockAction = {
      type: SEARCH_USERS,
      payload: expected
    };

    const newState = userReducer({}, mockAction);
    expect(newState.users)
      .toBe(expected);
  });
});

