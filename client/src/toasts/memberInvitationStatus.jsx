import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import passed from '../../public/resources/images/passed.png';
import failed from '../../public/resources/images/failed.png';
import githubIcon from '../../public/resources/images/github.png';
import slackIcon from '../../public/resources/images/slack.png';
import ptIcon from '../../public/resources/images/pt.jpg';


/**
 * @description visual feedback for api response
 */
const data = (response) => [
  {
    name: 'Github',
    accounts: response.filter(item => (item.type).charAt(0) === 'g'),
    link: githubIcon
  },
  {
    name: 'Slack',
    accounts: response.filter(item => (item.type).charAt(0) === 's'),
    link: slackIcon
  },
  {
    name: 'PT-board',
    accounts: response.filter(item => (item.type).charAt(0) === 'p'),
    link: ptIcon
  }
];

/**
 * @description visual feedback for api response
 * @param {object} props
 */
const VisualFeedback = ({ response, modalState, isModalOpened }) => {
  const allResponse = data(response);
  const { name } = response.find(item => item.type === 'team');
  return (
    <Modal
      isOpen={isModalOpened}
      onRequestClose={() => modalState(false)}
      ariaHideApp={false}
      overlayClassName="message-overlay"
      className="modalStyle"
      contentLabel="Pop up Modal"
    >
      <div className="modal-container">
        <section className="response-body">
          <header className="response-top-header">
            <h3>Results of acount invitation</h3>
          </header>
          <h5 className="created-team-h">User successfully added to <span className="slick-blue">{name}</span> team</h5>

          <div className="integration-res-container">
            {
              allResponse.map((message, index) =>
                (message.accounts.length ?
                  <div key={message.name} className="notification-item">
                    <div className="notif-item-header">
                      <img className="notif-icon" src={message.link} alt="account-img" />
                      <h4>{message.name}</h4>
                    </div>
                    {
                      message.accounts.map((account, index) => (
                        <div key={account.name} className="notif-item-header">
                          <div className="notif-list">
                            {account.invited ?
                              <img className="notif-pass-icon" src={passed} alt="success-img" /> :
                              <img className="notif-fail-icon" src={failed} alt="fail-img" />
                            }
                            <div className="integration-tool-name">
                              <h6>{account.name}</h6>
                              <p>{account.invited ? 'invited' : 'failed'}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div> : <div />))
            }
          </div>
        </section>
        <footer className="notif-footer">
          <button onClick={() => modalState(false)} className="btn">
                Ok
          </button>

        </footer>
      </div>

    </Modal>
  );
};

VisualFeedback.propTypes = {
  response: PropTypes.array.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  modalState: PropTypes.func.isRequired
};

export default VisualFeedback;
