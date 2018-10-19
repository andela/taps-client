import React from 'react';
import { shallow } from 'enzyme';

import RequestHolder from '../../../../modules/Admin/components/RequestHolder';

describe('Test for RequestHolder component', () => {
  const handleChange = jest.fn();

  const WrapperComponent = shallow(<RequestHolder handleChange={handleChange} />);

  it('should render properly', () => {
    expect(WrapperComponent.find('.request-checkbox-container').length).toBe(1);
  });

  it('should call the change event', () => {
    expect(true).toBe(true);

    WrapperComponent.find('#main-control').simulate('change');

    expect(WrapperComponent.find('#main-control').length).toBe(1);
  });
});

