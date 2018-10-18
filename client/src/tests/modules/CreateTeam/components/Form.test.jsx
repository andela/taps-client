import React from 'react';
import { shallow } from 'enzyme';

import Form from '../../../../modules/CreateTeam/components/Form';

describe('Create Team Form', () => {
  const props = {
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    integrations: {
      github: [],
      slack: [],
      pt: []
    },
    name: 'taps-client',
    desc: 'taps-client',
    project: 'author haven',
    checked: true,
    submitting: true
  };

  let wrapper = shallow(<Form {...props} />);
  it('Should render  form element with submitting props as true', () => {
    expect(wrapper.find('form').length).toBe(1);
  });

  wrapper = shallow(<Form {...props} />);
  it('Should render form element with submitting props as false', () => {
    props.submitting = false;

    wrapper = shallow(<Form {...props} />);

    expect(wrapper.find('form').length).toBe(1);
  });

  it('Should render form element with out name and description', () => {
    props.name = '';
    props.desc = '';

    wrapper = shallow(<Form {...props} />);

    expect(wrapper.find('form').length).toBe(1);
  });
});
