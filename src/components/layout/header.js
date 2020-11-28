import { Container } from '@material-ui/core'
import React from 'react'
import styled from "styled-components"


const Nav = styled.nav`
padding:15px 0;
display:flex;
justify-content:space-between;
align-items:center;
.logo{
    width:10p%;
    max-width:100px;
    img{
        width:100%;
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
`
const Header = () => {
    return (
        <Container>
            <Nav>
            
                    <div className="logo">
                        <img src="https://poshangyan.s3.ap-south-1.amazonaws.com/niti-aayog-logo.png" alt="logo" />
                    </div>

                    <span className="upload-content">
                        <a href='https://docs.google.com/forms/d/e/1FAIpQLSciK2SDLtVkMhjH_TUqjmVOJv1ZlhbGMaLg8di0dymvf4axpg/viewform?usp=sf_link' target="_blanck"><h4><span className="upload-icon"><i class="upload icon"></i> </span>Upload content</h4> </a>
                    </span>
            </Nav>
        </Container>
    )
}

export default Header
