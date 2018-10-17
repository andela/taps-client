/* eslint max-nested-callbacks:off */
import React from 'react';
import { shallow } from 'enzyme';

import { ShareLink, mapStateToProps } from '../../../../modules/Teams/components/ShareLink';

const sampleProps = {
  teamId: '',
  accounts: []
};

const getShallow = (props = {}) => shallow(<ShareLink
  {...sampleProps} {...props} />);
describe('Testing InviteForm', () => {
  describe('mapStateToProps', () => {
    it('should  map state correctly', () => {
      const mockAccount = 'mock-account';
      const mockTeam = { id: '123' };
      const mockTeamArr = [{ team: mockTeam }];
      const mockState = {
        accounts: {
          accounts: {
            data: { accounts: mockAccount }
          }
        },
        teams: {
          members: {
            data: { memberships: mockTeamArr }
          }
        }
      };

      const mappedProps = mapStateToProps(mockState);
      console.log(mappedProps);
      expect(mappedProps.accounts)
        .toBe(mockAccount);
      expect(mappedProps.team)
        .toEqual(mockTeam);
    });
  });
  describe('the components rendered', () => {
    it('should match snapshots', () => {
      const shallowObj = getShallow();
      expect(shallowObj)
        .toMatchSnapshot();
    });

    it('should render an InviteForm with "Generate Link"  when sharedLink is falsy', () => {
      const shallowObj = getShallow();

      expect(shallowObj.find('InviteForm').length)
        .toBe(1);

      expect(shallowObj.find('InviteForm').prop('buttonCaption'))
        .toBe('Generate Link');
    });
  });


  describe('the methods in the component', () => {
    describe('handleSelected', () => {
      it('should setState with accounts', () => {
        const shallowObj = getShallow();
        const selectedOption = ['mockValue'];
        shallowObj.instance()
          .handleSelected(selectedOption);
        const accounts = shallowObj.state('accounts');
        expect(accounts)
          .toBe(selectedOption);
      });
    });


    describe('submitForm', () => {
      it('should set sharedLink', () => {
        const shallowObj = getShallow({ team: { name: 'mock-name' } });
        const setStateSpy = jest.spyOn(shallowObj.instance(), 'setState');
        const mockEvent = {
          preventDefault: jest.fn()
        };
        shallowObj.instance()
          .submitForm(mockEvent);
        expect(setStateSpy)
          .toHaveBeenCalled();
      });
    });
    describe('handleRoleChange', () => {
      it('should setState with the value of the target.name and target.value ', () => {
        const shallowObj = getShallow();
        const setStateSpy = jest.spyOn(shallowObj.instance(), 'setState');
        const sampleObj1 = { name: 'sample-one', value: 'mock-value' };
        const sampleObj2 = { name: 'sample-one', value: 'mock-value' };
        const mockEvent = {
          preventDefault: jest.fn(),
          target: sampleObj1
        };
        shallowObj.instance()
          .handleRoleChange(mockEvent);
        expect(setStateSpy)
          .toHaveBeenCalled();
        expect(shallowObj.state(sampleObj1.name))
          .toBe(sampleObj1.value);

        mockEvent.target = sampleObj2;
        shallowObj.instance()
          .handleRoleChange(mockEvent);
        expect(setStateSpy)
          .toHaveBeenCalled();
        expect(shallowObj.state(sampleObj2.name))
          .toBe(sampleObj2.value);
      });
    });
    describe('copyText', () => {
      it('should set state', () => {
        const shallowObj = getShallow();
        const setStateSpy = jest.spyOn(shallowObj.instance(), 'setState');
        shallowObj.instance()
          .copyText();
        expect(setStateSpy)
          .toHaveBeenCalled();

        const copyPrompt = shallowObj.state('copyPrompt');
        expect(copyPrompt)
          .toBe('Copied to clipboard');
      });
    });

    describe('isDisabled', () => {
      it('should set ismultiSelectDisabled to true when value is not select', () => {
        const shallowObj = getShallow();
        const setStateSpy = jest.spyOn(shallowObj.instance(), 'setState');
        shallowObj.instance()
          .isDisabled();
        expect(setStateSpy)
          .toHaveBeenCalled();

        const ismultiSelectDisabled = shallowObj.state('ismultiSelectDisabled');
        expect(ismultiSelectDisabled)
          .toBe(true);
      });

      it('should set ismultiSelectDisabled to false when value is equal to select', () => {
        const shallowObj = getShallow();
        const setStateSpy = jest.spyOn(shallowObj.instance(), 'setState');
        shallowObj.instance()
          .isDisabled('select');
        expect(setStateSpy)
          .toHaveBeenCalled();

        const ismultiSelectDisabled = shallowObj.state('ismultiSelectDisabled');
        expect(ismultiSelectDisabled)
          .toBe(false);
      });
    });
  });
});
