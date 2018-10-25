import React from 'react';
import { shallow } from 'enzyme';
import InviteForm from '../../../../modules/Teams/components/InviteForm';


const sampleProps = {
  options: [],
  isDisabled: () => {},
  handleSelected: () => {},
  formTitle: '',
  ismultiSelectDisabled: false,
  submitForm: () => {},
  buttonCaption: 'button caption',
  sharedLink: '',
  copyToClipboard: () => {},
  copyText: 'mock text'
};

const getShallow = (props = {}) => shallow(<InviteForm
  {...sampleProps} {...props} />);
describe('Testing InviteForm', () => {
  describe('the components rendered', () => {
    it('should match snapshots', () => {
      const shallowObj = getShallow();
      expect(shallowObj)
        .toMatchSnapshot();
    });
  });


  describe('the components rendered', () => {
    it('should call isDisab', () => {
      const isDisabledSpy = jest.fn();
      const shallowObj = getShallow({ isDisabled: isDisabledSpy });

      shallowObj.find('#select-all-option')
        .simulate('click');
      expect(isDisabledSpy)
        .toHaveBeenCalled();
    });
    it('should call isDisab', () => {
      const isDisabledSpy = jest.fn();
      const shallowObj = getShallow({ isDisabled: isDisabledSpy });

      shallowObj.find('#select-accounts-option')
        .simulate('click');
      expect(isDisabledSpy)
        .toHaveBeenCalled();
    });


    it('should call copyToClipboard clipboard', () => {
      const copySpy = jest.fn();
      const shallowObj = getShallow({ copyToClipboard: copySpy });

      shallowObj.find('CopyToClipboard')
        .simulate('copy');

      expect(copySpy)
        .toHaveBeenCalled();
    });
  });
});
