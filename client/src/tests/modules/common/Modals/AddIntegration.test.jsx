import React from 'react';
import { shallow } from 'enzyme';
import AddIntegration from '../../../../modules/common/Modals/AddIntegration';

describe('<AddIntegration />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<AddIntegration />);
    expect(wrapper.find('p').get(0).props.children).toBe('Select an integration to add');
    expect(wrapper.find('p').get(1).props.children).toBe('Github Repo');
    expect(wrapper.find('p').get(2).props.children).toBe('Pivotal Tracker');
    expect(wrapper.find('p').get(3).props.children).toBe('Slack Channel (private)');
    expect(wrapper.find('p').get(4).props.children).toBe('Slack Channel (public)');
  });
});
