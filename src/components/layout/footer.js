import React from 'react'
import styled from "styled-components"
import{ Container} from "@material-ui/core"
const SFooter =  styled.footer`
background:white;
padding:30px 0;
font-size:1.1em;
.copyright>span{
color:grey;
font-size:0.9em;
}
`
const Footer = () => {
    return (
        <SFooter>
            <Container>
                <div className="copyright">NitiAaayog <span>© 2020.All rights reserved.</span></div>
            </Container>
        </SFooter>
    )
}

export default Footer
