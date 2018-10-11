import React from 'react';
import { shallow } from 'enzyme';
import {CreateTeam} from '../../../../modules/CreateTeam/container';

describe('CreateTeam Page test-suite', () => {
    const props = {
        history: {
          push: jest.fn(),
        },
        teams: {},
        clearTeams: jest.fn(),
        modalState: jest.fn(),
        apiMessage: {},
        isFetching: {
            isLoading: false,
        },
        createTeam: jest.fn(),
      };

      it('renders properly', () => {
        const CreateTeamWrapper = shallow(<CreateTeam {...props} />);
        expect(CreateTeamWrapper.exists()).toBeTruthy();
      });

      it('should dispatch a create team action when handleSubmit function is called ', () => {
        const CreateTeamWrapper = shallow(<CreateTeam {...props} />);
        CreateTeamWrapper.setState({
          name: 'ghoulies',
          description: 'cohort 42',
          private: false,
          integrations: {
            github: []
          }
        })
        CreateTeamWrapper.instance().handleSubmit({preventDefault: ()=> {1+1}})
        expect(props.createTeam).toHaveBeenCalled();
      })

      it('should dispatch modalState action and push action when handleModalState function is called', () => {
        const CreateTeamWrapper = shallow(<CreateTeam {...props} />);
        CreateTeamWrapper.instance().handleModalState(true)
        expect(props.modalState).toHaveBeenCalled();
        expect(props.history.push).toHaveBeenCalled()
      })

      it('should hide the notification popup when showModal props is false', () => {
        const CreateTeamWrapper = shallow(<CreateTeam {...props} />);
        expect(CreateTeamWrapper.find('VisualFeedback').exists()).toBeFalsy();
      })
})
