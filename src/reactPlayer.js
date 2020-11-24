import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Player,LoadingSpinner,BigPlayButton } from 'video-react';
import "../node_modules/video-react/dist/video-react.css";
import play from './play.png' 
import cross from './cross.png' 
function ReactPlayer(props) {
  const [open, setOpen] = React.useState(false)
  const [source, setSource] = React.useState(props.src)
    // console.log(props.src)

  return (

    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    //   style={{position:'relative'}}
      trigger={<img className= "centeredPlayBtn"  src={play} alt="Play" />}
    >
        {/* <img src={cross} alt='cross' style={{position:'absolute',width:40,height:40,right:'8px',top:'2px'}} /> */}

      <Player
        autoPlay
        // poster="/assets/poster.png"
        src={source}
      >
        <LoadingSpinner />
        <BigPlayButton position="center" />
        </Player>
    </Modal>
  )
}

export default ReactPlayer
