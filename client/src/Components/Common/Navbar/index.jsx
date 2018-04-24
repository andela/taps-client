import React, { Component } from 'react';

export default class Navbar extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <div>
        <nav className="nav-blue navbar-fixed">
          <div className="nav-wrapper">
            <a href="#!" className="brand">
              Andela Teams
            </a>
            <a
              href="#!"
              data-target="main-navigation"
              className="sidenav-trigger"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down nav-items">
              <li>
                <a href="#!">Teams</a>
              </li>
              <li>
                <a href="#!">Favorite Teams</a>
              </li>
              <li>
                <a href="#!">Create Team</a>
              </li>
              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="dropdown-menu"
                >
                  <i className="medium material-icons left">
                    account_circle arrow_drop_down
                  </i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <ul id="dropdown-menu" className="dropdown-content">
          <li>
            <a href="#!">Profile</a>
          </li>
          <li className="divider" />
          <li>
            <a href="#!">Sign Out</a>
          </li>
        </ul>
        <ul className="sidenav" id="main-navigation">
          <li>
            <a href="#!">Teams</a>
          </li>
          <li>
            <a href="#!">Favorite Teams</a>
          </li>
          <li>
            <a href="#!">Create Team</a>
          </li>
          <li>
            <a
              className="dropdown-trigger"
              href="#!"
              data-target="dropdown-menu"
            >
              <i className="small material-icons left">
                account_circle arrow_drop_down
              </i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
