import React from 'react'
import styled from "styled-components"
import Header from "./header"
import Footer from "./footer"
const Div = styled.div`

`
const Layout = ({children}) => {
    return (
        <Div>
            <Header/>
             <main>{children}</main>
            <Footer/> 
        </Div>
    )
}

export default Layout
