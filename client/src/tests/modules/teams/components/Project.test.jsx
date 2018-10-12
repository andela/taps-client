import React from 'react';
import { shallow } from 'enzyme';
import Project from '../../../../modules/Teams/components/Project';

import { teams } from '../teamsMockData';

describe('<Project />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Project
      expanded
      toggleSidenav
      team={teams}
    />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('i').get(0).props.children).toBe('menu');
    expect(wrapper.find('h6').get(0).props.children).toBe('Team Project');
  });
});
