import React from 'react';
import { shallow } from 'enzyme';

import AdminRequests, { Request } from '../../../../modules/Admin/components/AdminRequest';

import requests from '../mock/mockData';

describe('Test for AdminRequests component', () => {
  const handleChange = jest.fn();

  let props = {
    handleChange,
    requests: requests.data.requests
  };

  let WrapperComponent = shallow(<AdminRequests {...props} />);

  it('should render properly', () => {
    expect(true).toBe(true);
    expect(WrapperComponent.length).toBe(1);
  });
});

describe('Test for Request component', () => {
  const WrapperComponent = shallow(<Request />);

  it('should render properly', () => {
    expect(WrapperComponent.length).toBe(1);
  });
});
