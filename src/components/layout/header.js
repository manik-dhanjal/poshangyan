import { Container } from '@material-ui/core'
import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"
import logo from '../../assets/Images/logo.png'
const Nav = styled.nav`
padding:${({location})=>(
                location==='/'?'15px 0':'0px 0')};
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
${({location})=>(
   location==='/'?
   `.main-logo{
    position:relative;
    z-index:3;
    height:100%;
    a{  
        left:calc( 50% - 75px);
        top:-10px;
        width:160px;
        height:160px;
        display:flex;
        justify-content:Center;
        align-items:center;
        position:absolute;
        max-width:100%;
        background:white;
        border-radius:50%;

    }
}`
:`
.main-logo{
   display:flex;
   justify-content:center;
   align-items:center;
}
`
)}

.menus{
    display:flex;
    justify-content:end;
    align-items:center;
}
.menu-pages{
    padding:0;
    display:flex;
    list-style-type:none;
    font-size:1.2em;
    li{
        margin-right:15px;
        a{
            color:black;
            transition:0.2s ease;
            &:hover{
                color:rgb(340,66,94);
                text-decoration:underline;
            }
        }
    }
}
.menu-icons{
    padding:0;
    display:flex;
    list-style-type:none;
    border-left:1px solid black;
    font-size:1.3em;
    li{
        margin-left:15px;
        a,span{
            color:black;
            cursor:pointer;
            transition:0.2s ease;
            &:hover{
                color:rgb(340,66,94);
            }
        }
    }
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
            <Nav location = {window.location.pathname}>
                    <Link to="/" className="logo niti-ayaog">
                        <img src="https://poshangyan.s3.ap-south-1.amazonaws.com/niti-aayog-logo.png" alt="logo" />
                        <div className='govt'>Government of India</div>
                    </Link>
                    <div className='main-logo'>
                        <Link to="/" className="logo">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className='menus'>
                        <ul className='menu-pages'>
                            <li>
                                <Link to='/' target="_blanck">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/about-us' target="_blanck">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                        <ul className='menu-icons'>
                            <li>
                                <a href='https://docs.google.com/forms/d/e/1FAIpQLSciK2SDLtVkMhjH_TUqjmVOJv1ZlhbGMaLg8di0dymvf4axpg/viewform?usp=sf_link' target="_blanck">
                                    <i className="upload icon"></i>
                                </a>
                            </li>
                            <li>
                                <Link to='/important-links'>
                                    <i class="linkify icon"></i>
                                </Link>
                            </li>
                            <li>
                                <span>
                                    <i class="shopping cart icon"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
            </Nav>
        </Container>
    )
}

export default Header
