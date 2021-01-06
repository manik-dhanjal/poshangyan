import { event } from 'jquery'
import React, {Component} from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios'

export class Admin extends Component {
    state = {
          userName:'',
          password:''  
    }
    handleChange =  (type,value)=>{
        switch(type){ 
            case 'username':
                console.log(value)
                this.setState({
                    userName:value
                })
            case 'password':
                this.setState({
                    password:value
                })

        }
    }
    handleLogin = () => {
        let details = {
            username: this.state.userName,
            password: this.state.password
        }
        axios.post('/login',details)
            .then(res=>{
                console.log(JSON.parse(localStorage.getItem('user')))
                console.log(res)
                localStorage.setItem('rememberMe', "rememberMe");
                localStorage.setItem('user',JSON.stringify(res.data));
                localStorage.setItem('passkey',JSON.stringify(res.data.passkey));
            })
            .catch(e=>{
                console.log(e)
            })
    }
    render(){
        
        return(
            <div style={{width:'100%',height:'100%'}} placeholder>
                
            <Grid columns={1} style={{width:350,height:360,margin:'auto',marginTop:200}} >
              <Grid.Column>
                <Form>
                  <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='Username'
                    placeholder='Username'
                    onChange={(event)=> this.handleChange("username",event.target.value)}
                  />
                  <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                  />
                 <center>
                  <Button content='Login' onClick={this.handleLogin} primary />
                  </center>
                </Form>
              </Grid.Column>
        
            </Grid>
          </div>
        )
    }

}

export default Admin
