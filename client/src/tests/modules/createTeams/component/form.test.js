import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../../../modules/CreateTeam/components/Form';

describe('CreateTeam Form test-suite', () => {
  const props = {
    handleChange: jest.fn(),
    name: 'jude',
    desc: 'cohort 56',
    checked: 'false',
    project: 'card for humanity',
    integrations: {
      github: [],
      slack: [],
      pt: []
    },
    handleSubmit: jest.fn(),
    submitting: false,
    menuChange: jest.fn()
  };

  it('renders properly', () => {
    const FormWrapper = shallow(<Form {...props} />);
    expect(FormWrapper.exists()).toBeTruthy();
  });
});
