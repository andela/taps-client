import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import AddIntegrationModal from '../../common/Modals/AddIntegration';


class Account extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false
    };
  }

  onOpenModal = () => {
    this.setState({ isModalOpen: true });
  }

  onCloseModal = () => {
    this.setState({ isModalOpen: false })
  }
  render() {
    const showSidenav = this.props.expanded ?
      'side-nav-width-expanded' :
      'side-nav-width-collapsed';
    const contentWidth = this.props.expanded ? 'offset-s3 s9' : ' offset-s1 s11';
    return (
      <React.Fragment>
        <aside className="col s3 sidebar-wrapper">
          <div className={`sidebar ${showSidenav}`}>
            <ul className="sidebar-nav">
              <li className="nav-menu">
                <a href="#!" onClick={this.props.toggleSidenav}>
                  <i className="material-icons">menu</i>
                </a>
              </li>
            </ul>
            {!this.props.expanded && (
              <div className="sidebar-inner">
                <ul className="sidebar-nav">
                  <li className="nav-submenu" data-tip="add roles to members">
                    <a href="#!">
                      <i className="material-icons">assignment</i>
                    </a>
                  </li>
                </ul>
                <ReactTooltip />
              </div>
            )}
            {this.props.expanded && (
              <div className="sidebar-inner">
                <ul className="sidebar-nav">
                  <li className="nav-link ">
                    <a href="#!" className="">
                      Accounts
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </aside>
        <section className="row account-container">
          <AddIntegrationModal
            isModalOpen={this.state.isModalOpen}
            closeModal={this.onCloseModal}
          />
          <div className={`col ${contentWidth} integration-row`}>
            <i className="material-icons integration-icons">
                group_add
            </i>
            <i className="material-icons integration-icons">
            sync
            </i>
            <i className="material-icons integration-icons">
            pie_chart
            </i>
            <h6 className="integration-h6">Track your teams with additional data</h6>
            <button
              onClick={this.onOpenModal}
              className="integration-button">
              Add an integration
            </button>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

Account.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleSidenav: PropTypes.func.isRequired
};

export default Account;
