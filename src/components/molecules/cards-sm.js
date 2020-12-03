import React from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'
import play from '../../assets/Images/play.png' 
import{ Link }from "react-router-dom"
import handleDownload from "../../api/aws-handle-download"

const Div = styled.div`
max-width:280px;
width:100%;
margin:20px 10px;
display:flex;
flex-direction:column;
align-items:center;
    .card-thumbnail{
      box-shadow:         5px 5px 18px 0px rgba(50, 50, 50, 0.1);
      border-radius:15px;
      overflow:hidden;
      object-fit:cover;
      object-position:center;
      position:relative;
      width:100%;
      height:180px;
      display:flex;
      justify-content:center;
      align-items:center;
      margin-bottom:15px;
        play-btn{
            width:30px;
            width:30px;
        }
    }
    .link{
      width:100%;
    }
    .label{
        font-size:1.1em;
        margin-bottom:10px;
        text-align:center;
        color:black;
        min-height:2.5em;
    }
    .ui.animated.button {
        background: rgb(340,66,94);
        color: white;
    }
       
`
const slugCreater = (str) =>{
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
      
        return str.toString().toLowerCase()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, '-and-') // Replace & with 'and'
          .replace(/[^\w\-]+/g, '') // Remove all non-word characters
          .replace(/\-\-+/g, '-') // Replace multiple - with single -
          .replace(/^-+/, '') // Trim - from start of text
          .replace(/-+$/, '') // Trim - from end of text
}
const Cards = ({post}) => {
    const {label,Location,thumbLocation,mimetype,Key,_id} = post;
    return (
        <Div>
                <Link to={`${slugCreater(post.themes)}/${post.postId}`} className="link">

                  <div className="card-thumbnail" style={{background:`center / cover no-repeat url(${thumbLocation||Location})`}}>
                    { mimetype.includes('video') ? <img src={play} className="play-btn"/> :null }
                  </div>

                   <div className="label"> {label} </div> 
                </Link>

                <Button onClick={() => handleDownload(Location,Key,_id)} animated >
                    <Button.Content visible >Download</Button.Content>
                    <Button.Content hidden>
                        <Icon name='download' inverted />
                    </Button.Content>
                </Button>
                
        </Div>
    )
}

export default Cards
