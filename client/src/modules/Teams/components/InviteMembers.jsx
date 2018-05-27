import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

// Actions
import { searchUser } from '../../../redux/actions/users';

// Components
import MemberCard from './MemberCard';

export class InviteMember extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSearchOutput = this.renderSearchOutput.bind(this);
    this.addMember = this.addMember.bind(this);
  }

  handleSearch(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { searchInput } = this.state;
    this.props.searchUser(searchInput);
    this.setState({ searchInput: '' });
  }

  addMember(event) {
    event.preventDefault();
  }

  renderSearchOutput(users) {
    const { searchInput } = this.state;
    return users.map(item => {
      const temp = item.email.slice(0, -11);
      const fullName = temp.split('.').join(' ');
      return (
        <MemberCard
          name={fullName}
          role={item.role}
          photo={item.photo}
          key={item.id}
        />
      );
    });
  }

  render() {
    const { searchInput } = this.state;
    const { users } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col s12">
            <form onSubmit={this.handleSubmit}>
              <div className="input-field inline col s11 custom-form">
                <i className="material-icons prefix">search</i>
                <input
                  id="invite-members"
                  type="search"
                  value={searchInput}
                  onChange={this.handleSearch}
                  placeholder="Invite members"
                />
                <span className="helper-text">search by username or email</span>
              </div>
            </form>
          </div>
        </div>
        {users && this.renderSearchOutput(users)}
        <ReactTooltip />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  users: {
    users: {
      data: { users }
    }
  }
}) => ({
  users
});

export default connect(mapStateToProps, { searchUser })(InviteMember);
