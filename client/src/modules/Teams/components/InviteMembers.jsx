import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Select, { components } from 'react-select';

// Actions
import { searchUser } from '../../../redux/actions/users';

// Components
import MemberCard from './MemberCard';

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
      selectAllDisabled: true
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSearchOutput = this.renderSearchOutput.bind(this);
    // this.addMember = this.addMember.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.inviteMember = this.inviteMember.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  handleSearch(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ searchInput: event.target.value });
    const { searchInput } = this.state;
    this.props.searchUser(searchInput);
    this.setState({ searchInput: '' });
  }

  renderSearchOutput(users) {
    const { addMember } = this.props;
    return users.map(item => {
      const temp = item.email.slice(0, -11);
      const fullName = temp.split('.').join(' ');
      return (
        <MemberCard
          name={fullName}
          // role={item.role}
          photo={item.photo}
          key={item.id}
          userId={item.id}
          addMember={addMember}
        />
      );
    });
  }

  handleSelected(selectedOption) {
    this.setState({ accounts: selectedOption });
    console.log(selectedOption);
  }

  inviteMember(e) {
    e.preventDefault();
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
              <div className="input-field inline col s11 custom-form team-account-wrapper">
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

export default connect(mapStateToProps, { searchUser })(InviteMember);
