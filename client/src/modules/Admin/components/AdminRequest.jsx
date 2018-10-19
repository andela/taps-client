import React from 'react';
import PropTypes from 'prop-types';

// components
import withRequests from '../../HOC/withRequests';
import RequestHolder from './RequestHolder';
import RequestPagination from '../../common/Pagination';

// mock data
import requests from '../../../tests/modules/Admin/mock/mockData';


export const Request = ({
  headerText,
  handleChange,
  requests,
  checkedAll
}) => (
  <div className="request-container text-blue">
    <h4>{headerText}</h4>
    <hr className="hr-top" />
    <RequestHolder
      handleChange={handleChange}
      requests={requests}
      checkedAll={checkedAll}
    />
    <RequestPagination />

    <div className="admin-btn-holder">
      <button className="btn blue-btn admin-btn-margin" type="button">Accept</button>
      <button className="btn red-btn" type="button">Reject</button>
    </div>

  </div>
);

Request.propTypes = {
  headerText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired,
  checkedAll: PropTypes.bool.isRequired
};

const AdminRequests = withRequests(Request, {
  requests: requests.data.requests,
  pageTitle: 'Admin Requests'
});

export default AdminRequests;
