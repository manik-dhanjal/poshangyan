import React from 'react'
import styled from 'styled-components'
import BannerMenu from "../molecules/banner-menu"
import abhiyan from '../../assets/Images/important links/abhiyan.png'
import amb from '../../assets/Images/important links/AMB.png'
import eri from '../../assets/Images/important links/eri.png'
import MoHFW from '../../assets/Images/important links/MoHFW.png'
import MoWC from '../../assets/Images/important links/MoWC.png'
import niti from '../../assets/Images/important links/niti ayaog.png'
import swach from '../../assets/Images/important links/swach.png'
import nutri from '../../assets/Images/important links/nutrition.png'
const Div = styled.div`
background:#f4d6cc;
.main{
    padding-top:50px;
    padding-bottom:50px;
    margin:0px auto;
    h1{
        margin-top:50px;
        text-align:center;
    }
    .thumb-collection{
        display:flex;
        flex-wrap:wrap;
        margin-top:50px;
        gap:30px;
        gap-row:50px;
        margin-right: auto;
        margin-left:auto;
        width:1130px;
    }
    .thumb-cont{
        width: 260px;
        border:1px solid grey;
        border-radius:8px;
        background:#ffffff;
        display:flex;
        flex-direction:column;
        padding:20px;
        color:black;
        .img-cont{
            width:100%;
            height:150px;
            margin-bottom:30px;
            img{
                width:100%;
                height:100%;
                object-fit:contain;
            }
        }
    }
}

@media screen and (max-width:1190px){
   .main .thumb-collection{
        width:840px;
    }
}
@media screen and (max-width:900px){
    .main .thumb-collection{
         width:550px;
     }
 }
 @media screen and (max-width:640px){
    .main .thumb-collection{
         width:260px;
     }
 }
`
const ImportantLinks = () => {
    return (
        <Div>
            <div className='container main'>
                <BannerMenu />
                <h1>Important Links</h1>
                    <div className='thumb-collection'>
                        {
                            links.map((link)=>(
                            <a href={link.link} className='thumb-cont'>
                                <div className='img-cont'>
                                        <img src={link.img}/>
                                </div>
                                <div className='content'>
                                    <h3>{link.title}</h3>
                                    <p>{link.desc}</p>
                                </div>
                            </a>
                            ))
                            
                        }
                    </div>
            </div>
        </Div>
    )
}

export default ImportantLinks

const links = [
    {
        img:abhiyan,
        link:'http://poshanabhiyaan.gov.in/',
        desc:"POSHAN Abhiyaan is India's flagship program to improve nutritional outcomes for children, adolescents, pregnant women and lactating mothers.",
        title:"POSHAN Abhiyaan"
    },
    {
        img:amb,
        link:'https://anemiamuktbharat.info/',
        desc:" The Anemia Mukt Bharat Initiative aims to strengthen the existing mechanisms and foster newer strategies for tackling anemia.",
        title:"Anemia Mukt Bharat"
    },
    {
        img:eri,
        link:'https://eatrightindia.gov.in/',
        desc:"The ‘Eat Right India’ movement a large-scale effort to transform the country’s food system in order to ensure safe, healthy and sustainable food for all Indians.",
        title:"Eat Right India"
    },
    {
        img:MoHFW,
        link:'https://www.mohfw.gov.in/',
        desc:"The official website of Ministry of Health and Family Welfare, Government of India.",
        title:"Ministry of Health and Family"
    },
    {
        img:niti,
        link:'https://niti.gov.in/',
        desc:"The National Institute for Transforming India, also called NITI Aayog, is the premier policy think tank of the Government of India.",
        title:"Niti Ayaog"
    },
    {
        img:swach,
        link:'https://swachhbharat.mygov.in/',
        desc: "Swachh Bharat Abhiyan is a country-wide campaign initiated by the Government of India to eliminate open defecation and improve solid waste management.",
        title:"Swachh Bharat Abhiyan"
    },
    {
        img:MoWC,
        link:'https://wcd.nic.in/',
        desc:"The official website of Ministry of Women and Child Development, Government of India.",
        title:"Ministry of Women and Child Development"
    },
    {
        img:nutri,
        link:'https://www.nutritionindia.info/',
        desc:"Nutrition India program aims to improve the nutritional status of children during the first 1,000 days of birth.",
        title:"Nutrition India Program"
    },
]