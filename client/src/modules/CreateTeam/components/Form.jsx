import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { getInitials, formatWord } from '../../../utils/format';
import { githubOptions, ptOptions, slackOptions } from '../../../utils/conventions';
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
  project,
  handleSubmit,
  submitting,
  menuChange,
  integrations
}) => {
  let showSubmitButton = false;
  let teamName = 'example';
  let showDropDown = true;
  let projectName = project;
  let slackDropdown = [];
  let githubDropdown = [];
  let ptDropdown = [];

  if (name.trim() && desc.trim()) {
    showSubmitButton = true;
    showDropDown = false;
    teamName = formatWord(name).toLowerCase();
    slackDropdown = slackOptions(teamName);
    ptDropdown = ptOptions(teamName);
    githubDropdown = githubOptions(teamName);
  }

  if (project.trim()) {
    teamName = formatWord(name).toLowerCase();
    projectName = getInitials(project).toLowerCase();
    slackDropdown = slackOptions(teamName, projectName);
    ptDropdown = ptOptions(teamName, projectName);
    githubDropdown = githubOptions(teamName, projectName);
  }


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
        <div className="row">
          <div className="input-field col s12">
            <input
              id="project"
              required
              name="project"
              type="text"
              className="validate"
              value={project}
              onChange={handleChange}
            />
            <label className="active" htmlFor="project">Project name</label>
          </div>
        </div>
        <div className="team-accounts top-margin">
          <i className="fab fa-github integration-icon">`</i>
          <Dropdown
            disabled={showDropDown || submitting}
            value={integrations['github']}
            name="github" onChange={menuChange} placeholder="Repo name"
            fluid multiple selection search options={githubDropdown} />
        </div>
        <div className="team-accounts top-margin">
          <img src={pt} className="integration-icon small-icon" alt="pt-image" />
          <Dropdown
            disabled={showDropDown || submitting}
            value={integrations['pt']}
            name="pt" onChange={menuChange} placeholder="PT name"
            fluid multiple selection search options={ptDropdown} />
        </div>
        <div className="team-accounts top-margin">
          <img src={slack} className="integration-icon small-icon" alt="slack-image" />
          <Dropdown
            disabled={showDropDown || submitting}
            value={integrations['slack']}

            name="slack" onChange={menuChange} placeholder="channel name"
            fluid multiple selection search options={slackDropdown} />
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
  menuChange: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
  integrations: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default Form;
