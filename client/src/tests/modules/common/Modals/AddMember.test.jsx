import React from 'react';
import { shallow } from 'enzyme';
import AddMember from '../../../../modules/common/Modals/AddMember';

describe('<AddMember />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<AddMember />);
    expect(wrapper.find('h4').props().children).toBe('Add member');
    expect(wrapper.find('i').props().children).toBe('account_circle');
    expect(wrapper.find('label').props().children).toBe('Find member');
    expect(wrapper.find('a').get(0).props.children).toBe('Back');
    expect(wrapper.find('a').get(1).props.children).toBe('Add');
  });
});
