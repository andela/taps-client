import React from 'react';
import { shallow } from 'enzyme';
import Member from '../../../../modules/Teams/components/Member';

const members = {
  find: jest.fn(),
};


describe('<Member />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Member
      expanded
      toggleSidenav
      members={members}
    />);
    expect(wrapper.find('i').get(0).props.children).toBe('menu');
  });
});
