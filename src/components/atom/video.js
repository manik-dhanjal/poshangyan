import React from 'react'
import styled from "styled-components"
import { Player,LoadingSpinner,BigPlayButton } from 'video-react';
const Div = styled.div`

`
const Video = ({thumbnail,location}) => {
    return (
        <Div>
                <Player src={location} poster={thumbnail}>
                    <LoadingSpinner />
                    <BigPlayButton position="center" />
                </Player>
        </Div>
    )
}

export default Video
