import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function ModalExampleBasic() {
  const [open, setOpen] = React.useState(true)

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={''}
    >
      <Header icon>
        <Icon name='archive' />
        POST NOT FOUND
      </Header>
      <Modal.Content>
        <center>
        <h4>
          Url you are looking for is either not correct or the post is deleted.
        </h4>
        </center>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> Close
        </Button>
        {/* <Button color='green' inverted onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Yes
        </Button> */}
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleBasic
