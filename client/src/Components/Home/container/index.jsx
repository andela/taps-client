import React, { Component } from 'react';

// Navbar
import Navbar from '../../Common/Navbar';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <h4>Welcome to the homepage</h4>
      </div>
    );
  }
}
