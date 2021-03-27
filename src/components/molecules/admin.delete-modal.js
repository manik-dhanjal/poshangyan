import React from 'react'
import styled from "styled-components"
import { Button, Header, Image, Modal } from 'semantic-ui-react'


const Div = styled.div`

`
const DeleteModal = ({setOpen,open,setSnackState}) => {
    console.log(open.post)
    const post = open.post;
     const handleDeleteClick = () => {
        let passkey = localStorage.getItem('passkey')
        axios.post(`/posts/${post._id}`,{passkey})
          .then((res)=>{
            setOpen({...open,status:false})
            setSnackState(1)
          })
          .catch(e=>{
            setSnackState(2)
            console.log(e);
          })
      }
    return (
        <Div>
             <Modal
            onClose={() => setOpen({...open,status:false})}
            onOpen={() => setOpen({...open,status:true})}
            open={open.status}
            >
            <Modal.Header>Confirm Deletion</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={post.thumbLocation?post.thumbLocation:post.Location} wrapped />
                <Modal.Description>
                <Header>{post.label}</Header>
                <p><strong>Theme: </strong>{post.themes}</p>
                <p>
                   <strong>Caution:</strong> Deleting it means you are going to remove it's existance from the database.
                </p>
                <p>Is it okay to Delete this Creative?</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => {setOpen({...open,status:false}); setSnackState(2)}}>
                Nope
                </Button>
                <Button
                content="Delete Permanently"
                labelPosition='right'
                icon='checkmark'
                onClick={handleDeleteClick}
                positive
                />
            </Modal.Actions>
            </Modal>
        </Div>
    )
}

export default DeleteModal
