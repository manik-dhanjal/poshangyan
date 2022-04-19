import { Container } from '@material-ui/core'
import React ,{useEffect,useState}from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"
import {useCart,useDeleteCart} from '../context/cart.context'
import logo from '../../assets/Images/logo.png'
import CartDrop from '../atom/cart.drop-down/cart.components'
import AuthOptions from "../auth/authOptions"
const Nav = styled.nav`
padding:${({location})=>(
                location==='/'?'15px 0':'0px 0')};
display: grid;
position:relative;
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
        white-space:nowrap;
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
        margin-right:20px;
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
        margin-left:20px;
                    
        }
        a,div{
            color:black;
            cursor:pointer;
            transition:0.2s ease;
            &:hover{
                color:rgb(340,66,94);
            }
        }
        a>span{
            display:none;
        }
    }
}
.cart-main{
        position:relative;
        color:black;
        font-size:1.3em;
        cursor:pointer;
        transition:0.2s ease;
        margin-left:10px;
        &:hover{
            color:rgb(340,66,94);
        }
        .cart-count {
            position: absolute;
            color: white;
            background: #ff425e;
            width: 15px;
            height: 15px;
            font-size: 13px;
            padding: ;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            top: -7px;
            left: 15px;
            z-index:2;
}
}
.drop-menu {
    display: flex;
}
   .burger-menu{
       display:none;
   }
@media screen and (max-width:786px){
    grid-template-columns: 25% 50% 25%;
    .upload-content{
        justify-self:end;
    }
    .logo{
        margin-left:-20px;
        justify-self:start;
    }
    .burger-menu{
        display:flex;
        margin-left:20px;
        cursor:pointer;
        font-size:1.6em;
    }

    .drop-menu {
        flex-direction:column;
        position:absolute;
        top: 85px;
        right: -15px;
        z-index: 1;
        width: 100vw;
        padding: 20px;
        background:white;
        clip-path: ${({menu}) => menu?'inset(0px 0px 0px 0px)':'inset(0px 0px 100% 0px)' };
        transition:0.5s ease;
       }       
       .main-logo a {
        left: calc( 50% - 50px);
        width: 100px;
        height: 100px;
        align-self: center;
        }
        .menu-pages {
            flex-direction: column;
            margin: 0;
            li {
                margin-bottom: 10px;
            }
        }
        .logo{
            margin:0;
        }
        .menu-icons{
            border: none;
            border-top: 1px solid black;
            flex-direction:column;
            margin:0;
         li {
            
            margin: 0;
            margin-top: 10px;
            }
            a>span{
                display:inline;
                font-size:0.85em;
            }
        }
           
}
`
const Header = () => {
    const cart = useCart();
    const ChangeCart = useDeleteCart()
    const [path,setPath] = useState('');
    const [isMenuOpen,setMenuOpen] = useState(false);
    const [IsCartDropOpen,setCartDropOpen] = useState(false)
    useEffect(()=>{
        setPath(window.location.pathname)
    },[window.location.pathname])
    return (
        <Container>
            <Nav location = {path} menu = {isMenuOpen}>
                    <a href="https://niti.gov.in/" className="logo niti-ayaog" target="_blank">
                        <img src="https://poshangyan.s3.us-east-1.amazonaws.com/niti-aayog-logo.png" alt="logo" />
                        <div className='govt'>Government of India</div>
                    </a>
                    <div className='main-logo'>
                        <Link to="/" className="logo">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className='menus'>
                        <div className='drop-menu'>
                            <ul className='menu-pages'>
                                <li>
                                    <Link to='/'>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about-us" >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/important-links'>
                                        {/* <i class="linkify icon"></i> */}
                                        <span>Links</span>
                                    </Link>
                                </li>
                                <li>
                                    <a href='https://docs.google.com/forms/d/e/1FAIpQLSciK2SDLtVkMhjH_TUqjmVOJv1ZlhbGMaLg8di0dymvf4axpg/viewform?usp=sf_link' target="_blank">
                                        <span>Add Content</span>
                                    </a>
                                </li>
                                <li>
                                    <AuthOptions/>
                                </li>
                            </ul>
                            {/* <ul className='menu-icons'>
                                <li>
                                    <a href='https://docs.google.com/forms/d/e/1FAIpQLSciK2SDLtVkMhjH_TUqjmVOJv1ZlhbGMaLg8di0dymvf4axpg/viewform?usp=sf_link' target="_blank">
                                        <i className="upload icon"></i> <span>Add Content</span>
                                    </a>
                                </li>
                            </ul> */}
                        </div>
                        <div className='cart-main' >
                                <div onClick={() => setCartDropOpen(!IsCartDropOpen)}>
                                    <span className='cart-count'>{cart.length}</span>
                                    <i className="shopping cart icon"></i>
                                </div>      
                        </div>
                        <div className='burger-menu' onClick={() => setMenuOpen(!isMenuOpen)}>
                            <i className="fas fa-bars"></i>
                        </div>
                    </div>
                    
                    <CartDrop state={IsCartDropOpen} setCartDropOpen={setCartDropOpen} cart={cart} deleteFromCart={ChangeCart}/>
            </Nav>
            
        </Container>
    )
}



export default Header
