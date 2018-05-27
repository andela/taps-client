import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { createTeam, clearTeams } from '../../../redux/actions/teams';

//components
import Navbar from '../../common/Navbar';
import Form from '../components/Form';

// toast
import { errorMessage } from '../../../toasts';

class CreateTeam extends Component {
  static propTypes = {
    teams: PropTypes.shape({
      data: PropTypes.object
    }).isRequired,
    createTeam: PropTypes.func.isRequired,
    clearTeams: PropTypes.func.isRequired,
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
      submitting: false
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
    if (nextProps.teams.data) {
      this.setState(prevState => ({
        submitting: !prevState.submitting
      }));

      if (nextProps.teams.data.data) {
        nextProps.history.push('/teams');
      }
    }
  }

  componentWillUnmount() {
    this.props.clearTeams();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, visibility, description } = this.state;
    const data = {
      name,
      description,
      private: visibility
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
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const {
      name, description, visibility, submitting
    } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <div className="row valign-wrapper">
            <Form
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              name={name}
              desc={description}
              checked={visibility}
              submitting={submitting}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams
});

export default connect(mapStateToProps, { createTeam, clearTeams })(CreateTeam);
