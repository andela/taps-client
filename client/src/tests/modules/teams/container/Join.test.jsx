import React from "react";
import { shallow } from "enzyme";
import { Join } from "../../../../modules/Teams/container/Join";

const requestData = {
  userId: '499cd73a-c11c-43ca-9245-d09ce576c2ae',
  teamId: '499cd73a-c11c-43ca-9245-d09ce576c2ae',
  type: 'member_request',
  data: 'developer'
};

const match = {
  params: {
    joinToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiI0OTljZDczYS1jMTFjLTQzY2EtOTI0NS1kMDljZTU3NmMyYWUiLCJpYXQiOjE1Mzk5NjEyNzAsImV4cCI6MTU0MDU2NjA3MH0.vybeVqtJMKVP13CaRxxc9kdKM4udnwUa50G2RNAPGhU/'
  }
};

const history = {
  push: jest.fn()
};


describe("<Testing the redux container />", () => {
  const wrapper = shallow(<Join
    requestData={requestData}
    match={match}
    makeRequest={jest.fn()}
    history={history}
  />);
  it("should mount without crashing", () => {
    expect(wrapper.length).toBe(1);
  });
  it("should test joinTeam method", () => {
    wrapper.instance().joinTeam();
    expect(wrapper.instance().props.makeRequest).toHaveBeenCalled();
  });
});
