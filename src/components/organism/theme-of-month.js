import React from 'react'
import styled from "styled-components"
import MuiGrid from "@material-ui/core/Grid";
import { Container } from '@material-ui/core';

const Div = styled.div`
background:rgb(234,231,199);
padding:60px 0;
h2{
    margin-bottom:40px;
}
`
const ThemeOfMonth = ({children}) => {
    return (
        <Div>
            <Container>
                <h2>Theme of the month</h2>
                <MuiGrid container spacing={3}>
                 {children}
                </MuiGrid>
            </Container>
        </Div>
    )
}

export default ThemeOfMonth
