import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Select, { components } from 'react-select';

// Actions
import { searchUser, clearUser } from '../../../redux/actions/users';
import { modalState } from '../../../redux/actions/teams';
import VisualFeedback from '../../../toasts/memberInvitationStatus';

export class InviteMember extends Component {
  static propTypes = {
    searchUser: PropTypes.func.isRequired,
    addMember: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      accounts: [this.multiSelectOptions()[0]],
      ismultiSelectDisabled: false,
      selectAllDisabled: true,
      user: null,
      formClass: 'formDefault'
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSearchOutput = this.renderSearchOutput.bind(this);
    // this.addMember = this.addMember.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.inviteMember = this.inviteMember.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.multiSelectOptions = this.multiSelectOptions.bind(this);
    this.handleModalState = this.handleModalState.bind(this);
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
    const searchInput = event.target.value;
    this.setState({ searchInput, formClass: 'formActive', user: null });
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.searchUser(searchInput);
    }, 500);
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
    let accounts;
    if (!this.state.ismultiSelectDisabled && this.state.selectAllDisabled) {
      // eslint-disable-next-line prefer-destructuring
      accounts = this.state.accounts;
    } else if (this.state.ismultiSelectDisabled && !this.state.selectAllDisabled) {
      accounts = this.props.accounts.map(account => {
        const accountObj = {
          type: account.type,
          accountId: account.id,
          name: account.name
        };
        return accountObj;
      });
    }
    const data = {
      accounts,
      userId
    };
    addMember(e, data);
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

  toggleSearch() {
    if (!this.state.searchInput) {
      this.setState({ formClass: 'formDefault' });
      this.props.clearUser();
    }
  }

  multiSelectOptions() {
    return this.props.accounts.map(account => ({
      value: account.name,
      label: account.name,
      type: account.type,
      accountId: account.id,
      name: account.name
    }));
  }

  /**
   * @description controls modal visibility
   * @param {bool} bool
   */
  handleModalState(bool) {
    this.props.modalState(bool);
  }


  render() {
    const { searchInput } = this.state;
    const { users, showModal } = this.props;

    const MultiValueLabel = (props) => (
      <components.MultiValueLabel {...props}>
        {props.data.type === 'github_repo' ?
          <label className="select-account-label">
            <img src="/resources/images/github.svg" className="account-icon" alt="github" />
            {` ${props.data.label}`}
          </label> :
          <label>
            {props.data.type === 'slack_channel' || props.data.type === 'slack_private_channel' ?
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
            {props.data.type === 'slack_channel' || props.data.type === 'slack_private_channel' ?
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

    return (
      <React.Fragment>
        <div className="row">
          <div className="col s12">
            <form onSubmit={this.handleSubmit} className={this.state.formClass}>
              <div className="input-field inline col s10">
                <h5 className="center-align label">Search New Member To Invite</h5>
              </div>
              <div className="input-field inline col s10 custom-form search-result search">
                <i className="material-icons prefix search-icon">search</i>
                <input
                  id="invite-members"
                  type="search"
                  value={searchInput}
                  onChange={this.handleSearch}
                  placeholder="Invite members"
                  autoComplete="off"
                  onBlur={this.toggleSearch}
                />
                <span className="helper-text user-placeholder">search by username or email</span>
                {users && this.renderSearchOutput(users)}
              </div>

            </form>
          </div>
        </div>

        <ReactTooltip />
        {showModal && <VisualFeedback
          modalState={this.handleModalState}
          response={this.props.memberInvitation} isModalOpened={showModal} />}
        {this.state.user &&
        <div className="row account-row">
          <div className="col s2" />
          <div className="col s7">
            <h5 className="center-align">
              Add
              <span className="member-username">
                {` ${this.state.searchInput}`}
              </span> to any of these tools
            </h5>
            <div className="col s10 team-account-wrapper">
              <form className="row team-accout-form">
                <div className="">
                  <label>
                    <input className="with-gap select-all" name="select" type="radio" onClick={() => this.isDisabled('all')} />
                    <span className="span">Add user to all accounts</span>
                  </label>

                </div>
                <br />
                <div className="">
                  <label>
                    <input onClick={() => this.isDisabled('select')} className="with-gap select-some" name="select" type="radio" defaultChecked />
                    <span className="span">Add user to some accounts</span>
                  </label>

                </div>
                <div>
                  <label>
                    <label className="select multi-select">
                      <Select
                        closeMenuOnSelect={false}
                        components={{ MultiValueLabel, Option: dropDown }}
                        styles={{
                          multiValueRemove: (base) => ({ ...base, fontSize: '15px', color: '#385cd7' })
                        }}
                        defaultValue={[this.multiSelectOptions()[0]]}
                        isMulti
                        options={this.multiSelectOptions()}
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
  },
  accounts: {
    accounts: {
      data: { accounts }
    }
  },
  teams: { showModal, memberInvitation }
}) => ({
  users,
  accounts,
  showModal,
  memberInvitation
});

export default connect(
  mapStateToProps,
  {
    searchUser,
    clearUser,
    modalState
  }
)(InviteMember);
