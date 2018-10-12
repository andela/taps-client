import React from "react";
import { shallow } from "enzyme";
import GoogleButton from "../../../../modules/Auth/components/GoogleButton";
import { props } from "../authMockData";

describe("<Google Button Component test />", () => {
  it("should mount without crashing", () => {
    const wrapper = shallow(<GoogleButton {...props.googleButtonProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
