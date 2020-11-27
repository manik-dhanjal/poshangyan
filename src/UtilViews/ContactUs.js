import React from 'react'
import { Button, Form, Segment , TextArea,Container } from 'semantic-ui-react'

const FormExampleInverted = () => (
  <Segment inverted style={{width:'100%'}} >
    <Form inverted>
    <Container style={{marginLeft:"10%",marginRight:"10%"}}>
    <h2>Contact Us</h2> 
      <Form.Group widths='equal'>
        <Form.Input fluid label='First name' placeholder='First name' />
        <Form.Input fluid label='Last name' placeholder='Last name' />
      </Form.Group>
      <Form.Input fluid label='Email Id' placeholder='Email Id' />
      <Form.Input fluid label='Phone Number' placeholder='+91625.......' />
              <Form.Field
          control={TextArea}
          label='Message'
          placeholder='Leave us a message...'
        />
     <center>  <Button type='submit'>Submit</Button> </center>
     </Container>
    </Form>

  </Segment>
)
export default FormExampleInverted