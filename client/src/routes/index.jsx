import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Home from '../Components/Home/container';
import Footer from '../Components/Common/Footer';

export default class Routes extends Component {
  componentDidMount() {
    M.AutoInit();
    const elem = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(elem, {
      coverTrigger: false,
      belowOrigin: true,
      alignment: 'right',
      hover: true,
      inDuration: 400
    });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
