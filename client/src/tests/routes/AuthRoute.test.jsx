import React from 'react';
import { shallow } from "enzyme";
import { Route, Redirect } from 'react-router-dom';
import AuthRoute from "../../../src/routes/AuthRoute";
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import SignInComponent from '../../modules/Auth/container';

global.localStorage = mockLocalStorage;

const getShallow = (props = {}) => shallow(<AuthRoute {...props} />);

describe('Testing AuthRoute Route type', () => {
  describe('components rendered', () => {
    it('should match snapShot', () => {
      const shallowObj = getShallow();
      expect(shallowObj).toMatchSnapshot();
    });

    it('should always render a Route component', () => {
      const shallowObj = getShallow();
      expect(shallowObj.find(Route)
        .length).toBe(1);
    });


    it('should render a SignIn component when user is not logged in', () => {
      global.localStorage.setItem('userId', '');
      global.localStorage.setItem('role', '');
      global.localStorage.setItem('aTeamsToken', '');
      const shallowObj = getShallow();
      expect(shallowObj.find(Route)
        .length).toBe(1);
      const renderFn = shallowObj.find(Route)
        .prop('render');
      const renderedComponent = renderFn();
      expect(renderedComponent.type)
        .toBe(SignInComponent);
    });
    it('should render a Redirect when the user is logged in', () => {
      global.localStorage.setItem('userId', 'mock-user-id');
      global.localStorage.setItem('role', 'member');
      global.localStorage.setItem('aTeamsToken', 'mock-team-toke');
      const shallowObj = getShallow();
      expect(shallowObj.find(Route)
        .length).toBe(1);
      const renderFn = shallowObj.find(Route)
        .prop('render');
      const renderedComponent = renderFn();
      expect(renderedComponent.type)
        .toBe(Redirect);
    });
  });
});

