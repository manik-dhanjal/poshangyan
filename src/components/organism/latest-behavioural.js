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
const LatestBehave = ({post}) => {
    const latestData = post.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt) ).slice(0,2)||[];
    const behaveData = post.behavData.slice(0,2)||[];

    return (
        <Div>
            <Container>
                <MuiGrid container spacing={3} >
                    <LatestBehaveChild title={"Latest Media"} data={latestData} status={post.status} className="cont"/>
                    <LatestBehaveChild title={"Applying Behavioural Insights"} data={behaveData}  status={post.status} className="cont"/>
                </MuiGrid>
            </Container>
        </Div>
    )
}

export default LatestBehave
