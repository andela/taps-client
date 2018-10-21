import React from 'react';
import { shallow } from 'enzyme';
import { Favorites } from '../../../../modules/Teams/components/FavoriteTeams';

import { teams } from '../teamsMockData';

describe('<Favorites />', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<Favorites team={teams} fetchFavoriteTeamsAction={jest.fn()} />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.find('p').get(0).props.children).toBe(' My Favorite teams ');
    expect(wrapper.find('p').get(1).props.className).toBe('favorite-text');
  });
});
