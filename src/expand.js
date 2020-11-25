import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Icon, Table } from 'semantic-ui-react'
import './App.css'
function ModalExampleModal(props) {
  const [open, setOpen] = React.useState(false)
  const myWebSite = 'https://www.poshangyan.com/?postId=';
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button animated='vertical' className= "bottomLeft" style={{background:'#EF5287',opacity: '0.5'}}>
      <Button.Content hidden style={{ color: 'white' }}>Expand</Button.Content>
      <Button.Content visible>
        <Icon name='external alternate' inverted  />
      </Button.Content>
    </Button>}
    >
      <Modal.Header>Expanded View
      
        <Icon name='close' onClick={() => setOpen(false)} style={{float:'right'}} />
      
       </Modal.Header>
      <Modal.Content image>
        <Image size='medium' style={{height:'auto',width:400,objectFit:'cover'}}  
        src={props.post.thumbLocation ? props.post.thumbLocation : props.post.Location} wrapped />
        <Modal.Description>
  <Header><h2>{props.post.label}</h2></Header>
          <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>Infrormation</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell >
          <Icon name='themeisle' /> Theme
        </Table.Cell>
        <Table.Cell>{props.post.themes}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='language' /> Language
        </Table.Cell>
        <Table.Cell>{props.post.languages}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='file' /> Type
        </Table.Cell>
        <Table.Cell>{props.post.mimetype}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='feed' /> Source
        </Table.Cell>
        <Table.Cell>{props.post.source}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Icon name='download' /> Downloads
        </Table.Cell>
        <Table.Cell>{props.post.downloadsCount}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
  <div>
  <a href={"https://www.facebook.com/sharer/sharer.php?u="+myWebSite+ props.post._id} target="_blank" rel="noopener">
    <Button circular color='facebook' icon='facebook' />
</a>
    <Button circular color='twitter' icon='twitter' />
    <Button circular color='linkedin' icon='linkedin' />
    <Button circular color='google plus' icon='google plus' />
  </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button animated style={{background:'#EF5287'}} >
      <Button.Content visible style={{ color: 'white' }} >Download</Button.Content>
      <Button.Content hidden>
        <Icon name='download' inverted />
      </Button.Content>
    </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal
