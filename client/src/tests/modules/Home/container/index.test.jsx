/* eslint max-nested-callbacks:off */
/* eslint max-len: off */
/* global jest:true, */

import { shallow } from 'enzyme';
import React from 'react';
import { Home, mapStateToProps } from '../../../../modules/Home/container';

global.M = {
  AutoInit: () => {},
  Dropdown: { init: () => {} }
};
const sampleProps = {
  fetchTeams: () => {},
  clearTeams: () => {},
  teams: {
    teams: []
  },
  users: {
    users: {}
  },
  history: {
    push: () => {}
  },
  auth: {
    loggedIn: false
  }
};
const getShallowObj = (props = {}) => shallow(<Home
  {...sampleProps} {...props} />);


describe('Testing Home Component', () => {
  describe('the elements rendered by the component', () => {
    it('should match snapshot', () => {
      const wrapper = getShallowObj();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object that contains the value in teams', () => {
      const mockTeams = 'mock-team';
      const mockUsers = 'mock-users';
      const mockAuth = 'mock-auth';
      const mockState = {
        teams: mockTeams,
        users: mockUsers,
        auth: mockAuth
      };
      const mappedProp = mapStateToProps(mockState);
      expect(mappedProp.teams)
        .toBe(mockTeams);
      expect(mappedProp.users)
        .toBe(mockUsers);
      expect(mappedProp.auth)
        .toBe(mockAuth);
    });
  });

  describe('the methods in the component', () => {
    describe('componentDidMount', () => {
      it('should be called when props change', () => {
        const spy = jest.spyOn(Home.prototype, 'componentDidMount');
        getShallowObj();
        expect(spy).toHaveBeenCalled();
      });

      it('should not call the loadMore() function when props.teams.teams.length > 0 ', () => {
        const spy = jest.spyOn(Home.prototype, 'loadMore');

        getShallowObj({ teams: { teams: ['mockTeam'] } });
        expect(spy).toHaveBeenCalledTimes(0);
      });

      it('should call the loadMore() function when props.teams.teams.length === 0 ', () => {
        const spy = jest.spyOn(Home.prototype, 'loadMore');

        getShallowObj({ teams: { teams: [] } });
        expect(spy).toHaveBeenCalled();
      });


      it('should call M.AutoInit() and M.Dropdown.init()', () => {
        const initSpy = jest.fn();
        const dropdownSpy = jest.fn();
        global.M = {
          AutoInit: initSpy,
          Dropdown: { init: dropdownSpy }
        };
        getShallowObj();

        expect(initSpy).toHaveBeenCalled();
        expect(dropdownSpy).toHaveBeenCalled();
      });
    });

    describe('handleSearchInput method', () => {
      it('should setState with event.target.value', () => {
        const setStateSpy = jest.spyOn(Home.prototype, 'setState');
        const wrapper = getShallowObj();
        const expectedValue = 3;
        const mockEvent = {
          target: { value: expectedValue }
        };
        wrapper.instance().handleSearchInput(mockEvent);

        expect(setStateSpy).toHaveBeenCalled();
        expect(wrapper.state('searchInput'))
          .toBe(expectedValue);
      });
    });


    describe('handleSearch method', () => {
      it('should setState with event.target.value', () => {
        const setStateSpy = jest.spyOn(Home.prototype, 'setState');
        const clearTeamsSpy = jest.fn();
        const mockSpy = jest.fn();
        const wrapper = getShallowObj({ clearTeams: clearTeamsSpy });

        const mockEvent = {
          preventDefault: mockSpy
        };
        wrapper.instance().handleSearch(mockEvent);

        expect(setStateSpy).toHaveBeenCalled();
        expect(clearTeamsSpy).toHaveBeenCalled();
        expect(mockSpy).toHaveBeenCalled();
        expect(wrapper.state('searchInput'))
          .toBe('');
        expect(wrapper.state('searchOffset'))
          .toBe(0);
        expect(wrapper.state('offset'))
          .toBe(0);
      });
    });

    describe('gotoHome eventHandler', () => {
      it('should call loadMore ', () => {
        const loadMoreSpy = jest.spyOn(Home.prototype, 'loadMore');

        const clearTeamsSpy = jest.fn();
        const wrapper = getShallowObj({ clearTeams: clearTeamsSpy });
        wrapper.instance().gotoHome();

        expect(loadMoreSpy).toHaveBeenCalledWith('', 0);
        expect(clearTeamsSpy).toHaveBeenCalled();
      });
    });

    describe('loadMore method', () => {
      it('should call props.fetchTeams method  when no argument is passed', () => {
        const fetchTeamsSpy = jest.fn();

        const wrapper = getShallowObj({ fetchTeams: fetchTeamsSpy });
        const setStateSpy = jest.spyOn(wrapper.instance(), 'setState');
        wrapper.instance().loadMore();

        expect(fetchTeamsSpy).toHaveBeenCalled();
        expect(setStateSpy).toHaveBeenCalled();
      });

      it('should setState with previous state.searchOffset +20 when the first argument is truthy  ', () => {
        const initialSearchOffset = 10;
        const wrapper = getShallowObj({});
        wrapper.setState({ searchOffset: initialSearchOffset });
        wrapper.instance().loadMore(true);
        expect(wrapper.state('searchOffset'))
          .toBe(initialSearchOffset + 20);
      });

      it('should call props.fetchTeams with the second arg when query is falsy and the second arg is 0', () => {
        const fetchTeamsSpy = jest.fn();
        const refreshOffset = 0;
        const wrapper = getShallowObj({ fetchTeams: fetchTeamsSpy });
        wrapper.instance().loadMore(false, refreshOffset);
        expect(fetchTeamsSpy).toHaveBeenCalledWith(20, refreshOffset, false);
      });
    });

    describe('componentWillUnmount', () => {
      it('should be called when component unmounts', () => {
        const spy = jest.spyOn(Home.prototype, 'componentWillUnmount');
        const wrapper = getShallowObj();
        wrapper.unmount();
        expect(spy).toHaveBeenCalled();
      });
      it('should call props.clearTeams', () => {
        const clearTeamsSpy = jest.fn();
        const wrapper = getShallowObj({ clearTeams: clearTeamsSpy });
        wrapper.unmount();
        expect(clearTeamsSpy).toHaveBeenCalled();
      });
    });

    describe('componentWillReceiveProps', () => {
      it('should be called when new state is set', () => {
        const wrapper = getShallowObj();
        const spy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');

        wrapper.setProps({ mockProps: 'mock' });
        expect(spy).toHaveBeenCalled();
      });

      it('should call nextProps.history.push when nextProps.auth.loggedIn === false', () => {
        const pushSpy = jest.fn();
        const wrapper = getShallowObj();
        const nextProps = {
          auth: { loggedIn: false },
          history: { push: pushSpy }
        };

        wrapper.setProps(nextProps);
        expect(pushSpy).toHaveBeenCalledWith('/');
      });
      it('should not call nextProps.history.push when nextProps.auth.loggedIn === true', () => {
        const pushSpy = jest.fn();
        const wrapper = getShallowObj();
        const nextProps = {
          auth: { loggedIn: true },
          history: { push: pushSpy }
        };

        wrapper.setProps(nextProps);
        expect(pushSpy).toHaveBeenCalledTimes(0);
      });


      it('should call setState and set hasMore to true when state.searchOffset < nextProps.teams.meta.pagination.total ||  nextProps.searchOffset < props.teams.meta.pagination.total', () => {
        const wrapper = getShallowObj();
        const setStateSpy = jest.spyOn(wrapper.instance(), 'setState');

        const mockNextProps = {
          teams: {
            meta: {
              pagination: { total: 50 }
            },
            teams: []
          }
        };

        wrapper.setProps(mockNextProps);
        expect(setStateSpy).toHaveBeenCalled();
        expect(wrapper.state('hasMore'))
          .toBe(true);
      });

      it('should call setState and set hasMore to false when nextProps.teams.teams.length >= nextProps.teams.meta.pagination.total', () => {
        const wrapper = getShallowObj();
        const mockNextProps = {
          teams: {
            meta: {
              pagination: { total: 2 }
            },
            teams: ['mockValue1', 'mockValue2']
          }
        };

        wrapper.setProps(mockNextProps);
        expect(wrapper.state('hasMore'))
          .toBe(false);
      });

      it('should call setState and set hasMore to false when  state.searchOffset >= nextProps.teams.meta.pagination.total', () => {
        const wrapper = getShallowObj();
        const mockNextProps = {
          teams: {
            meta: {
              pagination: { total: 3 }
            },
            teams: ['mockValue1']
          }
        };
        wrapper.setState({ searchOffset: 3 });
        wrapper.setProps(mockNextProps);
        expect(wrapper.state('hasMore'))
          .toBe(false);
      });
    });
  });
});

