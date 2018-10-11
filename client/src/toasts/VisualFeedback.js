import React from 'react'
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
    name: 'github', link: github,
  },
  {
    name: 'slack', link: slack,
  },
  {
    name: 'pt', link: pt,
  },
  {
    name: 'team', link: team,
  }
]

/**
 * @description visual feedback for api response
 * @param {object} props 
 */
const VisualFeedback = ({response, modalState, isModalOpened}) => {
    const allMessage = Object.entries(response);

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
          <header className="top-header"> <h4>Notification</h4>
            <div className="icon-indicator-container">
              <div className="icon-indicator">
                <img className="notif-pass-icon" src={passed} />
                <h6>Successful</h6>
              </div>
              <div className="icon-indicator">
                <img className="notif-fail-icon" src={failed} />
                <h6>Failed</h6>
              </div>
            </div>
           </header>
          <section>
            {
              allMessage.map((message, index) => {
                const source = logos.find((logo) => logo.name === message[0] );
                return message.length && 
                  <div key={index} className="notification-item">
                    <div className="notif-item-header">
                      <img className="notif-icon" src={source.link} />
                      <h4>{message[0]}</h4>
                    </div>
                    {
                      message[1].map((name, index) => (
                        <div key={index} className="notif-list">
                          {name.created ? 
                            <img className="notif-pass-icon" src={passed} /> 
                            :
                            <img className="notif-fail-icon" src={failed} />
                          }
                          <h5>{name.name}</h5>
                        </div>
                      ) )
                    } 
                  </div>
              } )
            }
            
          </section>
          <footer className="notif-footer">
            <button onClick={ () => modalState(false)} className="btn">
                Ok
            </button>

          </footer>
        </div>
        
      </Modal>
    )}

  export default VisualFeedback
