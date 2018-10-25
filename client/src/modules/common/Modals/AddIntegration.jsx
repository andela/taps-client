import React, { Component, Fragment } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import IntegrationTool from './integrationTool';
import github from '../../../../public/resources/images/github.png';
import pt from '../../../../public/resources/images/pt.png';
import slack from '../../../../public/resources/images/slack.png';


class AddIntegration extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      tool: 'github'
    };
  }

  hideModal = (bool, tool) => {
    this.setState({
      visible: bool,
      tool: tool
    });
  }

  goBack = () => {
    this.setState({
      visible: true
    });
  }

  closeModal = () => {
    this.setState({
      visible: true
    });
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        contentLabel="Add Integration"
        ariaHideApp={false}
        overlayClassName="message-overlay"
        onRequestClose={this.state.visible ? this.closeModal : this.goBack}
        className="modalStyle integration-modal"
      >
        <div className={this.state.visible ? '' : 'hide'}>
          <header className="integration-header">
            <h5>Add an Integration</h5>
          </header>
          <section className="integration-body">
            <p className="">Select an integration to add</p>
            <div className="integration-tools-container">
              <div className="integration-tools mouse-pointer">
                <div onClick={() => this.hideModal(false, 'github')} role="presentation" className="integration-tool-names">
                  <img className="integration-tool-icon" src={github} alt="git" />
                  <p className="">Github Repository</p>
                </div>
                <i className="fas fa-greater-than" />
              </div>
              <div onClick={() => this.hideModal(false, 'pt')} role="presentation" className="integration-tools mouse-pointer">
                <div className="integration-tool-names">
                  <img className="integration-tool-icon" src={pt} alt="git" />
                  <p className="">Pivotal Tracker</p>
                </div>
                <i className="fas fa-greater-than" />
              </div>
              <div onClick={() => this.hideModal(false, 'slack private')} role="presentation" className="integration-tools mouse-pointer">
                <div className="integration-tool-names">
                  <img className="integration-tool-icon" src={slack} alt="git" />
                  <p className="">Slack Channel (private)</p>
                </div>
                <i className="fas fa-greater-than" />
              </div>
              <div onClick={() => this.hideModal(false, 'slack')} role="presentation" className="integration-tools no-border mouse-pointer">
                <div className="integration-tool-names">
                  <img className="integration-tool-icon" src={slack} alt="git" />
                  <p className="">Slack Channel (public)</p>
                </div>
                <i className="fas fa-greater-than" />
              </div>
            </div>

          </section>
          <footer onClick={() => this.props.closeModal()} role="presentation" className="integration-tool-footer">
            <p>cancel</p>
          </footer>
        </div>
        <Fragment>
          <IntegrationTool
            visible={this.state.visible}
            tool={this.state.tool}
            goBack={this.goBack}
          />
        </Fragment>
      </Modal>
    );
  }
}

AddIntegration.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default AddIntegration;
