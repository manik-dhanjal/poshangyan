import React from 'react'
import styled from "styled-components"
import{ Link }from "react-router-dom"
import DownloadCard from "../atom/download-card.creative/download-card.component"

const Div = styled.div`
flex:1;
h4{
    margin:0;
    margin-bottom:50px;
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
const CreativeDetails = ({label,themes,source,_id,targetAudience,languages,files,link}) => {
    const mimeString = (files) => {
        const arr = files.reduce((result,file) => {
           return result.find((item) => item === file.mimetype)?result:[...result,file.mimetype];
        },[])
        return `${arr}`
    } 
  
    return (
        <Div>
            <h1>{label}</h1>
            <table className="details-table">
                <tbody>
                    <tr>
                        <td className="label">Themes </td>
                        <td className="value">{themes} </td>
                    </tr>
                    <tr>
                        <td className="label">Media Type </td>
                        <td className="value">{link?'Others':mimeString(files)} </td>
                    </tr>
                    <tr>
                        <td className="label">Source </td>
                        <td className="value">{source} </td>
                    </tr>
                    <tr>
                        <td className="label">Languages </td>
                        <td className="value">{languages} </td>
                    </tr>
                    <tr>
                        <td className="label">Target Audience </td>
                        <td className="value">{targetAudience} </td>
                    </tr>
                </tbody>
            </table>
            {
                !link?files.map((file,index)=> (
                   <DownloadCard key={index+'download-card'} file={file} _id={_id} themes={themes}/>
                        )
                ):null

            }
            
            <h2>Share With Others</h2>
            <div className="social-share">
                <a className="facebook" href={'https://www.facebook.com/share.php?u='+encodeURIComponent(window.location.href)} target='_blank'><i className="facebook f icon"></i></a>
                <a className="twitter" href={'https://twitter.com/intent/tweet?text='+encodeURIComponent(window.location.href)} target='_blank'><i className="twitter icon"></i></a>
                <a className="whatsapp"  href={'https://api.whatsapp.com/send/?phone   &text='+encodeURIComponent(window.location.href)} target='_blank'><i className="whatsapp icon"></i></a>
                <a className="email" href={"mailto:?subject=Check out this resource I found on Poshangyan.com &body=I am sharing media from the Poshan Gyan website - a collection of trusted resources to improve India's nutritional status. Please use this link to access the file: "+ window.location.href+"."} title="Poshan Gyan">
                    <i className="far fa-envelope"></i>
                </a>

            </div>
        </Div>
    )
}

export default CreativeDetails
