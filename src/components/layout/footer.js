import React from 'react'
import styled from "styled-components"
import{ Container} from "@material-ui/core"
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
}`
const Footer = () => {
    return (
        <SFooter>
            <Container>
                <div className="copyright">NITI Aayog <span>© 2020.All rights reserved.</span></div>
                <div className='disclaimer'>The resource materials provided on the site are for reference purposes only and do not constitute government endorsement or approval unless stated otherwise.</div>
            </Container>
        </SFooter>
    )
}

export default Footer
