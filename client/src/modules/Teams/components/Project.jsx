import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const Project = ({ expanded, toggleSidenav }) => {
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
                <li className="nav-submenu" data-tip="create new project">
                  <a href="#!">
                    <i className="material-icons">create_new_folder</i>
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
                    Create new project
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </aside>
      <section className="row">
        <div className={`col ${contentWidth}`}>
          <h1>Team Project</h1>
          <h6>More magic to come</h6>
        </div>
      </section>
    </React.Fragment>
  );
};

Project.propTypes = {
  expanded: PropTypes.bool.isRequired,
  toggleSidenav: PropTypes.func.isRequired
};

export default Project;
