import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// components
import withRequests from '../../HOC/withRequests';
import RequestHolder from './RequestHolder';
import RequestPagination from '../../common/Pagination';
import { loadRequests } from '../../../redux/actions/requests';

export const Request = ({
  headerText,
  handleChange,
  requests,
  checkedAll,
  pagination,
  handlePaginationClick
}) => (
  <div className="request-container text-blue">
    <h4>{headerText}</h4>
    <hr className="hr-top" />
    <RequestHolder
      handleChange={handleChange}
      requests={requests}
      checkedAll={checkedAll}
    />
    <RequestPagination
      noOfPages={pagination ? pagination.pages : 1}
      onClick={handlePaginationClick}
    />

    <div className="admin-btn-holder">
      <button className="btn blue-btn admin-btn-margin" type="button">Accept</button>
      <button className="btn red-btn" type="button">Reject</button>
    </div>

  </div>
);

Request.propTypes = {
  headerText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  requests: PropTypes.array,
  checkedAll: PropTypes.bool.isRequired,
  pagination: PropTypes.object,
  handlePaginationClick: PropTypes.func.isRequired
};

export const AdminRequests = withRequests(Request, {
  pageTitle: 'Admin Requests'
});


export const mapStateToProps = ({ requestsReducer }) => ({
  loadedRequests: requestsReducer.loadedRequests
});

export default connect(mapStateToProps, { loadRequests })(AdminRequests);
