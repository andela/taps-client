import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'semantic-ui-react';

const RequestPagination = ({ noOfPages, onClick }) => (
  <Pagination
    defaultActivePage={1}
    firstItem={null}
    lastItem={null}
    pointing
    secondary
    totalPages={noOfPages}
    onPageChange={onClick}
  />
);

RequestPagination.propTypes = {
  noOfPages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RequestPagination;
