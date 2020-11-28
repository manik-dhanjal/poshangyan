import React,{useEffect} from 'react'
import styled from "styled-components"
import Video from "../atom/video"
const Div = styled.div`
flex:1;
.show-image{
    width:100%;
    img{
        width:100%;
    }
}
`
const CreativeImage = ({location,thumbnail,mime}) => {

    return (
        <Div>
            <div className="show-image">
                   { mime&& mime.includes("video") ? <Video location={location} thumbnail={thumbnail}/> : <img src={thumbnail||location} /> }
            </div>
        </Div>
    )
}

export default CreativeImage
