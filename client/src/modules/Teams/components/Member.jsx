import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const Member = ({ expanded, toggleSidenav }) => {
  const showSidenav = expanded ?
    'side-nav-width-expanded' :
    'side-nav-width-collapsed';
  const contentWidth = expanded ? 'offset-s3 s9' : ' offset-s1 s11';
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
                <li className="nav-link ">
                  <a href="#!" className="">
                    invite new members
                  </a>
                </li>
                <li className="nav-link ">
                  <a href="#!" className="">
                    add roles to members
                  </a>
                </li>
                <li className="nav-link ">
                  <a href="#!" className="">
                    See members
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </aside>
      <section className="row">
        <div className={`col ${contentWidth}`}>
          <h1>Team members</h1>
          <h6>More magic to come</h6>
        </div>
      </section>
    </React.Fragment>
  );
};

Member.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleSidenav: PropTypes.func.isRequired
};

export default Member;
