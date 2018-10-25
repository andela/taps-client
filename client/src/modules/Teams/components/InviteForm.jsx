
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Select from 'react-select';
import PropTypes from 'prop-types';
import MultiValueLabel from './MultiValueLabel';
import Dropdown from "./Dropdown";
import image from '../../../../public/resources/images/copy.png';

const InviteForm = ({
  options, isDisabled, handleSelected, formTitle,
  ismultiSelectDisabled, submitForm, buttonCaption,
  sharedLink, copyToClipboard, copyText, handleRoleChange
}) => (
  <div id="invite_form">
    <div className="row account-row">
      <div className="col s2" />
      <div className="col s7">
        <h5 className="center-align">

          <span className="member-username">
            {formTitle}
          </span>
        </h5>
        <div className="col s12 team-account-wrapper">
          <form className="row team-accout-form form-style">

            <div className="">
              <label>
                <input
                  id="select-all-option"
                  className="with-gap select-all"
                  name="select" type="radio"
                  onClick={(e) => isDisabled('all')} />
                <span><img src="/resources/images/select.png" alt="icon" height="30px" width="30px" /></span>
              </label>
              <span className="span">Add user to all accounts</span>
            </div>
            <br />
            <div>
              <label>
                <input
                  id="select-accounts-option"
                  onClick={() => isDisabled('select')}
                  className="with-gap select-some" name="select" type="radio" defaultChecked />
                <span />
                <label className="select">
                  <Select
                    closeMenuOnSelect={false}
                    components={{ MultiValueLabel, Option: Dropdown }}
                    styles={{
                      multiValueRemove: (base) => ({ ...base, fontSize: '15px', color: '#385cd7' })
                    }}
                    defaultValue={[options[1]]}
                    isMulti
                    options={options}
                    onChange={handleSelected}
                    isDisabled={ismultiSelectDisabled}
                  />
                </label>
              </label>
              <div className="role-inputs">

                <div>  <label className="role-text">Select User role: </label></div>

                <div>

                  <select defaultValue="developer" id="role-select" onChange={handleRoleChange} name="role" placeholder="Select ">
                    <option value="lead" >Team Lead</option>
                    <option value="member">Member</option>
                    <option value="developer">Developer</option>
                  </select>
                </div>
              </div>
              <button onClick={submitForm} className="btn float-right mt-2 blue-btn" type="submit" name="action">
                {buttonCaption}
              </button>
            </div>
            <br />
            <div hidden={!sharedLink} >
              <div className="link-group">
                <CopyToClipboard
                  text={sharedLink}
                  onCopy={() => copyToClipboard(true)}>
                  <img
                    className="copy-icon" src={image} alt="Copy to clipboard"
                  />
                </CopyToClipboard>

                <input className="disabled-input-text" type="text" value={sharedLink} />
              </div>
              <div className="copy-link-text">{copyText}</div>
            </div>

          </form>
        </div>
      </div>
      <div className="col s3" />
    </div>
  </div>

);

InviteForm.propTypes = {
  options: PropTypes.array.isRequired,
  isDisabled: PropTypes.func.isRequired,
  handleSelected: PropTypes.func.isRequired,
  formTitle: PropTypes.string.isRequired,
  ismultiSelectDisabled: PropTypes.bool.isRequired,
  submitForm: PropTypes.func.isRequired,
  buttonCaption: PropTypes.string.isRequired,
  sharedLink: PropTypes.string,
  copyToClipboard: PropTypes.func.isRequired,
  copyText: PropTypes.string

};

InviteForm.defaultProps = {
  sharedLink: '',
  copyText: 'Copy shareable link above'
};
export default InviteForm;
