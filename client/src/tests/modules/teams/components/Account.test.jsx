import React from 'react';
import { shallow } from 'enzyme';
import Account from '../../../../modules/Teams/components/Account';

describe('<Account />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Account
      expanded
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('i').get(0).props.children).toBe('menu');
    expect(wrapper.find('a').get(1).props.children).toBe('Accounts');
    expect(wrapper.find('h6').props().children).toBe('Track your teams with additional data');
    expect(wrapper.find('button').props().children).toBe('Add an integration');
  });
});
