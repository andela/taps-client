import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

// components
import Gallery from './Gallery';
import NewMembers from './InviteMembers';

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: false
    };
    this.renderMembers = this.renderMembers.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.chooseContent = this.chooseContent.bind(this);
  }

  chooseContent(event, content) {
    console.log('clicked=========>', content);
    event.preventDefault();
    this.setState({ content });
  }

  renderContent(content) {
    const { members } = this.props;
    switch (content) {
    case 'see members':
      return members.map(member => (
        <Gallery data={member} key={member.user.id} />
      ));
      break;
    case 'invite members':
      return <NewMembers />;
      break;

    default:
      return <NewMembers />;
      break;
    }
  }
  renderMembers() {
    const { members } = this.props;
    return members.map(member => (
      <Gallery data={member} key={member.user.id} />
    ));
  }
  render = () => {
    const { content } = this.state;
    const { expanded, toggleSidenav } = this.props;
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
                  <li className="nav-submenu" data-tip="invite new member">
                    <a href="#!">
                      <i className="material-icons">person_add</i>
                    </a>
                  </li>
                  <li className="nav-submenu" data-tip="add roles to members">
                    <a href="#!">
                      <i className="material-icons">assignment</i>
                    </a>
                  </li>
                  <li className="nav-submenu" data-tip="see members">
                    <a href="#!">
                      <i className="material-icons">group</i>
                    </a>
                  </li>
                </ul>
                <ReactTooltip />
              </div>
            )}
            {expanded && (
              <div className="sidebar-inner">
                <ul className="sidebar-nav">
                  <li
                    className="nav-link"
                    onClick={event =>
                      this.chooseContent(event, 'invite members')
                    }
                  >
                    <span>invite new members</span>
                  </li>
                  <li className="nav-link ">
                    <a href="#!" className="">
                      add roles to members
                    </a>
                  </li>
                  <li
                    className="nav-link "
                    onClick={event => this.chooseContent(event, 'see members')}
                  >
                    <span>See members</span>
                  </li>
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
