import React from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';
import github from '../../../../public/resources/images/github.png';
import pt from '../../../../public/resources/images/pt.png';
import slack from '../../../../public/resources/images/slack.png';

const IntegrationTool = ({ visible, tool, goBack }) => (
  <div className={visible ? 'hide' : ''}>
    <div onClick={goBack} role="presentation" className="go-back mouse-pointer">
      <div className="flex-row center-axis flex-center">
        <i className="fas fa-arrow-left arrow-back-pointer" />
        <h5 className="remove-margin-top">go back</h5>
      </div>
    </div>
    <header className="tool-header">
      {tool === 'github' &&
        <div className="flex-row flex-center">
          <img className="integration-tool-icon" src={github} alt="git" />
          <h5 className="remove-margin-top left-margin">Github Repository</h5>
        </div>
      }
      {tool === 'pt' &&
        <div className="flex-row flex-center">
          <img className="integration-tool-icon" src={pt} alt="git" />
          <h5 className="remove-margin-top left-margin">Pivotal Tracker</h5>
        </div>
      }
      {tool === 'slack' &&
      <div className="flex-row flex-center">
        <img className="integration-tool-icon" src={slack} alt="git" />
        <h5 className="remove-margin-top left-margin">Slack channel</h5>
      </div>
      }
      {tool === 'slack private' &&
      <div className="flex-row flex-center">
        <img className="integration-tool-icon" src={slack} alt="git" />
        <h5 className="remove-margin-top left-margin">Slack channel (private)</h5>
      </div>
      }
    </header>
    <section className="body-padding">
      <div className="">
        <div className="flex-column">
          {tool === 'slack private' && <p className="remove-margin-bottom">Channel Name</p>}
          {tool === 'slack' && <p className="remove-margin-bottom">Channel Name</p>}
          {tool === 'github' && <p className="remove-margin-bottom">Repository Name</p>}
          {tool === 'pt' && <p className="remove-margin-bottom">tool Name</p>}

          <input
            className="grey-border"
            type="text"
          />
        </div>
        <div className="flex-column margin-top-12">
          <p className="remove-margin-bottom">Description</p>
          <TextArea
            className="grey-border"
            style={{ minHeight: 100 }}
          />
        </div>
        <div className="integration-btn-container flex-row flex-end">
          <button className="btn">Submit</button>
        </div>
      </div>
    </section>
  </div>
);

IntegrationTool.propTypes = {
  visible: PropTypes.bool.isRequired,
  tool: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired
};

export default IntegrationTool;
