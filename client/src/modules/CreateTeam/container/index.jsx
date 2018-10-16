import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { createTeam, clearTeams, modalState } from '../../../redux/actions/teams';

//components
import Navbar from '../../common/Navbar';
import Form from '../components/Form';

// toast
import { errorMessage } from '../../../toasts';
import VisualFeedback from '../../../toasts/VisualFeedback';

/**
 * @class
 * @constructor
 */
export class CreateTeam extends Component {
  static propTypes = {
    teams: PropTypes.object.isRequired,
    createTeam: PropTypes.func.isRequired,
    clearTeams: PropTypes.func.isRequired,
    modalState: PropTypes.func.isRequired,
    apiMessage: PropTypes.object.isRequired,
    isFetching: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      visibility: false,
      submitting: false,
      integrations: {
        github: []
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    const elem = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(elem, {
      constrainWidth: false,
      coverTrigger: false,
      inDuration: 400
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teams.data && nextProps.teams.data.data) {
      nextProps.history.push('/teams');
    }
  }

  componentWillUnmount() {
    this.props.clearTeams();
  }

  /**
   * @description handles form submission
   * @param {object} event
   * @returns {function} createTeam
   */
  handleSubmit(event) {
    event.preventDefault();
    const { name, visibility, description, integrations } = this.state;
    const data = {
      name,
      description,
      private: visibility,
      integrations
    };
    if (!name.trim() || !description.trim()) {
      return errorMessage('All fields are required');
    }
    if (description.length > 255) {
      return errorMessage('Team description too long');
    }
    this.props.createTeam(data);
    this.setState(prevState => ({
      submitting: !prevState.submitting
    }));
  }

  /**
   * @description handles input change
   * @param {object} event
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description handles integration account dropdown
   * @param {event}
   * @param {item} selected items
   */
  menuChange = (event, item) => {
    this.setState({
      integrations: {...this.state.integrations, [item.name]: item.value }
    })
  }

  /**
   * @description controls modal visibility
   * @param {bool} bool
   */
  handleModalState = (bool) => {
    this.props.modalState(bool);
    return this.props.history.push('/teams');
  }

  render() {
    const {
      name, description, visibility, github
    } = this.state;
    const { showModal } = this.props.teams
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          {showModal && <VisualFeedback modalState={this.handleModalState}
           response={this.props.apiMessage} isModalOpened={showModal} />}
          <div className="row valign-wrapper">
            <Form
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              menuChange={this.menuChange}
              name={name}
              desc={description}
              checked={visibility}
              github={github}
              submitting={this.props.isFetching.isLoading}
            />
          </div>
          }
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({ teams, isLoading }) => ({
  teams: teams,
  apiMessage: teams.apiResponse,
  isFetching: isLoading
});

export default connect(mapStateToProps, { createTeam, clearTeams, modalState })(CreateTeam);
