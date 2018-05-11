import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { fetchTeams, fetchUsers } from '../../../actions/teams';

// components
import Navbar from '../../common/Navbar';
import Card from '../components/Cards';
import Modal from '../../common/Modals/AddMember';
import Footer from '../../common/Footer';

class Home extends Component {
  static propTypes = {
    fetchTeams: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    teams: PropTypes.shape({
      teams: PropTypes.array.isRequired
    }).isRequired,
    users: PropTypes.shape({
      users: PropTypes.object.isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    auth: PropTypes.shape({
      loggedIn: PropTypes.bool
    }).isRequired
  };

  componentDidMount() {
    M.AutoInit();
    const elem = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(elem, {
      constrainWidth: false,
      coverTrigger: false,
      inDuration: 400
    });
    this.props.fetchTeams();
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.loggedIn) nextProps.history.push('/');
  }

  render() {
    const { teams, users } = this.props;
    return (
      <div>
        <Navbar />
        <Modal />
        <div className="row mt-2">
          <Card teams={teams} users={users} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
  users: state.users,
  auth: state.auth
});

export default connect(mapStateToProps, { fetchTeams, fetchUsers })(Home);
