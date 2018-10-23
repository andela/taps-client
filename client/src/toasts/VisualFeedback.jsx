import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import passed from '../../public/resources/images/passed.png';
import failed from '../../public/resources/images/failed.png';
import github from '../../public/resources/images/github.png';
import slack from '../../public/resources/images/slack.png';
import pt from '../../public/resources/images/pt.jpg';
import team from '../../public/resources/images/team.png';

// icons for accounts
const logos = [
  {
    name: 'github', link: github
  },
  {
    name: 'slack', link: slack
  },
  {
    name: 'pt', link: pt
  },
  {
    name: 'team', link: team
  }
];

/**
 * @description visual feedback for api response
 * @param {object} props
 */
const VisualFeedback = ({ response, modalState, isModalOpened }) => {
  const allMessage = Object.entries(response);
  allMessage.shift();

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
        <header className="top-header">
          <h1>Status</h1>
        </header>

        <h5 className="created-team-h">Team <span className="slick-blue">{response.team[0].name}</span> has been successfully created</h5>
        <section className="response-body">
          <header className="response-top-header">
            <h3>Result of completed integrations</h3>
          </header>
          <div className="integration-res-container">
            {
              allMessage.map((message, index) => {
                const source = logos.find((logo) => logo.name === message[0]);
                return message.length &&
                <div key={index} className="notification-item">
                  <div className="space-bottom notif-item-header">
                    <img className="notif-icon" src={source.link} />
                    <h4>{message[0]}</h4>
                  </div>
                  {
                    message[1].map((name, index) => (
                      <div key={index} className="notif-item-header">
                        <div className="notif-list">
                          <div>
                            {name.created ?
                              <img className="notif-pass-icon" src={passed} /> :
                              <img className="notif-fail-icon" src={failed} />
                            }
                          </div>
                          <div className="integration-tool-name">
                            <h6>{name.name}</h6>
                            <p>{name.created ? 'created' : 'failed'}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>;
              })
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
  response: PropTypes.object.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  modalState: PropTypes.func.isRequired
};

export default VisualFeedback;
