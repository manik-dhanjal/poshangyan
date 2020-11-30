import React from 'react'
import styled from "styled-components"
import { Container } from '@material-ui/core';
import ViewAllBtn from "../atom/view-all-btn"
const Div = styled.div`
background:rgb(234,231,199);
padding:60px 0;
h2{
    margin-bottom:20px;
    text-align:center;
}
.grid{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
}
.view{
    text-align:right;
    color:black;
}
`
const ThemeOfMonth = ({children}) => {
    return (
        <Div>
            <Container>
                <h2>Theme of the month</h2>
                <div className="grid">
                 {children}
                </div>
                <ViewAllBtn url={"/search?Theme=any"}/>
            </Container>
        </Div>
    )
}

export default ThemeOfMonth
