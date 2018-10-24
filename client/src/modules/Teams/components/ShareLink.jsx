import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import jwt from 'jsonwebtoken';
import InviteForm from './InviteForm';


export class ShareLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: { value: 'ghoullies-bot', label: 'ghoullies-bot', type: 'slack_channel' },
      ismultiSelectDisabled: false,
      sharedLink: ''
    };

    this.handleSelected = this.handleSelected.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
    this.copyText = this.copyText.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  handleSelected(selectedOption) {
    this.setState({ accounts: selectedOption });
  }

  submitForm(e) {
    e.preventDefault();

    const { accounts, role } = this.state;
    const { team } = this.props;
    const token = jwt.sign({
      teamName: team.name,
      accounts,
      teamId: team.id,
      role
    }, process.env.JSON_SECRET, { expiresIn: '1week' });

    this.setState({
      sharedLink: `${window.location.host}/join/${token}/`
    });
  }
  copyText() {
    this.setState({ copyPrompt: 'Copied to clipboard' });
  }

  handleRoleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }
  isDisabled(value) {
    if (value === 'select') {
      this.setState({ ismultiSelectDisabled: false });
    } else {
      this.setState({
        ismultiSelectDisabled: true
      });
    }
  }


  render() {
    const { sharedLink, copyPrompt } = this.state;
    const { accounts } = this.props;
    const accountOptions = accounts.map(account => ({
      value: account.name,
      label: account.name,
      type: account.type,
      accountId: account.id,
      name: account.name
    }));
    return (
      <React.Fragment>
        <ReactTooltip />
        <InviteForm
          formTitle="Generate Shareable Link"
          options={accountOptions}
          handleSelected={this.handleSelected}
          isDisabled={this.isDisabled}
          ismultiSelectDisabled={this.state.ismultiSelectDisabled}
          submitForm={this.submitForm}
          buttonCaption={sharedLink ? "Regenerate Link" : "Generate Link"}
          sharedLink={sharedLink}
          copyToClipboard={this.copyText}
          copyText={copyPrompt}
          handleRoleChange={this.handleRoleChange}
        />
      </React.Fragment>
    );
  }
}

export const mapStateToProps = ({

  accounts: {
    accounts: {
      data: { accounts }
    }
  },
  teams: { members: { data: { memberships: [team] } } }

}) => ({ accounts, team: { ...team.team } });

export default connect(mapStateToProps, null)(ShareLink);

