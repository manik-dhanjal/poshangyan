import React ,{useEffect,useState} from 'react'
import styled from "styled-components"
import CreativeImage from "../molecules/creartive-image"
import CreativeDetails from "../molecules/creative-details"
import { Container } from "@material-ui/core"
import Helmet from 'react-helmet'
import axios from "axios"
const  Div = styled.div`
background:rgb(234,231,199);
padding:60px 0; 
min-height:100vh;
.main-creative{
    display:flex;
    gap:50px;
}
@media screen and (max-width:991px){
    .main-creative{
      flex-direction:column;
    }
}
`

const SingleCreative =  ({match}) => {
    const [data,setData] = useState({});
   useEffect(() => {
    axios.get('/posts/'+match.params.title).then((response)=>{
        // console.log(response.data[0])
        setData(response.data[0])
    })
   }, [])
    return (
        <>
        <Helmet>
             <meta property="og:image" content={data.thumbLocation||(data.Location||"https://www.poshangyan.com/logo-bg.png")} />
        </Helmet>
        <Div>
            <Container>
                <div className="main-creative">
                    <CreativeImage location={data.Location} thumbnail={data.thumbLocation} mime={data.mimetype}/>
                    
                    <CreativeDetails {...data}/>
                </div>
            </Container>
        </Div>
        </>
    )
}

export default SingleCreative
