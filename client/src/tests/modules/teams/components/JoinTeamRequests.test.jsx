import React from 'react';
import { mapStateToProps } from '../../../../modules/Teams/components/JoinTeamRequests';


describe('Testing JoinTeamRequests', () => {
  it('mapStateToProps should map the state correctly', () => {
    const expectedLoadedRequests = ['value-1', 'value-2'];
    const mockState = {
      requestsReducer: { loadedRequests: expectedLoadedRequests }
    };

    const mappedProps = mapStateToProps(mockState);

    expect(mappedProps.loadedRequests)
      .toBe(expectedLoadedRequests);
  });
});
