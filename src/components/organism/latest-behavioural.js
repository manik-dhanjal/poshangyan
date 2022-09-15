import React from 'react';
import styled from "styled-components";
import LatestBehaveChild from "../molecules/latest-behave-child"
import MuiGrid from "@material-ui/core/Grid";
import { Container } from '@material-ui/core';

const Div = styled.div`
background:#f4d6cc;
.child:last-of-type{
border-left:2px solid white;
}
.latest-behave-grid{
    display:flex;
}
@media screen and (max-width:1024px){
    .latest-behave-grid{
        flex-direction:column;
    } 
    .child:last-of-type{
        border-left:none;
        border-top:2px solid white;
        margin-top:0px;
        padding-top:60px;
    }
}
`
const LatestBehave = ({post}) => {
    const latestData = post.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt) ).slice(0,2)||[];
    const behaveData = post.behavData.slice(0,2)||[];

    return (
        <Div>
            <Container>
                <div className="latest-behave-grid" >
                    <LatestBehaveChild title={"Latest Media"} data={latestData} status={post.status} className="cont" url={"/search?Themes=Any&sort=date"}/>
                    <LatestBehaveChild title={"Applying Behavioural Insights"} data={behaveData}  status={post.status} className="cont" url={"/search?Themes=Behavioural Insights"}/>
                </div>
            </Container>
        </Div>
    )
}

export default LatestBehave
