import React from 'react'
import Modal from 'react-modal';
import { Button, Header, Image, List } from 'semantic-ui-react'

const MessagePopup = ({response}) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>called', response)
    const allMessage = response;
    return (
        <Modal
          isOpen={true}
        //   onRequestClose={() => this.props.isOverlayOpened(false)}
          ariaHideApp={false}
          overlayClassName="message-overlay"
          className="modalStyle"
          contentLabel="Pop up Modal"
        >
      <Header> API Response </Header>
        <Header> Integrations </Header>
        {
          Object.keys(allMessage).map((message) => 
          allMessage[message] &&  <List>
              <List.Content>
                <List.Header>{message}</List.Header>
                <List.List>
                {
                    console.log(allMessage[message], '*********************')
                //   allMessage[message].map((name) => {
                //     console.log('********************', name)
                //     return <List.Item>{name.name}</List.Item>
                //   } 
                //   )
                }
               </List.List>
              </List.Content>
            </List>
            
          )
        }
    </Modal>
  )}

  export default MessagePopup
