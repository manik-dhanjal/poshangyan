import React from 'react'
import styled from "styled-components"
import bannerBg from "../../assets/Images/Banner1.jpg"
import BannerMenu from "../molecules/banner-menu"
import { Container } from '@material-ui/core';
const Div = styled.div`
position: relative;
overflow: visible;
background:url(${bannerBg});
background-size:cover;
background-postion:top;
background-repeat:no-repeat;
min-height:400px;
display:flex;
flex-direction:column;
justify-content:center;
.text{
    color: white;
    width: 100%;
    text-align: center;
    max-width:700px;
    padding:0 30px;
    margin:0 auto;
    margin-bottom:5%;
    line-height:1.5em;
    font-weight:600;
    h1{
      margin-bottom:15px;
    }
    h2,h1{
      line-height:1.5em;
    }
}
`
const Banner = ({children,query}) => {
    return (
        <Div>
            <Container>
              <div className='text'>
                {children}
              </div>

            <div className="banner-menu">
              <BannerMenu query={query}/>
            </div>
          </Container>
      </Div>
    )
}

export default Banner
