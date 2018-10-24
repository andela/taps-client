import React from 'react';
import { shallow } from 'enzyme';
import IntegrationTool from '../../modules/common/Modals/integrationTool';

describe('Integration Tool Modal test-suite', () => {
  const props = {
    goBack: jest.fn(),
    tool: 'github',
    visible: false
  };

  it('renders properly', () => {
    const IntegrationToolWrapper = shallow(<IntegrationTool {...props} />);
    expect(IntegrationToolWrapper.exists()).toBeTruthy();
  });

  it('should close the modal when go-back is clicked', () => {
    const IntegrationToolWrapper = shallow(<IntegrationTool {...props} />);
    IntegrationToolWrapper.find('.go-back').simulate('click');
    expect(props.goBack).toHaveBeenCalled();
  });
});
