import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../context/userContext";
import {Link} from "react-router-dom"
import {Button} from "semantic-ui-react"
function AuthOptions () {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    // const register = () => history.push("/register");
    // const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token","");
    };
    return (
        <div className="auth-options">
            {
                userData.user ? (
                    <div className='logged-in' style={{display:'flex',alignItems:'center'}}>
                        
                        <Link className="btn btn-primary mr-2" to='/2626/dashboard'  style={{marginRight:10}}>
                            Dashboard
                        </Link>
                        <Button className="btn btn-primary mr-2" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    null
                )
            }
        </div>
    )}
    export default AuthOptions;