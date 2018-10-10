import React from 'react';
import { shallow } from 'enzyme';
import { InviteMember } from '../../../../modules/Teams/components/InviteMembers';
import { props, emptyProps } from '../teamsMockData';

describe('<Test Component />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<InviteMember {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should mount with empty props', () => {
    const wrapper = shallow(<InviteMember {...emptyProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should respond to an onChange event of search input', () => {
    const wrapper = shallow(<InviteMember {...props} />);
    wrapper.find('#invite-members').simulate('change', { target: { value: 'kevin' } });
    expect(wrapper).toMatchSnapshot();
  });

  it('Radio button should respond to an onClick event', () => {
    const wrapper = shallow(<InviteMember {...props} />);
    wrapper.setState({ searchInput: 'kevin' });
    wrapper.find('.select-all').simulate('click');
    expect(wrapper).toMatchSnapshot();
    wrapper.find('.select-some').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('handleSelected class methods should be called', () => {
    const handleSelected = jest.spyOn(InviteMember.prototype, 'handleSelected');
    const wrapper = shallow(<InviteMember {...props} />);
    wrapper.instance().handleSelected();
    expect(handleSelected).toHaveBeenCalled();
  });

  it('inviteMember class methods should be called', () => {
    const inviteMember = jest.spyOn(InviteMember.prototype, 'inviteMember');
    const wrapper = shallow(<InviteMember {...props} />);
    wrapper.instance().inviteMember({ preventDefault: jest.fn() });
    expect(inviteMember).toHaveBeenCalled();
  });

  it('isDisabled class methods should be called', () => {
    const isDisabled = jest.spyOn(InviteMember.prototype, 'isDisabled');
    const wrapper = shallow(<InviteMember {...props} />);
    wrapper.instance().isDisabled();
    expect(isDisabled).toHaveBeenCalled();
  });
});
