/* eslint max-nested-callbacks:off */
/* global jest:true, */
import { shallow } from 'enzyme';
import React from 'react';
import { Cards, mapStateToProps } from '../../../../modules/Home/components/Cards';

const sampleProps = {
  teams: { teams: [] },
  toggleFavoritesAction: () => {},
  clearTeams: () => {},
  teamsState: [],
  favoriteId: []
};
const getShallowObj = (props = {}) => shallow(<Cards
  {...sampleProps} {...props} />);


describe('Testing CardItem Component', () => {
  describe('the elements rendered by the component', () => {
    it('should match snapshot', () => {
      const wrapper = getShallowObj();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object that contains the value in teams', () => {
      const mockTeam = 'mock-team';
      const mockState = {
        teams: { teams: mockTeam }
      };
      const mappedProp = mapStateToProps(mockState);
      expect(mappedProp.teamsState)
        .toBe(mockTeam);
    });
  });

  describe('the methods in the component', () => {
    describe('componentWillReceiveProps', () => {
      it('should be called when props change', () => {
        const spy = jest.spyOn(Cards.prototype, 'componentWillReceiveProps');
        const wrapper = getShallowObj();
        const initSpy = jest.fn();
        global.M = {
          Autocomplete: { init: initSpy }
        };
        wrapper.setProps({ name: 'name' });
        expect(spy).toHaveBeenCalled();
        expect(initSpy).toHaveBeenCalled();
      });
    });


    describe('addFavorites method', () => {
      it('should be called when props.teamsState.map function', () => {
        const props = {
          teamsState: []
        };
        const spy = jest.spyOn(props.teamsState, 'map');
        const wrapper = getShallowObj(props);
        wrapper.instance().addFavorites();
        expect(spy).toHaveBeenCalled();
      });

      it('should be called when props.toggleFavoritesAction when the a props.team.id equals the id passed ', () => {
        const id = 3;

        const favActionSpy = jest.fn();
        const props = {
          teamsState: [{ id: 1 }, { id: 2 }, { id: 3 }],
          toggleFavoritesAction: favActionSpy
        };
        const spy = jest.spyOn(props.teamsState, 'map');
        const wrapper = getShallowObj(props);
        wrapper.instance().addFavorites(id);
        expect(spy).toHaveBeenCalled();
        expect(favActionSpy).toHaveBeenCalled();
      });
      it('should  not props.toggleFavoritesAction when the id passed is not in props.teamsState', () => {
        const id = 0;

        const favActionSpy = jest.fn();
        const props = {
          teamsState: [{ id: 1 }, { id: 2 }, { id: 3 }],
          toggleFavoritesAction: favActionSpy
        };
        const spy = jest.spyOn(props.teamsState, 'map');
        const wrapper = getShallowObj(props);
        wrapper.instance().addFavorites(id);
        expect(spy).toHaveBeenCalled();
        expect(favActionSpy).toHaveBeenCalledTimes(0);
      });
    });
    describe('componentWillUnmount', () => {
      it('should be called when component unmounts', () => {
        const spy = jest.spyOn(Cards.prototype, 'componentWillUnmount');
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
  });
});

