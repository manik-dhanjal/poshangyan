import React from 'react'
import styled from "styled-components"
import{ Container} from "@material-ui/core"
import csbc from '../../assets/Images/csbc.png'
import bmgf from '../../assets/Images/bmgf.png'
import studio from '../../assets/Images/2626.png'
const SFooter =  styled.footer`
background:white;
padding:20px 0;
font-size:1.1em;
.copyright>span{
color:grey;
font-size:0.9em;
}
.disclaimer{
    margin-top:10px;
    color:grey;
    font-size:0.9em;
}
.credits{
    display:flex;
    justify-content:space-between;
    align-items:Center;
    padding:20px 0;
    .left{
        display:flex;
        align-items:center;
        &>a{
            height:60px;
            margin-right:50px;
            img{
                width:100%;
                height:100%;
                object-fit:contain;
            }
        }
    }
    .right{
        &>a{
            height:70px;
            display:block;
            img{
                width:100%;
                height:100%;
                object-fit:contain;
            }
        }
    }
}
@media screen and (max-width:768px){
    text-align:center;
    .credits{
        .left>a{
            margin-right:30px!important;
            height:40px;
        }
        .right>a{
            height:50px;
        }
    }
}
`
const Footer = () => {
    return (
        <SFooter>
            <Container>
                <div className="copyright">NITI Aayog <span>© 2020.All rights reserved.</span></div>
                <div className='disclaimer'>The resource materials provided on the site are for reference purposes only and do not constitute government endorsement or approval unless stated otherwise.</div>
                <div className='credits'>
                    <div className='left'>
                       <a className='img-cont' href='https://www.gatesfoundation.org/' target='__blank'> <img src={bmgf}/></a>
                       <a className='img-cont' href='https://csbc.org.in/' target='__blank'> <img src={csbc}/></a>
                    </div>
                    <div className='right'>
                        <a className='img-cont' href='http://visit.2626.today/' target='__blank'> <img src={studio}/></a>
                    </div>
                </div>
            </Container>
        </SFooter>
    )
}

export default Footer
