import React from 'react'
import styled from "styled-components"
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from "axios";

const Div = styled.div`

`
const DeleteModal = ({setOpen,open,setSnackState,handleDelete}) => {
    const post = open.post;
     const handleDeleteClick = () => {
      let token = localStorage.getItem("auth-token");
        axios.delete(`/posts/${post._id}`,{headers: { "x-auth-token": token },})
          .then((res)=>{
            setOpen({...open,status:false})
            setSnackState(1)
            handleDelete(post);
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
                <Image size='medium' src={post.images&&post.images[0].location} wrapped />
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
                <Button color='black' onClick={() => {setOpen({...open,status:false}); }}>
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
