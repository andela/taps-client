import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

// component
import MemberCard from './MemberCard';

const Gallery = ({
  data: {
    user: {
      email,
      githubUsername,
      id,
      photo,
      role,
      slackId,
      displayName,
      createdAt
    }
  }
}) => {
  const temp = email.slice(0, -11);
  const fullName = temp.split('.').join(' ');
  return (
    <div>
      <MemberCard
        photo={photo}
        role={role}
        name={fullName}
        remove="remove"
        userId={id}
      />
      <ReactTooltip />
    </div>
  );
};

Gallery.propTypes = {
  data: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      githubUsername: PropTypes.string,
      id: PropTypes.string,
      photo: PropTypes.string,
      role: PropTypes.string,
      slackId: PropTypes.string,
      displayName: PropTypes.string,
      createdAt: PropTypes.string
    })
  }).isRequired
};

export default Gallery;
