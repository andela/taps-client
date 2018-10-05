import React from 'react';
import { shallow } from 'enzyme';
import Extraform from '../../../../modules/Auth/components/ExtraForm';
import props from '../authMockData';

describe('<Test Component />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Extraform {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
