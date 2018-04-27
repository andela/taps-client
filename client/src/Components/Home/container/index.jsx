import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { fetchTeams, fetchUsers } from '../../../actions';

// components
import Navbar from '../../Common/Navbar';
import Card from '../components/Cards';
import Modal from '../../Common/Modals/AddMember';
import Footer from '../../Common/Footer';

class Home extends Component {
  static propTypes = {
    fetchTeams: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    teams: PropTypes.shape({
      teams: PropTypes.array.isRequired
    }).isRequired,
    users: PropTypes.shape({
      users: PropTypes.object.isRequired
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
  users: state.users
});

export default connect(mapStateToProps, { fetchTeams, fetchUsers })(Home);
