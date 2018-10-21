import React from 'react';
import { shallow } from 'enzyme';
import Gallery from '../../../../modules/Teams/components/Gallery';

import { data } from '../teamsMockData';

describe('<Gallery />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Gallery data={data} />);
    expect(wrapper.length).toBe(1);
  });
});
