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
        justify-content:space-between;
    }
    .thumb-cont{
        width: calc( 25% - 50px );
        padding:3%;
        .img-cont{
            img{
                width:100%;
                height:100%;
                object-fit:contain;
            }
        }
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
                                {console.log(link)}
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
        link:''
    },
    {
        img:amb,
        link:''
    },
    {
        img:eri,
        link:''
    },
    {
        img:MoHFW,
        link:''
    },
    {
        img:niti,
        link:''
    },
    {
        img:swach,
        link:''
    },
    {
        img:MoWC,
        link:''
    },
    {
        img:nutri,
        link:''
    },
]