import React from 'react';
import PropTypes from 'prop-types';
import MappleToolTip from 'reactjs-mappletooltip';

const ExtraForm = ({
  handleForm, handleChange, slackId, githubId
}) => (
  <div className="row extra-form z-depth-5">
    <form className="col s12" onSubmit={handleForm}>
      <div className="row">
        <div className="input-field col s12 ">
          <i className="prefix fab fa-slack fa-2x" />
          <input
            id="Slack_id"
            name="slackId"
            type="text"
            onChange={handleChange}
            value={slackId}
            className="validate"
            pattern="[a-zA-Z0-9_-]{4,15}"
          />
          <label htmlFor="Slack_id">Slack Id</label>
          <div className="right">
            <MappleToolTip
              direction="top"
              textColor="rgba(56, 93, 215, 0.98)"
              mappleType="contra"
            >
              <div>
                <i className="tooltip fa fa-question-circle" />
              </div>
              <div>
                <div>
                  <h5 className="">Need help getting slack ID?</h5>
                  <h6>Follow these simple steps</h6>
                  <ul>
                    <li><i className="far fa-dot-circle" /> &nbsp;Login to your slack account</li>
                    <li><i className="far fa-dot-circle" /> &nbsp;At the top left corner, click on your name/username</li>
                    <li><i className="far fa-dot-circle" /> &nbsp;From the pop up that appear, click on <b>Profile & Account</b> link</li>
                    <li><i className="far fa-dot-circle" /> &nbsp;Click on <b>More actions</b> icon <img src="./resources/images/more1.png" height="13px" width="30px" alt="more" /></li>
                    <li><i className="far fa-dot-circle" /> &nbsp;Click on <b>Copy member ID</b> to copy your slack membership ID(slack ID)</li>
                  </ul>
                </div>
              </div>
            </MappleToolTip>
          </div>
        </div>
        <div className="input-field col s12">
          <i className="prefix fab fa-github fa-2x" />
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
