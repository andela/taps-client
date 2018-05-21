import React from 'react';
import PropTypes from 'prop-types';

const Form = () =>
  // let showSubmitButton = false;
  // if (name.trim() && desc.trim()) {
  //   showSubmitButton = true;
  // }
  (
    <form className="col s12 m8 l6 form-wrapper z-depth-5  center-block custom-form">
      <div className="row form-header nav-blue ">
        <h6 className="center white-text">Create a new project</h6>
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
            />
            <label htmlFor="description">Description</label>
            <span className="helper-text">Not more than 255 characters</span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col m6 s12">
            <select name="visibility">
              <option value>Private</option>
              <option value={false}>Public</option>
            </select>
            <label>Team visibility</label>
          </div>
        </div>
        {/* {!showSubmitButton && ( */}
        <div className="row">
          <button className="waves-effect waves-light btn col s12 disabled">
            Submit
          </button>
        </div>
        {/* )} */}
        {/* {showSubmitButton && (
          <div className="row">
            {!submitting && (
              <button className="waves-effect waves-light btn col s12 nav-blue">
                Submit
              </button>
            )}
            {submitting && (
              <button className="waves-effect waves-light btn col s12 disabled">
                Submitting...
              </button>
            )}
          </div>
        )} */}
      </div>
    </form>
  );
Form.propTypes = {
}

export default Form;
