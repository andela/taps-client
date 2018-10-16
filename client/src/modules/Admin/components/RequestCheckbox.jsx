import React from 'react';

const RequestCheckbox = ({
  handleChange,
  checkOne,
  requests = [],
  checkedAll
}) => {
  const Requests = requests.map((request, index) => (
    <p key={request.id}>
      <label htmlFor={request.id}>
        <input
          name={request.id}
          id={request.id}
          type="checkbox"
          className="filled-in"
          onChange={(e) => handleChange(e, request)}
          checked={request.checked}
        />
        <span>{`${request.user.displayName} < ${request.user.email} >`}</span>
      </label>
    </p>));

  return Requests;
};

export default RequestCheckbox;
