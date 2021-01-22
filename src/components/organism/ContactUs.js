import React from 'react'
import { Button, Form, Segment , TextArea} from 'semantic-ui-react'
import {Container} from "@material-ui/core"
import styled from "styled-components"

const Div = styled.div`
padding:60px;
background:#f4d6cc;
h2{
  text-align:center;
  margin-bottom:40px;
}
.form-cont{
  max-width:400px;
  width:100%;
  margin:0 auto;

}
label{
 color:black!important;
}
.submit-btn{
  background:black;
  color:white;
  width:200px;
  padding-top:15px;
  padding-bottom:15px;
  font-size:1.2em;
  margin-top:15px;
  &:focus{
    background:#1cd11c;
    color:white;
  }
}
.submit-btn:hover{
  background:rgb(212, 62, 84);
  color:white;
}
`
const FormExampleInverted = () => (
    <Div>
      <Container>
        <h2>Stay in Touch</h2> 
        <div className="form-cont">
          <Form inverted>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Name' placeholder='name' />
            </Form.Group>
            <Form.Input fluid label='Email Id' placeholder='Email Id' />
            <Form.Input fluid label='Phone Number' placeholder='+91625.......' />
                    <Form.Field
                control={TextArea}
                label='Message'
                placeholder='Leave us a message...'
              />
             <center>  <Button type='submit' className="submit-btn">Submit</Button> </center>
          </Form>
        </div>  
      </Container>
    </Div>
)
export default FormExampleInverted