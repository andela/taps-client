import React from 'react';
import { shallow } from 'enzyme';
import { Preloader, mapStateToProps } from '../../../../modules/common/Preloader';

const isLoading = {
  isLoading: true
};

describe('<Preloader />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Preloader isLoading={isLoading} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.exists('.indeterminate')).toEqual(true);
  });
  it('should test mapStateToProps', () => {
    const newState = mapStateToProps(isLoading);
    expect(newState.isLoading).toBe(true);
  });
});
