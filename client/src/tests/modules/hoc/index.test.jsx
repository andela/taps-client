import React from "react";
import { shallow } from "enzyme";
import renderCards from "../../../modules/HOC";
import mockData from "./hocMockData";

describe("<Test HOC Component />", () => {
  it("should mount without crashing", () => {
    const addFavorites = jest.fn(3);
    const data = {
      teams: [
        {
          private: 'private team',
          favorite: 'red',
          progress: 25
        },
        {
          private: 'private team',
          favorite: 'red',
          progress: 65
        },
        {
          private: 'private team',
          favorite: 'red',
          progress: 244
        }
      ]
    };

    const props = {
      ...mockData,
      progressBar: data.teams,
      addFavorites
    };

    const ComponentFromHOC = renderCards(addFavorites, data);
    const wrapper = shallow(<div><ComponentFromHOC {...props} /></div>);
    expect(wrapper).toMatchSnapshot();
  });
});
