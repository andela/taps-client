import React from 'react';
import { shallow } from 'enzyme';

import AddIntegration from '../../../../modules/common/Modals/AddIntegration';

describe('Add Integration Modal', () => {
  const props = {
    isModalOpen: false,
    closeModal: jest.fn()
  };

  it('renders properly', () => {
    const AddIntegrationWrapper = shallow(<AddIntegration {...props} />);
    expect(AddIntegrationWrapper.exists()).toBeTruthy();
  });

  it('should close the modal when cancel button is clicked', () => {
    const AddIntegrationWrapper = shallow(<AddIntegration {...props} />);
    AddIntegrationWrapper.find('.integration-tool-footer').simulate('click');
    expect(props.closeModal).toHaveBeenCalled();
  });
});
