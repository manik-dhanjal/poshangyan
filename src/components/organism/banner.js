import React from 'react'
import styled from "styled-components"
import bannerBg from "../../assets/Images/banner-bg.png"
import BannerMenu from "../molecules/banner-menu"
import { Container } from '@material-ui/core';
const Div = styled.div`
position: relative;
overflow: visible;
background: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(${bannerBg});
min-height:400px;
display:flex;
flex-direction:column;
justify-content:center;
h1{
    color: white;
    width: 100%;
    text-align: center;
    max-width:700px;
    padding:0 30px;
    margin:0 auto;
    margin-bottom:5%;
    line-height:1.5em;
    font-weight:600;
}
`
const Banner = ({children,query}) => {
    return (
        <Div>
            <Container>
              <h1>
                {children}
              </h1>

            <div className="banner-menu">
              <BannerMenu query={query}/>
            </div>
          </Container>
      </Div>
    )
}

export default Banner
