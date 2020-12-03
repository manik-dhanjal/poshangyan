import React from 'react'
import styled from "styled-components"
import Video from "../atom/video"
import audioThumb from "../../assets/Images/audio-thumbnail.png"
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
                   { mime && (mime.includes("video") || mime.includes("audio")) ? <Video location={location} thumbnail={thumbnail||audioThumb}/> : <img src={thumbnail||location} /> }
            </div>
        </Div>
    )
}

export default CreativeImage
