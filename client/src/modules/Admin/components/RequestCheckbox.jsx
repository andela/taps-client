import React from 'react';

const RequestCheckbox = ({
  handleChange,
  requests = []
}) => {
  const Requests = requests.map((request, index) => (
    <p key={request.id} id="request-checkbox">
      <label htmlFor={request.id}>
        <input
          name={request.id}
          id={request.id}
          type="checkbox"
          className="filled-in"
          onChange={(e) => handleChange(e, request)}
          checked={request.checked}
        />
        <span>{`${request.user.displayName} < ${request.user.email} >`}
          <label className="team-type-label ">Requested to join as a  <b>{request.data}</b>
          </label>
        </span>

      </label>
    </p>));

  return Requests;
};

export default RequestCheckbox;
