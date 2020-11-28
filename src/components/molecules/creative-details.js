import React from 'react'
import styled from "styled-components"
import AWS from "aws-sdk";
import axios from 'axios';
import { Button, Icon } from 'semantic-ui-react'
import{ Link }from "react-router-dom"
const Div = styled.div`
flex:1;
h4{
    margin:0;
    margin-bottom:50px;
}
.download-card{
    background:white;
    border-radius:15px;
    padding:20px 30px;
    display:grid;
    align-items:center;
    grid-template-columns:70px 1fr 1fr;
    .mp4-logo{
        width:60px;
    }
    .heads{
        padding:0 20px;
    }
}
.downloaded{
    font-size:1.2em;
    .count{
        color:rgb(340,66,94);
        font-weight:600;
    }
}
.download-btn button{
    background:rgb(340,66,94);
    color:white;
    font-size:1.3em;
    padding:10px 20px;
    &:hover{
        background:rgb(340,66,94);
        color:white;
    }
}
.social-share{
    display:flex;
    gap:20px;
    &>a{
    background-color:rgb(340,66,94);
    color:white;
    border-radius:50%;
    width:60px;
    height:60px;
    font-size:30px;
        &>i{
            margin:0;
            width:100%;
            height:100%;
            display:flex;
        justify-content:center;
        align-items:center;
        }
    }
}    
@media screen and (max-width:991px){
    h1,h2,h4{
        text-align:center;
    }
    .download-card{
        grid-template-rows:1fr 1fr;
    }
    .heads{
        grid-column:1/2;
        grid-row:0/1;
    }
    .download-btn{
        grid-column:1/2;
        grid-row:1/2;
    }
}
`
const CreativeDetails = ({showFileName,themes,source,Key,_id,downloadsCount,mimetype}) => {
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
            "_id":_id
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
            <h1>{showFileName}</h1>
            <h4>Theme: {themes}</h4>
            <div className="download-card">
                <div className="mp4-logo">
                    {
                        mimetype && mimetype.includes("video")?
                        <img src="https://indiafightscovid.com/wp-content/plugins/download-manager/assets/file-type-icons/mp4.svg"/>
                        :<img src="https://indiafightscovid.com/wp-content/plugins/download-manager/assets/file-type-icons/jpg.svg"/>
                    }
                </div>
                <div className="heads">
                    <h3>{showFileName}</h3>
                    <p className="downloaded"> <span className="count"> {downloadsCount}</span> People already Downloaded   </p>
                </div>
                <div className="download-btn">
                    <Button onClick={handleDownload} animated >
                        <Button.Content visible >Download</Button.Content>
                        <Button.Content hidden>
                            <Icon name='download' inverted />
                        </Button.Content>
                    </Button>
                </div>
            </div>
            <h2>Share With Others</h2>
            <div className="social-share">
                <a className="facebook" href={'https://www.facebook.com/share.php?u='+encodeURIComponent(window.location.href)} target='_blank'><i class="facebook f icon"></i></a>
                <a className="twitter" href={'https://twitter.com/intent/tweet?text='+encodeURIComponent(window.location.href)} target='_blank'><i class="twitter icon"></i></a>
                <a className="whatsapp"  href={'https://api.whatsapp.com/send/?phone&text='+encodeURIComponent(window.location.href)} target='_blank'><i class="whatsapp icon"></i></a>
            </div>
        </Div>
    )
}

export default CreativeDetails
