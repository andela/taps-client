import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//components
import Navbar from '../../common/Navbar';

import { makeRequest } from '../../../redux/actions/requests';

/**
 * @class
 * @constructor
 */
export class Join extends Component {
  componentDidMount() {
    const decoded = jwtDecode(this.props.match.params.joinToken);
    this.setState({
      teamId: decoded.teamId,
      teamName: decoded.teamName,
      role: decoded.role
    });
    this.joinTeam = this.joinTeam.bind(this);
  }

  state = {
    teamId: '',
    teamName: ''
  }

  joinTeam() {
    const requestData = {
      userId: localStorage.getItem('userId'),
      teamId: this.state.teamId,
      type: 'member_request',
      data: this.state.role
    };
    this.props.makeRequest(requestData);
    this.props.history.push('/teams');
  }

  render() {
    console.log(this.state.teamId);
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <div className="row valign-wrapper">
            <div
              className="col s12 m8 l6 form-wrapper z-depth-5 center-block custom-form"
            >
              <div className="row form-header team-form-header white border-bottom">
                <h2 className="center text-header fs-25">Request to Join Team</h2>
              </div>
              <div className="form-wrapper-inner">
                <div className="row">
                  <div className="input-field col s12">
                    <h5 className="center">Would you like to send a request to be added to the {this.state.teamName} team?</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6 offset-s3">
                    <button className="top-margin bottom-margin btn left nav-blue" onClick={this.joinTeam}>
                      Send
                    </button>
                    <button className="top-margin bottom-margin btn right nav-red" id="cancel" onClick={() => this.props.history.push('/teams')}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Join.propTypes = {
  makeRequest: PropTypes.func.isRequired
};

export default connect(null, { makeRequest })(Join);
