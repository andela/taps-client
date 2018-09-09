import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (ComposedComponent) => {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  RequireAuth.propTypes = {
    auth: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };

  const mapStateToProps = state => {
    return {
      auth: state.auth.loggedIn
    };
  };

  return connect(mapStateToProps)(RequireAuth);
};
