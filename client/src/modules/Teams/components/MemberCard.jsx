import React from 'react';
import PropTypes from 'prop-types';

const MemberCard = ({
  name, role, photo, remove
}) => (
  <div className="row p-3">
    <div className="col s11">
      <div className="list-wrapper light-shadow">
        <div className="user-list pl-10 col s1">
          <img src={photo} alt="displayPhoto" className="user-photo" />
        </div>
        <div className="col s7">
          <h5 className="capitalize username">{name}</h5>
          <p className="role">{role}</p>
        </div>
        <div className="user-action offset-s6 col s1 hovered ">
          {!remove && (
            <i className="material-icons " data-tip="add member">
              person_add
            </i>
          )}
          {remove && (
            <i className="material-icons text-red" data-tip="remove member">
              remove_circle
            </i>
          )}
        </div>
      </div>
    </div>
  </div>
);

MemberCard.propTypes = {};

export default MemberCard;
