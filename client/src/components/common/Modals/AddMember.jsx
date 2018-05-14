import React from 'react';

export default () => (
  <div>
    <div id="addMember" className="modal">
      <div className="modal-content">
        <h4>Add member</h4>
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input
                  type="text"
                  id="new_member_input"
                  className="autocomplete"
                />
                <label htmlFor="new_member_input">Find member</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-action modal-close waves-effect btn-flat">
          Back
        </a>
        <a href="#!" className="modal-action modal-close waves-effect btn-flat">
          Add
        </a>
      </div>
    </div>
  </div>
);
