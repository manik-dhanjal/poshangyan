import React from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'
import play from '../../assets/Images/play.png' 
import AWS from "aws-sdk";
import axios from 'axios';

const Div = styled.div`
max-width:280px;
width:100%;
overflow:hidden;
margin:0 10px;
display:flex;
flex-direction:column;
align-items:center;
    .card-thumbnail{
    border-radius:15px;
    overflow:hidden;
    object-fit:cover;
    object-positin:center;
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
    .label{
        font-size:1.1em;
        margin-bottom:10px;
    }
    .ui.animated.button {
        background: rgb(340,66,94);
        color: white;
    }
       
`
const Cards = ({post,fromPos}) => {
    const {label,Location,thumbLocation,mimetype,Key} = post;
    const downloadImage = (filename) => {
        const s3 = new AWS.S3({
         accessKeyId: process.env.REACT_APP_ACCESS_ID,
         secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
         signatureVersion: 'v4',
         region: 'ap-south-1'
       });
      let url = s3.getSignedUrl('getObject', {
        Bucket: process.env.REACT_APP_BUCKET_NAME , Key: filename,
        Expires: 300,
        ResponseContentDisposition :  `attachment; filename=${filename}`
      })
        let link = document.createElement("a");
            link.href = url;
            link.setAttribute('download', filename);
            link.click(); 
    } 
    const  addDownloadCount = () => {
        axios.post("/adddownload",{
            "_id":post._id
          })
          .then((res) => {
            console.log(res.data);
          })
          
      } 
      const  handleDownload = () => {
        let url=Location
        let filename= Key
        addDownloadCount();
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        downloadImage(filename)
      }  
    return (
        <Div>
                <div className="card-thumbnail" style={{background:`center / cover no-repeat url(${thumbLocation||Location})`}}>
                  { mimetype.includes('video') ? <img src={play} className="play-btn"/> :null }
                </div>

                { fromPos ? <div className="label"> {label} </div> : null }

                <Button onClick={handleDownload} animated >
                    <Button.Content visible >Download</Button.Content>
                    <Button.Content hidden>
                        <Icon name='download' inverted />
                    </Button.Content>
                </Button>
                
        </Div>
    )
}

export default Cards
