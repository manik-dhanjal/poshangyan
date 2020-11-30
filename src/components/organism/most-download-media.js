import React, {useEffect,useState,useMemo} from 'react'
import styled from "styled-components"
import {Container} from "@material-ui/core"
import Cards from "../molecules/cards-sm"
import downloadedMediaApi from "../../api/most-dowloaded-media.api"
import ViewAllBtn from "../atom/view-all-btn"
const Div = styled.div`
padding:60px 0;
h2{
text-align:center;
margin:10px 0 20px 0;
}
.grid{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
}
.message{
    text-align:center;
}
`
const MostDownloadMedia = () => {
    var [post,setPost] = useState({
        status:"pending"
    });
       

    // const post = useMemo(()=>downloadedMediaApi(),[])
    useEffect(() => {
        (async () => {
            try{
                var data = await downloadedMediaApi();
                setPost({
                    data:data,
                    status:"success"
                })
            }
             catch(e){
                setPost({
                    data:[],
                    status:"fail"
                })
            }
        })()
      },[])
    return (
        <Div>
            <Container>
                <h2>Most Downloaded Media</h2>
                {
                    post.status==="pending"?
                        <h3 className="message">We Are Getting Your data ...</h3>
                       :(
                           post.status==="success"?
                            <div className="grid">
                                { post.data.map((a,i)=> <Cards post={a} key={i}/>) }
                            </div>
                            :<h3 className="message">Unable to find Your Data ...</h3>
                       ) 
                }
                 <ViewAllBtn url="/search"/>
            </Container>
        </Div>
    )
}

export default MostDownloadMedia
