import React from 'react';
import { Pagination } from 'semantic-ui-react';

const RequestPagination = () => (
  <Pagination
    defaultActivePage={1}
    firstItem={null}
    lastItem={null}
    pointing
    secondary
    totalPages={10}
  />
);

export default RequestPagination;
