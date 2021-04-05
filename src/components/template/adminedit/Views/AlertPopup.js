import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function ModalExampleBasic(props) {
  const [open, setOpen] = React.useState(false)

  const { val, type } = props;

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Icon name='trash' style={{ marginLeft: 20, cursor: 'pointer' }} onClick={(event) => {
        event.stopPropagation();
    }} />}
    >
      <Header icon>
        <Icon name='trash' />
        {props.submessage}
      </Header>
      <Modal.Content>
        <p>
          {props.message} <br/>
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='green' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='red' inverted onClick={(event) => { 
          event.stopPropagation();
           if(props.delete) props.delete(type, val)}}
           >
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleBasic