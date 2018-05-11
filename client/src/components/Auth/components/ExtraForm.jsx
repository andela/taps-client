import React from 'react';
import PropTypes from 'prop-types';

const ExtraForm = ({
  handleForm, handleChange, slackId, githubId
}) => (
  <div className="row extra-form z-depth-5">
    <form className="col s12" onSubmit={handleForm}>
      <div className="row">
        <div className="input-field col s12 ">
          <input
            id="Slack_id"
            name="slackId"
            type="number"
            onChange={handleChange}
            value={slackId}
            className="validate"
          />
          <label htmlFor="Slack_id">Slack Id</label>
        </div>
        <div className="input-field col s12">
          <input
            id="github"
            type="text"
            name="githubId"
            onChange={handleChange}
            value={githubId}
            className="validate"
          />
          <label htmlFor="github">Github Username</label>
        </div>
      </div>
      <button
        type="submit"
        className="waves-effect waves-light btn center-align blue-btn"
      >
        Complete sign up
      </button>
    </form>
  </div>
);

ExtraForm.propTypes = {
  handleForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  slackId: PropTypes.string.isRequired,
  githubId: PropTypes.string.isRequired
};

export default ExtraForm;
