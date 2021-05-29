import React ,{useEffect,useState} from 'react'
import styled from "styled-components"
import CreativeImage from "../molecules/creartive-image"
import CreativeDetails from "../molecules/creative-details"
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { Container } from "@material-ui/core"
import Helmet from 'react-helmet'
import axios from "axios"
import SearchingCreative from "../molecules/searching-creative/searching-creactive.component"
const  Div = styled.div`
background:#f4d6cc;
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
    const [data,setData] = useState({
        status:"pending"
    });
   useEffect(() => {
    axios.get('/posts/'+match.params.title).then((response)=>{
        setData({
            status:'success',
            ...response.data[0]
        })
    }).catch(error=>{
        setData({
            status:'failed',
            res:'try again later'
        })
    })
   }, [])
    return (
        <>
        <Helmet>
             <meta property="og:image" content={data.status==="success"?data.images[0].location:''} />
        </Helmet>
        <Div>
        <Container>
            {
                data.status==="success"?(

                        <div className="main-creative">
                            <CreativeImage file={data.files[0]} thumbnail={data.images[0].location}  link={data.link}/>
                            <CreativeDetails {...data}/>
                        </div>
                ):(
                    <SearchingCreative/>
                )
            }
        </Container>
        </Div>
        </>
    )
}

export default SingleCreative
