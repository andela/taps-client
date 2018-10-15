/* eslint max-nested-callbacks:off */
/* eslint max-len: off */
/* global jest:true, */
import { shallow } from 'enzyme';
import React from 'react';
import CardItem from '../../../../modules/Home/components/CardItem';


const sampleProps = {
  item: {
    name: 'sample name',
    description: 'Sample Description',
    id: 0,
    progress: '10',
    members: 'mock-members'
  },
  favorite: '',
  lock: '',
  toolTip: '',
  progressBar: [],
  addFavorites: () => {},
  isFavorited: false
};
const getShallowObj = (props = {}) => shallow(<CardItem
  {...sampleProps} {...props} />);

describe('Testing CardItem Component', () => {
  describe('the elements rendered by the component', () => {
    it('should match snapshot', () => {
      const wrapper = getShallowObj();
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('the props passed to it as argument', () => {
    describe('isFavorited prop', () => {
      it('should add class "props.favorite" to #add-favorite-anchor when isFavorited === true', () => {
        const sampleFav = 'favorite-class';
        const wrapper = getShallowObj({ favorite: sampleFav, isFavorited: true });
        const element = wrapper.find(`#add-favorite-anchor[className*="favorite-icons"]`);
        expect(element.length)
          .toBe(1);
      });
      it('should add class "props.favorite" to #add-favorite-anchor when isFavorited === false', () => {
        const sampleFav = 'favorite-class';
        const wrapper = getShallowObj({ favorite: sampleFav, isFavorited: false });
        const element = wrapper.find(`#add-favorite-anchor[className*="favorite-btn"]`);
        expect(element.length)
          .toBe(1);
      });
    });
    describe('item prop', () => {
      it('should render a span with className = "card-title" with text equal to props.item.description', () => {
        const wrapper = getShallowObj();
        const span = wrapper.find("span.card-title");
        expect(span.text())
          .toBe(sampleProps.item.name);
      });

      it('the div with #progress-bar should contain prop data-tip= props.item.progress', () => {
        const wrapper = getShallowObj();
        expect(wrapper.find(`#progress-bar[data-tip="${sampleProps.item.progress}%"]`).length)
          .toBe(1);
      });
      it('should render an <i> wiith data-tip=item.members', () => {
        const wrapper = getShallowObj();
        expect(wrapper.find(`i[data-tip*="${sampleProps.item.members}"]`).length)
          .toBe(1);
      });
      it('the onClick method of a#add-favorite-anchor should call addFavorites with props.item.id', () => {
        const addFavSpy = jest.fn();
        const wrapper = getShallowObj({ addFavorites: addFavSpy });
        wrapper.find("#add-favorite-anchor")
          .simulate('click');
        expect(addFavSpy)
          .toHaveBeenCalledTimes(1);
        expect(addFavSpy)
          .toHaveBeenCalledWith(sampleProps.item.id);
      });
    });
  });
});

