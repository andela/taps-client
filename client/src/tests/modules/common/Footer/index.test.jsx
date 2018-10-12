import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../../modules/common/Footer';

describe('<Test Component />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.col').props().children[0]).toBe('© ');
    expect(wrapper.find('.col').props().children[1]).toBe(2018);
  });
});
