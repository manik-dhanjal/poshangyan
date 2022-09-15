import React from 'react'
import styled from "styled-components"
import{ Container} from "@material-ui/core"

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
    display:flex;
    flex-direction:row-reverse;
    .left-cont{
        flex:1;
    }
    .right-cont{
        min-width:200px;
        text-align:right;
    }
}
.visitor-counter{
    font-size: 16px;
    margin-bottom: 10px;
    color:grey;
    span{
        font-weight:600;
        margin-left:5px;
        font-size:1.3em;
        color:#ff425e;
    }
}
@media screen and (max-width:768px){
    text-align:center;
   .bottom-footer{
       flex-direction:column;
       .right-cont{
           text-align:center;
       }
   }
}
`
const Footer = ({visitCount}) => {
    return (
        <SFooter>
                <Container className='bottom-footer'>
                    <div className='right-cont'>
                        <div className='visitor-counter'>Visitors: <span>{visitCount}</span></div>
                        <div className='last-updated'></div>
                    </div>
                    <div className='left-cont'>
                        <div className="copyright">NITI Aayog <span>© 2020.All rights reserved.</span></div>
                        <div className='disclaimer'>The resource materials provided on the site are for reference purposes only and do not constitute government endorsement or approval unless stated otherwise.</div>
                    </div>
                </Container>
        </SFooter>
    )
}

export default Footer
