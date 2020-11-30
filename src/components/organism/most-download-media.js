import React, {useEffect,useState,useMemo} from 'react'
import styled from "styled-components"
import {Container} from "@material-ui/core"
import Cards from "../molecules/cards-sm"
import downloadedMediaApi from "../../api/allData.api"
import ViewAllBtn from "../atom/view-all-btn"
const Div = styled.div`
padding:60px 0;
h2{
text-align:center;
margin:10px 0 20px 0;
}
.grid{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
}
.message{
    text-align:center;
}
`
const MostDownloadMedia = ({post}) => {
    const slicedData = post.data.sort((a,b)=> b.downloadsCount-a.downloadsCount).slice(0,8)
    console.log(post,"media")
    return (
        <Div>
            <Container>
                <h2>Most Downloaded Media</h2>
                {
                    post.status==="pending"?
                        <h3 className="message">We Are Getting Your data ...</h3>
                       :(
                           post.status==="success"?
                            <div className="grid">
                                { slicedData.map((a,i)=> <Cards post={a} key={i}/>) }
                            </div>
                            :<h3 className="message">Unable to find Your Data ...</h3>
                       ) 
                }
                 <ViewAllBtn url="/search?sort=download"/>
            </Container>
        </Div>
    )
}

export default MostDownloadMedia
