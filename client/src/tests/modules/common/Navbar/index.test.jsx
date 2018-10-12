import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../../../../modules/common/Navbar';

describe('<Navbar />', () => {
  let wrapper;
  const onClick = jest.fn();
  const checkUserRequest = jest.fn();
  const auth = {
    name: 'Taps Client'
  };
  const requestsReducer = {
    error: '',
    success: ''
  };
  document.getElementById = jest.fn(() => ({
    focus: jest.fn()
  }));
  beforeEach(() => {
    wrapper = shallow(<Navbar
      switchContent={onClick}
      showTabs
      showIcon
      auth={auth}
      handleSubmit={onClick}
      signOut={onClick}
      id="search"
      requestsReducer={requestsReducer}
      checkUserRequest={checkUserRequest}
    />);
  });
  it('should mount without crashing', () => {
    expect(wrapper.length).toBe(1);
  });
  it('should click projects', () => {
    wrapper.find('.projects').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
  it('should click members', () => {
    wrapper.find('.members').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
  it('should click account', () => {
    wrapper.find('.account').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
  it('should show search bar', () => {
    wrapper.find('#showSearchBar').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
  it('should show search bar', () => {
    wrapper.find('#showSearchBar2').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
  it('should show search bar', () => {
    wrapper.find('#showSearchBar3').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
  it('should test handleSearch method', () => {
    wrapper.instance().handleSearch({ preventDefault: jest.fn() });
    expect(wrapper.instance().state.showSearchBar).toBe(false);
  });
  it('should test signOut method', () => {
    wrapper.instance().signOut({ preventDefault: jest.fn() });
    expect(onClick).toHaveBeenCalled();
  });
  it('should test toggleState', () => {
    jest.useFakeTimers();
    wrapper.instance().toggleState('showSearchBar');
    setTimeout(() => {
      document.getElementById();
    }, 100);
    jest.runAllTimers();
  });
});
