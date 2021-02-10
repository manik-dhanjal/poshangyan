import React from 'react'
import styled from "styled-components"
import{ Container} from "@material-ui/core"
import csbc from '../../assets/Images/csbc.png'
import bmgf from '../../assets/Images/bmgf.png'
import studio from '../../assets/Images/2626.png'
const SFooter =  styled.footer`

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
.credits-our{
    background:black;
    color:white;
    font-size:1em;
    padding:10px 0;
    text-align:center;
}
.bottom-footer{
    padding-top:15px;
    padding-bottom:15px;
}
@media screen and (max-width:768px){
    text-align:center;
    .credits{
        
    }
}
`
const Footer = () => {
    return (
        <SFooter>
                <Container className='bottom-footer'>
                    <div className="copyright">NITI Aayog <span>© 2020.All rights reserved.</span></div>
                    <div className='disclaimer'>The resource materials provided on the site are for reference purposes only and do not constitute government endorsement or approval unless stated otherwise.</div>
                </Container>
        </SFooter>
    )
}

export default Footer
