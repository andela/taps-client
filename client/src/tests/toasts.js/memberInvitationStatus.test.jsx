import React from 'react';
import { shallow } from 'enzyme';
import MemberInvitationStatus from '../../toasts/memberInvitationStatus';

describe('MemberInvitationStatus modal tests', () => {
  const props = {
    modalState: jest.fn(),
    isModalOpened: false,
    response: [
      { invited: true, name: 'ghoulies', type: 'team' },
      { invited: true, name: 'ah-github', type: 'github_repo' },
      { invited: false, name: 'ah-slack', type: 'slack_channel' }
    ]
  };

  it('renders properly', () => {
    const VisualFeedbackWrapper = shallow(<MemberInvitationStatus {...props} />);
    expect(VisualFeedbackWrapper).toMatchSnapshot();
    expect(VisualFeedbackWrapper.exists()).toBeTruthy();
  });

  it('should close the modal when ok button is clicked', () => {
    const VisualFeedbackWrapper = shallow(<MemberInvitationStatus {...props} />);
    VisualFeedbackWrapper.find('.btn').simulate('click');
    expect(props.modalState).toHaveBeenCalled();
  });
});
