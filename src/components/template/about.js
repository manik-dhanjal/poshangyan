import React from 'react'
import styled from 'styled-components'
import BannerMenu from "../molecules/banner-menu"
const Div = styled.div`
background:#f4d6cc;
.custom-cont{
    max-width:1060px;
    text-align:center;
    padding-top:50px;
    padding-bottom:50px;
    margin:0px auto;
    h1{
        margin-top:50px;
    }
}
.content{
    font-size:1.4em;
    line-height:1.8em;
}
.back-white{
    background:#f2f2f2;
    .content{
        list-style-type:none;
    }
}
`
const About = () => {
    return (
        <Div>
        <div className='container custom-cont'>
            <BannerMenu />
            <h1>
                About Us 
            </h1>
            <div className='content'>
                <p>Poshan Gyan is a trusted and comprehensive online resource for anybody working in the nutrition sector in India. </p>
                <p>It is a collection of effective communication materials created by government agencies and other development organizations to tackle the challenges of knowledge awareness and behaviour change in the nutrition sector. </p>
                <p>The materials cover a range of topics, such as antenatal care, complementary feeding, adolescent health, diet diversity, anemia prevention etc. This repository is curated and maintained by NITI Aayog in joint efforts with the (BMGF, MoHFW, MoWCD, MOH etc.)</p>
                <p>Poshan Gyan is designed to be accessible for everybody to use - whether frontline health workers, community leaders, teachers or anyone else seeking to improve nutritional outcomes. It contains materials targeted towards different audiences using a variety of media types, such as interpersonal communication, mass media, outdoor advertising etc. The 'search' toolbar on the homepage will help you find the most relevant materials for your purpose in a simple and easy manner.</p>
                <p>We welcome the input of users and community members to submit more materials to improve the scale and quality of this resource. Please use the upload and feedback features on the website to submit materials or get in touch!</p>
            </div>
        </div>
        <div className='back-white'>
            <div className='container custom-cont'>
                <h1>
                    How to use this website
                </h1>
                <ul className='content'>
                   <li>Search for the right materials for your use by selecting the theme, language, type of media etc.</li>
                   <li>Download the materials for your use or share on social media</li>
                   <li>Sign up to receive SMS notifications when new materials are uploaded</li>
                   <li>Upload materials developed by your organisation or team to be shared and used by others</li>
                </ul>
            </div>
        </div>
        </Div>
    )
}

export default About
