import React from 'react'
import styled from "styled-components"
import bannerBg from "../../assets/Images/banner-bg.png"
import BannerMenu from "../molecules/banner-menu"
import {Container} from "semantic-ui-react"
const Div = styled.div`
position: relative;
overflow: visible;
background: linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)),url(${bannerBg});
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
const Banner = (props) => {
    return (
        <Div>
            <Container>
              <h1>
                Use this repository to educate yourself on all the nutrition
                information. To keep yourself and your loved ones safe and
                healthy.
              </h1>

            <div className="banner-menu">
              <BannerMenu {...props}/>
            </div>
          </Container>
      </Div>
    )
}

export default Banner
