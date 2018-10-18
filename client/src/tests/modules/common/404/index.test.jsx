import React from 'react';
import { shallow } from 'enzyme';

import ErrorPage from '../../../../modules/common/404';

describe('Render the error page', () => {
  let wrapper = shallow(<ErrorPage />);
  it('Should properly render the error page', () => {
    expect(wrapper.length).toBe(1);
  });
});
