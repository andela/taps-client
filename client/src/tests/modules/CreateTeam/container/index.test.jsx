import React from 'react';
import { shallow } from 'enzyme';

import { CreateTeam, mapStateToProps } from '../../../../modules/CreateTeam/container';
import props, { state, over255Description } from '../mock/containerMock';

global.M = {
  AutoInit: () => {},
  Dropdown: { init: () => {} }
};

describe('CreateTeam container component', () => {
  let CreateTeamWrapper;
  it('calls componentDidMount lifecycle', () => {
    const spy = jest.spyOn(CreateTeam.prototype, 'componentDidMount');

    CreateTeamWrapper = shallow(<CreateTeam {...props} />);

    expect(spy).toHaveBeenCalled();

    expect(CreateTeamWrapper.find('Fragment').length).toBe(1);
  });

  it('calls componentWillReceive props lifecycle', () => {
    const spy = jest.spyOn(CreateTeam.prototype, 'componentWillReceiveProps');

    CreateTeamWrapper.setProps(props);

    expect(spy).toHaveBeenCalled();

    props.teams = {};

    CreateTeamWrapper.setProps(props);

    expect(spy).toHaveBeenCalled();

    expect(CreateTeamWrapper.find('Fragment').length).toBe(1);
  });

  it('should call handleSubmit method on form', () => {
    const event = {
      preventDefault: () => true,
    };

    CreateTeamWrapper.instance().setState(state);

    CreateTeamWrapper.instance().handleSubmit(event);

    state.description = over255Description;

    CreateTeamWrapper.instance().setState(state);

    CreateTeamWrapper.instance().handleSubmit(event);

    state.description = 'abac';

    CreateTeamWrapper.instance().setState(state);

    CreateTeamWrapper.instance().handleSubmit(event);

    expect(CreateTeamWrapper.find('Form').length).toBe(1);
  });

  it('should call handleChange method on form', () => {
    const event = {
      preventDefault: () => true,
      target: {
        name: 'taps',
      }
    };

    CreateTeamWrapper.instance().setState(state);

    CreateTeamWrapper.instance().handleChange(event);

    expect(CreateTeamWrapper.find('Form').length).toBe(1);
  });

  it('should call menuChange method on form', () => {
    const event = {
      preventDefault: () => true,
      target: {
        name: 'taps',
      }
    };

    CreateTeamWrapper.instance().setState(state);

    CreateTeamWrapper.instance().menuChange(event, {});

    expect(CreateTeamWrapper.find('Form').length).toBe(1);
  });

  it('calls componentWillUnmount props lifecycle', () => {
    const spy = jest.spyOn(CreateTeam.prototype, 'componentWillUnmount');

    CreateTeamWrapper.unmount();

    expect(spy).toHaveBeenCalled();
  });

  it('should call the handleModalState method', () => {
    props.teams.showModal = true;

    CreateTeamWrapper = shallow(<CreateTeam {...props} />);

    CreateTeamWrapper.find('VisualFeedback').props().modalState();

    expect(CreateTeamWrapper.find('Form').length).toBe(1);
  });
});

describe('Test for mapStateToProps', () => {
  const state = {
    teams: 'taps',
    isLoading: false,
  };

  const result = mapStateToProps(state);

  it('should have props teams', () => {
    expect(result.teams).toBe('taps');
  });

  it('should have props isFetching', () => {
    expect(result.isFetching).toBe(false);
  });
});
