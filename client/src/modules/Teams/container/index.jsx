import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Components
import Navbar from '../../common/Navbar';
import Project from '../components/Project';
import Member from '../components/Member';
import Account from '../components/Account';
import Form from '../components/Form';

export default class Teams extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      content: 'project',
      expanded: true
    };

    this.renderContent = this.renderContent.bind(this);
    this.switchContent = this.switchContent.bind(this);
    this.toggleSidenav = this.toggleSidenav.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  switchContent(event, content) {
    event.preventDefault();
    this.setState(() => ({ content }));
  }

  toggleSidenav(event) {
    event.preventDefault();
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  }

  renderContent(content) {
    const { expanded } = this.state;
    switch (content) {
    case 'account':
      return (
        <Account expanded={expanded} toggleSidenav={this.toggleSidenav} />
      );
      break;
    case 'member':
      return (
        <Member expanded={expanded} toggleSidenav={this.toggleSidenav} />
      );
      break;
    default:
      return (
        <Project expanded={expanded} toggleSidenav={this.toggleSidenav} />
      );
      break;
    }
  }

  render() {
    const { content } = this.state;
    return (
      <React.Fragment>
        <Navbar showTabs switchContent={this.switchContent} />
        {this.renderContent(content)}
      </React.Fragment>
    );
  }
}
