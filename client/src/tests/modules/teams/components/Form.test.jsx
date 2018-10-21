import React from 'react';
import { shallow } from 'enzyme';
import Form from '../../../../modules/Teams/components/Form';

// import { teams } from '../teamsMockData';

describe('<Form />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('h6').props().children).toBe('Create a new project');
    expect(wrapper.find('label').get(0).props.children).toBe('Team name');
    expect(wrapper.find('label').get(1).props.children).toBe('Description');
    expect(wrapper.find('label').get(2).props.children).toBe('Team visibility');
    expect(wrapper.find('button').props().children).toBe('Submit');
    expect(wrapper.find('span').props().children).toBe('Not more than 255 characters');
  });
});
