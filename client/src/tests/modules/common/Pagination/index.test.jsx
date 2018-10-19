import React from 'react';
import { shallow } from 'enzyme';

import RequestPagination from '../../../../modules/common/Pagination';

describe('Test for Pagination component', () => {
  const WrapperComponent = shallow(<RequestPagination />);

  it('should render properly', () => {
    expect(WrapperComponent.find('Pagination').length).toBe(1);
  });
});

