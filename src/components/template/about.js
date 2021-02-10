import React from 'react'
import styled from 'styled-components'
import BannerMenu from "../molecules/banner-menu"
import img1 from "../../assets/Images/about-us/1.png"
import img2 from "../../assets/Images/about-us/2.png"
import img3 from "../../assets/Images/about-us/3.png"
import img4 from "../../assets/Images/about-us/4.png"

import csbc from '../../assets/Images/csbc.png'
import bmgf from '../../assets/Images/bmgf.png'
import{ Container} from "@material-ui/core"
const Div = styled.div`
background:#f4d6cc;
.custom-cont{
    max-width:1060px;
    text-align:center;
    padding-top:50px;
    padding-bottom:50px;
    margin:0px auto;
}
.content{
    font-size:1.4em;
    line-height:1.8em;
    list-style-type:none;
}
.back-white{
    background:#f2f2f2;
}
.credits-our{
    padding:20px 30px;
    text-align:center;
    background:black;
    color:white;
    font-size:1.2em;
}
.credits{
    background:#eee;
    &>div{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:Center;
        padding:25px 0;
        .logos{
            display:flex;
            justify-content:center;
            margin-top:10px;
            &>a{
                height:60px;
                margin:0 25px;
                img{
                    width:100%;
                    height:100%;
                    object-fit:contain;
                }
            }
        }
    }
}
.container.top{
    text-align:center;
    &>div:nth-of-type(1){
        text-align:left;
    }
    h1{
        margin-top:50px;
    }
}
.howtouse-content{
    display:flex;
    width:100%;
    margin-top:40px;
    padding:0px;
    li{
        margin-right:50px;
        width:25%;
        list-style-type:none;
        img{
            width:100%;
            height:100%;
            object-fit:contain;
        }
        .content{
            padding-top:30px;
            font-size:1.2em;
            line-height:1.5em;
            padding-bottom:30px;
        }
    }
    li:nth-child(4){
        margin-right:0px;
    }
}
@media screen and (max-width:1024px){
    .content{
        padding-top:30px;
        font-size:1em!important;
    }
}
@media screen and (max-width:991px){
    .howtouse-content{
        flex-wrap:wrap;
        li{
            margin:20px;
            width:calc( 50% - 40px );
        }
}
@media screen and (max-width:991px){
    .howtouse-content{
        flex-wrap:wrap;
        li{
            margin:20px;
            width:calc( 100% - 20px );
        }
}
`
const About = () => {
    return (
        <Div>
        <div className='container top' style={{paddingTop:50}}>
            <BannerMenu/>
                <h1>
                    How to use this website
                </h1>
                <ul className='howtouse-content'>
                    <li>
                       <div className='img-cont'>
                           <img  src={img1}/>
                           <div className='content'>
                                Search for the right materials for your use by selecting the theme, language, type of media etc.
                           </div>
                       </div>
                    </li>
                    <li>
                       <div className='img-cont'>
                           <img  src={img2}/>
                           <div className='content'>
                              Download the materials for your use or share on social media.
                           </div>
                       </div>
                    </li>
                    <li>
                       <div className='img-cont'>
                           <img  src={img3}/>
                           <div className='content'>
                             Sign up to receive Email notifications when new materials are uploaded.
                           </div>
                       </div>
                    </li>
                    <li>
                       <div className='img-cont'>
                           <img  src={img4}/>
                           <div className='content'>
                             Upload materials developed by your organisation or team to be shared and used by others
                           </div>
                       </div>
                    </li>
                </ul>
        </div>
        <div className='back-white'>
            <div className='container custom-cont'>
                <h1>
                    About Us 
                </h1>
                <div className='content'>
                    <p>Poshan Gyan is a trusted and comprehensive online resource for anybody working in the nutrition sector in India. </p>
                    <p>It is a collection of effective communication materials created by government agencies and other development organizations to tackle the challenges of knowledge awareness and behaviour change in the nutrition sector. </p>
                    <p>The materials cover a range of topics, such as antenatal care, complementary feeding, adolescent health, diet diversity, anemia prevention etc.This repository is curated and maintained by NITI Aayog in joint efforts with other development partners.</p>
                    <p>Poshan Gyan is designed to be accessible for everybody to use - whether frontline health workers, community leaders, teachers or anyone else seeking to improve nutritional outcomes. It contains materials targeted towards different audiences using a variety of media types, such as interpersonal communication, mass media, outdoor advertising etc. The 'search' toolbar on the homepage will help you find the most relevant materials for your purpose in a simple and easy manner.</p>
                    <p>We welcome the input of users and community members to submit more materials to improve the scale and quality of this resource. Please use the upload and feedback features on the website to submit materials or get in touch!</p>
                </div>
            </div>
        </div>
        {/* <div className='credits-our'>
        This website was developed in collaboration with Bill & Melinda  Gates Foundation and Centre for Social & Behaviour Change, Ashoka University.<br/><br/>
        Website designed and developed by 2626 Creative Studio.
        </div> */}
        <div className='credits'>
                    <Container>
                        <h4>This website was developed in collaboration with</h4>
                        <div className='logos'>
                            <a className='img-cont' href='https://www.gatesfoundation.org/' target='__blank'> <img src={bmgf}/></a>
                            <a className='img-cont' href='https://csbc.org.in/' target='__blank'> <img src={csbc}/></a>
                        </div>
                    </Container>
                </div>
        </Div>
    )
}

export default About
