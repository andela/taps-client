import React from 'react';
import { shallow } from 'enzyme';
import { Member } from '../../../../modules/Teams/components/Member';
import { props } from '../teamsMockData';

describe('<Test Member Component />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Member {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('checkTeamLead class methods should be called', () => {
    const checkTeamLead = jest.spyOn(Member.prototype, 'checkTeamLead');
    const wrapper = shallow(<Member {...props} />);
    wrapper.instance().checkTeamLead();
    expect(checkTeamLead).toHaveBeenCalled();
  });
});
