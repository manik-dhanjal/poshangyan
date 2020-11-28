import React from 'react';
import styled from "styled-components";
import LatestBehaveChild from "../molecules/latest-behave-child"
import MuiGrid from "@material-ui/core/Grid";
import { Container } from '@material-ui/core';

const Div = styled.div`
background:white;
.child:last-of-type{
border-left:2px solid rgb(234,231,199);
}
`
const LatestBehave = ({latest,behave}) => {
    return (
        <Div>
            <Container>
                <MuiGrid container spacing={3} >
                    <LatestBehaveChild title={"Latest Media"} data={latest} className="cont"/>
                    <LatestBehaveChild title={"Applying Behavioural Insights"} data={behave} className="cont"/>
                </MuiGrid>
            </Container>
        </Div>
    )
}

export default LatestBehave
