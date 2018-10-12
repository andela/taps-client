import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '30%',
    height: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#3359DB',
    color: '#fff',
    cursor: 'pointer'
  }
};

// Modal.setAppElement('#app');

const AddIntegration = ({ isModalOpen, closeModal }) => (
  <Modal
    isOpen={isModalOpen}
    contentLabel="Add Integration"
    onRequestClose={closeModal}
    style={customStyles}
    ariaHideApp="false"
  >
    <p className="integration-header">Select an integration to add</p>
    <p className="integration-tools">Github Repo</p>
    <p className="integration-tools">Pivotal Tracker</p>
    <p className="integration-tools">Slack Channel (private)</p>
    <p className="integration-tools">Slack Channel (public)</p>
  </Modal>
);

AddIntegration.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default AddIntegration;
