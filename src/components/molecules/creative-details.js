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
    white-space:nowrap;
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
.details-table{
    margin:30px 0 50px 0;
    border:0.5px solid #d2cbcb;
    border-collapse: collapse;

    tr:nth-of-type(2n+1){
        background:white;
    }
    td{
        padding:10px 20px;
        min-width:150px;
        max-width:300px;
    }
    .label{
        font-weight:600;
        font-weight:1.1em;
    }
}
@media screen and (max-width:991px){
    h1,h2,h4{
        text-align:center;
    }
    .download-card{
        margin-bottom:50px;
        grid-template-rows: 100px 60px;
        grid-template-columns: 1fr 1fr;
    }
    .heads{
        grid-column:1/3;
        grid-row:1/2;
        text-align:center;
    }
    .download-btn{
        grid-column:1/3;
        grid-row:2/3;
        justify-self:center;
    }
    .mp4-logo{
        display:none;
    }
    .details-table{
        margin:30px auto;
        margin-bottom:60px;
        tr>td{
            padding:10px 20px;
            &:nth-of-type(2){
                min-width:100%;
                max-width:200px;
            }
        }
    }
    .social-share{
        justify-content:center;
    }
}
`
const CreativeDetails = ({label,showFileName,themes,source,Key,_id,downloadsCount,mimetype,targetAudience,mediaType,languages}) => {
    
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
            // console.log(res.data);
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
            <h1>{label}</h1>
            {/* <div className="details-table">
                    <div className="label">Themes</div><div className="value">{themes}</div>
                    <div className="label">Media Type</div><div className="value">{mediaType}</div>
                    <div className="label">Source</div><div className="value">{source}</div>
                    <div className="label">Languages</div><div className="value">{languages}</div>
                    <div className="label">Target Audience</div><div className="value">{targetAudience}</div>
            </div> */}
            <table className="details-table">
                <tr><td className="label">Themes </td>  <td className="value">{themes} </td></tr>
                <tr><td className="label">Media Type </td>  <td className="value">{mediaType} </td></tr>
                <tr><td className="label">Source </td>  <td className="value">{source} </td></tr>
                <tr><td className="label">Languages </td>  <td className="value">{languages} </td></tr>
                <tr><td className="label">Target Audience </td>  <td className="value">{targetAudience} </td></tr>
            </table>
            <div className="download-card">
                <div className="mp4-logo">
                    {
                        mimetype && (mimetype.includes("video")||mimetype.includes("audio"))?
                        <img src="https://indiafightscovid.com/wp-content/plugins/download-manager/assets/file-type-icons/mp4.svg"/>
                        :<img src="https://indiafightscovid.com/wp-content/plugins/download-manager/assets/file-type-icons/jpg.svg"/>
                    }
                </div>
                <div className="heads">
                    <h3>{showFileName}</h3>
                    <p className="downloaded"> <span className="count"> {downloadsCount}</span> Downloads   </p>
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
                <a className="facebook" href={'https://www.facebook.com/share.php?u='+encodeURIComponent(window.location.href)} target='_blank'><i className="facebook f icon"></i></a>
                <a className="twitter" href={'https://twitter.com/intent/tweet?text='+encodeURIComponent(window.location.href)} target='_blank'><i className="twitter icon"></i></a>
                <a className="whatsapp"  href={'https://api.whatsapp.com/send/?phone&text='+encodeURIComponent(window.location.href)} target='_blank'><i className="whatsapp icon"></i></a>
            </div>
        </Div>
    )
}

export default CreativeDetails
