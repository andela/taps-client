import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Render preloader bar when needed
 *
 * @param {any} { isLoading }
 *
 * @returns {JSX.Element} React element
 */
export const Preloader = ({ isLoading: { isLoading } }) => (
  <React.Fragment>
    {isLoading && (
      <div className="progress preloader">
        <div className="indeterminate" />
      </div>
    )}
  </React.Fragment>
);
export const mapStateToProps = state => ({
  isLoading: state.isLoading
});

Preloader.propTypes = {
  isLoading: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired
  }).isRequired
};

export default connect(mapStateToProps, null)(Preloader);
