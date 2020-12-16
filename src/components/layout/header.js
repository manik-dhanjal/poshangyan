import { Container } from '@material-ui/core'
import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"
import logo from '../../assets/Images/logo.png'
const Nav = styled.nav`
padding:0px 0;
display: grid;
grid-template-columns: repeat(3,1fr);
align-items:center;
.logo{
    width:100%;
    max-width:100px;
    justify-self:center;
    img{
        width:100%;
    }
}
.niti-ayaog{
    margin-left:0;
    justify-self:start;
    .govt{
        font-size:11px;
        text-align:center;
        line-height:8px;
        color:black;
    }
}
.upload-icon{
    color:rgb(340,66,94);
    font-size:1.5em;
    margin-bottom:-5px;
}
.upload-content>a{
    color:black;
}
.upload-content{
    justify-self:end;
}
@media screen and (max-width:786px){
    grid-template-columns: repeat(2,1fr)!important;
    .niti-ayaog{
        display:none;
    }
    .upload-content{
        justify-self:end;
    }
    .logo{
        margin-left:-20px;
        justify-self:start;
    }
}
`
const Header = () => {
    return (
        <Container>
            <Nav>
                    <Link to="/" className="logo niti-ayaog">
                        <img src="https://poshangyan.s3.ap-south-1.amazonaws.com/niti-aayog-logo.png" alt="logo" />
                        <div className='govt'>Government of India</div>
                    </Link>
                    <Link to="/" className="logo ">
                        <img src={logo} alt="logo" />
                    </Link>

                    <span className="upload-content">
                        <a href='https://docs.google.com/forms/d/e/1FAIpQLSciK2SDLtVkMhjH_TUqjmVOJv1ZlhbGMaLg8di0dymvf4axpg/viewform?usp=sf_link' target="_blanck"><h4><span className="upload-icon"><i className="upload icon"></i> </span>Upload content</h4> </a>
                    </span>
            </Nav>
        </Container>
    )
}

export default Header
