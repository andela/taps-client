import React from 'react';
import { connect } from 'react-redux';
import Pace from 'react-pace-progress';
import PropTypes from 'prop-types';

/**
 * Render preloader bar when needed
 *
 * @param {any} { isLoading }
 *
 * @returns {JSX.Element} React element
 */
const Preloader = ({ isLoading: { isLoading } }) => (
  <div className="fixed-top">
    {console.log('is loading==>', isLoading)}
    {isLoading ? <Pace color="#f5b339" height={4} /> : null}
  </div>
);
const mapStateToProps = state => ({
  isLoading: state.isLoading
});

Preloader.propTypes = {
  isLoading: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired
  }).isRequired
};

export default connect(mapStateToProps, null)(Preloader);
