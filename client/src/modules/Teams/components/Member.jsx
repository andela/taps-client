import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import autoBind from 'auto-bind';

// components
import Gallery from './Gallery';
import InviteMembers from './InviteMembers';
import ShareLinkComponent from './ShareLink';

export class Member extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderContent(content) {
    const { members, addNewMember, teamId } = this.props;
    switch (content) {
    case 'see members':
      return members.map(member => (
        <Gallery data={member} key={member.user.id} />
      ));
      break;
    case 'invite members':
      return <InviteMembers addMember={addNewMember} />;
      break;

    case 'share link':
      return <ShareLinkComponent teamId={teamId} />;
      break;
    default:
      return <InviteMembers addMember={addNewMember} />;
      break;
    }
  }
  renderMembers() {
    const { members } = this.props;
    return members.map(member => (
      <Gallery data={member} key={member.user.id} />
    ));
  }

  checkTeamLead() {
    const { members } = this.props;
    const currentUserId = localStorage.getItem('userId');
    const lead = members.find(member => (member.role === 'lead' && member.userId === currentUserId));
    return !!(lead);
  }

  render = () => {
    const {
      expanded, toggleSidenav, chooseContent, content
    } = this.props;

    const showSidenav = expanded ?
      'side-nav-width-expanded' :
      'side-nav-width-collapsed';
    const contentWidth = expanded ? 'offset-s3 s9' : ' offset-s1 s11';
    /*eslint-disable*/
    return (
      <React.Fragment>
        <aside className="col s3 sidebar-wrapper">
          <div className={`sidebar ${showSidenav}`}>
            <ul className="sidebar-nav">
              <li className="nav-menu">
                <a href="#!" onClick={toggleSidenav}>
                  <i className="material-icons">menu</i>
                </a>
              </li>
            </ul>
            {!expanded && (
              <div className="sidebar-inner">
                <ul className="sidebar-nav">
                <li className="nav-submenu" data-tip="see members">
                    <a href="#!">
                      <i className="material-icons">group</i>
                    </a>
                  </li>
                { this.checkTeamLead() && (
                  <li className="nav-submenu" data-tip="invite new member">
                    <a href="#!">
                      <i className="material-icons">person_add</i>
                    </a>
                  </li>
                   )
                  }
                </ul>
                <ReactTooltip />
              </div>
            )}
            {expanded && (
              <div className="sidebar-inner">
                <ul className="sidebar-nav">
                <li
                    className="nav-link "
                    onClick={event => chooseContent(event, 'see members')}
                  >
                    <i className="material-icons left nav-icons">group</i>
                    <span className="nav-icons">See members</span>
                  </li>
                { this.checkTeamLead() && (
                  <li
                    className="nav-link"
                    onClick={event => chooseContent(event, 'invite members')}
                  >
                    <i className="material-icons left nav-icons">person_add</i>
                    <span className="nav-icons">Invite new members</span>
                  </li>
                )
                }

                 { this.checkTeamLead() && (
                <li
                    className="nav-link "
                    onClick={event => chooseContent(event, 'share link')}
                  >
                    <i className="material-icons left nav-icons">share</i>
                    <span className="nav-icons">Share invite link</span>
                  </li>
                )
                }
                  
                </ul>
              </div>
            )}
          </div>
        </aside>
        <section className="row">
          <div className={`col ${contentWidth} mt-40`}>
            <div className="row">{this.renderContent(content)}</div>
          </div>
        </section>
      </React.Fragment>
    );
  };
}

Member.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleSidenav: PropTypes.func.isRequired
};

export default Member;
