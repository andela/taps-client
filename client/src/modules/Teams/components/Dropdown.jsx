import React from 'react';
import { components } from 'react-select';

const Dropdown = (props) => (
  <components.Option {...props}>
    {props.data.type === 'github_repo' ?
      <label className="select-account-dropdown">
        <img src="/resources/images/github.svg" className="account-icon" alt="github" />
        {` ${props.data.label}`}
      </label> :
      <label>
        {props.data.type === 'slack_channel' ?
          <label className="select-account-dropdown">
            <img src="/resources/images/slack.png" className="account-icon" alt="slack" />
            {` ${props.data.label}`}
          </label> :
          <label className="select-account-dropdown">
            <img src="/resources/images/pt.png" className="account-icon" alt="pt" />
            {` ${props.data.label}`}
          </label>}
      </label>}
  </components.Option>
);


export default Dropdown;
