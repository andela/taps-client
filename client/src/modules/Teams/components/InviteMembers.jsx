import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Select, { components } from 'react-select';

// Actions
import { searchUser, clearUser } from '../../../redux/actions/users';

export class InviteMember extends Component {
  static propTypes = {
    searchUser: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      accounts: { value: 'ghoullies-bot', label: 'ghoullies-bot', type: 'slack_channel' },
      ismultiSelectDisabled: false,
      selectAllDisabled: true,
      user: {}
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSearchOutput = this.renderSearchOutput.bind(this);
    // this.addMember = this.addMember.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.inviteMember = this.inviteMember.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.selectUser = this.selectUser.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.props.users[0];
    const temp = user.email.slice(0, -11);
    const fullName = temp.split('.').join(' ');
    this.setState({ searchInput: fullName, user });
    this.props.clearUser();
  }

  handleSearch(event) {
    this.setState({ searchInput: event.target.value });
    const { searchInput } = this.state;
    this.props.searchUser(searchInput);
  }

  renderSearchOutput(users) {
    return users.map(item => {
      const temp = item.email.slice(0, -11);
      const fullName = temp.split('.').join(' ');
      return (
        <div className={`user-placeholder ${this.state.visibility}`} key={item.id}>
          <label role="button" onClick={() => this.selectUser(fullName, item)}>
            <img src={item.photo} className="search-img" alt="user" />
            <label className="user-label">{fullName} &lt;{item.email}&gt;</label>
          </label>
        </div>
      );
    });
  }

  handleSelected(selectedOption) {
    this.setState({ accounts: selectedOption });
    console.log(selectedOption);
  }

  inviteMember(e) {
    e.preventDefault();
    const { addMember } = this.props;
    const userId = this.state.user.id;
    addMember(e, userId);
    if (!this.state.ismultiSelectDisabled && this.state.selectAllDisabled) {
      const { accounts } = this.state;
      console.log(accounts);
    } else if (this.state.ismultiSelectDisabled && !this.state.selectAllDisabled) {
    // const { addMember } = this.props;
    }
  }

  isDisabled(value) {
    if (value === 'select') {
      this.setState({ ismultiSelectDisabled: false, selectAllDisabled: true });
    } else {
      this.setState({ ismultiSelectDisabled: true, selectAllDisabled: false });
    }
  }

  selectUser(name, item) {
    this.setState({ searchInput: name, user: item });
    this.props.clearUser();
  }

  render() {
    const { searchInput } = this.state;
    const { users } = this.props;

    const MultiValueLabel = (props) => (
      <components.MultiValueLabel {...props}>
        {props.data.type === 'github_repo' ?
          <label className="select-account-label">
            <img src="/resources/images/github.svg" className="account-icon" alt="github" />
            {` ${props.data.label}`}
          </label> :
          <label>
            {props.data.type === 'slack_channel' ?
              <label className="select-account-label">
                <img src="/resources/images/slack.png" className="account-icon" alt="slack" />
                {` ${props.data.label}`}
              </label> :
              <label className="select-account-label">
                <img src="/resources/images/pt.png" className="account-icon" alt="pt" />
                {` ${props.data.label}`}
              </label>}
          </label>}
      </components.MultiValueLabel>
    );

    const dropDown = (props) => (
      <components.Option {...props}>
        {props.data.type === 'github_repo' ?
          <label className="select-account-dropdown">
            <img src="/resources/images/github.svg" className="account-icon" alt="github" />
            {` ${props.data.label}`}
          </label> :
          <label>
            {props.data.type === 'slack_channel' ?
              <label className="select-account-dropdown">
                <img src="/resources/images/slack.png" className="account-icon" alt="slack" />
                {` ${props.data.label}`}
              </label> :
              <label className="select-account-dropdown">
                <img src="/resources/images/pt.png" className="account-icon" alt="pt" />
                {` ${props.data.label}`}
              </label>}
          </label>}
      </components.Option>
    );

    const options = [
      { value: 'ah-tap', label: 'ah-tap', type: 'github_repo' },
      { value: 'ghoullies-bot', label: 'ghoullies-bot', type: 'slack_channel' },
      { value: 'Ghoullies-taps', label: 'Ghoullies-taps', type: 'pt_project' }
    ];

    return (
      <React.Fragment>
        <div className="row">
          <div className="col s12">
            <form onSubmit={this.handleSubmit}>
              <div className="input-field inline col s11 custom-form search-result">
                <i className="material-icons prefix">search</i>
                <input
                  id="invite-members"
                  type="search"
                  value={searchInput}
                  onChange={this.handleSearch}
                  placeholder="Invite members"
                  autoComplete="off"
                />
                <span className="helper-text user-placeholder">search by username or email</span>
                {users && this.renderSearchOutput(users)}
              </div>

            </form>
          </div>
        </div>

        <ReactTooltip />
        {this.state.searchInput &&
        <div className="row account-row">
          <div className="col s2" />
          <div className="col s7">
            <h5 className="center-align">
              Add
              <span className="member-username">
                {` ${this.state.searchInput}`}
              </span> to any of these tools
            </h5>
            <div className="col s12 team-account-wrapper">
              <form className="row team-accout-form">
                <div className="">
                  <label>
                    <input className="with-gap select-all" name="select" type="radio" onClick={() => this.isDisabled('all')} />
                    <span><img src="/resources/images/select.png" alt="icon" height="30px" width="30px" /></span>
                  </label>
                  <span className="span">Add user to all accounts</span>
                </div>
                <br />
                <div>
                  <label>
                    <input onClick={() => this.isDisabled('select')} className="with-gap select-some" name="select" type="radio" defaultChecked />
                    <span />
                    <label className="select">
                      <Select
                        closeMenuOnSelect={false}
                        components={{ MultiValueLabel, Option: dropDown }}
                        styles={{
                          multiValueRemove: (base) => ({ ...base, fontSize: '15px', color: '#385cd7' })
                        }}
                        defaultValue={[options[1]]}
                        isMulti
                        options={options}
                        onChange={this.handleSelected}
                        isDisabled={this.state.ismultiSelectDisabled}
                      />
                    </label>
                  </label>
                </div>
                <button onClick={this.inviteMember} className="btn account-btn" type="submit" name="action">
                  Invite
                </button>
              </form>
            </div>
          </div>
          <div className="col s3" />
        </div>
        }
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

export default connect(mapStateToProps, { searchUser, clearUser })(InviteMember);
