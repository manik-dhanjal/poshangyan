import { event } from 'jquery'
import React, {Component} from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios'
import SnackBar from './adminedit/Views/SnackBar'
export class Admin extends Component {
    state = {
          userName:'',
          password:'' ,
          showSnackbar:false,
          snackbarMessage:''
    }
    handleChange =  (type,value)=>{
        switch(type){ 
            case 'username':
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
                localStorage.setItem('user',JSON.stringify(res.data));
                localStorage.setItem('passkey',res.data.passkey);
                this.props.history.push('/adminPortal');
            })
            .catch(e=>{
                console.log(e)
                this.setState({
                  snackbarMessage:e.response.data.message,
                  showSnackbar:true
                })
                setTimeout(()=>{
                  try{
                    this.setState({
                      showSnackbar:false,
                      snackbarMessage:''
                    })
                  }catch{

                  }
                },2000)
            })
    }
    render(){
        
        return(
            <div style={{width:'100%',height:'100%'}} placeholder>
                <SnackBar showSnackbar={this.state.showSnackbar} message={this.state.snackbarMessage} />
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
                    onChange={(event)=> this.handleChange("password",event.target.value)}
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
