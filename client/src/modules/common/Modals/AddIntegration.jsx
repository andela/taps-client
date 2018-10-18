import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import github from '../../../../public/resources/images/github.png';
import pt from '../../../../public/resources/images/pt.png';
import slack from '../../../../public/resources/images/slack.png';


const AddIntegration = ({ isModalOpen, closeModal }) => (
  <Modal
    isOpen={isModalOpen}
    contentLabel="Add Integration"
    ariaHideApp={false}
    overlayClassName="message-overlay"
    onRequestClose={closeModal}
    className="modalStyle integration-modal"
    // style={customStyles}
  >
    <div>
      <header className="integration-header">
        <h5>Add an Integration</h5>
      </header>
      <section className="integration-body">
        <p className="">Select an integration to add</p>
        <div className="integration-tools-container">
          <div className="integration-tools">
            <div className="integration-tool-names">
              <img className="integration-tool-icon" src={github} alt="git" />
              <p className="">Github Repository</p>
            </div>
            <i className="fas fa-greater-than" />
          </div>
          <div className="integration-tools">
            <div className="integration-tool-names">
              <img className="integration-tool-icon" src={pt} alt="git" />
              <p className="">Pivotal Tracker</p>
            </div>
            <i className="fas fa-greater-than" />
          </div>
          <div className="integration-tools">
            <div className="integration-tool-names">
              <img className="integration-tool-icon" src={slack} alt="git" />
              <p className="">Slack Channel (private)</p>
            </div>
            <i className="fas fa-greater-than" />
          </div>
          <div className="integration-tools no-border">
            <div className="integration-tool-names">
              <img className="integration-tool-icon" src={slack} alt="git" />
              <p className="">Slack Channel (public)</p>
            </div>
            <i className="fas fa-greater-than" />
          </div>
        </div>

      </section>
      <footer onClick={() => closeModal()} className="integration-tool-footer">
        <p>cancel</p>
      </footer>

    </div>
  </Modal>
);

AddIntegration.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default AddIntegration;
