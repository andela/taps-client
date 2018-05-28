import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

// import { NavLink } from 'react-router-dom';
// actions
import { fetchMembers, addMember } from '../../../redux/actions/teams/members';
// Components
import Navbar from '../../common/Navbar';
import Project from '../components/Project';
import Member from '../components/Member';
import Account from '../components/Account';
// import Form from '../components/Form';

class Teams extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ id: PropTypes.string })
    }).isRequired,
    fetchMembers: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.shape({
        memberships: PropTypes.array
      })
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      content: 'project',
      expanded: true
    };

    this.renderContent = this.renderContent.bind(this);
    this.switchContent = this.switchContent.bind(this);
    this.toggleSidenav = this.toggleSidenav.bind(this);
    this.addNewMember = this.addNewMember.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    const {
      match: {
        params: { id }
      }
    } = this.props;
    this.props.fetchMembers(id);
  }

  switchContent(event, content) {
    event.preventDefault();
    this.setState(() => ({ content }));
  }

  addNewMember(event, userId) {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    event.preventDefault();
    this.props.addMember(id, userId);
  }

  toggleSidenav(event) {
    event.preventDefault();
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  renderContent(content) {
    const { expanded } = this.state;
    const {
      members: {
        data: { memberships }
      }
    } = this.props;
    switch (content) {
    case 'account':
      return (
        <Account expanded={expanded} toggleSidenav={this.toggleSidenav} />
      );
      break;
    case 'member':
      return (
        <Member
          expanded={expanded}
          toggleSidenav={this.toggleSidenav}
          members={memberships}
          addNewMember={this.addNewMember}
        />
      );
      break;
    default:
      return (
        <Project expanded={expanded} toggleSidenav={this.toggleSidenav} />
      );
      break;
    }
  }

  render() {
    const { content } = this.state;
    return (
      <div className="team-bg">
        <Navbar showTabs switchContent={this.switchContent} />
        {this.renderContent(content)}
        <ReactTooltip />
      </div>
    );
  }
}

const mapStateToProps = ({ teams: { members, addMember } }) => ({
  members
});

export default connect(mapStateToProps, { fetchMembers, addMember })(Teams);
