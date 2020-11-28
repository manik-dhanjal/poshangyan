import React from 'react'
import styled from "styled-components"
import MuiGrid from "@material-ui/core/Grid";
import { Container } from '@material-ui/core';

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
`
const ThemeOfMonth = ({children}) => {
    return (
        <Div>
            <Container>
                <h2>Theme of the month</h2>
                <div className="grid">
                 {children}
                </div>
            </Container>
        </Div>
    )
}

export default ThemeOfMonth
