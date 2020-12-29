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
        display:grid;
        grid-template-columns:repeat(4,1fr);
        justify-content:stretch;
        margin-top:50px;
        gap:60px;
    }
    .thumb-cont{
        &:hover{
            transform:scale(1.03);
        }
        transition:0.5s ease;
        width: 100%;
        border:1px solid grey;
        border-radius:12px;
        background:#ffffff30;
        padding:15%;
        height:calc( ( 100vw - 300px ) / 4 );
        display:flex;
        justify-content:center;
        align-items:center;
        object-fit:contain;
        .img-cont{
            width:100%;
            height:100%;
            img{
                width:100%;
                height:100%;
                object-fit:contain;
            }
        }
    }
}
@media screen and (max-width:768px){
   .main .thumb-collection{
        display:grid;
        grid-template-columns:repeat(2,1fr);
        justify-content:stretch;
        margin-top:50px;
        gap:20px;
    }
    .main .thumb-cont{
        &:hover{
            transform:scale(1.03);
        }
        transition:0.5s ease;
        width: 100%;
        border:1px solid grey;
        border-radius:12px;
        background:#ffffff30;
        padding:15%;
        height:calc( ( 100vw - 100px ) / 2 );
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
        link:'http://poshanabhiyaan.gov.in/'
    },
    {
        img:amb,
        link:'https://anemiamuktbharat.info/'
    },
    {
        img:eri,
        link:'https://eatrightindia.gov.in/'
    },
    {
        img:MoHFW,
        link:'https://www.mohfw.gov.in/'
    },
    {
        img:niti,
        link:'https://niti.gov.in/'
    },
    {
        img:swach,
        link:'https://swachhbharat.mygov.in/'
    },
    {
        img:MoWC,
        link:'https://wcd.nic.in/'
    },
    {
        img:nutri,
        link:'https://www.nutritionindia.info/'
    },
]