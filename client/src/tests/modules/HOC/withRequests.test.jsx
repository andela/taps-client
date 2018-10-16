import React from 'react';
import { shallow } from 'enzyme';

import withRequests from '../../../modules/HOC/withRequests';
import requests from '../Admin/mock/mockData';

describe('Test for withRequests HOC', () => {
  const Component = <p>Ball</p>;
  const ComponentFromHOC = withRequests(Component, {
    requests: requests.data.requests,
    pageTitle: 'Admin Requests'
  });

  const wrapper = shallow(<ComponentFromHOC />);
  it("should mount without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call the event handler when checkbox is main-control", () => {
    expect(true).toBe(true);
    const event = {
      target: {
        name: 'main-control',
        checked: false
      }
    };

    wrapper.find('[headerText="Admin Requests"]').props().handleChange(event, requests.data.requests[0]);

    expect(wrapper).toMatchSnapshot();
  });

  it("should call the event handler when checkbox is not main-control", () => {
    const event = {
      target: {
        name: '',
        checked: false
      }
    };

    wrapper.find('[headerText="Admin Requests"]').props().handleChange(event, requests.data.requests[0]);

    expect(wrapper).toMatchSnapshot();
  });
});
