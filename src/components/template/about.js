import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
background:#f4d6cc;
&>div{
    max-width:768px;
    text-align:center;
    padding-top:50px;
    padding-bottom:50px;
    margin:0px auto;
}
.content{
    font-size:1.4em;
    line-height:1.8em;
}
`
const About = () => {
    return (
        <Div>
        <div className='container'>
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
        </Div>
    )
}

export default About
