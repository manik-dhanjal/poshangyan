import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios'
import UserContext from "../context/userContext";
import ErrorNotice from "./errorNotice";

function Login () {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const { setUserData } = useContext(UserContext);
    const history = useHistory();
    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginResponse = await axios.post("/2626/login", loginUser);
            setUserData({
                status:"success",
                token: loginResponse.data.token,
                user: loginResponse.data.admin.displayName
            });
            localStorage.setItem("auth-token", loginResponse.data.token);
            history.push("/2626/dashboard");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    };
    return (
            <div style={{width:'100%',height:'calc( 100vh - 170px)',background:'#f4d6cc'}}>
            {/* <SnackBar showSnackbar={this.state.showSnackbar} message={this.state.snackbarMessage} /> */}
            <Grid columns={1} style={{width:350,height:360,margin:'auto',paddingTop:'20vh'}} >
              <Grid.Column>
                {
                error && <ErrorNotice message={error} clearError={() => setError(undefined)} />
                }
                <Form onSubmit={submit}>
                  <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='email'
                    placeholder='Email:'
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                  />
                 <center>
                  <Button content='Login' type='submit' primary />
                  </center>
                </Form>
              </Grid.Column>
        
            </Grid>
          </div>
    )
}
export default Login;