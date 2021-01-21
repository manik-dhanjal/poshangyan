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
import wecan from '../../assets/Images/important links/wecan_logo.jpg'


const Div = styled.div`
background:#f4d6cc;
.main{
    margin:0px auto;
}
.container.head{
    padding-top:50px;
}
.wecan-cont{
    background:white;
    padding:20px 30px;
    margin-top:30px;

    .wecan-card{
        max-width:500px;
        display:flex;
        margin:0 auto;
        align-items:center;
        color:black;
        justify-content:center;
        .img-cont{
            margin-right:30px;
           
            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        &>div{
            width:50%;
        }
    }
}
    h1{
        margin-top:50px;
        text-align:center;
    }
    .thumb-collection{
        display:flex;
        flex-wrap:wrap;
        margin-top:50px;
        margin-right: auto;
        margin-left:auto;
        width:1160px;
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
        margin-bottom:30px;
        margin-left:15px;
        margin-right:15px;
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
@media screen and (max-width:1190px){
    .main .thumb-collection{
         width:870px;
     }
 }
@media screen and (max-width:900px){
    .main .thumb-collection{
         width:580px;
     }
 }
 @media screen and (max-width:640px){
    .main .thumb-collection{
         width:290px;
     }
     .wecan-card{
         flex-direction:column;
         max-width:300px;
         padding:0 30px;\
         .img-cont{
             margin-right:0!important;
            margin-bottom:30px;
        }
     }
    
 }
`
const ImportantLinks = () => {
    return (
        <Div>
            <div className='container main head'>
                <BannerMenu />
                <h1>Important Links</h1>
            </div>
               
            <div className='wecan-cont'>
                <a className='wecan-card' href='https://www.wecollaborate4nutrition.org' target="__blank">
                    <div className='img-cont'>
                        <img src={wecan}/>
                    </div>
                    <div className='content'>
                        <h3>WeCan</h3>
                        <p>WeCan Mothers' support page contains resource materials from the Government and development partners and links to support groups, helplines, lactation experts and associations.</p>
                    </div>
                </a>
            </div>
            <div className='container main'>
                <div className='thumb-collection'>
                    {
                        links.map((link)=>(
                            <a href={link.link} className='thumb-cont' target='__blank'>
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