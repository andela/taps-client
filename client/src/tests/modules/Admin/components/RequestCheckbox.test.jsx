import React from 'react';
import { shallow } from 'enzyme';

import RequestCheckbox from '../../../../modules/Admin/components/RequestCheckbox';

import requests from '../mock/mockData';

describe('Test for RequestCheckbox component', () => {
  const handleChange = jest.fn();

  let props = {
    handleChange,
    requests: requests.data.requests
  };

  let WrapperComponent = shallow(<RequestCheckbox {...props} />);

  it('should render properly', () => {
    expect(WrapperComponent.length).toBe(props.requests.length);
  });

  it('should render checkbox with the requests', () => {
    expect(WrapperComponent.find('input').get(0).props.type).toBe('checkbox');

    expect(WrapperComponent.find('input').get(0).props.id).toBe(props.requests[0].id);
  });

  it('should call the onChange event listener', () => {
    WrapperComponent.find('input').get(0).props.onChange();

    expect(WrapperComponent.find('input').get(0).props.type).toBe('checkbox');
  });

  it('should render properly with no requests', () => {
    props = {
      handleChange,
    };

    WrapperComponent = shallow(<RequestCheckbox {...props} />);

    expect(WrapperComponent.length).toBe(0);
  });
});

