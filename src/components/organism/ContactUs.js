import React, { Component } from "react";
import { Button, Form, Segment, TextArea } from 'semantic-ui-react'
import { Container } from "@material-ui/core"
import styled from "styled-components"
import axios from "axios";

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


export class FormExampleInverted extends Component {
  state = {
    name: '',
    email: '',
    phoneNo: '',
    message: '',
    errEmailMessage:"Please enter a valid email",
    error:false,
    messageSent:false
  }
 validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  contactUs = () => {
    let data = {
      name: this.state.name,
      email: this.state.email,
      phoneNo: this.state.phoneNo,
      message: this.state.message
    }
    console.log(data)
    if (data.name.trim() === '' || data.email.trim() === '' || data.phoneNo.trim() === '' || data.message.trim() === '') return;
    if(!this.validateEmail(data.email)){
      this.setState({error:true})
      return;
    }
    axios.post('/contactUsFormSubmission', data)
      .then((res) => {
        console.log(res.data)
        this.setState({
          name: '',
          email: '',
          phoneNo: '',
          message: '',
          messageSent:true
        })
        setTimeout(()=>{
          this.setState({messageSent:false})
        },5000)
      })
      .catch(e => {
        console.log(e);
      })

  }

  hadleChange = (e, type, val) => {
    e.preventDefault();
    this.setState({ [type]: val , error:false})
  }

  render() {
    return (
      <Div>
        <Container>
          <h2>Stay in Touch</h2>
          <div className="form-cont">
            <Form inverted>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Name'
                  value={this.state.name} placeholder='name' onChange={(e) => this.hadleChange(e, 'name', e.target.value)} />
              </Form.Group>
              {
                this.state.error ?<Form.Input fluid label='Email Id' 
                type="email" 
                placeholder='Email Id' 
                error={{ content: 'Please enter valid email', pointing: 'below' }}
                value={this.state.email} onChange={(e) => this.hadleChange(e, 'email', e.target.value)} /> :<Form.Input fluid label='Email Id' 
                type="email" 
                placeholder='Email Id' 
                value={this.state.email} onChange={(e) => this.hadleChange(e, 'email', e.target.value)} />
              }
               
              <Form.Input fluid label='Phone Number' type="tel" placeholder='+91625.......' value={this.state.phoneNo} onChange={(e) => this.hadleChange(e, 'phoneNo', e.target.value)} />
              <Form.Field
                control={TextArea}
                label='Message'
                value={this.state.message}
                placeholder='Leave us a message...'
                onChange={(e) => this.hadleChange(e, 'message', e.target.value)}
              />
              <center> {this.state.messageSent ?<p>Message sucessfully sent......</p> : null}
               <Button type='submit' className="submit-btn" onClick={this.contactUs}>Submit</Button>
               </center>
              
            </Form>
          </div>
        </Container>
      </Div>
    )
  }
}


export default FormExampleInverted