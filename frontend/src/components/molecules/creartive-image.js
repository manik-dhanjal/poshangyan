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
const CreativeImage = ({file,thumbnail,link}) => {
    return (
        <Div>
            <div className="show-image">
                   {    link?
                       <iframe style={{width:'100%',height:'55vh'}} src={"https://www.youtube.com/embed/"+link.substr(link.lastIndexOf('/')+1,link.length)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                       :file.mimetype=="video" || file.mimetype=="audio" ? <Video location={file.location} thumbnail={thumbnail||audioThumb}/> : <img src={thumbnail} />
                   }
            </div>
        </Div>
    )
}

export default CreativeImage
