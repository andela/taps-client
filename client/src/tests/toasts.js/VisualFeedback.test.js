import React from 'react';
import { shallow } from 'enzyme';
import VisualFeedback from '../../toasts/VisualFeedback';

describe('CreateTeam Form test-suite', () => {
  const props = {
    modalState: jest.fn(),
    isModalOpened: false,
    response: {
      team: [{ created: true, name: 'ghoulies' }]
    }
  };

  it('renders properly', () => {
    const VisualFeedbackWrapper = shallow(<VisualFeedback {...props} />);
    expect(VisualFeedbackWrapper.exists()).toBeTruthy();
  });

  it('should close the modal when ok button is clicked', () => {
    const VisualFeedbackWrapper = shallow(<VisualFeedback {...props} />);
    VisualFeedbackWrapper.find('.btn').simulate('click');
    expect(props.modalState).toHaveBeenCalled();
  });
});
