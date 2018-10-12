import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react'
import slack from '../../../../public/resources/images/slack.png';
import pt from '../../../../public/resources/images/pt.jpg';

/**
 * @description stateless form component
 * @param {object} props
 * @returns {JSX} jsx
 */
export const Form = ({
  handleChange,
  name,
  desc,
  checked,
  handleSubmit,
  submitting,
  menuChange
}) => {
  let showSubmitButton = false;
  let teamName = 'example';

  if (name.trim() && desc.trim()) {
    showSubmitButton = true;
  }
  
  if (name.trim()) {
    teamName = name
  }

  // github dropdown options
  const githubOptions = [
    {key: `ah-${teamName}-frontend`, text: `ah-${teamName}-frontend`, value: `ah-${teamName}-frontend`},
    {key: `ah-${teamName}`, text: `ah-${teamName}`, value: `ah-${teamName}`},
    {key: `${teamName}-ah`, text: `${teamName}-ah`, value: `${teamName}-ah`},
    {key: `ah-${teamName}-backend`, text: `ah-${teamName}-backend`, value: `ah-${teamName}-backend`},
  ]

  const ptOptions = [
    {key: `ah-${teamName}`, text: `ah-${teamName}`, value: `ah-${teamName}`},
    {key: `${teamName}-ah`, text: `${teamName}-ah`, value: `${teamName}-ah`}
  ]

  const slackOptions = [
    {key: `ah-${teamName}`, text: `ah-${teamName}`, value: `ah-${teamName}`},
    {key: `${teamName}-general`, text: `${teamName}-general`, value: `${teamName}-general`},
    {key: `${teamName}-standups`, text: `${teamName}-standups`, value: `${teamName}-standups`},
    {key: `${teamName}-bots`, text: `${teamName}-bots`, value: `${teamName}-bots`}
  ]

  return (
    <form
      className="col s12 m8 l6 form-wrapper z-depth-5  center-block custom-form"
      onSubmit={handleSubmit}
    >
      <div className="row form-header team-form-header white border-bottom">
        <h6 className="center text-header">Create a team</h6>
      </div>
      <div className="form-wrapper-inner">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="name"
              required
              name="name"
              type="text"
              className="validate"
              value={name}
              onChange={handleChange}
            />
            <label htmlFor="name">Team name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea
              id="description"
              className="materialize-textarea"
              name="description"
              required
              value={desc}
              onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <span className="helper-text">Not more than 255 characters</span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col m6 s12">
            <select onChange={handleChange} name="visibility">
              <option value>Public</option>
              <option value={false}>Private</option>
            </select>
            <label>Team visibility</label>
          </div>
        </div>
        <div className="team-accounts top-margin">
          <i className="fab fa-github integration-icon">`</i>
          <Dropdown name="github" onChange={menuChange} placeholder="Repo name"
           fluid multiple selection search options={githubOptions} />
        </div>
        <div className="team-accounts top-margin">
          <img src={pt} className="integration-icon small-icon" alt="pt-image"/>
          <Dropdown name="pt" onChange={menuChange} placeholder="PT name"
           fluid multiple selection search options={ptOptions} />
        </div>
        <div className="team-accounts top-margin">
          <img src={slack} className="integration-icon small-icon" alt="slack-image"/>
          <Dropdown placeholder='channel name' fluid multiple selection search options={slackOptions} />
        </div>
        {!showSubmitButton && (
          <div className="submit-btn">
            <button className="btn form-subimt-btn right disabled top-margin bottom-margin">
            Submit
            </button>
          </div>
        )}
        {showSubmitButton && (
          <div className="submit-btn">
            {!submitting && (
              <button className="top-margin bottom-margin btn right nav-blue">
                Submit
              </button>
            )}
            {submitting && (
              <button className="btn right disabled top-margin bottom-margin">
                Submitting...
              </button>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default Form;
