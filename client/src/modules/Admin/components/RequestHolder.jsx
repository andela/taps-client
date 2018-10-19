import React from 'react';
import PropTypes from 'prop-types';

// component
import RequestCheckbox from './RequestCheckbox';

const RequestHolder = ({
  handleChange,
  requests,
  checkedAll
}) => (
  <div className="request-checkbox-container">
    <form>
      <p>
        <label htmlFor="main-control">
          <input
            name="main-control"
            id="main-control"
            type="checkbox"
            className="filled-in"
            onChange={(e) => handleChange(e)}
            checked={checkedAll}
          />
          <span>Mark All</span>
        </label>
      </p>
      <hr />
      {/* hold the requests */}
      <RequestCheckbox
        handleChange={handleChange}
        requests={requests}
        checkedAll={checkedAll}
      />
    </form>
  </div>
);

RequestHolder.propTypes = {
  handleChange: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired,
  checkedAll: PropTypes.bool.isRequired
};

export default RequestHolder;
