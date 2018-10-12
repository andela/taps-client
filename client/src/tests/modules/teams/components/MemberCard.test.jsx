import React from 'react';
import { shallow } from 'enzyme';
import MemberCard from '../../../../modules/Teams/components/MemberCard';


describe('<MemberCard />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<MemberCard
      name="Kevin"
      role="Admin"
      photo="https://images.pexels.com/photos/573294/pexels-photo-573294.jpeg?cs=srgb&dl=art-back-view-black-573294.jpg&fm=jpg"
      remove=""
      addMember={jest.fn}
      userId={1}
    />);
    console.log(wrapper.find('img').props().src);
    expect(wrapper.find('img').props().src).toBe('https://images.pexels.com/photos/573294/pexels-photo-573294.jpeg?cs=srgb&dl=art-back-view-black-573294.jpg&fm=jpg');
    expect(wrapper.find('img').props().alt).toBe('displayPhoto');
    expect(wrapper.find('h5').props().children).toBe('Kevin');
  });
});
