import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../../modules/common/Spinner/Spinner';


describe('<Spinner />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.exists('.spinner')).toEqual(true);
  });
});
