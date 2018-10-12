import React from "react";
import { shallow } from "enzyme";
import { SignIn, mapStateToProps } from "../../../../modules/Auth/container";
import { props, responses, expected } from "../authMockData";

describe("<Testing the redux container />", () => {
  it("should mount without crashing", () => {
    const wrapper = shallow(<SignIn {...props.containerProps} />);
    expect(wrapper).toMatchSnapshot();
  });


  it("should test for returned errors on authentication ", () => {
    const wrapper = shallow(<SignIn {...props.containerProps} />);
    wrapper.instance().componentWillReceiveProps(props.containerPropsErrors);
    const actual = wrapper.instance().state;
    expect(actual).toEqual(expected.notSuccessful);
  });


  it("should test for returned messages on authentication ", () => {
    const wrapper = shallow(<SignIn {...props.containerProps} />);
    wrapper.instance().componentWillReceiveProps(props.containerPropsMessage);
    const actual = wrapper.instance().state;
    expect(actual).toEqual(expected.withMessage);
  });


  it("should test for successful authentication ", () => {
    const wrapper = shallow(<SignIn {...props.containerProps} />);
    wrapper.instance().componentWillReceiveProps(props.containerPropsData);
    const actual = props.containerPropsData.history.push;
    expect(actual).toHaveBeenCalled();
  });


  it("should call the complete signUp method", () => {
    const spy = jest.fn();
    const propsNew = { signUp: spy };
    const mockWrapper = shallow(<SignIn
      {...props.containerProps}
      {...propsNew} />);
    mockWrapper.instance().completeSignUp({ preventDefault: jest.fn() });
    expect(spy).toHaveBeenCalled();
  });


  it('Should call the onChange method', () => {
    const wrapper = shallow(<SignIn {...props.containerProps} />);
    wrapper.instance().handleChange({ target: { name: 'name', value: 'victor' } });
    const actual = wrapper.instance().state.name;
    expect(actual).toEqual('victor');
  });


  it('Should call the handleSuccess method', () => {
    const spy = jest.fn();
    const propsNew = { signIn: spy };
    const mockWrapper = shallow(<SignIn
      {...props.containerProps}
      {...propsNew} />);
    mockWrapper.instance().handleSuccess(responses.success);
    expect(spy).toHaveBeenCalled();
  });


  it('Should call the handleSuccess method', () => {
    const wrapper = shallow(<SignIn {...props.containerProps} />);
    wrapper.instance().handleSuccess(responses.error);
    expect(wrapper).toMatchSnapshot();
  });


  it('Should call the handleFailure method', () => {
    const wrapper = shallow(<SignIn {...props.containerProps} />);
    wrapper.instance().handleFailure(responses.error);
    const actual = wrapper.instance().state.showForm;
    expect(actual).toEqual(false);
  });


  it('testing map state To Props', () => {
    const storeState = mapStateToProps({
      auth: true
    });
    const { auth } = storeState;
    expect(auth).toBe(true);
  });
});
